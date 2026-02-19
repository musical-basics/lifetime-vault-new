"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function StickyBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-[#111111] border-b border-white/5 text-white py-2.5 px-4 relative z-50">
      <div className="flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse hidden sm:block" />
        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium text-white/80">
          Strictly Limited: Closing Permanently Next Friday at Midnight
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
