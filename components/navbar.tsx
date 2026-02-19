"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export function Navbar() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
        <Link href="/" className="font-serif text-lg tracking-tight text-white">
          Musical Basics
        </Link>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="font-sans text-sm text-white/70 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="font-sans text-sm text-white/40 hover:text-white transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
