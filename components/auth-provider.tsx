"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  isLoggedIn: boolean
  isReady: boolean
  user: User | null
  login: (email: string, password: string) => Promise<string | null>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isReady: false,
  user: null,
  login: async () => null,
  logout: () => { },
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check for user stored from registration flow
    const storedUser = sessionStorage.getItem("vault_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        sessionStorage.removeItem("vault_user")
      }
    }
    setMounted(true)
  }, [])

  async function login(email: string, password: string): Promise<string | null> {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      return data.error || "Login failed"
    }

    setUser(data.user)
    sessionStorage.setItem("vault_user", JSON.stringify(data.user))
    return null // no error = success
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem("vault_user")
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isReady: mounted,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
