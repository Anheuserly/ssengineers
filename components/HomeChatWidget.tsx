"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  MessageSquare,
  X,
  CheckCircle2,
  Wrench,
  Send,
  PhoneCall,
  Sparkles,
  Flame,
  Zap,
  ShieldCheck,
  Building2,
  RotateCcw,
} from "lucide-react";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  isConfirmation?: boolean;
  requestNumber?: string;
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
  requestNumber?: string;
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

type RequiredField = "requirement" | "name" | "phone";

const REQUIRED_FLOW: RequiredField[] = [
  "requirement",
  "name",
  "phone",
];

const initialQuickChips = [
  "🚒 Fire Hydrant & Sprinkler",
  "🚨 Fire Alarm & Detection",
  "💨 Gas Suppression (FM-200)",
  "⚡ Electrical Substation",
  "🛡️ Annual Maintenance (AMC)",
  "📋 Fire NOC & Safety Audit",
];

const facilityQuickChips = [
  "Commercial Tower",
  "Industrial Plant / Factory",
  "Hospital / Healthcare",
  "Warehouse / Logistics",
  "Educational Campus",
];

export default function HomeChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [notice, setNotice] = useState("");
  const [input, setInput] = useState("");
  const [lead, setLead] = useState<LeadState>(emptyLead);
  const [missing, setMissing] = useState<string[]>([
    "requirement",
    "name",
    "phone",
  ]);
  const [leadSaved, setLeadSaved] = useState(false);
  const [generatedRefCode, setGeneratedRefCode] = useState("");

  const initialGreeting =
    "Hello! Welcome to S.S. Engineers & Consultants. How can we assist your facility today? What service or engineering system do you need help with?";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      role: "assistant",
      text: initialGreeting,
    },
  ]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = messagesRef.current;
    if (target) {
      target.scrollTo({
        top: target.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, status]);

  const requiredCompletedCount = useMemo(() => {
    let count = 0;
    if (lead.requirement.trim()) count++;
    if (lead.name.trim()) count++;
    if (lead.phone.trim()) count++;
    return count;
  }, [lead]);

  const progressPercent = Math.round(
    (requiredCompletedCount / REQUIRED_FLOW.length) * 100
  );

  const activeQuickChips = useMemo(() => {
    if (leadSaved) return [];
    if (!lead.requirement) return initialQuickChips;
    if (!lead.location) return facilityQuickChips;
    return [];
  }, [lead.requirement, lead.location, leadSaved]);

  const inputPlaceholder = useMemo(() => {
    if (!lead.requirement) return "Tell us what system or service you need...";
    if (!lead.location) return "Enter your site location or city...";
    if (!lead.name) return "Enter your full name...";
    if (!lead.phone) return "Enter your contact phone / WhatsApp number...";
    return "Ask any question or type message...";
  }, [lead]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const messageText = input.trim();
    if (!messageText) return;

    setInput("");
    setStatus("sending");
    setNotice("");

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      text: messageText,
    };

    const history = messages.slice(-14).map((item) => ({
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

      if (body.lead) {
        setLead((prev) => mergeLead(prev, body.lead || {}));
      }

      const missingFields = Array.isArray(body.missingFields) ? body.missingFields : [];
      setMissing(missingFields);

      const assistantText = body.reply || "Thank you. Let us proceed.";

      if (body.leadSaved && body.requestNumber) {
        setLeadSaved(true);
        setGeneratedRefCode(body.requestNumber);
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            text: assistantText,
            isConfirmation: true,
            requestNumber: body.requestNumber,
          },
        ]);
        setNotice(`Work Request created! Reference #${body.requestNumber}`);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            text: assistantText,
          },
        ]);
      }
    } catch (error) {
      console.error("[Chat widget error]", error);
      setNotice("Unable to reach assistant. Please try again or call our hotline.");
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: "I am having temporary trouble with network connectivity. Please call our engineering desk directly at +91 98719 36847 for immediate assistance.",
        },
      ]);
    } finally {
      setStatus("idle");
    }
  };

  const handleChipClick = (text: string) => {
    // Strip leading emojis for cleaner prompt submission
    const cleanText = text.replace(/^[\p{Emoji}\s]+/gu, "").trim();
    setInput(cleanText);
  };

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <section className="chat-widget-panel" aria-label="AI Engineering Assistant">
          {/* Header */}
          <div className="chat-widget-head">
            <div className="chat-widget-title-wrap">
              <div className="chat-avatar-badge">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="chat-widget-title">Engineering Helpdesk AI</p>
                <p className="chat-widget-subtitle">
                  Instant Work Request & Site Survey Dispatch
                </p>
              </div>
            </div>
            <button
              type="button"
              className="chat-widget-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Progress Strip */}
          <div className="chat-widget-progress">
            <div className="chat-widget-progress-meta">
              <span>
                {leadSaved
                  ? "🎉 Work Request Registered"
                  : `${requiredCompletedCount}/3 Details Captured`}
              </span>
              <span>
                {leadSaved
                  ? `Ref #${generatedRefCode}`
                  : !lead.requirement
                  ? "Step 1: Your Requirement"
                  : !lead.name
                  ? "Step 2: Client Name"
                  : !lead.phone
                  ? "Step 3: Contact Phone"
                  : "All Details Complete"}
              </span>
            </div>
            <div className="chat-widget-progress-track">
              <span
                className="chat-widget-progress-fill"
                style={{
                  width: `${leadSaved ? 100 : progressPercent}%`,
                  background: leadSaved ? "#16a34a" : "var(--accent)",
                }}
              />
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            ref={messagesRef}
            className="chat-widget-messages"
            role="log"
            aria-live="polite"
          >
            {messages.map((item) => (
              <div key={item.id} className={`chat-bubble-row ${item.role}`}>
                <div className={`chat-bubble ${item.role}`}>
                  <p>{item.text}</p>
                  {item.isConfirmation && item.requestNumber && (
                    <div className="chat-confirmation-badge">
                      <div className="badge-header">
                        <CheckCircle2 size={16} className="text-success" />
                        <strong>Work Request Created</strong>
                      </div>
                      <div className="badge-code">
                        <span>Ref Code:</span>
                        <strong>{item.requestNumber}</strong>
                      </div>
                      <p className="badge-note">
                        Saved in S.S. Engineers Central Database. Direct technical
                        dispatch initiated.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {status === "sending" && (
              <div className="chat-bubble-row assistant">
                <div className="chat-bubble assistant typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
          </div>

          {/* Form and Quick Chips */}
          <form className="chat-widget-form" onSubmit={onSubmit}>
            {activeQuickChips.length > 0 && (
              <div className="chat-widget-quick">
                <span className="quick-label">Suggestions:</span>
                <div className="quick-chips-row">
                  {activeQuickChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className="chat-quick-chip"
                      onClick={() => handleChipClick(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="chat-input-bar">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                placeholder={inputPlaceholder}
                maxLength={2000}
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) {
                      onSubmit(e as any);
                    }
                  }
                }}
              />
              <button
                className="chat-send-btn"
                type="submit"
                disabled={status === "sending" || !input.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Captured tags preview */}
            {(lead.requirement || lead.name || lead.location) && (
              <div className="chat-captured-tags">
                {lead.requirement && (
                  <span className="cap-tag">
                    <strong>Req:</strong> {lead.requirement.slice(0, 30)}
                  </span>
                )}
                {lead.location && (
                  <span className="cap-tag">
                    <strong>Loc:</strong> {lead.location}
                  </span>
                )}
                {lead.name && (
                  <span className="cap-tag">
                    <strong>Name:</strong> {lead.name}
                  </span>
                )}
              </div>
            )}

            {notice && <p className="chat-widget-note">{notice}</p>}

            <div className="chat-footer-links">
              <span>Direct Hotline: <a href="tel:9871936847">+91 98719 36847</a></span>
              <span>•</span>
              <Link href="/contact#request-work">Full Survey Form</Link>
            </div>
          </form>
        </section>
      ) : null}

      {/* Floating Trigger Button */}
      <button
        type="button"
        className="chat-widget-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI Engineering Helpdesk"
      >
        <span className="toggle-icon-wrap">
          <MessageSquare size={20} />
          <span className="toggle-badge-dot" />
        </span>
        <span className="toggle-text">AI Helpdesk</span>
      </button>
    </div>
  );
}
