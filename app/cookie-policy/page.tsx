import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COOKIE_POLICY } from "@/lib/legal/cookie-policy";

export const metadata: Metadata = {
  title: "Cookie Policy | NextBite",
  description:
    "How NextBite uses cookies and similar technologies, including analytics and Google Tag Manager, on nextbite.com.au.",
};

export default function Page() {
  return <LegalPage doc={COOKIE_POLICY} path="/cookie-policy" />;
}
