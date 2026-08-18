"use client";

import { useDashboard } from "../components/DashboardContext";
import AssignmentScreen from "../components/screens/AssignmentScreen";

export default function AssignmentsPage() {
  const { subjects } = useDashboard();
  return <AssignmentScreen subjects={subjects} />;
}