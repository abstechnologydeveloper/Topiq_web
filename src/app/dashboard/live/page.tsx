"use client";

import { useDashboard } from "../components/DashboardContext";
import LiveClassScreen from "./components/LiveClassScreen";

export default function LivePage() {
  const { subjects, student, startSession } = useDashboard();
  return <LiveClassScreen subjects={subjects} student={student} startSession={startSession} />;
}