import type { Metadata } from "next";
import HomePage from "./components/HomePage";

export const metadata: Metadata = {
  title: "AbSTopiq — Learn It. Practice It. Sabi It.",
  description:
    "Every subject, grounded in your syllabus. Lessons, practice and Sabi AI that cites its sources. Free for your first class.",
  openGraph: {
    title: "AbSTopiq — Learn It. Practice It. Sabi It.",
    description:
      "Every subject, grounded in your syllabus. Lessons, practice and Sabi AI that cites its sources.",
  },
  alternates: {
    canonical: "https://www.abstopiq.com",
  },
};

export default function Home() {
  return <HomePage />;
}