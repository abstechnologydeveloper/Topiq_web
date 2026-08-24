import type { Metadata } from "next";
import PrivacyPage from "./components/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AbSTopiq's privacy policy — how we collect, use, and protect your data.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.abstopiq.com/privacy",
  },
};

export default function PrivacyRoute() {
  return <PrivacyPage />;
}