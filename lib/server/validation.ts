const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s()-]{7,20}$/;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_RESUME_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

export class ValidationError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "ValidationError";
    this.status = status;
  }
}

type JsonRecord = Record<string, unknown>;

type ContactSubmission = {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  consent: string;
  source: string;
  createdAt: string;
};

export type ChatLeadSubmission = ContactSubmission & {
  location: string;
  requirement: string;
  timeline: string;
  budget: string;
};

type ServiceRequestSubmission = {
  name: string;
  phone: string;
  email: string;
  location: string;
  company: string;
  service: string;
  message: string;
  consent: string;
  source: string;
  createdAt: string;
};

type VendorRegistrationSubmission = {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  website: string;
  city: string;
  category: string;
  gstin: string;
  pan: string;
  experienceYears: string;
  productsServices: string;
  certifications: string;
  references: string;
  documentSharingMode: string;
  consent: string;
  source: string;
  createdAt: string;
};

type FeedbackSubmission = {
  name: string;
  rating: number;
  message: string;
  consent: string;
  source: string;
  createdAt: string;
};

export type ChatLeadFields = {
  name: string;
  phone: string;
  email: string;
  company: string;
  location: string;
  requirement: string;
  timeline: string;
  budget: string;
};

export type ChatAssistantTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ChatAssistantSubmission = {
  message: string;
  lead: Partial<ChatLeadFields>;
  history: ChatAssistantTurn[];
  leadSaved: boolean;
};

type CareerSubmission = {
  applicationData: Record<string, string>;
  resumeFile: File;
};

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toStringValue = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
};

const toDateIso = (value: unknown) => {
  const raw = toStringValue(value, 80);
  if (!raw) {
    return new Date().toISOString();
  }

  const timestamp = Date.parse(raw);
  if (Number.isNaN(timestamp)) {
    return new Date().toISOString();
  }

  return new Date(timestamp).toISOString();
};

const requiredString = (
  value: unknown,
  label: string,
  maxLength: number,
  minLength = 1
) => {
  const parsed = toStringValue(value, maxLength);
  if (parsed.length < minLength) {
    throw new ValidationError(`${label} is required.`);
  }

  return parsed;
};

const optionalEmail = (value: unknown) => {
  const email = toStringValue(value, 160).toLowerCase();
  if (!email) {
    return "";
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError("Please provide a valid email address.");
  }

  return email;
};

const requiredEmail = (value: unknown) => {
  const email = optionalEmail(value);
  if (!email) {
    throw new ValidationError("Email is required.");
  }

  return email;
};

const optionalLeadEmail = (value: unknown) => {
  const email = toStringValue(value, 160).toLowerCase();
  if (!email) {
    return "";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "";
  }

  return email;
};

const requiredPhone = (value: unknown) => {
  const phone = requiredString(value, "Phone", 32);
  if (!PHONE_REGEX.test(phone)) {
    throw new ValidationError("Please provide a valid phone number.");
  }

  return phone;
};

const assertHoneypot = (value: unknown) => {
  const trap = toStringValue(value, 120);
  if (trap) {
    throw new ValidationError("Invalid form submission.");
  }
};

const hasConsent = (value: unknown) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value !== "string") {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return (
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "on"
  );
};

const assertConsent = (value: unknown) => {
  if (!hasConsent(value)) {
    throw new ValidationError("Please accept the privacy policy to continue.");
  }
};

const requiredRating = (value: unknown) => {
  const raw = toStringValue(value, 10);
  const rating = Number.parseInt(raw, 10);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    throw new ValidationError("Please select a valid rating between 1 and 5.");
  }
  return rating;
};

export const validateContactPayload = (input: unknown): ContactSubmission => {
  if (!isRecord(input)) {
    throw new ValidationError("Invalid JSON payload.");
  }

  assertHoneypot(input.website);
  assertConsent(input.consent);

  return {
    name: requiredString(input.name, "Full name", 100),
    phone: requiredPhone(input.phone),
    email: optionalEmail(input.email),
    company: toStringValue(input.company, 120),
    message: requiredString(input.message, "Message", 3000, 5),
    source: toStringValue(input.source, 120) || "ssengineers.in",
    createdAt: toDateIso(input.createdAt),
    consent: "true",
  };
};

export const validateServiceRequestPayload = (
  input: unknown
): ServiceRequestSubmission => {
  if (!isRecord(input)) {
    throw new ValidationError("Invalid JSON payload.");
  }

  assertHoneypot(input.website);
  assertConsent(input.consent);

  return {
    name: requiredString(input.name, "Full name", 100),
    phone: requiredPhone(input.phone),
    email: optionalEmail(input.email),
    location: requiredString(input.location, "Location", 180),
    company: toStringValue(input.company, 120),
    service: requiredString(input.service, "Service type", 160),
    message: requiredString(input.message, "Scope / requirement", 3000, 5),
    source: toStringValue(input.source, 120) || "ssengineers.in",
    createdAt: toDateIso(input.createdAt),
    consent: "true",
  };
};

export const validateVendorRegistrationPayload = (
  input: unknown
): VendorRegistrationSubmission => {
  if (!isRecord(input)) {
    throw new ValidationError("Invalid JSON payload.");
  }

  assertHoneypot(input.websiteTrap);
  assertConsent(input.consent);

  return {
    companyName: requiredString(input.companyName, "Company name", 160, 2),
    contactPerson: requiredString(input.contactPerson, "Contact person", 100, 2),
    phone: requiredPhone(input.phone),
    email: requiredEmail(input.email),
    website: toStringValue(input.website, 180),
    city: requiredString(input.city, "City / operating location", 120, 2),
    category: requiredString(input.category, "Business category", 120, 2),
    gstin: toStringValue(input.gstin, 32).toUpperCase(),
    pan: toStringValue(input.pan, 20).toUpperCase(),
    experienceYears: toStringValue(input.experienceYears, 40),
    productsServices: requiredString(
      input.productsServices,
      "Products / services",
      3000,
      10
    ),
    certifications: toStringValue(input.certifications, 1200),
    references: toStringValue(input.references, 2200),
    documentSharingMode:
      toStringValue(input.documentSharingMode, 80) || "Email Attachment",
    source: toStringValue(input.source, 120) || "ssengineers.in/vendor-registration",
    createdAt: toDateIso(input.createdAt),
    consent: "true",
  };
};

export const validateFeedbackPayload = (input: unknown): FeedbackSubmission => {
  if (!isRecord(input)) {
    throw new ValidationError("Invalid JSON payload.");
  }

  assertHoneypot(input.website);
  assertConsent(input.consent);

  return {
    name: requiredString(input.name, "Full name", 100, 2),
    rating: requiredRating(input.rating),
    message: requiredString(input.message, "Feedback message", 3000, 5),
    source: toStringValue(input.source, 120) || "ssengineers.in/feedback",
    createdAt: toDateIso(input.createdAt),
    consent: "true",
  };
};

export const validateChatLeadPayload = (input: unknown): ChatLeadSubmission => {
  if (!isRecord(input)) {
    throw new ValidationError("Invalid JSON payload.");
  }

  assertHoneypot(input.website);
  assertConsent(input.consent);

  return {
    name: requiredString(input.name, "Name", 100),
    phone: requiredPhone(input.phone),
    email: optionalEmail(input.email),
    company: toStringValue(input.company, 120) || "Website Chat Lead",
    location: toStringValue(input.location, 180),
    requirement: toStringValue(input.requirement, 2000),
    timeline: toStringValue(input.timeline, 120),
    budget: toStringValue(input.budget, 120),
    message: requiredString(input.message, "Message", 3000, 2),
    source: toStringValue(input.source, 120) || "ssengineers.in/chat-widget",
    createdAt: toDateIso(input.createdAt),
    consent: "true",
  };
};

const toLeadFields = (input: unknown): Partial<ChatLeadFields> => {
  if (!isRecord(input)) {
    return {};
  }

  return {
    name: toStringValue(input.name, 100),
    phone: toStringValue(input.phone, 32),
    email: optionalLeadEmail(input.email),
    company: toStringValue(input.company, 120),
    location: toStringValue(input.location, 180),
    requirement: toStringValue(input.requirement, 2000),
    timeline: toStringValue(input.timeline, 120),
    budget: toStringValue(input.budget, 120),
  };
};

const toChatHistory = (value: unknown): ChatAssistantTurn[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const turns: ChatAssistantTurn[] = [];
  for (const item of value.slice(-16)) {
    if (!isRecord(item)) {
      continue;
    }

    const roleValue = toStringValue(item.role, 20).toLowerCase();
    const content = toStringValue(item.content, 2000);
    if (!content) {
      continue;
    }

    if (roleValue === "user" || roleValue === "assistant") {
      turns.push({ role: roleValue, content });
    }
  }

  return turns;
};

export const validateChatAssistantPayload = (
  input: unknown
): ChatAssistantSubmission => {
  if (!isRecord(input)) {
    throw new ValidationError("Invalid JSON payload.");
  }

  const message = requiredString(input.message, "Message", 2000, 1);
  const lead = toLeadFields(input.lead);
  const history = toChatHistory(input.history);
  const leadSaved = typeof input.leadSaved === "boolean" ? input.leadSaved : false;

  return {
    message,
    lead,
    history,
    leadSaved,
  };
};

const getFormString = (formData: FormData, key: string, maxLength: number) =>
  toStringValue(formData.get(key), maxLength);

const isAllowedResumeFile = (file: File) => {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const validExtension = ALLOWED_RESUME_EXTENSIONS.has(extension);
  const validType =
    file.type === "" || ALLOWED_RESUME_TYPES.has(file.type.toLowerCase());

  return validExtension || validType;
};

export const validateCareerFormData = (formData: FormData): CareerSubmission => {
  assertHoneypot(getFormString(formData, "website", 120));
  assertConsent(getFormString(formData, "consent", 12));

  const resume = formData.get("resume");
  if (!(resume instanceof File) || resume.size === 0) {
    throw new ValidationError("Resume file is required.");
  }

  if (resume.size > MAX_RESUME_SIZE_BYTES) {
    throw new ValidationError("Resume must be 5 MB or smaller.");
  }

  if (!isAllowedResumeFile(resume)) {
    throw new ValidationError("Resume must be a PDF, DOC, or DOCX file.");
  }

  const applicationData = {
    name: requiredString(getFormString(formData, "name", 100), "Full name", 100),
    phone: requiredPhone(getFormString(formData, "phone", 32)),
    email: requiredEmail(getFormString(formData, "email", 160)),
    position:
      getFormString(formData, "position", 120) || "Electrical Engineer",
    experience: requiredString(
      getFormString(formData, "experience", 80),
      "Experience",
      80
    ),
    location: getFormString(formData, "location", 120),
    workDescription: requiredString(
      getFormString(formData, "workDescription", 4000),
      "Work description",
      4000,
      5
    ),
    consent: "true",
    source: getFormString(formData, "source", 120) || "ssengineers.in",
    createdAt: toDateIso(getFormString(formData, "createdAt", 80)),
  };

  return {
    applicationData,
    resumeFile: resume,
  };
};
