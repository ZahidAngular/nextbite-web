"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
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
  ENQUIRY_AREAS,
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
        className="mb-1.5 flex items-center gap-2 text-[13px] font-semibold"
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
          className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-red-600 dark:text-red-400"
        >
          <TriangleAlert size={12} />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[12px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

/* NextBite API (.NET) ka pata. Set na ho to Next.js ki apni
   /api/enquiry route chalti hai — jo sirf Node hosting par kaam
   karti hai, static export par nahi. */
const ENDPOINT =
  process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim() || "/api/enquiry";

/* .NET API do marhalon mein leti hai: pehle POST se enquiry banti
   hai aur token milta hai, phir usi token ke saath PATCH se tafseel
   jurti hai. Purani single-shot route mein PATCH nahi hai, is liye
   sirf asal API par do-marhala flow chalta hai. */
const IS_TWO_PHASE = ENDPOINT !== "/api/enquiry";

const inputClass =
  "w-full rounded-xl border border-line bg-card px-4 py-2.5 text-[15px] outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/25";

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

  /* Step 1 kamiyab hone ke baad — enquiry pehle hi mehfooz hai */
  const [saved, setSaved] = useState<{ id: number; token?: string } | null>(null);

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

  /* ── step 1 → save → step 2 ──────────────────────────────────
     Yahin enquiry mehfooz ho jati hai. User step 2 chhor de tab
     bhi uska raabta team ke paas pohanch chuka hota hai.        */
  const goNext = async () => {
    if (sending) return;

    const next: FieldErrors = {};
    STEP_ONE_FIELDS.forEach((key) => {
      next[key] = validateField(key, fields[key]);
    });
    setErrors((e) => ({ ...e, ...next }));
    if (STEP_ONE_FIELDS.some((k) => next[k])) return;

    setFormError(null);

    /* purani single-shot route par save aakhir mein hota hai */
    if (!IS_TWO_PHASE) {
      setStep(2);
      return;
    }

    /* dobara "Save & next" dabaya jaye to naya record na bane */
    if (saved) {
      setStep(2);
      return;
    }

    setSending(true);
    try {
      const body = new FormData();
      STEP_ONE_FIELDS.forEach((k) => body.append(k, fields[k]));
      body.append("source", source);

      const res = await fetch(ENDPOINT, { method: "POST", body });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.errors) setErrors(data.errors as FieldErrors);
        setFormError(
          data?.message ??
            "We couldn't save your details. Please try again, or email travis@nextbite.com.au."
        );
        return;
      }

      setSaved({ id: data.id, token: data.token });
      setStep(2);
    } catch {
      setFormError(
        "We couldn't reach the server. Please check your connection, or email travis@nextbite.com.au."
      );
    } finally {
      setSending(false);
    }
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

      /* Step 1 pehle hi save ho chuka ho to sirf tafseel bhejo —
         wohi enquiry PATCH se update hoti hai, nayi nahi banti. */
      const patching = IS_TWO_PHASE && saved?.token;

      if (patching) {
        body.append("token", saved!.token!);
      } else {
        (Object.keys(fields) as (keyof EnquiryFields)[]).forEach((k) =>
          body.append(k, fields[k])
        );
        body.append("source", source);
      }

      if (patching) {
        body.append("company", fields.company);
        body.append("message", fields.message);
      }

      if (file) body.append("attachment", file);

      const res = await fetch(
        patching ? `${ENDPOINT}/${saved!.id}` : ENDPOINT,
        { method: patching ? "PATCH" : "POST", body }
      );
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.errors) setErrors(data.errors as FieldErrors);
        setFormError(
          data?.message ??
            "We couldn't submit that. Please try again, or email travis@nextbite.com.au."
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
          {saved
            ? "We've sent a confirmation to "
            : "Your enquiry is with the NextBite team. We'll be in touch at "}
          <span className="font-medium text-foreground">{fields.email}</span>
          {saved ? " and the team has your enquiry." : "."} Do come and say
          hello at Stand HB27.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setFields(EMPTY_ENQUIRY);
              setFile(null);
              setErrors({});
              setSaved(null);
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
      <div className="mb-5 [@media(max-height:560px)]:mb-3">
        <div className="mb-2 flex items-center justify-between text-[11px] font-bold tracking-[0.16em] uppercase">
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
            className="flex flex-col gap-3.5 [@media(max-height:560px)]:gap-2"
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

            {/* Is par label jaan boojh kar nahi — baaki fields ke labels
               waise hi rehte hain. Screen readers ke liye aria-label. */}
            <select
              name="area"
              value={fields.area}
              aria-label="What is your enquiry about?"
              onChange={(e) => set("area", e.target.value)}
              className={`${inputClass} appearance-none bg-[length:1.05rem] bg-[right_1rem_center] bg-no-repeat pr-11`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808f7d' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              }}
            >
              {ENQUIRY_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={goNext}
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl disabled:opacity-70"
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  Save &amp; next
                  <ArrowRight size={16} />
                </>
              )}
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
            className="flex flex-col gap-3.5 [@media(max-height:560px)]:gap-2"
          >
            {saved && (
              <p className="flex items-start gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-3.5 py-2.5 text-[12px] leading-relaxed font-medium text-secondary">
                <CheckCircle2 size={14} className="mt-px shrink-0" />
                Saved — we&apos;ve emailed you a confirmation. Anything below is
                optional.
              </p>
            )}

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
                rows={3}
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
                <div className="flex items-center gap-3 rounded-xl border border-line bg-card-soft px-4 py-2.5">
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
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-card-soft px-4 py-3 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Paperclip size={15} />
                  Choose a file
                </label>
              )}
            </Field>

            {/* ── actions ── */}
            <div className="flex flex-wrap items-center gap-3">
              {saved ? (
                /* Enquiry mehfooz hai — user yahin ruk sakta hai */
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                >
                  <Check size={16} />
                  That&apos;s everything
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}

              <button
                type="submit"
                disabled={sending}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl disabled:opacity-70"
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
