"use client";

import { useDashboard } from "../components/DashboardContext";
import PracticeSession from "../components/screens/PracticeSession";
import ComingSoon from "../components/screens/ComingSoon";

export default function PracticeSessionPage() {
  const { subjects, sessionCfg, openSubject, exitSession } = useDashboard();
  if (!sessionCfg) {
    return <ComingSoon eyebrow="Practice" title="No active session" sub="" />;
  }
  return (
    <PracticeSession
      cfg={sessionCfg}
      subjects={subjects}
      openSubject={openSubject}
      onExit={exitSession}
    />
  );
}