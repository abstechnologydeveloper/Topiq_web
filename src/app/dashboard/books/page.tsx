"use client";

import { useDashboard } from "../components/DashboardContext";
import BooksScreen from "../components/screens/BooksScreen";

export default function BooksPage() {
  const { subjects, openSubject } = useDashboard();
  return <BooksScreen subjects={subjects} openSubject={openSubject} />;
}