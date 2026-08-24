"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useDashboard } from "../components/DashboardContext";
import PracticeHub from "../components/screens/PracticeHub";

function PracticeContent() {
  const { subjects, participated, startSession } = useDashboard();
  const params = useSearchParams();
  const setupSubject = params.get("setup");
  return (
    <PracticeHub
      subjects={subjects}
      participated={participated}
      onStartSession={startSession}
      initialSetupSubject={setupSubject}
    />
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={null}>
      <PracticeContent />
    </Suspense>
  );
}