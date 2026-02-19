"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

interface AuthContextType {
  isLoggedIn: boolean
  isReady: boolean
  login: (username: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isReady: false,
  login: () => {},
  logout: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("vault_auth")
    if (stored === "true") {
      setIsLoggedIn(true)
    }
    setMounted(true)
  }, [])

  function login(_username: string, _password: string) {
    setIsLoggedIn(true)
    sessionStorage.setItem("vault_auth", "true")
  }

  function logout() {
    setIsLoggedIn(false)
    sessionStorage.removeItem("vault_auth")
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady: mounted, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
