"use client";

import { useParams } from "next/navigation";
import { useDashboard } from "../../components/DashboardContext";
import BookDetail from "../../components/screens/BookDetail";

export default function BookDetailPage() {
  const params = useParams<{ title: string }>();
  const { subjects } = useDashboard();
  const title = decodeURIComponent(params.title || "");
  return <BookDetail title={title} subjects={subjects} />;
}