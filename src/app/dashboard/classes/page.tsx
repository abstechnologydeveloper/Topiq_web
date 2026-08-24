"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TeacherClassesScreen from "../components/screens/TeacherClassesScreen";

function ClassesContent() {
  const searchParams = useSearchParams();
  const classParam = searchParams.get("class");
  return <TeacherClassesScreen initialClassId={classParam} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ClassesContent />
    </Suspense>
  );
}