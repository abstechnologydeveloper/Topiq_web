"use client";

import { useParams } from "next/navigation";
import { useDashboard } from "../../components/DashboardContext";
import SubjectHub from "../../components/screens/SubjectHub";
import ComingSoon from "../../components/screens/ComingSoon";

export default function SubjectHubPage() {
  const { subjects, student, goTab, handleTopicDone, requestedPane } = useDashboard();
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params.id || "biology");

  if (!subjects[id]) {
    return <ComingSoon eyebrow="Subject" title="No subject found" sub="" />;
  }

  return (
    <SubjectHub
      subjectId={id}
      subjects={subjects}
      student={student}
      goTab={goTab}
      onDone={handleTopicDone}
      initialPane={requestedPane}
    />
  );
}