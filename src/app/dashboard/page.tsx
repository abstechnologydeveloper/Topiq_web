"use client";

import { useDashboard } from "./components/DashboardContext";
import DiscoverScreen from "./components/screens/DiscoverScreen";

export default function DiscoverPage() {
  const { subjects, student, goTab, openSubject } = useDashboard();
  return (
    <DiscoverScreen
      subjects={subjects}
      student={student}
      goTab={goTab}
      openSubject={openSubject}
    />
  );
}