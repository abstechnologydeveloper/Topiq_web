"use client";

type Props = {
  eyebrow?: string;
  title: string;
  sub?: string;
};

export default function ComingSoon({ eyebrow = "", title, sub = "" }: Props) {
  return (
    <section className="screen active">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h1 className="page-title">{title}</h1>
      {sub ? <p className="page-sub">{sub}</p> : null}
    </section>
  );
}