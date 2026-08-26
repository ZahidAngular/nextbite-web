/* ═══════════════════════════════════════════════════════════════
   ENQUIRY FORM — shared rules

   Yeh file client aur server dono use karte hain. Client turant
   feedback deta hai, server phir se poori validation chalata hai —
   client par bharosa nahi kiya jata.
   ═══════════════════════════════════════════════════════════════ */

/** attachment ki hadd — Vercel serverless par request body ~4.5MB tak
 *  hi jati hai, is liye 4MB rakha hai taake har jagah kaam kare */
export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

export const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "text/plain",
  "image/png",
  "image/jpeg",
  "image/webp",
] as const;

export const ALLOWED_ATTACHMENT_LABEL = "PDF, Word, Excel, CSV or image";

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export const EMPTY_ENQUIRY: EnquiryFields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export type FieldErrors = Partial<Record<keyof EnquiryFields | "attachment", string>>;

/** step 1 ke fields — inhi par "Save & next" rukta hai */
export const STEP_ONE_FIELDS = ["name", "email", "phone"] as const;

/* thoda sa loose email check — RFC-perfect hona zaroori nahi,
   asal tasdeeq to reply hi karti hai */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/* phone: digits, spaces, + ( ) - allowed; kam se kam 6 hindse */
const PHONE_ALLOWED_RE = /^[\d\s+()\-.]+$/;

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** ek field ki validation — blur par aur submit par dono jagah */
export function validateField(
  field: keyof EnquiryFields,
  value: string
): string | undefined {
  const v = value.trim();

  switch (field) {
    case "name":
      if (!v) return "Please tell us your name.";
      if (v.length < 2) return "That looks a little short.";
      if (v.length > 100) return "Please keep this under 100 characters.";
      return;

    case "email":
      if (!v) return "We need an email to reply to.";
      if (!EMAIL_RE.test(v)) return "That doesn't look like a valid email.";
      if (v.length > 200) return "Please keep this under 200 characters.";
      return;

    case "phone": {
      if (!v) return "Please add a phone number.";
      if (!PHONE_ALLOWED_RE.test(v)) return "Digits, spaces and + ( ) - only.";
      const digits = v.replace(/\D/g, "");
      if (digits.length < 6) return "That doesn't look like a full number.";
      if (digits.length > 20) return "That number looks too long.";
      return;
    }

    case "company":
      if (v.length > 120) return "Please keep this under 120 characters.";
      return;

    case "message":
      if (v.length > 2000) return "Please keep this under 2000 characters.";
      return;
  }
}

export function validateAttachment(file: {
  size: number;
  type: string;
  name: string;
}): string | undefined {
  if (file.size === 0) return "That file looks empty.";
  if (file.size > MAX_ATTACHMENT_BYTES) {
    return `Attachment must be under ${formatBytes(MAX_ATTACHMENT_BYTES)}.`;
  }
  if (
    file.type &&
    !(ALLOWED_ATTACHMENT_TYPES as readonly string[]).includes(file.type)
  ) {
    return `Please attach a ${ALLOWED_ATTACHMENT_LABEL}.`;
  }
  return;
}

/** poore form ki validation — server hamesha yeh chalata hai */
export function validateEnquiry(fields: EnquiryFields): FieldErrors {
  const errors: FieldErrors = {};
  (Object.keys(fields) as (keyof EnquiryFields)[]).forEach((key) => {
    const error = validateField(key, fields[key]);
    if (error) errors[key] = error;
  });
  return errors;
}

export function hasErrors(errors: FieldErrors) {
  return Object.values(errors).some(Boolean);
}
