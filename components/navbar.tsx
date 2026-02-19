"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"

export function Navbar() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/images/musical%20basics%20logo-02%202.png"
            alt="Musical Basics"
            width={140}
            height={36}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-[#D4AF37] transition-colors">
            Home
          </Link>
          <Link href="/policies" className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-[#D4AF37] transition-colors">
            Policies
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/login" className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors">
                Dashboard
              </Link>
              <button onClick={logout} className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                Log Out
              </button>
            </>
          ) : (
            <Link href="/login" className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-[#D4AF37] transition-colors">
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
