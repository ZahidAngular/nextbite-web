/* ═══════════════════════════════════════════════════════════════
   ADMIN API CLIENT

   Yeh safha static export hai — Firebase par sirf HTML/JS parti
   hai, koi server nahi. Is liye password yahan rakha hi nahi ja
   sakta: har jaanch .NET API par hoti hai, aur yahan sirf uska
   diya hua token rehta hai.

   Token sessionStorage mein hai, localStorage mein nahi — tab
   band hote hi session khatam. Show ke laptop par yeh mehfooz
   tareeqa hai.
   ═══════════════════════════════════════════════════════════════ */

const TOKEN_KEY = "nextbite.admin.token";

/**
 * Admin ka pata enquiry endpoint se hi nikal aata hai —
 * `…/api/enquiries` → `…/api/admin`. Alag se set karna ho to
 * NEXT_PUBLIC_ADMIN_ENDPOINT rakh do.
 */
export function adminBase(): string {
  const explicit = process.env.NEXT_PUBLIC_ADMIN_ENDPOINT?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const enquiry = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim();
  if (enquiry && /\/api\/enquiries\/?$/.test(enquiry)) {
    return enquiry.replace(/\/+$/, "").replace(/\/api\/enquiries$/, "/api/admin");
  }

  return "";
}

/* ── types ─────────────────────────────────────────────────────── */

export type EmailStatus = "Pending" | "Sent" | "Failed" | "Skipped";

export type EmailAttempt = {
  id: number;
  to: string;
  subject: string;
  status: EmailStatus;
  error: string | null;
  createdAtUtc: string;
  sentAtUtc: string | null;
};

export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string | null;
  company: string | null;
  message: string | null;
  source: string;
  attachmentFileName: string | null;
  attachmentContentType: string | null;
  attachmentSizeBytes: number | null;
  hasAttachment: boolean;
  receivedAtUtc: string;
  detailsAddedAtUtc: string | null;
  acknowledgementSent: boolean;
  notificationSent: boolean;
  emails: EmailAttempt[];
};

export type Stats = {
  total: number;
  today: number;
  week: number;
  withDetails: number;
  withAttachment: number;
  acknowledged: number;
  failedEmails: number;
};

/** Session khatam ho gaya — bulane wale ko login par bhejna hai. */
export class SessionExpired extends Error {
  constructor() {
    super("Your session has expired. Please sign in again.");
    this.name = "SessionExpired";
  }
}

/* ── token ─────────────────────────────────────────────────────── */

export function readToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;   /* private mode / storage band */
  }
}

export function writeToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.sessionStorage.setItem(TOKEN_KEY, token);
    else window.sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* na likh sake to bhi chalta rahe — sirf refresh par logout hoga */
  }
}

/* ── requests ──────────────────────────────────────────────────── */

/**
 * API tak pahunch hi na ho to fetch `TypeError` phenkta hai — usay
 * ek saaf paighaam mein badal dete hain, warna user ko "Failed to
 * fetch" dikhta hai jo kuch nahi batata.
 */
async function call(
  path: string,
  init: RequestInit = {},
  token?: string | null,
  /* Login par 401 ka matlab "ghalat password" hai, "session khatam"
     nahi — wahan se yeh false aata hai taake jawab khud parkha ja sake. */
  expireOn401 = true
): Promise<Response> {
  const base = adminBase();
  if (!base) {
    throw new Error("The admin API address isn't configured for this build.");
  }

  const headers = new Headers(init.headers);
  const auth = token ?? readToken();
  if (auth) headers.set("Authorization", `Bearer ${auth}`);

  let res: Response;
  try {
    res = await fetch(`${base}${path}`, { ...init, headers });
  } catch {
    throw new Error(
      "Couldn't reach the API. Check that it's running and that this site is allowed by CORS."
    );
  }

  if (res.status === 401 && expireOn401) {
    writeToken(null);
    throw new SessionExpired();
  }

  return res;
}

async function json<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      (data as { message?: string } | null)?.message ??
      `The server returned ${res.status}.`;
    throw new Error(message);
  }

  return data as T;
}

/* ── endpoints ─────────────────────────────────────────────────── */

export async function login(email: string, password: string) {
  const res = await call(
    "/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
    null,
    false
  );

  const data = await res.json().catch(() => null);
  const body = data as { ok?: boolean; token?: string; email?: string; message?: string } | null;

  if (!res.ok || !body?.ok || !body.token) {
    throw new Error(body?.message ?? "Sign-in failed. Please try again.");
  }

  writeToken(body.token);
  return { token: body.token, email: body.email ?? email };
}

export async function checkSession(token: string) {
  const data = await json<{ email?: string }>(
    await call("/session", { method: "GET" }, token)
  );
  return data.email ?? "";
}

export async function fetchLeads(search: string): Promise<Lead[]> {
  const query = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : "";
  return json<Lead[]>(await call(`/enquiries${query}`));
}

export async function fetchStats(): Promise<Stats> {
  return json<Stats>(await call("/stats"));
}

export async function deleteLead(id: number, deletePassword: string) {
  const res = await call(`/enquiries/${id}`, {
    method: "DELETE",
    headers: { "X-Delete-Password": deletePassword },
  });

  return json<{ ok: boolean; message?: string }>(res);
}

/**
 * CSV aur attachment dono ko token chahiye, aur `<a download>` header
 * nahi bhej sakta — is liye fetch se blob laa kar khud download
 * karwate hain.
 */
async function saveBlob(path: string, fallbackName: string) {
  const res = await call(path);
  if (!res.ok) {
    await json(res);   /* yahan se error uthega */
    return;
  }

  const disposition = res.headers.get("Content-Disposition") ?? "";
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition);
  const name = match ? decodeURIComponent(match[1]) : fallbackName;

  const url = URL.createObjectURL(await res.blob());
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function downloadCsv() {
  await saveBlob("/export.csv", "nextbite-leads.csv");
}

export async function downloadAttachment(lead: Lead) {
  await saveBlob(
    `/enquiries/${lead.id}/attachment`,
    lead.attachmentFileName ?? `enquiry-${lead.id}`
  );
}
