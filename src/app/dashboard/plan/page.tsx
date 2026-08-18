"use client";

import { useDashboard } from "../components/DashboardContext";
import WorkspaceScreen from "../components/screens/WorkspaceScreen";

export default function PlanPage() {
  const { subjects } = useDashboard();
  return <WorkspaceScreen subjects={subjects} />;
}