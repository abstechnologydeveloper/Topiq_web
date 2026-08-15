import type { Metadata } from "next";
import TeachersPage from "./components/TeachersPage";

export const metadata: Metadata = {
  title: "Teachers",
  description:
    "Track a class, set assignments, and watch completion update live. Free for one class — no admin sign-off needed.",
  openGraph: {
    title: "AbSTopiq for Teachers",
    description:
      "Track a class, set assignments, and watch completion update live. Free for one class — no admin sign-off needed.",
  },
  alternates: {
    canonical: "https://www.abstopiq.com/teachers",
  },
};

export default function TeachersRoute() {
  return <TeachersPage />;
}