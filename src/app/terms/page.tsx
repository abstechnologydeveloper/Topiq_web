import type { Metadata } from "next";
import TermsPage from "./components/TermsPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "AbSTopiq's terms of service — the rules and guidelines for using our platform.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.abstopiq.com/terms",
  },
};

export default function TermsRoute() {
  return <TermsPage />;
}