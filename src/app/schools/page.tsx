import type { Metadata } from "next";
import SchoolsPage from "./components/SchoolsPage";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "One invoice covers every student. Full Plus experience with Sabi AI, audio lessons, and full mocks — free at the point of use.",
  openGraph: {
    title: "AbSTopiq for Schools",
    description:
      "One invoice covers every student. Full Plus experience with Sabi AI, audio lessons, and full mocks — free at the point of use.",
  },
  alternates: {
    canonical: "https://www.abstopiq.com/schools",
  },
};

export default function SchoolsRoute() {
  return <SchoolsPage />;
}