'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Eyebrow, PageTitle } from '@/components/ui/shared'
import { useAuthStore } from '@/lib/auth/store'
import { ArrowLeft, Pencil, Settings, X } from 'lucide-react'
import { ProfileFields } from './components/profile-fields'

const CURRICULA = [
  { id: 'ng', name: 'Nigerian (JSS/SS)' },
  { id: 'intl', name: 'International (Grade 9–12)' },
] as const

const NG_GRADES = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3']
const INTL_GRADES = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
const GENDERS = ['Female', 'Male']
const TRACKS = ['Science', 'Arts', 'Commercial']

export default function ProfilePage() {
  const user = useAuthStore(s => s.user)

  const [firstName, setFirstName] = useState(user?.firstName ?? 'Ayomiku')
  const [lastName, setLastName] = useState(user?.lastName ?? 'Olatunji')
  const [age, setAge] = useState(user?.age?.toString() ?? '16')
  const [dob, setDob] = useState('12 Mar 2009')
  const [phone, setPhone] = useState('+234 801 234 5678')
  const [grade, setGrade] = useState(user?.grade ?? 'SS3')
  const [gender, setGender] = useState('Female')
  const [track, setTrack] = useState('Science')
  const [school] = useState('Corona Secondary School')

  // edit modal state
  const [editing, setEditing] = useState(false)
  const [editCurriculum, setEditCurriculum] = useState<'ng' | 'intl'>('ng')
  const [editGrade, setEditGrade] = useState(grade)
  const [editGender, setEditGender] = useState(gender)
  const [editTrack, setEditTrack] = useState(track)
  const [editAvatarUrl, setEditAvatarUrl] = useState('')
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const initials = (firstName[0] + lastName[0]).toUpperCase() || 'AO'
  const username = user?.firstName?.toLowerCase() ?? 'ayomiku_o'

  const fields: [string, string][] = [
    ['First name', firstName],
    ['Last name', lastName],
    ['Age', age],
    ['Date of birth', dob],
    ['Phone number', phone],
    ['Grade level', grade],
    ['Gender', gender],
    ['Class of study', track],
    ['School', school],
  ]

  const openEdit = () => {
    setEditCurriculum('ng')
    setEditGrade(grade)
    setEditGender(gender)
    setEditTrack(track)
    setEditAvatarUrl('')
    setEditing(true)
  }

  const saveEdit = () => {
    setFirstName(firstName)
    setLastName(lastName)
    setAge(age)
    setDob(dob)
    setPhone(phone)
    setGrade(editGrade)
    setGender(editGender)
    setTrack(editTrack)
    setEditing(false)
  }

  return (
    <div>
      <Link href="/progress" className="flex items-center gap-2 text-ash text-[13px] font-semibold mb-3.5 w-fit">
        <ArrowLeft size={16} />
        Progress
      </Link>
      <Eyebrow>Your account</Eyebrow>
      <PageTitle title="Profile" sub="The basics we use to personalise AbSTopiq for you." />

      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-[56px] h-[56px] rounded-full bg-brand-600 text-surface-50 flex items-center justify-center text-lg font-bold shrink-0">
          {initials}
        </div>
        <div>
          <div className="font-bold text-[15px] text-surface-900">{firstName} {lastName}</div>
          <div className="text-[13px] text-ash">@{username}</div>
        </div>
      </div>

      <ProfileFields fields={fields} />

      <button onClick={openEdit}
        className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer mb-2.5 hover:border-brand-600 hover:text-brand-600 transition flex items-center justify-center gap-2">
        <Pencil size={15} /> Edit profile
      </button>
      <Link href="/settings"
        className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer hover:border-brand-600 hover:text-brand-600 transition flex items-center justify-center gap-2 no-underline">
        <Settings size={15} /> Settings
      </Link>

      {/* edit profile modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
          <div className="w-full sm:max-w-[480px] bg-surface-50 rounded-t-[20px] sm:rounded-[20px] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 sm:p-6 pb-0 shrink-0">
              <h2 className="text-base font-bold text-surface-900">Edit profile</h2>
              <button onClick={() => setEditing(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-paper-dim text-ash cursor-pointer">
                <X size={15} />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar p-5 sm:p-6 pt-0 flex-1 min-h-0">
              {/* avatar picker */}
            <div className="flex flex-col items-center mb-[22px] cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
              <div className="w-[84px] h-[84px] rounded-full bg-paper-dim border-[1.5px] border-dashed border-ash-line flex items-center justify-center overflow-hidden mb-2">
                {editAvatarUrl ? (
                  <img src={editAvatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-ash">{initials}</span>
                )}
              </div>
              <span className="text-[12px] font-semibold text-ash">Change profile picture</span>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0]
                  if (f) { const r = new FileReader(); r.onload = () => setEditAvatarUrl(r.result as string); r.readAsDataURL(f) }
                }} />
            </div>

            {/* username */}
            <div className="mb-4">
              <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Username</label>
              <div className="flex items-center gap-1 border-[1.5px] border-ash-line rounded-[10px] px-3.5 py-[11px] focus-within:border-brand-600 transition">
                <span className="text-[14px] text-ash font-semibold">@</span>
                <input type="text" defaultValue={username} className="flex-1 bg-transparent border-none outline-none text-[14px] font-inter text-surface-900" />
              </div>
            </div>

            {/* first name + last name */}
            <div className="flex gap-2.5 mb-4">
              <div className="flex-1">
                <label className="block text-[12px] font-bold text-ink-soft mb-1.5">First name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-[11px] border-[1.5px] border-ash-line rounded-[10px] text-[14px] outline-none focus:border-brand-600 transition" />
              </div>
              <div className="flex-1">
                <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Last name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                  className="w-full px-3.5 py-[11px] border-[1.5px] border-ash-line rounded-[10px] text-[14px] outline-none focus:border-brand-600 transition" />
              </div>
            </div>

            {/* age + date of birth */}
            <div className="flex gap-2.5 mb-4">
              <div className="flex-1">
                <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Age</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)}
                  className="w-full px-3.5 py-[11px] border-[1.5px] border-ash-line rounded-[10px] text-[14px] outline-none focus:border-brand-600 transition" />
              </div>
              <div className="flex-1">
                <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Date of birth</label>
                <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                  className="w-full px-3.5 py-[11px] border-[1.5px] border-ash-line rounded-[10px] text-[14px] outline-none focus:border-brand-600 transition" />
              </div>
            </div>

            {/* phone number */}
            <div className="mb-4">
              <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Phone number</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-[11px] border-[1.5px] border-ash-line rounded-[10px] text-[14px] outline-none focus:border-brand-600 transition" />
            </div>

            {/* curriculum toggle */}
            <div className="mb-4">
              <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Curriculum</label>
              <div className="flex gap-2">
                {CURRICULA.map(c => (
                  <button key={c.id} onClick={() => { setEditCurriculum(c.id); setEditGrade('') }}
                    className={`flex-1 flex flex-col items-center gap-1 px-2.5 py-3 border-[1.5px] rounded-[14px] cursor-pointer text-[12.5px] font-bold transition ${
                      editCurriculum === c.id ? 'border-brand-600 bg-brand-50 text-brand-600' : 'border-ash-line text-ink-soft'
                    }`}>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* grade level — pre-select the current grade */}
            <div className="mb-4">
              <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Grade level</label>
              <div className="grid grid-cols-3 gap-2">
                {(editCurriculum === 'ng' ? NG_GRADES : INTL_GRADES).map(g => (
                  <div key={g} onClick={() => setEditGrade(g)}
                    className={`text-center py-[11px] px-1 border-[1.5px] rounded-[12px] font-bold text-[13px] cursor-pointer transition ${
                      editGrade === g ? 'border-brand-600 bg-brand-50 text-brand-600' : 'border-ash-line text-ink-soft'
                    }`}>
                    {g}
                  </div>
                ))}
              </div>
            </div>

            {/* gender — pre-select the current gender */}
            <div className="mb-4">
              <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Gender</label>
              <div className="grid grid-cols-2 gap-2">
                {GENDERS.map(g => (
                  <div key={g} onClick={() => setEditGender(g)}
                    className={`text-center py-[11px] px-1 border-[1.5px] rounded-[12px] font-bold text-[13px] cursor-pointer transition ${
                      editGender === g ? 'border-brand-600 bg-brand-50 text-brand-600' : 'border-ash-line text-ink-soft'
                    }`}>
                    {g}
                  </div>
                ))}
              </div>
            </div>

            {/* class of study — only for NG curriculum with SS grade */}
            {editCurriculum === 'ng' && editGrade.startsWith('SS') && (
              <div className="mb-4">
                <label className="block text-[12px] font-bold text-ink-soft mb-1.5">Class of study</label>
                <div className="grid grid-cols-3 gap-2">
                  {TRACKS.map(t => (
                    <div key={t} onClick={() => setEditTrack(t)}
                      className={`text-center py-[11px] px-1 border-[1.5px] rounded-[12px] font-bold text-[13px] cursor-pointer transition ${
                        editTrack === t ? 'border-brand-600 bg-brand-50 text-brand-600' : 'border-ash-line text-ink-soft'
                      }`}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}

              {/* save + cancel */}
              <div className="sticky bottom-0 bg-surface-50 pb-1 pt-4">
                <button onClick={saveEdit}
                  className="w-full py-[11px] px-5 rounded-[22px] bg-brand-600 text-white font-bold text-[13px] cursor-pointer border-none hover:bg-brand-700 transition">
                  Save changes
                </button>
                <button onClick={() => setEditing(false)}
                  className="w-full bg-none border border-dashed border-ash-line text-ash rounded-[14px] py-3 font-bold text-[13px] cursor-pointer mt-2.5 hover:border-brand-600 hover:text-brand-600 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
