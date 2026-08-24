"use client";

import { useDashboard } from "../components/DashboardContext";
import CompetitionsScreen from "../components/screens/CompetitionsScreen";

export default function CompetitionsPage() {
  const { subjects, goTab, startSession } = useDashboard();
  return (
    <CompetitionsScreen subjects={subjects} goTab={goTab} startSession={startSession} />
  );
}