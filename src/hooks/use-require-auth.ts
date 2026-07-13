import { useAuthStore } from '@/lib/auth/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useRequireAuth() {
  const user = useAuthStore((s) => s.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user, router])

  return user
}