"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

type LeadState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  location: string;
  requirement: string;
  timeline: string;
  budget: string;
};

type ChatApiResponse = {
  reply: string;
  lead?: Partial<LeadState>;
  missingFields?: string[];
  leadSaved?: boolean;
  message?: string;
};

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const emptyLead: LeadState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  requirement: "",
  timeline: "",
  budget: "",
};

const mergeLead = (base: LeadState, patch: Partial<LeadState>): LeadState => ({
  name: (patch.name || base.name || "").trim(),
  phone: (patch.phone || base.phone || "").trim(),
  email: (patch.email || base.email || "").trim(),
  company: (patch.company || base.company || "").trim(),
  location: (patch.location || base.location || "").trim(),
  requirement: (patch.requirement || base.requirement || "").trim(),
  timeline: (patch.timeline || base.timeline || "").trim(),
  budget: (patch.budget || base.budget || "").trim(),
});

const toFieldLabel = (value: string) => {
  if (value === "name") return "Name";
  if (value === "phone") return "Phone";
  if (value === "location") return "Location";
  if (value === "requirement") return "Requirement";
  if (value === "email") return "Email";
  if (value === "company") return "Company";
  if (value === "timeline") return "Timeline";
  if (value === "budget") return "Budget";
  return value;
};

type RequiredField = "name" | "phone" | "email" | "requirement";

const REQUIRED_FLOW: RequiredField[] = [
  "name",
  "phone",
  "email",
  "requirement",
];

const placeholderByField: Record<RequiredField, string> = {
  name: "Enter your full name",
  phone: "Enter your contact number",
  email: "Enter your email address",
  requirement: "Tell us your exact requirement",
};

const quickRepliesByField: Record<RequiredField, string[]> = {
  name: ["Shubham Kumar", "Anil Saini"],
  phone: ["9871936847", "+91 9310286848"],
  email: ["anil@ssengineers.in", "name@company.com"],
  requirement: [
    "Need fire hydrant and sprinkler setup for new project.",
    "Need AMC support for fire and MEP systems.",
    "Need site survey and technical proposal.",
  ],
};

export default function HomeChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [notice, setNotice] = useState("");
  const [input, setInput] = useState("");
  const [lead, setLead] = useState<LeadState>(emptyLead);
  const [missing, setMissing] = useState<string[]>([
    "name",
    "phone",
    "email",
    "requirement",
  ]);
  const [leadSaved, setLeadSaved] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      role: "assistant",
      text: "Hello, I am your AI support assistant. May I have your full name to get started?",
    },
  ]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = messagesRef.current;
    if (!target) {
      return;
    }

    target.scrollTo({
      top: target.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  const capturedSummary = useMemo(() => {
    const items: string[] = [];
    if (lead.name) items.push(`Name: ${lead.name}`);
    if (lead.phone) items.push(`Phone: ${lead.phone}`);
    if (lead.email) items.push(`Email: ${lead.email}`);
    if (lead.location) items.push(`Location: ${lead.location}`);
    return items;
  }, [lead.email, lead.location, lead.name, lead.phone]);

  const nextRequiredField = useMemo<RequiredField | null>(() => {
    const missingSet = new Set(missing);
    for (const field of REQUIRED_FLOW) {
      if (missingSet.has(field)) {
        return field;
      }
    }
    return null;
  }, [missing]);

  const requiredCompletedCount = useMemo(
    () => REQUIRED_FLOW.filter((field) => Boolean(lead[field].trim())).length,
    [lead]
  );

  const progressPercent = Math.round(
    (requiredCompletedCount / REQUIRED_FLOW.length) * 100
  );

  const quickReplies = useMemo(() => {
    if (!nextRequiredField || leadSaved) {
      return [];
    }
    return quickRepliesByField[nextRequiredField];
  }, [leadSaved, nextRequiredField]);

  const inputPlaceholder = nextRequiredField
    ? placeholderByField[nextRequiredField]
    : "Tell us what you need...";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") {
      return;
    }

    const messageText = input.trim();
    if (!messageText) {
      return;
    }

    setInput("");
    setStatus("sending");
    setNotice("");

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      text: messageText,
    };

    const history = messages.slice(-12).map((item) => ({
      role: item.role,
      content: item.text,
    }));

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history,
          lead,
          leadSaved,
        }),
      });

      const body = (await response.json().catch(() => null)) as ChatApiResponse | null;

      if (!response.ok || !body) {
        throw new Error(body?.message || "Unable to process chat request.");
      }

      const assistantText =
        typeof body.reply === "string" && body.reply.trim()
          ? body.reply.trim()
          : "Thanks. Please share more details so we can assist you better.";

      if (body.lead) {
        setLead((prev) => mergeLead(prev, body.lead || {}));
      }

      const missingFields = Array.isArray(body.missingFields)
        ? body.missingFields.filter((item) => typeof item === "string")
        : [];
      setMissing(missingFields);

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: assistantText,
        },
      ]);

      if (body.leadSaved) {
        setLeadSaved(true);
        setNotice(
          "Thank you. Your enquiry has been submitted successfully. Our technical team will contact you shortly."
        );
      } else if (missingFields.length > 0) {
        setNotice(`Next step: ${toFieldLabel(missingFields[0])}`);
      } else {
        setNotice("");
      }
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Unable to connect right now.";
      setNotice(message);
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: "Connection issue right now. Let us continue manually. Please share your full name first.",
        },
      ]);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <section className="chat-widget-panel" aria-label="AI chat widget">
          <div className="chat-widget-head">
            <div className="chat-widget-title-wrap">
              <p className="chat-widget-title">AI Help Desk</p>
              <p className="chat-widget-subtitle">Step-by-step project support</p>
            </div>
            <button
              type="button"
              className="chat-widget-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-widget-progress">
            <div className="chat-widget-progress-meta">
              <span>
                {requiredCompletedCount}/{REQUIRED_FLOW.length} details captured
              </span>
              <span>
                {nextRequiredField
                  ? `Next: ${toFieldLabel(nextRequiredField)}`
                  : "Required details complete"}
              </span>
            </div>
            <div className="chat-widget-progress-track">
              <span
                className="chat-widget-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div
            ref={messagesRef}
            className="chat-widget-messages"
            role="log"
            aria-live="polite"
          >
            {messages.map((item) => (
              <p key={item.id} className={`chat-bubble ${item.role}`}>
                {item.text}
              </p>
            ))}
          </div>

          <form className="chat-widget-form" onSubmit={onSubmit}>
            {quickReplies.length > 0 ? (
              <div className="chat-widget-quick">
                {quickReplies.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="chat-quick-chip"
                    onClick={() => setInput(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}

            <label>
              Your Reply
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={2}
                placeholder={inputPlaceholder}
                maxLength={2000}
                required
              />
            </label>

            {capturedSummary.length > 0 ? (
              <div className="chat-widget-meta">
                {capturedSummary.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            ) : null}

            <p className="chat-widget-legal">
              By chatting, you agree to our <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>

            <button className="button" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Thinking..." : "Send"}
            </button>
            {notice ? <p className="chat-widget-note">{notice}</p> : null}
            {missing.length > 0 ? (
              <p className="chat-widget-missing">
                Next: {toFieldLabel(missing[0])}
              </p>
            ) : null}
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="chat-widget-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI chat"
      >
        AI Chat
      </button>
    </div>
  );
}
