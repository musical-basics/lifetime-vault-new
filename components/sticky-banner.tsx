"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function StickyBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-white text-black py-2 px-4 text-center relative">
      <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium">
        {"Warning: CLOSING NEXT FRIDAY AT MIDNIGHT"}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
