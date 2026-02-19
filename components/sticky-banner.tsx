"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function StickyBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="relative bg-gradient-to-r from-[#0c0a06] via-[#1a1508] to-[#0c0a06] py-2.5 px-4 text-center overflow-hidden">
      {/* Subtle gold shimmer line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

      <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.35em] font-medium text-[var(--gold)]">
        {"⚠ Warning: Closing Next Friday at Midnight"}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
