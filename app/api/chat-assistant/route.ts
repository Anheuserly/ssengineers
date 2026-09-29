import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { database } from "@/lib/server/database";
import {
  ChatLeadFields,
  ValidationError,
  validateChatAssistantPayload,
} from "@/lib/server/validation";

type AssistantOutput = {
  reply: string;
  lead?: Partial<ChatLeadFields>;
};

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

// Priority flow: Ask what they want first, then their name and phone to generate the work request!
const REQUIRED_FIELDS: Array<keyof ChatLeadFields> = [
  "requirement",
  "name",
  "phone",
];

const toClean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const normalizeLead = (input: Partial<ChatLeadFields>) => ({
  name: toClean(input.name, 100),
  phone: toClean(input.phone, 32),
  email: toClean(input.email, 160).toLowerCase(),
  company: toClean(input.company, 120),
  location: toClean(input.location, 180),
  requirement: toClean(input.requirement, 2000),
  timeline: toClean(input.timeline, 120),
  budget: toClean(input.budget, 120),
});

const mergeLead = (
  base: Partial<ChatLeadFields>,
  patch: Partial<ChatLeadFields>
): Partial<ChatLeadFields> => {
  const left = normalizeLead(base);
  const right = normalizeLead(patch);

  return {
    name: right.name || left.name,
    phone: right.phone || left.phone,
    email: right.email || left.email,
    company: right.company || left.company,
    location: right.location || left.location,
    requirement: right.requirement || left.requirement,
    timeline: right.timeline || left.timeline,
    budget: right.budget || left.budget,
  };
};

const looksLikeStandaloneName = (value: string) => {
  const text = value.trim();
  if (text.length < 2 || text.length > 60) return false;
  if (/\d/.test(text)) return false;
  if (/[.@]/.test(text)) return false;
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  if (words.length > 4) return false;
  return words.every((word) => /^[A-Za-z][A-Za-z.'-]*$/.test(word));
};

const hasLeadField = (lead: Partial<ChatLeadFields>, field: keyof ChatLeadFields) => {
  const maxLength = field === "requirement" ? 2000 : 200;
  const value = toClean(lead[field], maxLength);
  return Boolean(value);
};

const firstName = (lead: Partial<ChatLeadFields>) =>
  toClean(lead.name, 100).split(/\s+/)[0] || "";

const inferLeadFromText = (message: string): Partial<ChatLeadFields> => {
  const value = message.trim();
  const lower = value.toLowerCase();
  const inferred: Partial<ChatLeadFields> = {};

  const emailMatch = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (emailMatch) {
    inferred.email = emailMatch[0];
  }

  const phoneMatch = value.match(/(?:\+91[\s-]?)?[6-9]\d{9}\b|(?:\+?\d[\d\s()-]{7,20}\d)/);
  if (phoneMatch) {
    inferred.phone = phoneMatch[0];
  }

  const nameMatch = value.match(/(?:my name is|i am|this is)\s+([a-z][a-z\s.'-]{1,60})/i);
  if (nameMatch?.[1]) {
    inferred.name = nameMatch[1];
  } else if (!inferred.name && looksLikeStandaloneName(value) && !lower.includes("hydrant") && !lower.includes("fire") && !lower.includes("mep") && !lower.includes("amc")) {
    inferred.name = value;
  }

  const companyMatch = value.match(/(?:company(?:\s*name)?\s*(?:is|:)|from)\s+([a-z0-9][a-z0-9&.,' -]{1,110})/i);
  if (companyMatch?.[1]) {
    inferred.company = companyMatch[1];
  }

  const locationMatch = value.match(/(?:site(?:\s*location)?|location)\s*(?:is|:)?\s*([a-z0-9][a-z0-9,.'() -]{2,160})/i);
  if (locationMatch?.[1]) {
    inferred.location = locationMatch[1];
  } else if (/\b(?:in|at|near)\s+([A-Za-z0-9\s,.-]{3,60})\b/i.test(value)) {
    const locM = value.match(/\b(?:in|at|near)\s+([A-Za-z0-9\s,.-]{3,60})\b/i);
    if (locM?.[1]) inferred.location = locM[1].trim();
  }

  // Detect requirement keywords
  const isReqKeyword =
    lower.includes("need") ||
    lower.includes("want") ||
    lower.includes("require") ||
    lower.includes("fire") ||
    lower.includes("hydrant") ||
    lower.includes("sprinkler") ||
    lower.includes("alarm") ||
    lower.includes("fm-200") ||
    lower.includes("novec") ||
    lower.includes("electrical") ||
    lower.includes("substation") ||
    lower.includes("plumbing") ||
    lower.includes("mep") ||
    lower.includes("amc") ||
    lower.includes("audit") ||
    lower.includes("noc") ||
    lower.includes("hvac") ||
    lower.includes("installation");

  if (isReqKeyword) {
    inferred.requirement = value;
  }

  return inferred;
};

const missingFields = (lead: Partial<ChatLeadFields>) =>
  REQUIRED_FIELDS.filter((field) => !toClean(lead[field], 2000));

const nextFieldPrompt = (
  field: keyof ChatLeadFields,
  lead: Partial<ChatLeadFields>
) => {
  const userFirstName = firstName(lead);
  const prefix = userFirstName ? `Thanks ${userFirstName}. ` : "";

  if (field === "requirement") {
    return "What specific system or engineering requirement does your facility need? (e.g. Fire Hydrant & Sprinkler, Substation, Gas Suppression, AMC, or Fire NOC Audit?)";
  }
  if (field === "location") {
    return `${prefix}What is your project site location or city?`;
  }
  if (field === "name") {
    return `${prefix}May I have your full name to prepare the work request?`;
  }
  if (field === "phone") {
    return `${prefix}Please share your contact phone number or WhatsApp so our senior engineers can schedule a site review.`;
  }
  return "Please share more details about your scope.";
};

const fallbackReply = (lead: Partial<ChatLeadFields>) => {
  const missing = missingFields(lead);
  if (missing.length === 0) {
    return "Thank you! All required details are in place.";
  }
  return nextFieldPrompt(missing[0], lead);
};

const systemPrompt = `
You are an advanced engineering AI lead assistant for S.S. Engineers & Consultants (Turnkey Fire Protection & MEP Specialists since 1997).
Your goals:
1) Understand what service or system the user needs first (Hydrant, Sprinkler, Fire Alarm, FM-200 Gas, Substation, HVAC, Plumbing, AMC, or Fire NOC Audit).
2) Ask for site location / facility type.
3) Collect their full name and phone number to create an official work request.
4) Keep responses professional, warm, concise, and focused on prompt site survey dispatch.
5) Ask only one missing item at a time.

Return strict JSON only:
{
  "reply": "assistant response to user",
  "lead": {
    "name": "",
    "phone": "",
    "email": "",
    "company": "",
    "location": "",
    "requirement": "",
    "timeline": "",
    "budget": ""
  }
}
`;

const getAiOutput = async ({
  history,
  currentLead,
  message,
}: {
  history: Array<{ role: "user" | "assistant"; content: string }>;
  currentLead: Partial<ChatLeadFields>;
  message: string;
}): Promise<AssistantOutput | null> => {
  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey) return null;

  const model = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";
  const conversation = history.map((turn) => ({
    role: turn.role,
    content: turn.content,
  }));

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          ...conversation,
          {
            role: "user",
            content: `Current captured lead: ${JSON.stringify(
              normalizeLead(currentLead)
            )}\nLatest user message: ${message}`,
          },
        ],
      }),
    });

    if (!response.ok) return null;

    const body = (await response.json()) as ChatCompletionResponse;
    const raw = body.choices?.[0]?.message?.content || "";
    if (!raw) return null;

    const parsed = JSON.parse(raw) as {
      reply?: unknown;
      lead?: Partial<ChatLeadFields>;
    };
    return {
      reply: toClean(parsed.reply, 1000),
      lead: normalizeLead(parsed.lead || {}),
    };
  } catch {
    return null;
  }
};

export async function POST(request: Request) {
  try {
    const rawPayload = await request.json();
    const payload = validateChatAssistantPayload(rawPayload);
    const heuristicLead = inferLeadFromText(payload.message);
    let nextLead = mergeLead(payload.lead, heuristicLead);

    const aiOutput = await getAiOutput({
      history: payload.history,
      currentLead: nextLead,
      message: payload.message,
    });

    if (aiOutput?.lead) {
      nextLead = mergeLead(nextLead, aiOutput.lead);
    }

    let reply = aiOutput?.reply || fallbackReply(nextLead);

    const missing = missingFields(nextLead);
    const hasAllRequired = missing.length === 0;
    let leadSaved = payload.leadSaved;
    let requestNumber = "";
    let requestId = "";

    // Automatically create Work Request in PostgreSQL when requirement, name, and phone are ready!
    if (!leadSaved && hasAllRequired) {
      try {
        const businessId = process.env.SS_ENGINEERS_BUSINESS_ID || "30ddc1d6-9961-4ce1-98ad-aeb897fd9242";
        requestId = randomUUID();
        requestNumber = `SSE-${Math.floor(100000 + Math.random() * 900000)}`;
        const sourceRecordId = `ssengineers:chat:${requestId}`;

        const formattedTitle = `Chat Work Request: ${nextLead.requirement?.slice(0, 70)}`;
        const formattedDescription = [
          `Client Name: ${nextLead.name}`,
          `Phone: ${nextLead.phone}`,
          nextLead.email ? `Email: ${nextLead.email}` : null,
          nextLead.company ? `Company: ${nextLead.company}` : null,
          nextLead.location ? `Site Location: ${nextLead.location}` : null,
          `--- Requirement Brief ---`,
          nextLead.requirement,
        ]
          .filter(Boolean)
          .join("\n");

        const metadata = {
          source: "ssengineers.in/chat-assistant",
          requestNumber,
          leadDetails: nextLead,
          submittedAt: new Date().toISOString(),
        };

        const client = await database().connect();
        try {
          await client.query("BEGIN");
          await client.query(
            `INSERT INTO work_requests (
              id, source_record_id, request_number, request_type, title, description,
              requester_name, requester_phone, requester_email, assigned_business_id,
              status, address, metadata, business_name
            ) VALUES (
              $1, $2, $3, 'service', $4, $5,
              $6, $7, $8, $9,
              'pending', $10, $11::jsonb, 'S.S. Engineers & Consultants'
            )`,
            [
              requestId,
              sourceRecordId,
              requestNumber,
              formattedTitle,
              formattedDescription,
              nextLead.name,
              nextLead.phone,
              nextLead.email || null,
              businessId,
              nextLead.location || null,
              JSON.stringify(metadata),
            ]
          );

          await client.query(
            `INSERT INTO work_request_targets (request_id, business_id, lead_type, status)
             VALUES ($1, $2, 'direct', 'notified')
             ON CONFLICT DO NOTHING`,
            [requestId, businessId]
          );

          await client.query("COMMIT");
          leadSaved = true;
          reply = `🎉 Excellent, ${firstName(nextLead)}! Your work request has been created and registered directly in our engineering database under Tracking Reference #${requestNumber}. Our technical project team will contact you at ${nextLead.phone} within 24 hours to review your ${nextLead.requirement} requirement.`;
        } catch (dbErr) {
          await client.query("ROLLBACK");
          console.error("[Chat DB Save Error]", dbErr);
        } finally {
          client.release();
        }
      } catch (err) {
        console.error("[Chat Lead Generation Error]", err);
      }
    }

    return NextResponse.json(
      {
        reply,
        lead: nextLead,
        missingFields: missing,
        leadSaved,
        requestNumber,
        requestId,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "Invalid form payload." }, { status: 400 });
    }
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
