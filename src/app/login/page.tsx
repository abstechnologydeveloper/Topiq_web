'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth/store'

const GRADES = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3', '100L', '200L', '300L', '400L', '500L']
const BOARDS = ['None', 'WAEC', 'JAMB', 'NECO', 'GCE', 'IGCSE']
const AGES = Array.from({ length: 14 }, (_, i) => i + 12)

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i < current
                ? 'bg-brand-600 text-white'
                : i === current
                  ? 'bg-brand-50 text-brand-700 border-2 border-brand-600'
                  : 'bg-surface-100 text-surface-400'
            }`}
          >
            {i < current ? '✓' : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`flex-1 h-0.5 rounded transition-colors ${
                i < current ? 'bg-brand-600' : 'bg-surface-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function PillButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
        selected
          ? 'bg-brand-50 border-brand-300 text-brand-700'
          : 'border-surface-200 text-surface-600 hover:border-brand-200 hover:text-surface-700'
      }`}
    >
      {children}
    </button>
  )
}

function SocialButton({
  onClick,
  icon,
  label,
}: {
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm font-semibold text-surface-700 hover:bg-surface-100 hover:border-surface-300 transition shadow-sm"
    >
      {icon}
      {label}
    </button>
  )
}

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
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-surface-200 bg-surface-50 p-8 shadow-sm text-center">
          <div className="mb-6">
            <div className="w-14 h-14 bg-brand-600 text-white rounded-xl flex items-center justify-center text-xl font-extrabold mx-auto mb-4 shadow-sm">
              T
            </div>
            <h1 className="text-xl font-bold text-surface-900">Welcome to Topiq</h1>
            <p className="mt-1.5 text-sm text-surface-500">Master any subject. Practise with thousands of questions.</p>
          </div>

          <div className="space-y-2.5">
            <SocialButton
              onClick={() => handleSocialLogin('google')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              }
              label="Continue with Google"
            />
            <SocialButton
              onClick={() => handleSocialLogin('facebook')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              }
              label="Continue with Facebook"
            />
            <SocialButton
              onClick={() => handleSocialLogin('apple')}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" color="#000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              }
              label="Continue with Apple"
            />
          </div>

          <p className="mt-6 text-xs text-surface-400 leading-relaxed">
            By continuing, you agree to our{' '}
            <span className="text-brand-600 hover:underline cursor-pointer">Terms</span>
            {' '}and{' '}
            <span className="text-brand-600 hover:underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
