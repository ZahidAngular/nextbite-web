import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { DISCLAIMER } from "@/lib/legal/disclaimer";

export const metadata: Metadata = {
  title: "Disclaimer | NextBite",
  description:
    "Information on the NextBite website is provided for general informational and business purposes only.",
};

export default function Page() {
  return <LegalPage doc={DISCLAIMER} path="/disclaimer" />;
}
