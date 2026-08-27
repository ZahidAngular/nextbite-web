import { randomUUID } from "node:crypto";
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";
import {
  hasErrors,
  validateAttachment,
  validateEnquiry,
  type EnquiryFields,
  type FieldErrors,
} from "@/lib/enquiry";

/* ═══════════════════════════════════════════════════════════════
   ENQUIRY INTAKE  —  POST /api/enquiry

   Har enquiry do jagah ja sakti hai:

   1. DISK  (hamesha)  →  .data/enquiries/enquiries.jsonl
      aur attachment   →  .data/enquiries/files/
      Yeh normal Node server (VPS, Docker, `next start`) par chalta hai.
      ⚠ Vercel jaisi serverless hosting par disk temporary hai —
        wahan ENQUIRY_WEBHOOK_URL zaroor set karo.

   2. WEBHOOK (agar ENQUIRY_WEBHOOK_URL set ho)
      Enquiry ka JSON us URL par POST hota hai. Zapier / Make /
      Slack / n8n — jahan se aap ise email par bhej sakte ho.

   Response 200 sirf tab milta hai jab kam se kam ek jagah
   enquiry mehfooz ho gayi ho. Warna 500 — taake koi lead
   khamoshi se zaya na ho.
   ═══════════════════════════════════════════════════════════════ */

/* `dynamic = "force-dynamic"` yahan jaan boojh kar nahi hai:
   POST route waise bhi cache nahi hota, aur uski maujoodgi
   `output: "export"` wali static build ko tor deti hai. */
export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), ".data", "enquiries");
const LOG_FILE = path.join(DATA_DIR, "enquiries.jsonl");
const FILES_DIR = path.join(DATA_DIR, "files");

type StoredEnquiry = EnquiryFields & {
  id: string;
  receivedAt: string;
  source: string;
  attachment?: { originalName: string; storedAs: string; size: number; type: string };
};

function str(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/** file name ko safe banao — path traversal aur ajeeb characters se bacho */
function safeFileName(name: string) {
  const base = path.basename(name).replace(/[^\w.\- ]+/g, "_").slice(-120);
  return base || "attachment";
}

async function saveToDisk(
  enquiry: StoredEnquiry,
  attachment: File | null
): Promise<boolean> {
  try {
    await mkdir(FILES_DIR, { recursive: true });

    if (attachment && enquiry.attachment) {
      const bytes = Buffer.from(await attachment.arrayBuffer());
      await writeFile(path.join(FILES_DIR, enquiry.attachment.storedAs), bytes);
    }

    await appendFile(LOG_FILE, JSON.stringify(enquiry) + "\n", "utf8");
    return true;
  } catch (error) {
    console.error("[enquiry] disk write failed:", error);
    return false;
  }
}

async function sendToWebhook(enquiry: StoredEnquiry): Promise<boolean> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[enquiry] webhook responded ${res.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[enquiry] webhook failed:", error);
    return false;
  }
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json(
      { ok: false, message: "We couldn't read that submission. Please try again." },
      { status: 400 }
    );
  }

  const fields: EnquiryFields = {
    name: str(form.get("name")),
    email: str(form.get("email")),
    phone: str(form.get("phone")),
    area: str(form.get("area")),
    company: str(form.get("company")),
    message: str(form.get("message")),
  };

  /* client par bhi validate hota hai, par bharosa server par hi */
  const errors: FieldErrors = validateEnquiry(fields);

  const raw = form.get("attachment");
  const attachment = raw instanceof File && raw.size > 0 ? raw : null;

  if (attachment) {
    const problem = validateAttachment({
      size: attachment.size,
      type: attachment.type,
      name: attachment.name,
    });
    if (problem) errors.attachment = problem;
  }

  if (hasErrors(errors)) {
    return Response.json(
      { ok: false, errors, message: "Please check the highlighted fields." },
      { status: 422 }
    );
  }

  const id = randomUUID();
  const enquiry: StoredEnquiry = {
    ...fields,
    id,
    receivedAt: new Date().toISOString(),
    source: str(form.get("source")) || "web",
    ...(attachment
      ? {
          attachment: {
            originalName: attachment.name,
            storedAs: `${id}-${safeFileName(attachment.name)}`,
            size: attachment.size,
            type: attachment.type || "application/octet-stream",
          },
        }
      : {}),
  };

  const [disk, webhook] = await Promise.all([
    saveToDisk(enquiry, attachment),
    sendToWebhook(enquiry),
  ]);

  if (!disk && !webhook) {
    /* Aakhri sahara: enquiry ko server log mein likh do. Vercel jaisi
       serverless hosting par filesystem read-only hai, is liye disk
       hamesha nakaam hoti hai — bina webhook ke lead sirf yahin se
       mil sakti hai. Isay logs se nikaala ja sakta hai. */
    console.error(
      "[enquiry] NOT PERSISTED — set ENQUIRY_WEBHOOK_URL. Payload:",
      JSON.stringify(enquiry)
    );

    /* user ko sach batao, taake woh email/phone se raabta kar sake */
    return Response.json(
      {
        ok: false,
        message:
          "Sorry — we couldn't record your enquiry. Please email travis@nextbite.com.au and we'll pick it up straight away.",
      },
      { status: 500 }
    );
  }

  console.log(
    `[enquiry] ${id} from ${enquiry.email} — disk:${disk} webhook:${webhook}`
  );

  return Response.json({ ok: true, id });
}
