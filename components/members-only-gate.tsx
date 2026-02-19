"use client"

import { Lock } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import type { ReactNode } from "react"

export function MembersOnlyGate({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth()

  return (
    <div className="relative">
      {!isLoggedIn && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050505]/60 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <div className="flex items-center justify-center size-14 border border-white/20 rounded-full">
              <Lock className="size-6 text-white/60" strokeWidth={1.5} />
            </div>
            <p className="font-serif text-xl text-white tracking-tight">
              Members Only
            </p>
            <p className="text-sm text-white/50 font-sans max-w-xs">
              Log in to unlock exclusive content from The Lifetime Vault.
            </p>
          </div>
        </div>
      )}

      <div className={!isLoggedIn ? "select-none pointer-events-none" : ""}>
        {children}
      </div>
    </div>
  )
}
