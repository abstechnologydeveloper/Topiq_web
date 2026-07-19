'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth/store'
import { StepIndicator } from './components/step-indicator'
import { PillButton } from './components/pill-button'

const GRADES = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3', '100L', '200L', '300L', '400L', '500L']
const BOARDS = ['None', 'WAEC', 'JAMB', 'NECO', 'GCE', 'IGCSE']
const AGES = Array.from({ length: 14 }, (_, i) => i + 12)

export default function LoginPage() {
  const [step, setStep] = useState<'login' | 'onboarding'>('login')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(16)
  const [grade, setGrade] = useState('SS3')
  const [board, setBoard] = useState('WAEC')
  const { login, updateOnboarding } = useAuthStore()
  const router = useRouter()

  const handleSocialLogin = async (provider: string) => {
    await login(provider.toLowerCase() + '@example.com', '')
    setStep('onboarding')
  }

  const handleOnboarding = () => {
    updateOnboarding({ firstName, lastName, age, grade, board })
    router.push('/')
  }

  if (step === 'onboarding') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-surface-200 bg-surface-50 p-8 shadow-sm">
            <StepIndicator current={1} total={2} />

            <h1 className="text-xl font-bold text-surface-900">Tell us about yourself</h1>
            <p className="mt-1.5 text-sm text-surface-500">We'll tailor Topiq to your curriculum and level.</p>

            <div className="mt-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">First name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full rounded-lg border border-surface-200 bg-white px-3.5 py-2.5 text-sm text-surface-900 placeholder-surface-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                    placeholder="Ayomiku"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">Last name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full rounded-lg border border-surface-200 bg-white px-3.5 py-2.5 text-sm text-surface-900 placeholder-surface-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                    placeholder="Olatunji"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Age</label>
                <div className="flex flex-wrap gap-1.5">
                  {AGES.map((a) => (
                    <PillButton key={a} selected={age === a} onClick={() => setAge(a)}>
                      {a}
                    </PillButton>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Grade / Level</label>
                <div className="flex flex-wrap gap-1.5">
                  {GRADES.map((g) => (
                    <PillButton key={g} selected={grade === g} onClick={() => setGrade(g)}>
                      {g}
                    </PillButton>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Exam board (optional)</label>
                <div className="flex flex-wrap gap-1.5">
                  {BOARDS.map((b) => (
                    <PillButton key={b} selected={board === b} onClick={() => setBoard(b)}>
                      {b}
                    </PillButton>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleOnboarding}
              className="mt-6 w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition shadow-sm"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border bg-surface-50 p-8 shadow-sm text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-brand-600 text-white rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4">T</div>
          <h1 className="text-2xl font-bold text-surface-900">Welcome to Topiq</h1>
          <p className="mt-2 text-sm text-surface-500">Master any subject. Practise with thousands of questions.</p>
        </div>

        <div className="space-y-3">
          <button onClick={() => handleSocialLogin('google')} className="w-full border rounded-xl px-4 py-3 text-sm font-semibold text-surface-700 hover:bg-surface-50 transition flex items-center justify-center gap-3">
            <span className="text-red-500 font-bold text-lg">G</span> Continue with Google
          </button>
          <button onClick={() => handleSocialLogin('facebook')} className="w-full border rounded-xl px-4 py-3 text-sm font-semibold text-surface-700 hover:bg-surface-50 transition flex items-center justify-center gap-3">
            <span className="text-blue-600 font-bold text-lg">f</span> Continue with Facebook
          </button>
          <button onClick={() => handleSocialLogin('apple')} className="w-full border rounded-xl px-4 py-3 text-sm font-semibold text-surface-700 hover:bg-surface-50 transition flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Continue with Apple
          </button>
        </div>

        <p className="mt-6 text-xs text-surface-400">By continuing, you agree to our Terms and Privacy Policy.</p>
      </div>
    </div>
  )
}
