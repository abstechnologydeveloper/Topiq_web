'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth/store'

type OnboardingStep = 'auth' | 'role' | 'details' | 'details2'

const NG_GRADES = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3']
const INTL_GRADES = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']

export default function LoginPage() {
  const [step, setStep] = useState<OnboardingStep>('auth')
  const [role, setRole] = useState<'student' | 'teacher' | 'school' | null>(null)
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [curriculum, setCurriculum] = useState<'ng' | 'intl'>('ng')
  const [grade, setGrade] = useState('')
  const [gender, setGender] = useState('')
  const [track, setTrack] = useState('')
  const [schoolCode, setSchoolCode] = useState('')
  const [subjectsTaught, setSubjectsTaught] = useState<string[]>([])
  const [instName, setInstName] = useState('')
  const [contactName, setContactName] = useState('')
  const [instPhone, setInstPhone] = useState('')
  const [instSize, setInstSize] = useState('')
  const { login, updateOnboarding } = useAuthStore()
  const router = useRouter()

  const grades = curriculum === 'ng' ? NG_GRADES : INTL_GRADES

  const handleSocialLogin = async () => {
    await login('user@example.com', '')
    setStep('role')
  }

  const goToStep = (s: OnboardingStep) => {
    setStep(s)
  }

  const handleFinishSetup = () => {
    updateOnboarding({
      firstName,
      lastName,
      age: parseInt(age) || 0,
      grade,
      board: 'WAEC',
      role: role || 'student',
      username,
      dob,
      phone,
      curriculum,
      gender,
      track,
      schoolCode,
    })
    router.push('/')
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 py-10 bg-surface-50 dark:bg-ink">
      <div className="w-full max-w-100">
        {/* Progress dots */}
        <div className="flex gap-1.5 mb-7">
          {['auth', 'role', 'details', 'details2'].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${
                s === step || (['role', 'details', 'details2'].includes(step) && s === 'auth')
                || (step === 'details2' && (s === 'role' || s === 'details'))
                || (step === 'details' && s === 'role')
                  ? 'bg-brand-600'
                  : 'bg-ash-line'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Auth */}
        {step === 'auth' && (
          <div>
            <div className="flex items-center gap-2.5 mb-7 justify-center">
              <div className="w-10 h-10 bg-brand-600 text-white rounded-[10px] flex items-center justify-center text-lg font-extrabold shrink-0">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4L6 10v12l10 6 10-6V10L16 4z" fill="currentColor" opacity="0.3"/>
                  <path d="M16 9l-5 3v6l5 3 5-3v-6l-5-3z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-[22px] font-extrabold text-ink dark:text-white">Topiq</div>
            </div>
            <h1 className="font-display text-[23px] font-semibold text-center mb-2 text-ink dark:text-white">
              Learn it. Practice it. Sabi it.
            </h1>
            <p className="text-[13.5px] text-ash text-center mb-7 leading-relaxed">
              Sign up in one tap &mdash; onboarding takes just a minute after.
            </p>

            <button
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2.5 w-full py-3.25 rounded-[14px] font-bold text-sm cursor-pointer mb-3 border border-ash-line bg-white text-ink hover:border-brand-600 active:scale-[0.98] transition-all"
            >
              <span className="w-4.75 h-[19px] rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 text-white" style={{background:'conic-gradient(from -45deg, #4285F4 0 25%, #34A853 0 50%, #FBBC05 0 75%, #EA4335 0 100%)'}}>G</span>
              Continue with Google
            </button>
            <button
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2.5 w-full py-[13px] rounded-[14px] font-bold text-sm cursor-pointer mb-3 bg-ink text-white border border-ink hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <span className="w-[19px] h-[19px] rounded-full flex items-center justify-center text-xs shrink-0 bg-white text-ink">🍎</span>
              Continue with Apple
            </button>
            <button
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2.5 w-full py-[13px] rounded-[14px] font-bold text-sm cursor-pointer mb-3 bg-[#1877F2] text-white border border-[#1877F2] hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <span className="w-[19px] h-[19px] rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 bg-white text-[#1877F2]">f</span>
              Continue with Facebook
            </button>

            <p className="text-[11px] text-ash text-center mt-4 leading-relaxed">
              By continuing, you agree to Topiq's Terms of Service and Privacy Policy.
            </p>
          </div>
        )}

        {/* STEP 2: Role */}
        {step === 'role' && (
          <div>
            <div className="text-center font-mono text-[9.5px] font-bold uppercase tracking-[.04em] bg-paper-dim text-ash px-[7px] py-[2px] rounded-lg w-fit mx-auto mb-3.5">
              Onboarding · Step 1 of 2
            </div>
            <h2 className="font-display text-[23px] font-semibold text-center mb-2 text-ink dark:text-white">
              Who's this for?
            </h2>
            <p className="text-[13.5px] text-ash text-center mb-7 leading-relaxed">
              This decides what your Topiq looks like — we'll set it up right.
            </p>

            <div
              className={`flex items-center gap-3.5 bg-white dark:bg-ink border border-ash-line rounded-[16px] p-4 mb-3 cursor-pointer transition-all ${
                role === 'student' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20' : 'hover:border-brand-600'
              }`}
              onClick={() => { setRole('student'); goToStep('details') }}
            >
              <span className="text-[26px] shrink-0">🎓</span>
              <div>
                <div className="font-bold text-[14.5px] text-ink dark:text-white">Student</div>
                <div className="text-xs text-ash">Learn, practice, and prep for exams</div>
              </div>
            </div>
            <div
              className={`flex items-center gap-3.5 bg-white dark:bg-ink border border-ash-line rounded-[16px] p-4 mb-3 cursor-pointer transition-all ${
                role === 'teacher' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20' : 'hover:border-brand-600'
              }`}
              onClick={() => { setRole('teacher'); goToStep('details') }}
            >
              <span className="text-[26px] shrink-0">🍎</span>
              <div>
                <div className="font-bold text-[14.5px] text-ink dark:text-white">Teacher</div>
                <div className="text-xs text-ash">Track a class and set assignments</div>
              </div>
            </div>
            <div
              className={`flex items-center gap-3.5 bg-white dark:bg-ink border border-ash-line rounded-[16px] p-4 mb-3 cursor-pointer transition-all ${
                role === 'school' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20' : 'hover:border-brand-600'
              }`}
              onClick={() => { setRole('school'); goToStep('details') }}
            >
              <span className="text-[26px] shrink-0">🏫</span>
              <div>
                <div className="font-bold text-[14.5px] text-ink dark:text-white">School / Institution</div>
                <div className="text-xs text-ash">Set up Topiq for your whole school</div>
              </div>
            </div>

            <button type="button" className="flex items-center gap-1.5 text-ash text-xs font-semibold mb-4" onClick={() => goToStep('auth')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Back
            </button>

            <button
              type="button"
              onClick={() => goToStep('details')}
              className="w-full bg-ink dark:bg-white text-white dark:text-ink border-none py-[13px] rounded-[14px] font-bold text-sm cursor-pointer mt-1.5 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Next step &rarr;
            </button>
          </div>
        )}

        {/* STEP 3: Details */}
        {step === 'details' && (
          <div>
            <div className="text-center font-mono text-[9.5px] font-bold uppercase tracking-[.04em] bg-paper-dim text-ash px-[7px] py-[2px] rounded-lg w-fit mx-auto mb-3.5">
              Onboarding · Step 2 of 2
            </div>
            <h2 className="font-display text-[23px] font-semibold text-center mb-2 text-ink dark:text-white">
              Tell us about you
            </h2>
            <p className="text-[13.5px] text-ash text-center mb-7 leading-relaxed">
              Just the basics — you can edit this anytime.
            </p>

            {role === 'student' && (
              <>
                {/* Avatar picker */}
                <div className="flex flex-col items-center mb-[22px] cursor-pointer">
                  <div className="w-[84px] h-[84px] rounded-full bg-paper-dim border border-dashed border-ash-line flex items-center justify-center overflow-hidden relative mb-2">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
                    <span className="absolute -bottom-[1px] -right-[1px] w-[26px] h-[26px] rounded-full bg-ink flex items-center justify-center border-2 border-white">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-ash">Add profile picture</span>
                </div>

                {/* Username */}
                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">Username</label>
                  <div className="flex items-center gap-0.5 border border-ash-line rounded-[10px] px-3.5">
                    <span className="text-ash font-semibold text-sm">@</span>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-none outline-none py-[11px] px-0.5 text-sm flex-1 bg-transparent text-ink dark:text-white placeholder:text-ash/60"
                      placeholder="chidinma_o"
                    />
                  </div>
                </div>

                {/* First + Last name */}
                <div className="flex gap-2.5 mb-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-ink-soft block mb-1.5">First name</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                      placeholder="Chidinma"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-ink-soft block mb-1.5">Last name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                      placeholder="Okafor"
                    />
                  </div>
                </div>

                {/* Age + DOB */}
                <div className="flex gap-2.5 mb-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-ink-soft block mb-1.5">Age</label>
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="number"
                      className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                      placeholder="16"
                      min="8"
                      max="25"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-ink-soft block mb-1.5">Date of birth</label>
                    <input
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">
                    Phone number <span className="font-normal text-ash">(optional)</span>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                    placeholder="080X XXX XXXX"
                  />
                </div>
              </>
            )}

            {role === 'teacher' && (
              <>
                <div className="flex gap-2.5 mb-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-ink-soft block mb-1.5">First name</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                      placeholder="Funmilayo"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-ink-soft block mb-1.5">Last name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                      placeholder="Adeyemi"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">
                    Phone number <span className="font-normal text-ash">(optional)</span>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                    placeholder="080X XXX XXXX"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">Subject(s) you teach</label>
                  <div className="flex flex-wrap gap-2">
                    {['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() =>
                          setSubjectsTaught((prev) =>
                            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                          )
                        }
                        className={`px-3.5 py-[7px] rounded-[10px] text-xs font-bold border transition ${
                          subjectsTaught.includes(s)
                            ? 'border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                            : 'border-ash-line text-ink-soft hover:border-brand-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">
                    School code <span className="font-normal text-ash">(optional)</span>
                  </label>
                  <input
                    value={schoolCode}
                    onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                    className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60 uppercase"
                    placeholder="e.g. CORONA2026"
                  />
                  <p className="text-[11px] text-ash mt-1.5 leading-relaxed">
                    Have a code from your school admin? Enter it and your Topiq for Teachers plan is covered by your school, free. No code — teach independently on the free plan, or upgrade anytime.
                  </p>
                </div>
              </>
            )}

            {role === 'school' && (
              <>
                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">Institution name</label>
                  <input
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                    placeholder="Corona Secondary School"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">Contact person</label>
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                    placeholder="Full name"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">
                    Phone number <span className="font-normal text-ash">(optional)</span>
                  </label>
                  <input
                    value={instPhone}
                    onChange={(e) => setInstPhone(e.target.value)}
                    type="tel"
                    className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                    placeholder="080X XXX XXXX"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-xs font-bold text-ink-soft block mb-1.5">Estimated number of students</label>
                  <input
                    value={instSize}
                    onChange={(e) => setInstSize(e.target.value)}
                    type="number"
                    className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60"
                    placeholder="e.g. 250"
                  />
                </div>
              </>
            )}

            <button className="flex items-center gap-1.5 text-ash text-xs font-semibold mb-4" onClick={() => goToStep('role')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Back
            </button>

            <button
              onClick={role === 'student' ? () => goToStep('details2') : handleFinishSetup}
              disabled={!firstName || !lastName}
              className="w-full bg-ink dark:bg-white text-white dark:text-ink border-none py-[13px] rounded-[14px] font-bold text-sm cursor-pointer mt-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
            >
              {role === 'student' ? 'Next step →' : 'Finish setup →'}
            </button>
          </div>
        )}

        {/* STEP 4: Details 2 (student only) */}
        {step === 'details2' && (
          <div>
            <div className="text-center font-mono text-[9.5px] font-bold uppercase tracking-[.04em] bg-paper-dim text-ash px-[7px] py-[2px] rounded-lg w-fit mx-auto mb-3.5">
              Onboarding · Step 2 of 2
            </div>
            <h2 className="font-display text-[23px] font-semibold text-center mb-2 text-ink dark:text-white">
              Almost done
            </h2>
            <p className="text-[13.5px] text-ash text-center mb-7 leading-relaxed">
              This helps us match content to your class.
            </p>

            {/* Curriculum toggle */}
            <div className="mb-4">
              <label className="text-xs font-bold text-ink-soft block mb-1.5">Curriculum</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setCurriculum('ng'); setGrade('') }}
                  className={`flex-1 py-3 px-2.5 border rounded-[14px] text-xs font-bold transition cursor-pointer ${
                    curriculum === 'ng'
                      ? 'border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                      : 'border-ash-line text-ink-soft bg-white dark:bg-ink'
                  }`}
                >
                  <span className="text-xs font-bold">Nigerian (JSS/SS)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setCurriculum('intl'); setGrade('') }}
                  className={`flex-1 py-3 px-2.5 border rounded-[14px] text-xs font-bold transition cursor-pointer ${
                    curriculum === 'intl'
                      ? 'border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                      : 'border-ash-line text-ink-soft bg-white dark:bg-ink'
                  }`}
                >
                  <span className="text-xs font-bold">International (Grade 9–12)</span>
                </button>
              </div>
            </div>

            {/* Grade level */}
            <div className="mb-4">
              <label className="text-xs font-bold text-ink-soft block mb-1.5">Grade level</label>
              <div className="grid grid-cols-3 gap-2">
                {grades.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`text-center py-[11px] px-1 border rounded-xl font-bold text-sm cursor-pointer transition ${
                      grade === g
                        ? 'border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                        : 'border-ash-line text-ink-soft bg-white dark:bg-ink hover:border-brand-600'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="text-xs font-bold text-ink-soft block mb-1.5">Gender</label>
              <div className="grid grid-cols-2 gap-2">
                {['Female', 'Male'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`text-center py-[11px] px-1 border rounded-xl font-bold text-sm cursor-pointer transition ${
                      gender === g
                        ? 'border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                        : 'border-ash-line text-ink-soft bg-white dark:bg-ink hover:border-brand-600'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Class of study (SS only) */}
            {curriculum === 'ng' && grade.startsWith('SS') && (
              <div className="mb-4">
                <label className="text-xs font-bold text-ink-soft block mb-1.5">Class of study</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Science', 'Arts', 'Commercial'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTrack(t)}
                      className={`text-center py-[11px] px-1 border rounded-xl font-bold text-sm cursor-pointer transition ${
                        track === t
                          ? 'border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                          : 'border-ash-line text-ink-soft bg-white dark:bg-ink hover:border-brand-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* School code */}
            <div className="mb-4">
              <label className="text-xs font-bold text-ink-soft block mb-1.5">
                School code <span className="font-normal text-ash">(optional)</span>
              </label>
              <input
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                className="w-full border border-ash-line rounded-[10px] px-3.5 py-[11px] text-sm text-ink dark:text-white bg-transparent outline-none focus:border-brand-600 transition placeholder:text-ash/60 uppercase"
                placeholder="e.g. CORONA2026"
              />
              <p className="text-[11px] text-ash mt-1.5 leading-relaxed">
                Ask your school for their Topiq code — it links your account to their plan, so you're covered free. Don't have one? Leave blank, you can add it later.
              </p>
            </div>

            <button className="flex items-center gap-1.5 text-ash text-xs font-semibold mb-4" onClick={() => goToStep('details')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Back
            </button>

            <button
              onClick={handleFinishSetup}
              disabled={!grade}
              className="w-full bg-ink dark:bg-white text-white dark:text-ink border-none py-[13px] rounded-[14px] font-bold text-sm cursor-pointer mt-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Finish setup &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
