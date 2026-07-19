import Link from 'next/link'

export default async function TopicPage({ params }: { params: Promise<{ subject: string; topic: string }> }) {
  const { subject, topic } = await params

  return (
    <div>
      <Link href={`/subjects/${subject}`} className="text-sm text-brand-600 hover:underline">
        &larr; Back to {subject}
      </Link>
      <div className="mt-6">
        <h1 className="text-3xl font-bold capitalize text-surface-900">
          {topic.replace(/-/g, ' ')}
        </h1>
        <p className="mt-2 text-surface-500">Concept explainer and practice questions go here.</p>
      </div>

      <section className="mt-8 rounded-xl border bg-surface-50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-surface-900">Concept Explainer</h2>
        <p className="mt-2 text-surface-600">A short, clear explanation of this topic — video, text, and voice narration available.</p>
        <div className="mt-4 h-40 rounded-lg bg-surface-100 flex items-center justify-center text-surface-400 text-sm">
          Explainer content placeholder
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-surface-900">Practice Questions</h2>
        <p className="mt-1 text-sm text-surface-500">Questions move from foundational to advanced inside this topic.</p>
        <div className="mt-4 rounded-xl border bg-surface-50 p-6 shadow-sm">
          <p className="text-sm text-surface-400">Question 1 of 150 — foundational difficulty</p>
          <p className="mt-2 text-surface-900 font-medium">What is the primary function of this concept in the broader subject?</p>
          <div className="mt-4 flex gap-3">
            {['Option A', 'Option B', 'Option C', 'Option D'].map((opt) => (
              <button key={opt} className="rounded-lg border px-4 py-2 text-sm font-medium text-surface-700 hover:bg-brand-50 hover:border-brand-300 transition">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}