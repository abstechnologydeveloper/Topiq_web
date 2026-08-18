"use client";

import { useDashboard } from "../components/DashboardContext";
import ProgressScreen from "../components/screens/ProgressScreen";

export default function ProgressPage() {
  const { subjects, goTab } = useDashboard();
  return <ProgressScreen subjects={subjects} goTab={goTab} />;
}