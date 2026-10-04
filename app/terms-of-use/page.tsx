import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS_OF_USE } from "@/lib/legal/terms-of-use";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use | NextBite",
  description:
    "The terms that apply to your access to and use of the NextBite website at nextbite.com.au and its content, pages and functionality.",
  path: "/terms-of-use",
});

export default function Page() {
  return <LegalPage doc={TERMS_OF_USE} path="/terms-of-use" />;
}
