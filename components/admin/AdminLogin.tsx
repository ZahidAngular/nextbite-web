"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { login } from "@/lib/admin-api";

/* Login ka safha. Password yahan sirf guzarta hai — parkha API par
   jata hai, aur browser mein kabhi mehfooz nahi hota. */
export function AdminLogin({
  onSignedIn,
}: {
  onSignedIn: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);

    try {
      const session = await login(email, password);
      setPassword("");
      onSignedIn(session.email);
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Sign-in failed.");
      setBusy(false);
    }
  }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center px-5 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[var(--glow-primary)] blur-[120px]" />
        <div className="absolute -right-32 -bottom-40 h-[22rem] w-[22rem] rounded-full bg-[var(--glow-secondary)] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-sm"
      >
        <div className="mb-7 flex flex-col items-center text-center">
          <Logo imageClassName="h-12 w-auto" />
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-muted uppercase">
            <ShieldCheck size={12} className="text-secondary" />
            Admin
          </p>
          <h1 className="font-heading mt-4 text-2xl font-bold tracking-tight">
            Sign in to view leads
          </h1>
          <p className="mt-1.5 text-[13px] text-muted">
            Fine Food Show enquiries, in one place.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[1.5rem] border border-line bg-card p-6 shadow-card"
        >
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>

          <label className="mt-3 block">
            <span className="sr-only">Password</span>
            <span className="relative block">
              <input
                type={show ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-line bg-background py-3 pr-11 pl-4 text-sm outline-none transition-colors focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-lg p-2.5 text-muted transition-colors hover:text-foreground"
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="mt-3 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-[12.5px] leading-snug text-red-600 dark:text-red-400"
            >
              <AlertCircle size={14} className="mt-px shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <Lock size={14} />
                Sign in
              </>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
          Leads contain personal contact details. Sign out when you&apos;re done.
        </p>
      </motion.div>
    </main>
  );
}
