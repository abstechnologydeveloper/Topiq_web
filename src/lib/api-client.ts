export const apiClient = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`)
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
    return res.json()
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`)
    return res.json()
  },
}