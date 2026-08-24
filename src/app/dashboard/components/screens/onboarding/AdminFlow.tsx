"use client";

import { LABEL, OB_FIELD, QA_INPUT } from "./shared";

export function AdminDetails({
  instName,
  onChangeInstName,
  contactName,
  onChangeContactName,
  instPhone,
  onChangeInstPhone,
  instSize,
  onChangeInstSize,
}: {
  instName: string;
  onChangeInstName: (v: string) => void;
  contactName: string;
  onChangeContactName: (v: string) => void;
  instPhone: string;
  onChangeInstPhone: (v: string) => void;
  instSize: string;
  onChangeInstSize: (v: string) => void;
}) {
  return (
    <div id="obFieldsSchool">
      <div className={OB_FIELD}>
        <label className={LABEL}>Institution name</label>
        <input
          type="text"
          className={QA_INPUT}
          id="obInstName"
          placeholder="Corona Secondary School"
          value={instName}
          onChange={(e) => onChangeInstName(e.target.value)}
        />
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>Contact person</label>
        <input
          type="text"
          className={QA_INPUT}
          id="obContactName"
          placeholder="Full name"
          value={contactName}
          onChange={(e) => onChangeContactName(e.target.value)}
        />
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>
          Phone number <span className="font-normal text-ash">(optional)</span>
        </label>
        <input
          type="tel"
          className={QA_INPUT}
          id="obInstPhone"
          placeholder="080X XXX XXXX"
          value={instPhone}
          onChange={(e) => onChangeInstPhone(e.target.value)}
        />
      </div>
      <div className={OB_FIELD}>
        <label className={LABEL}>Estimated number of students</label>
        <input
          type="number"
          className={QA_INPUT}
          id="obInstSize"
          placeholder="e.g. 250"
          value={instSize}
          onChange={(e) => onChangeInstSize(e.target.value)}
        />
      </div>
    </div>
  );
}