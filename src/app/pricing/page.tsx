import type { Metadata } from "next";
import PricingPage from "./components/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Affordable plans for schools and individual teachers. One invoice for schools, free forever for your first class as a teacher.",
  openGraph: {
    title: "Pricing — AbSTopiq",
    description:
      "Affordable plans for schools and individual teachers. One invoice for schools, free forever for your first class as a teacher.",
  },
  alternates: {
    canonical: "https://www.abstopiq.com/pricing",
  },
};

export default function PricingRoute() {
  return <PricingPage />;
}