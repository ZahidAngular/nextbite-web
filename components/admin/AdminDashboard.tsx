"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Download,
  Inbox,
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { AdminLogin } from "./AdminLogin";
import { LeadCard } from "./LeadCard";
import {
  adminBase,
  checkSession,
  downloadCsv,
  fetchLeads,
  fetchStats,
  readToken,
  writeToken,
  type Lead,
  type Stats,
} from "@/lib/admin-api";

/* ═══════════════════════════════════════════════════════════════
   Fine Food Show ki leads.

   Safha static hai — asal pehra .NET API par hai. Yahan token ke
   siwa kuch nahi rehta, aur woh bhi sirf tab tak jab tak tab khula
   hai.
   ═══════════════════════════════════════════════════════════════ */

type Phase = "checking" | "out" | "in";

/* Build ke waqt tay — dono taraf ek hi qeemat */
const CONFIGURED = adminBase() !== "";

export function AdminDashboard() {
  const [phase, setPhase] = useState<Phase>(CONFIGURED ? "checking" : "out");
  const [who, setWho] = useState("");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);


  /* Nayi search purani ka jawab aane par overwrite na ho jaye */
  const requestId = useRef(0);

  const load = useCallback(async (term: string) => {
    const mine = ++requestId.current;

    setLoading(true);
    setError(null);

    try {
      const [rows, counts] = await Promise.all([fetchLeads(term), fetchStats()]);

      if (mine !== requestId.current) return;   /* purana jawab — chhor do */

      setLeads(rows);
      setStats(counts);
    } catch (problem) {
      if (mine !== requestId.current) return;

      if (problem instanceof Error && problem.name === "SessionExpired") {
        setPhase("out");
        setError(problem.message);
        return;
      }

      setError(problem instanceof Error ? problem.message : "Couldn't load leads.");
    } finally {
      if (mine === requestId.current) setLoading(false);
    }
  }, []);

  /* Refresh par: token bacha hai to poochho ke abhi chal raha hai ya nahi */
  useEffect(() => {
    if (!CONFIGURED) return;

    let alive = true;

    void (async () => {
      const token = readToken();

      if (token) {
        try {
          const email = await checkSession(token);
          if (alive) {
            setWho(email);
            setPhase("in");
          }
          return;
        } catch {
          /* token purana ya radd — neeche login par */
        }
      }

      if (alive) setPhase("out");
    })();

    return () => {
      alive = false;
    };
  }, []);

  /* Sign-in ke baad aur har search par */
  useEffect(() => {
    if (phase !== "in") return;

    const timer = setTimeout(() => load(search), search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [phase, search, load]);

  function signOut() {
    writeToken(null);
    setLeads([]);
    setStats(null);
    setSearch("");
    setPhase("out");
  }

  async function exportCsv() {
    try {
      await downloadCsv();
      setNotice("CSV downloaded.");
      setTimeout(() => setNotice(null), 3000);
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Export failed.");
    }
  }

  /* ── login / intezaar ────────────────────────────────────── */

  if (phase === "checking") {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center">
        <RefreshCw size={20} className="animate-spin text-muted" />
      </main>
    );
  }

  if (phase === "out") {
    if (!CONFIGURED) {
      return (
        <main className="flex min-h-[100dvh] items-center justify-center px-6">
          <div className="max-w-md rounded-2xl border border-line bg-card p-6 text-center shadow-card">
            <AlertCircle size={22} className="mx-auto text-primary" />
            <h1 className="font-heading mt-3 text-lg font-bold">
              Admin API not configured
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              This build has no API address. Set{" "}
              <code className="rounded bg-card-soft px-1.5 py-0.5 text-[12px]">
                NEXT_PUBLIC_ENQUIRY_ENDPOINT
              </code>{" "}
              (or{" "}
              <code className="rounded bg-card-soft px-1.5 py-0.5 text-[12px]">
                NEXT_PUBLIC_ADMIN_ENDPOINT
              </code>
              ) and rebuild.
            </p>
          </div>
        </main>
      );
    }

    return (
      <>
        {error && (
          <p className="fixed inset-x-0 top-0 z-50 bg-red-600 px-4 py-2 text-center text-[12.5px] text-white">
            {error}
          </p>
        )}
        <AdminLogin
          onSignedIn={(email) => {
            setWho(email);
            setError(null);
            setPhase("in");
          }}
        />
      </>
    );
  }

  /* ── dashboard ───────────────────────────────────────────── */

  return (
    <main className="relative min-h-[100dvh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-48 left-1/3 h-[24rem] w-[24rem] rounded-full bg-[var(--glow-primary)] blur-[130px]" />
      </div>

      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-[var(--glass)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Logo imageClassName="h-9 w-auto sm:h-10" />
            <span className="hidden h-5 w-px bg-line sm:block" />
            <span className="hidden items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] text-muted uppercase sm:inline-flex">
              <ShieldCheck size={11} className="text-secondary" />
              Leads
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-2.5">
            <span className="hidden max-w-[16rem] truncate text-[12px] text-muted md:block">
              {who}
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-1.5 text-[12px] font-medium transition-colors hover:border-primary"
            >
              <LogOut size={12} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Fine Food Show <span className="text-gradient">enquiries</span>
        </h1>
        <p className="mt-1.5 text-[13.5px] text-muted">
          Everything submitted from the stand&apos;s QR page and the website.
        </p>

        {/* ginti */}
        {stats && (
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
            <Tile label="Total leads" value={stats.total} accent />
            <Tile label="Today" value={stats.today} />
            <Tile label="Last 7 days" value={stats.week} />
            <Tile label="With details" value={stats.withDetails} />
            <Tile
              label="Failed emails"
              value={stats.failedEmails}
              warn={stats.failedEmails > 0}
            />
          </div>
        )}

        {/* auzaar */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <label className="relative min-w-0 flex-1 sm:max-w-xs">
            <span className="sr-only">Search leads</span>
            <Search
              size={14}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, company…"
              className="w-full rounded-xl border border-line bg-card py-2.5 pr-3 pl-9 text-[13px] outline-none transition-colors focus:border-primary"
            />
          </label>

          <button
            onClick={() => load(search)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-3.5 py-2.5 text-[12.5px] font-medium transition-colors hover:border-primary disabled:opacity-60"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-3.5 py-2.5 text-[12.5px] font-medium transition-colors hover:border-primary"
          >
            <Download size={13} />
            CSV
          </button>
        </div>

        {/* paighaam */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-[13px] leading-snug text-red-600 dark:text-red-400"
            >
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span className="flex-1">{error}</span>
              <button onClick={() => setError(null)} aria-label="Dismiss">
                <X size={14} />
              </button>
            </motion.p>
          )}

          {notice && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-xl border border-secondary/25 bg-secondary/10 px-4 py-2.5 text-[13px] text-secondary"
            >
              {notice}
            </motion.p>
          )}
        </AnimatePresence>

        {/* leads */}
        <p className="mt-6 mb-3 text-[11px] font-bold tracking-[0.12em] text-muted uppercase">
          {leads.length} {leads.length === 1 ? "enquiry" : "enquiries"}
          {search && " matching"}
        </p>

        {leads.length === 0 && !loading ? (
          <div className="rounded-2xl border border-dashed border-line px-6 py-14 text-center">
            <Inbox size={24} className="mx-auto text-muted opacity-60" />
            <p className="mt-3 text-[14px] font-semibold">
              {search ? "Nothing matches that search" : "No enquiries yet"}
            </p>
            <p className="mt-1 text-[12.5px] text-muted">
              {search
                ? "Try a name, email or company."
                : "They'll appear here as soon as someone submits the form."}
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            <AnimatePresence initial={false}>
              {leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onDeleted={(id) => {
                    setLeads((rows) => rows.filter((r) => r.id !== id));
                    setNotice(`Enquiry #${id} deleted.`);
                    setTimeout(() => setNotice(null), 3000);

                    /* Sirf `total` ghatana kaafi nahi — "Today", "Last 7
                       days" aur "With details" bhi badal sakte hain, is
                       liye ginti server se dobara mangwate hain. */
                    fetchStats()
                      .then(setStats)
                      .catch(() => {
                        /* ginti purani reh gayi to koi harj nahi */
                      });
                  }}
                  onSessionLost={(message) => {
                    setPhase("out");
                    setError(message);
                  }}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </main>
  );
}

function Tile({
  label,
  value,
  accent,
  warn,
}: {
  label: string;
  value: number;
  accent?: boolean;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        warn
          ? "border-red-500/30 bg-red-500/[0.07]"
          : accent
            ? "border-transparent bg-gradient-to-br from-primary/12 to-secondary/12"
            : "border-line bg-card"
      }`}
    >
      <p
        className={`font-heading text-2xl font-bold ${
          warn ? "text-red-600 dark:text-red-400" : ""
        }`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[10px] font-bold tracking-[0.1em] text-muted uppercase">
        {label}
      </p>
    </div>
  );
}
