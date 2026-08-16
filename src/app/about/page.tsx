import type { Metadata } from "next";
import AboutPage from "./components/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AbSTopiq's mission to transform Nigerian education with AI-powered learning, practice, and school management tools.",
  openGraph: {
    title: "About AbSTopiq",
    description:
      "Learn about AbSTopiq's mission to transform Nigerian education with AI-powered learning, practice, and school management tools.",
  },
  alternates: {
    canonical: "https://www.abstopiq.com/about",
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}