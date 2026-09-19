import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY_POLICY } from "@/lib/legal/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | NextBite",
  description:
    "How NextBite Brands collects, uses, stores and protects personal information when you visit nextbite.com.au or contact our team.",
};

export default function Page() {
  return <LegalPage doc={PRIVACY_POLICY} path="/privacy-policy" />;
}
