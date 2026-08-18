"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ASSIGNMENTS, CLASSES } from "../../data";
import { useDashboard } from "../DashboardContext";
import type { SubjectData } from "./DiscoverScreen";
import { BackChevron } from "./shared";

type Props = {
  subjects: Record<string, SubjectData>;
};

type AssignItem = {
  id: number;
  title: string;
  classId: string;
  subject: string;
  due: string;
  complete: number;
};

export default function AssignmentScreen({ subjects }: Props) {
  const router = useRouter();
  const { assignDone, markAssignDone } = useDashboard();

  const rows = useMemo(
    () =>
      (ASSIGNMENTS as AssignItem[]).map((a) => {
        const c = CLASSES.find((x) => x.id === a.classId);
        const s = subjects[a.subject];
        return { ...a, className: c ? c.name : "", subjectData: s };
      }),
    [subjects],
  );

  const startAssignment = (a: AssignItem) => {
    markAssignDone(a.id);
    router.push(`/dashboard/practice?setup=${a.subject}`);
  };

  return (
    <section className="screen active" id="screen-studentassign">
      <div className="back-row" onClick={() => router.push("/dashboard")}>
        <BackChevron /> Discover
      </div>
      <span className="eyebrow">From your teachers</span>
      <h1 className="page-title">Assignments</h1>
      <p className="page-sub">Work your teachers have set for your classes — do it here and it feeds straight back to them.</p>
      <div id="studentAssignList">
        {rows.map((a) => {
          const isDone = !!assignDone[a.id];
          return (
            <div className="assign-card" key={a.id}>
              <div className="assign-top">
                <div className="assign-title">{a.subjectData ? a.subjectData.icon : ""} {a.title}</div>
                <div className="assign-due">{a.due}</div>
              </div>
              <div className="assign-meta" style={{ marginBottom: 10 }}>{a.className} · set by your teacher</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className={`sa-status ${isDone ? "done" : "pending"}`}>{isDone ? "✓ Submitted" : "Pending"}</span>
                <button className="sa-cta" onClick={() => startAssignment(a)}>{isDone ? "Review again →" : "Start →"}</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}