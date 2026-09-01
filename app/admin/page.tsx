import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

/* Search engines se door — yeh safha sirf team ke liye hai.
   Asal pehra API par hai, yeh sirf shaistagi hai. */
export const metadata: Metadata = {
  title: "Leads — NextBite Admin",
  description: "Fine Food Show enquiries.",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
