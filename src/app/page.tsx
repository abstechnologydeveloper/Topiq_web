'use client'

import Link from 'next/link'
import { SUBJECTS, STATS, TOPICS } from '@/lib/data'

export default function Home() {
  const weak = TOPICS.filter(t => t.masteryScore < 60).sort((a, b) => a.masteryScore - b.masteryScore).slice(0, 4)
  const avgMastery = Math.round(SUBJECTS.reduce((a, s) => a + s.masteryScore, 0) / SUBJECTS.length)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-surface-900">Topiq</h1>
        <Link href="/progress" className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-bold text-orange-800">
          🔥 {STATS.streak}d streak
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 rounded-xl border bg-surface-50 px-3 py-2.5 flex items-center gap-2">
          <span className="text-lg font-extrabold text-surface-900">{STATS.answered}</span>
          <span className="text-xs text-surface-400">questions</span>
        </div>
        <div className="flex-1 rounded-xl border bg-surface-50 px-3 py-2.5 flex items-center gap-2">
          <span className="text-lg font-extrabold text-surface-900">{avgMastery}%</span>
          <span className="text-xs text-surface-400">avg. mastery</span>
        </div>
      </div>

      <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-5 mb-6">
        <div className="flex items-center gap-1.5 mb-1">
          <svg className="w-4 h-4 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Every subject, every board</span>
        </div>
        <h2 className="text-lg font-bold text-surface-900">What do you want to master?</h2>
        <p className="text-xs text-surface-500 mt-0.5 mb-3">Search any topic — Topiq finds it whether it&apos;s on WAEC, JAMB, NECO, GCE or IGCSE.</p>
        <input
          type="text"
          placeholder='Search &quot;photosynthesis&quot;, &quot;simultaneous equations&quot;...'
          className="w-full rounded-xl border bg-surface-50 px-4 py-2.5 text-sm outline-none focus:border-brand-400"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              const v = (e.target as HTMLInputElement).value.toLowerCase()
              for (const s of SUBJECTS) { if (s.name.toLowerCase().includes(v)) { window.location.href = '/subjects/' + s.id; return } }
              window.location.href = '/subjects'
            }
          }}
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          {['Photosynthesis', 'Simultaneous equations', "Newton's laws", 'Supply & demand', 'Mole concept'].map(c => (
            <Link key={c} href="/subjects" className="px-2.5 py-1 rounded-full bg-surface-50 border text-xs font-medium text-surface-600 hover:border-brand-300 hover:text-brand-600">{c}</Link>
          ))}
        </div>
      </div>

      <section className="mb-6">
        <div className="mb-2">
          <h2 className="text-base font-bold text-surface-900">Today&apos;s plan</h2>
          <p className="text-xs text-surface-400">built from your weakest topics</p>
        </div>
        <div className="space-y-2">
          {weak.map((t) => {
            const subj = SUBJECTS.find(s => s.id === t.subjectId)
            return (
              <Link key={t.id} href={`/subjects/${t.subjectId}`} className="flex items-center gap-3 rounded-xl border bg-surface-50 p-3 hover:border-brand-300 transition">
                <span className="text-lg">{subj?.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-900">{t.name}</p>
                  <p className="text-xs text-surface-400">{subj?.name} · practice</p>
                </div>
                <span className="text-xs text-surface-400">{t.masteryScore}% mastery</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-base font-bold text-surface-900 mb-2">Continue where you left off</h2>
        <Link href={`/subjects/${SUBJECTS[0].id}`} className="flex items-center gap-3 rounded-xl border bg-surface-50 p-3.5 hover:border-brand-300 transition">
          <svg className="w-5 h-5 text-surface-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span className="flex-1 text-sm font-semibold text-surface-900">{SUBJECTS[0].icon} {SUBJECTS[0].name} — Photosynthesis</span>
          <span className="text-sm font-semibold text-brand-600">Resume</span>
        </Link>
      </section>

      <section>
        <h2 className="text-base font-bold text-surface-900 mb-2">Trending this week</h2>
        <div className="space-y-2">
          {[
            { s: SUBJECTS.find(s => s.id === 'mathematics'), topic: 'Simultaneous equations', meta: 'JAMB · 3,204 students' },
            { s: SUBJECTS.find(s => s.id === 'physics'), topic: "Newton's laws of motion", meta: 'WAEC · 2,880 students' },
            { s: SUBJECTS.find(s => s.id === 'chemistry'), topic: 'The mole concept', meta: 'NECO · 2,410 students' },
          ].map((t, i) => (
            <Link key={i} href={`/subjects/${t.s!.id}`} className="flex items-center gap-3 rounded-xl border bg-surface-50 p-3 hover:border-brand-300 transition">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: t.s!.colorHex + '18' }}>{t.s!.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-surface-900">{t.topic}</p>
                <p className="text-xs text-surface-400">{t.meta} this week</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}