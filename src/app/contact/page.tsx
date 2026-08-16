import type { Metadata } from "next";
import ContactPage from "./components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the AbSTopiq team. We'd love to hear from schools, teachers, and partners.",
  openGraph: {
    title: "Contact AbSTopiq",
    description:
      "Get in touch with the AbSTopiq team. We'd love to hear from schools, teachers, and partners.",
  },
  alternates: {
    canonical: "https://www.abstopiq.com/contact",
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}