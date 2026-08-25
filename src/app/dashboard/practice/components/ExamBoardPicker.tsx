"use client";

import { SUBNAV, SUBNAV_BTN, SUBNAV_BTN_ACTIVE, SUBNAV_BTN_INACTIVE } from "./constants";

export default function ExamBoardPicker({
  pane,
  onPane,
}: {
  pane: "nigeria" | "intl" | "bysubject";
  onPane: (p: "nigeria" | "intl" | "bysubject") => void;
}) {
  const btn = (name: "nigeria" | "intl" | "bysubject", label: string) => (
    <button
      key={name}
      className={`${SUBNAV_BTN} ${pane === name ? SUBNAV_BTN_ACTIVE : SUBNAV_BTN_INACTIVE}`}
      onClick={() => onPane(name)}
    >
      {label}
    </button>
  );
  return (
    <div className={SUBNAV}>
      {btn("nigeria", "Nigerian Boards")}
      {btn("intl", "International")}
      {btn("bysubject", "By Subject")}
    </div>
  );
}