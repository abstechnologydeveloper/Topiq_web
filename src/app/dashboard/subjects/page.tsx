"use client";

import { useDashboard } from "../components/DashboardContext";
import SubjectsScreen from "./components/SubjectsScreen";

export default function SubjectsPage() {
  const { subjects, student, openSubject } = useDashboard();
  return <SubjectsScreen subjects={subjects} student={student} openSubject={openSubject} />;
}