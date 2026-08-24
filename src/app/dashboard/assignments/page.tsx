"use client";

import { useDashboard } from "../components/DashboardContext";
import AssignmentScreen from "../components/screens/AssignmentScreen";
import TeacherAssignmentsScreen from "../components/screens/TeacherAssignmentsScreen";

export default function AssignmentsPage() {
  const { subjects, appMode } = useDashboard();
  if (appMode === "teacher") return <TeacherAssignmentsScreen />;
  return <AssignmentScreen subjects={subjects} />;
}