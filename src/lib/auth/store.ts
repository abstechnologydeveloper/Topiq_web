import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  age?: number
  grade?: string
  board?: string
  role?: string
  username?: string
  dob?: string
  phone?: string
  curriculum?: string
  gender?: string
  track?: string
  schoolCode?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateOnboarding: (data: Partial<Omit<User, 'id' | 'email'>>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 800))
        set({
          user: { id: '1', firstName: '', lastName: '', email },
          token: 'mock-token',
          isLoading: false,
        })
      },

      updateOnboarding: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      })),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'topiq-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)