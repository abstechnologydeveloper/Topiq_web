export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-surface-900">Dashboard</h1>
      <p className="mt-2 text-surface-500">Your learning at a glance.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-surface-50 p-5 shadow-sm">
          <p className="text-sm text-surface-500">Questions answered</p>
          <p className="mt-1 text-2xl font-bold text-surface-900">247</p>
        </div>
        <div className="rounded-xl border bg-surface-50 p-5 shadow-sm">
          <p className="text-sm text-surface-500">Topics mastered</p>
          <p className="mt-1 text-2xl font-bold text-surface-900">12</p>
        </div>
        <div className="rounded-xl border bg-surface-50 p-5 shadow-sm">
          <p className="text-sm text-surface-500">Current streak</p>
          <p className="mt-1 text-2xl font-bold text-surface-900">5 days</p>
        </div>
      </div>
    </div>
  )
}