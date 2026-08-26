"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Paperclip,
  Phone,
  Send,
  TriangleAlert,
  User,
  X,
} from "lucide-react";
import {
  ALLOWED_ATTACHMENT_LABEL,
  ALLOWED_ATTACHMENT_TYPES,
  EMPTY_ENQUIRY,
  MAX_ATTACHMENT_BYTES,
  STEP_ONE_FIELDS,
  formatBytes,
  validateAttachment,
  validateField,
  type EnquiryFields,
  type FieldErrors,
} from "@/lib/enquiry";

/* ──────────────────────────────────────────────
   Ek field — label, icon, error, sab ek jagah
   ────────────────────────────────────────────── */
function Field({
  id,
  label,
  icon: Icon,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  icon: typeof User;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 text-[13px] font-semibold"
      >
        <Icon size={14} className="text-primary" />
        {label}
        {required && <span className="text-primary">*</span>}
        {!required && (
          <span className="text-[11px] font-normal text-muted">optional</span>
        )}
      </label>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-red-600 dark:text-red-400"
        >
          <TriangleAlert size={12} />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[12px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-card px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/25";

/* ══════════════════════════════════════════════
   Two-step enquiry form
   Step 1 → Name, Email, Phone
   Step 2 → Company, Message, Attachment
   ══════════════════════════════════════════════ */
export function EnquiryForm({
  source = "web",
  onDone,
  compact = false,
}: {
  /** kahan se aayi — "stand-qr", "modal", "page" */
  source?: string;
  onDone?: () => void;
  compact?: boolean;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fields, setFields] = useState<EnquiryFields>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  /* naye step par pehla field focus — keyboard users ke liye */
  useEffect(() => {
    if (!sent) firstFieldRef.current?.focus();
  }, [step, sent]);

  const set = (key: keyof EnquiryFields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    /* jo error dikh raha hai woh type karte hi hat jaye */
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const blur = (key: keyof EnquiryFields) =>
    setErrors((e) => ({ ...e, [key]: validateField(key, fields[key]) }));

  /* ── step 1 → 2 ─────────────────────────────── */
  const goNext = () => {
    const next: FieldErrors = {};
    STEP_ONE_FIELDS.forEach((key) => {
      next[key] = validateField(key, fields[key]);
    });
    setErrors((e) => ({ ...e, ...next }));
    if (STEP_ONE_FIELDS.some((k) => next[k])) return;
    setFormError(null);
    setStep(2);
  };

  /* ── attachment ─────────────────────────────── */
  const pickFile = (picked: File | null) => {
    if (!picked) {
      setFile(null);
      setErrors((e) => ({ ...e, attachment: undefined }));
      return;
    }
    const problem = validateAttachment({
      size: picked.size,
      type: picked.type,
      name: picked.name,
    });
    if (problem) {
      setErrors((e) => ({ ...e, attachment: problem }));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setErrors((e) => ({ ...e, attachment: undefined }));
    setFile(picked);
  };

  /* ── submit ─────────────────────────────────── */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    /* dono steps ki validation — server bhi yahi karega */
    const all: FieldErrors = {};
    (Object.keys(fields) as (keyof EnquiryFields)[]).forEach((key) => {
      all[key] = validateField(key, fields[key]);
    });
    setErrors(all);

    if (STEP_ONE_FIELDS.some((k) => all[k])) {
      setStep(1);
      setFormError("Please fix the details on step 1.");
      return;
    }
    if (Object.values(all).some(Boolean)) return;

    setSending(true);
    setFormError(null);

    try {
      const body = new FormData();
      (Object.keys(fields) as (keyof EnquiryFields)[]).forEach((k) =>
        body.append(k, fields[k])
      );
      body.append("source", source);
      if (file) body.append("attachment", file);

      const res = await fetch("/api/enquiry", { method: "POST", body });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.errors) setErrors(data.errors as FieldErrors);
        setFormError(
          data?.message ?? "Something went wrong. Please try again."
        );
        /* agar galti step 1 mein hai to wahin wapas le jao */
        if (data?.errors && STEP_ONE_FIELDS.some((k) => data.errors[k])) {
          setStep(1);
        }
        return;
      }

      setSent(true);
    } catch {
      setFormError(
        "We couldn't reach the server. Please check your connection, or email travis@nextbite.com.au."
      );
    } finally {
      setSending(false);
    }
  };

  /* ══ success ══════════════════════════════════ */
  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center px-2 py-10 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
          <CheckCircle2 size={30} />
        </span>

        <h3 className="font-heading mt-6 text-2xl font-bold tracking-tight">
          Thanks, {fields.name.split(" ")[0] || "there"}.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Your enquiry is with the NextBite team. We&apos;ll be in touch at{" "}
          <span className="font-medium text-foreground">{fields.email}</span> —
          and do come and say hello at Stand HB27.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setFields(EMPTY_ENQUIRY);
              setFile(null);
              setErrors({});
              setStep(1);
              setSent(false);
            }}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            Send another
          </button>
          {onDone && (
            <button
              type="button"
              onClick={onDone}
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-semibold text-white shadow-md"
            >
              Done
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  /* ══ form ═════════════════════════════════════ */
  return (
    <form onSubmit={submit} noValidate className={compact ? "" : "px-1"}>
      {/* ── progress ─────────────────────────── */}
      <div className="mb-7">
        <div className="mb-2.5 flex items-center justify-between text-[11px] font-bold tracking-[0.16em] uppercase">
          <span className={step === 1 ? "text-primary" : "text-muted"}>
            1 · Your details
          </span>
          <span className={step === 2 ? "text-primary" : "text-muted"}>
            2 · About you
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-card-soft">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            initial={false}
            animate={{ width: step === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          /* ─────────── STEP 1 ─────────── */
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col gap-5"
          >
            <Field id="name" label="Full name" icon={User} error={errors.name} required>
              <input
                ref={firstFieldRef}
                id="name"
                name="name"
                autoComplete="name"
                enterKeyHint="next"
                className={inputClass}
                placeholder="Jane Cooper"
                value={fields.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                onChange={(e) => set("name", e.target.value)}
                onBlur={() => blur("name")}
              />
            </Field>

            <Field id="email" label="Email" icon={Mail} error={errors.email} required>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                enterKeyHint="next"
                className={inputClass}
                placeholder="jane@company.com.au"
                value={fields.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => blur("email")}
              />
            </Field>

            <Field id="phone" label="Phone" icon={Phone} error={errors.phone} required>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="done"
                className={inputClass}
                placeholder="0430 952 494"
                value={fields.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => blur("phone")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    goNext();
                  }
                }}
              />
            </Field>

            <button
              type="button"
              onClick={goNext}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              Save &amp; next
              <ArrowRight size={16} />
            </button>
          </motion.div>
        ) : (
          /* ─────────── STEP 2 ─────────── */
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col gap-5"
          >
            <Field id="company" label="Company name" icon={Building2} error={errors.company}>
              <input
                ref={firstFieldRef}
                id="company"
                name="company"
                autoComplete="organization"
                className={inputClass}
                placeholder="Cooper Foodservice"
                value={fields.company}
                onChange={(e) => set("company", e.target.value)}
                onBlur={() => blur("company")}
              />
            </Field>

            <Field
              id="message"
              label="Any other information"
              icon={MessageSquare}
              error={errors.message}
              hint={`${fields.message.length}/2000`}
            >
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`${inputClass} resize-y`}
                placeholder="Which brands or products are you interested in? Retail, wholesale or foodservice?"
                value={fields.message}
                onChange={(e) => set("message", e.target.value)}
                onBlur={() => blur("message")}
              />
            </Field>

            {/* ── attachment ── */}
            <Field
              id="attachment"
              label="Attachment"
              icon={Paperclip}
              error={errors.attachment}
              hint={`${ALLOWED_ATTACHMENT_LABEL} · up to ${formatBytes(MAX_ATTACHMENT_BYTES)}`}
            >
              <input
                ref={fileInputRef}
                id="attachment"
                name="attachment"
                type="file"
                className="sr-only"
                accept={ALLOWED_ATTACHMENT_TYPES.join(",")}
                onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              />

              {file ? (
                <div className="flex items-center gap-3 rounded-xl border border-line bg-card-soft px-4 py-3">
                  <Paperclip size={15} className="shrink-0 text-secondary" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted">
                    {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      pickFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    aria-label="Remove attachment"
                    className="shrink-0 rounded-full p-1 text-muted transition-colors hover:text-red-500"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="attachment"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-card-soft px-4 py-5 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Paperclip size={15} />
                  Choose a file
                </label>
              )}
            </Field>

            {/* ── actions ── */}
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send enquiry
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {formError && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-medium text-red-700 dark:text-red-300"
        >
          <TriangleAlert size={15} className="mt-px shrink-0" />
          {formError}
        </p>
      )}
    </form>
  );
}
