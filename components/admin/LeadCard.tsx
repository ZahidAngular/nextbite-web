"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Building2,
  ChevronDown,
  Download,
  Loader2,
  Mail,
  MessageSquare,
  Paperclip,
  Phone,
  Trash2,
} from "lucide-react";
import {
  deleteLead,
  downloadAttachment,
  type EmailStatus,
  type Lead,
} from "@/lib/admin-api";

/* ── waqt ──────────────────────────────────────────────────────────
   API ab hamesha `Z` ke saath bhejta hai, phir bhi purane record ya
   koi doosra source bina nishan ke aa jaye to usay UTC hi maan lo —
   warna waqt reader ke offset jitna khisak jayega. */
function asDate(iso: string): Date {
  const utc = /[Zz]|[+-]\d{2}:?\d{2}$/.test(iso) ? iso : `${iso}Z`;
  return new Date(utc);
}

export function formatWhen(iso: string): string {
  return asDate(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatAgo(iso: string): string {
  const seconds = (Date.now() - asDate(iso).getTime()) / 1000;

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86_400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604_800) return `${Math.floor(seconds / 86_400)}d ago`;
  return formatWhen(iso);
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const EMAIL_TONE: Record<EmailStatus, string> = {
  Sent: "text-secondary",
  Failed: "text-red-600 dark:text-red-400",
  Skipped: "text-muted",
  Pending: "text-primary",
};

/* ══════════════════════════════════════════════════════════════════ */

export function LeadCard({
  lead,
  onDeleted,
  onSessionLost,
}: {
  lead: Lead;
  onDeleted: (id: number) => void;
  onSessionLost: (message: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const partial = lead.detailsAddedAtUtc === null;

  async function remove(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);

    try {
      await deleteLead(lead.id, password);
      setPassword("");
      onDeleted(lead.id);
    } catch (problem) {
      const message =
        problem instanceof Error ? problem.message : "Couldn't delete that.";

      /* Session hi khatam ho gaya to poora panel login par jayega */
      if (problem instanceof Error && problem.name === "SessionExpired") {
        onSessionLost(message);
        return;
      }

      setError(message);
      setBusy(false);
    }
  }

  async function getAttachment() {
    try {
      await downloadAttachment(lead);
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Download failed.");
    }
  }

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.22 }}
      className="overflow-hidden rounded-2xl border border-line bg-card shadow-card"
    >
      {/* ── summary ─────────────────────────────────────────── */}
      <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
        <span
          aria-hidden
          className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-[13px] font-bold text-white sm:flex"
        >
          {lead.name.trim().charAt(0).toUpperCase() || "?"}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h3 className="font-heading text-[15px] leading-tight font-bold">
              {lead.name}
            </h3>
            <span className="text-[11px] text-muted">#{lead.id}</span>

            {partial && (
              <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[9.5px] font-bold tracking-[0.08em] text-primary uppercase">
                Contact only
              </span>
            )}
          </div>

          {lead.company && (
            <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-muted">
              <Building2 size={11} className="shrink-0 opacity-70" />
              <span className="truncate">{lead.company}</span>
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px]">
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex min-w-0 items-center gap-1.5 text-muted transition-colors hover:text-primary"
            >
              <Mail size={11} className="shrink-0 opacity-70" />
              <span className="truncate">{lead.email}</span>
            </a>
            <a
              href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
            >
              <Phone size={11} className="shrink-0 opacity-70" />
              {lead.phone}
            </a>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <time
            dateTime={lead.receivedAtUtc}
            title={formatWhen(lead.receivedAtUtc)}
            className="text-[11px] whitespace-nowrap text-muted"
          >
            {formatAgo(lead.receivedAtUtc)}
          </time>

          <div className="flex items-center gap-1">
            {lead.hasAttachment && (
              <span
                title={lead.attachmentFileName ?? "Attachment"}
                className="rounded-md p-1.5 text-muted"
              >
                <Paperclip size={13} />
              </span>
            )}

            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Hide details" : "Show details"}
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-card-soft hover:text-foreground"
            >
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            <button
              onClick={() => {
                setConfirming((v) => !v);
                setError(null);
              }}
              aria-label={`Delete enquiry from ${lead.name}`}
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── tafseel ─────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-line px-4 py-4 sm:px-5">
              {lead.message ? (
                <div>
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
                    <MessageSquare size={11} />
                    Message
                  </p>
                  <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap">
                    {lead.message}
                  </p>
                </div>
              ) : (
                <p className="text-[12.5px] text-muted italic">
                  No message — they only left contact details.
                </p>
              )}

              {lead.hasAttachment && (
                <button
                  onClick={getAttachment}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-background px-3 py-2 text-[12.5px] font-medium transition-colors hover:border-primary"
                >
                  <Download size={13} className="text-primary" />
                  <span className="max-w-[16rem] truncate">
                    {lead.attachmentFileName}
                  </span>
                  <span className="text-muted">
                    {formatBytes(lead.attachmentSizeBytes)}
                  </span>
                </button>
              )}

              <dl className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-[12px] sm:grid-cols-4">
                <Fact label="Source" value={lead.source} />
                <Fact label="Received" value={formatWhen(lead.receivedAtUtc)} />
                <Fact
                  label="Details added"
                  value={
                    lead.detailsAddedAtUtc
                      ? formatWhen(lead.detailsAddedAtUtc)
                      : "—"
                  }
                />
                {lead.area && <Fact label="Enquiry about" value={lead.area} />}
              </dl>

              {lead.emails.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-bold tracking-[0.12em] text-muted uppercase">
                    Emails
                  </p>
                  <ul className="space-y-1.5">
                    {lead.emails.map((attempt) => (
                      <li
                        key={attempt.id}
                        className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-[12px]"
                      >
                        <span
                          className={`font-semibold ${EMAIL_TONE[attempt.status]}`}
                        >
                          {attempt.status}
                        </span>
                        <span className="text-muted">→ {attempt.to}</span>
                        <span className="text-muted opacity-70">
                          {formatWhen(attempt.createdAtUtc)}
                        </span>
                        {attempt.error && (
                          <span className="w-full text-[11.5px] text-red-600 dark:text-red-400">
                            {attempt.error}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── delete ke liye tasdeeq ──────────────────────────── */}
      <AnimatePresence initial={false}>
        {confirming && (
          <motion.form
            key="confirm"
            onSubmit={remove}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-red-500/25 bg-red-500/[0.06]"
          >
            <div className="px-4 py-3.5 sm:px-5">
              <p className="text-[12.5px] leading-snug">
                Delete <strong>{lead.name}</strong>&apos;s enquiry for good?
                Enter the delete password to confirm.
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <input
                  type="password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Delete password"
                  className="min-w-0 flex-1 rounded-lg border border-line bg-background px-3 py-2 text-[13px] outline-none transition-colors focus:border-red-500"
                />

                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {busy ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setConfirming(false);
                    setPassword("");
                    setError(null);
                  }}
                  className="rounded-lg px-3 py-2 text-[12.5px] font-medium text-muted transition-colors hover:text-foreground"
                >
                  Cancel
                </button>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-2 flex items-start gap-1.5 text-[12px] text-red-600 dark:text-red-400"
                >
                  <AlertCircle size={12} className="mt-px shrink-0" />
                  {error}
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[9.5px] font-bold tracking-[0.1em] text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 truncate">{value}</dd>
    </div>
  );
}
