import QRCode from "qrcode";

/* ═══════════════════════════════════════════════════════════════
   STAND QR

   Stand par screen dikh rahi hoti hai — visitor apne phone se QR
   scan karta hai aur seedha enquiry form khul jata hai. Is liye
   QR ko absolute URL chahiye.

   Domain `NEXT_PUBLIC_SITE_URL` se aata hai. Deploy karte waqt
   ise zaroor set karo (e.g. https://nextbite.com.au), warna QR
   default domain par point karega.
   ═══════════════════════════════════════════════════════════════ */

const FALLBACK_ORIGIN = "https://nextbite.com.au";

export function siteOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_ORIGIN;
  return raw.replace(/\/+$/, "");
}

export function enquiryUrl() {
  return `${siteOrigin()}/fine-food-show/enquiry`;
}

/**
 * QR ko SVG string ke taur par banata hai — build time par ek dafa,
 * koi runtime cost nahi aur koi external request bhi nahi.
 *
 * errorCorrectionLevel "Q" (25%) is liye ke stand par screen par
 * roshni/angle se thora hissa kharab ho jaye to bhi scan ho jaye.
 */
export async function enquiryQrSvg() {
  return QRCode.toString(enquiryUrl(), {
    type: "svg",
    errorCorrectionLevel: "Q",
    margin: 1,
    width: 512,
    color: { dark: "#0e1a0cff", light: "#ffffffff" },
  });
}
