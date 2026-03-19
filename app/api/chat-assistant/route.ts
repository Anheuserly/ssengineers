import { NextResponse } from "next/server";
import {
  AppwriteRequestError,
  createAppwriteDocument,
  ensureAppwriteStringAttributes,
  getAppwriteConfig,
} from "@/functions/appwrite";
import {
  ChatLeadFields,
  ValidationError,
  validateChatAssistantPayload,
  validateChatLeadPayload,
} from "@/lib/server/validation";

export const runtime = "edge";

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

const REQUIRED_FIELDS: Array<keyof ChatLeadFields> = [
  "name",
  "phone",
  "email",
  "requirement",
];
const CHAT_CONTACT_STRING_ATTRIBUTES = [
  { key: "location", size: 180 },
  { key: "requirement", size: 2000 },
  { key: "timeline", size: 120 },
  { key: "budget", size: 120 },
] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (text.length < 2 || text.length > 60) {
    return false;
  }

  if (/\d/.test(text)) {
    return false;
  }

  if (/[.@]/.test(text)) {
    return false;
  }

  const normalized = text.replace(/\s+/g, " ").trim();
  const words = normalized.split(" ");
  if (words.length > 4) {
    return false;
  }

  return words.every((word) => /^[A-Za-z][A-Za-z.'-]*$/.test(word));
};

const asksForName = (reply: string) =>
  /full\s+name|your\s+name|may\s+i\s+have\s+your\s+name|please\s+share\s+your\s+name/i.test(
    reply
  );

const asksForPhone = (reply: string) =>
  /contact\s+number|phone\s+number|mobile\s+number|share\s+your\s+phone/i.test(
    reply
  );

const asksForEmail = (reply: string) =>
  /email\s+address|share\s+your\s+email|your\s+email/i.test(reply);

const asksForRequirement = (reply: string) =>
  /exact\s+requirement|project\s+requirement|scope|what\s+do\s+you\s+need/i.test(
    reply
  );

const asksForField = (reply: string, field: keyof ChatLeadFields) => {
  if (field === "name") return asksForName(reply);
  if (field === "phone") return asksForPhone(reply);
  if (field === "email") return asksForEmail(reply);
  if (field === "requirement") return asksForRequirement(reply);
  return false;
};

const hasLeadField = (lead: Partial<ChatLeadFields>, field: keyof ChatLeadFields) => {
  const maxLength = field === "requirement" ? 2000 : 200;
  const value = toClean(lead[field], maxLength);
  if (!value) {
    return false;
  }

  if (field === "email") {
    return EMAIL_REGEX.test(value);
  }

  return true;
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

  const nameMatch = value.match(
    /(?:my name is|i am|this is)\s+([a-z][a-z\s.'-]{1,60})/i
  );
  if (nameMatch?.[1]) {
    inferred.name = nameMatch[1];
  }

  // Capture direct plain-name messages like "shubham" or "shubham kumar".
  if (!inferred.name && looksLikeStandaloneName(value)) {
    inferred.name = value;
  }

  const companyMatch = value.match(
    /(?:company(?:\s*name)?\s*(?:is|:)|from)\s+([a-z0-9][a-z0-9&.,' -]{1,110})/i
  );
  if (companyMatch?.[1]) {
    inferred.company = companyMatch[1];
  }

  const locationMatch = value.match(
    /(?:site(?:\s*location)?|location)\s*(?:is|:)?\s*([a-z0-9][a-z0-9,.'() -]{2,160})/i
  );
  if (locationMatch?.[1]) {
    inferred.location = locationMatch[1];
  } else if (
    !inferred.phone &&
    !inferred.email &&
    /\b(?:in|at)\s+[a-z][a-z\s,.'-]{2,80}$/i.test(value) &&
    (lower.includes("site") || lower.includes("project"))
  ) {
    inferred.location = value;
  }

  const timelineMatch = value.match(
    /(?:timeline|start|handover|deadline)\s*(?:is|:)?\s*([a-z0-9,.'() -]{2,120})/i
  );
  if (timelineMatch?.[1]) {
    inferred.timeline = timelineMatch[1];
  }

  const budgetMatch = value.match(
    /(?:budget)\s*(?:is|:)?\s*([₹$]?\s?[a-z0-9,.'() -]{2,120})/i
  );
  if (budgetMatch?.[1]) {
    inferred.budget = budgetMatch[1];
  }

  if (
    lower.includes("need") ||
    lower.includes("requirement") ||
    lower.includes("service") ||
    lower.includes("project") ||
    lower.includes("fire") ||
    lower.includes("sprinkler") ||
    lower.includes("hydrant") ||
    lower.includes("alarm") ||
    lower.includes("electrical") ||
    lower.includes("plumbing") ||
    lower.includes("mep") ||
    lower.includes("cctv") ||
    lower.includes("amc")
  ) {
    inferred.requirement = value;
  } else if (
    !inferred.phone &&
    !inferred.email &&
    !inferred.name &&
    value.split(/\s+/).length >= 6
  ) {
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

  if (field === "name") return "May I have your full name?";
  if (field === "phone") return `${prefix}Please share your contact number.`;
  if (field === "email") return `${prefix}Please share your email address.`;
  if (field === "location") return "Please share site location.";
  if (field === "requirement") {
    return `${prefix}Please share your exact requirement/scope (for example hydrant, sprinkler, AMC, or full MEP).`;
  }
  return "Please share more details.";
};

const fallbackReply = (lead: Partial<ChatLeadFields>) => {
  const missing = missingFields(lead);
  if (missing.length === 0) {
    return "Thank you for sharing the details. Your enquiry has been registered successfully. Our technical team will contact you shortly.";
  }

  return `${nextFieldPrompt(missing[0], lead)} We can support fire, electrical, plumbing, and MEP requirements.`;
};

const systemPrompt = `
You are an AI lead-assistant for S.S. Engineers & Consultants (Fire & MEP).
Your goals:
1) Help user with project/service questions.
2) Collect missing lead fields gradually and politely.
3) Ask one missing field at a time.

Important:
- Keep replies short (max 2-3 sentences).
- Do not ask all questions together.
- Never ask for a field that already exists in Current lead JSON.
- Prefer actionable next steps.
- If sufficient details are collected, confirm callback.
- Required lead fields: name, phone, email, requirement.
- Location, company, timeline, and budget are optional but useful.

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
  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";
  const conversation = history.map((turn) => ({
    role: turn.role,
    content: turn.content,
  }));

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
          content: `Current lead JSON: ${JSON.stringify(
            normalizeLead(currentLead)
          )}\nLatest user message: ${message}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const body = (await response.json()) as ChatCompletionResponse;
  const raw = body.choices?.[0]?.message?.content || "";
  if (!raw) {
    return null;
  }

  try {
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

const buildLeadMessage = (
  lead: Partial<ChatLeadFields>,
  latestMessage: string
): string => {
  const extra = [
    lead.requirement ? `Requirement: ${lead.requirement}` : "",
    lead.location ? `Location: ${lead.location}` : "",
    lead.timeline ? `Timeline: ${lead.timeline}` : "",
    lead.budget ? `Budget: ${lead.budget}` : "",
    `Latest Chat: ${latestMessage}`,
  ]
    .filter(Boolean)
    .join(" | ");

  return extra.slice(0, 3000);
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

    // Prevent repetitive loops where model asks a field that is already captured.
    for (const field of REQUIRED_FIELDS) {
      if (hasLeadField(nextLead, field) && asksForField(reply, field)) {
        reply = fallbackReply(nextLead);
        break;
      }
    }

    const missing = missingFields(nextLead);

    let leadSaved = payload.leadSaved;
    const hasAllRequired = REQUIRED_FIELDS.every((field) =>
      hasLeadField(nextLead, field)
    );
    if (!leadSaved && hasAllRequired) {
      const {
        collections: { contacts },
      } = getAppwriteConfig();

      const contactPayload = validateChatLeadPayload({
        name: nextLead.name,
        phone: nextLead.phone,
        email: nextLead.email,
        company: nextLead.company || "Website Chat Lead",
        location: nextLead.location,
        requirement: nextLead.requirement,
        timeline: nextLead.timeline,
        budget: nextLead.budget,
        message: buildLeadMessage(nextLead, payload.message),
        consent: true,
        source: "ssengineers.in/chat-widget",
        createdAt: new Date().toISOString(),
      });

      await ensureAppwriteStringAttributes(
        contacts,
        CHAT_CONTACT_STRING_ATTRIBUTES.map((attribute) => ({
          ...attribute,
        })),
        { waitForAvailability: true, timeoutMs: 15000 }
      );

      await createAppwriteDocument(contacts, contactPayload);
      leadSaved = true;
    }

    return NextResponse.json(
      {
        reply,
        lead: nextLead,
        missingFields: missing,
        leadSaved,
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

    if (error instanceof AppwriteRequestError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
