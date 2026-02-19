"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"

export function Navbar() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/musical basics logo horitzontal (1).jpg"
            alt="Musical Basics"
            width={140}
            height={36}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/policies"
            className="font-sans text-sm text-white/70 hover:text-white transition-colors"
          >
            Policies
          </Link>
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
