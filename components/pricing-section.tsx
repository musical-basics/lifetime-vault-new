"use client"

import { useState } from "react"
import { Check, ShieldCheck, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"

const bullets = [
  "The Complete Video Course ($320 Value)",
  "The Entire Sheet Music Library ($200+ Value)",
  "All Future Digital Releases Included",
  "Members-Only Behind the Scenes",
  "Early Access to Concert Tours"
]

export function PricingSection() {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" className="bg-[#050505] text-white py-32 px-6 relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center relative z-10">
          <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-sans text-[#D4AF37] mb-4 block">
            Limited Time Offer
          </span>
          <h2 className="font-serif text-4xl lg:text-6xl tracking-tight leading-none text-balance">
            Secure Your Legacy Access
          </h2>
          <p className="text-white/50 mt-6 max-w-xl mx-auto text-lg font-light">
            The vault is closing to new lifetime members. Secure your spot before the transition to subscription-only pricing.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] items-stretch border border-white/10 rounded-sm overflow-hidden bg-[#0A0A0A] shadow-2xl relative z-10">

          {/* Visual Side */}
          <div className="relative w-full min-h-[400px] hidden lg:block border-r border-white/5 group">
            <Image
              src="/images/piano-hands-bw.jpg"
              alt="Pianist hands on piano keys"
              fill
              className="object-cover grayscale opacity-50 mix-blend-lighten group-hover:scale-105 group-hover:opacity-70 transition-all duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]" />
            <div className="absolute bottom-12 left-12 flex items-start gap-4">
              <ShieldCheck className="size-8 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-serif text-xl leading-tight">Backed by a 30-Day<br />Guarantee.</p>
              </div>
            </div>
          </div>

          {/* Pricing Side */}
          <div className="p-10 md:p-14 relative flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="size-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-white/50">
                The Founder{"'"}s Pass
              </p>
            </div>

            <div className="flex flex-col mb-2">
              <span className="text-white/40 line-through text-sm font-sans tracking-wide mb-2">
                Total Real World Value: $520.00+
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-6xl md:text-7xl tracking-tight leading-none text-white">
                  $147
                </span>
                <span className="text-white/40 font-sans text-sm uppercase tracking-widest">USD</span>
              </div>
            </div>

            <p className="text-white/50 text-sm font-sans mb-10 font-light leading-relaxed">
              One-time payment. No subscriptions. Yours forever.
            </p>

            <ul className="space-y-5 mb-12">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-4 text-white/80 font-sans text-sm md:text-base">
                  <div className="mt-0.5 bg-white/5 border border-white/10 rounded-full p-1 shrink-0">
                    <Check className="size-3 text-[#D4AF37]" strokeWidth={2.5} />
                  </div>
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="group relative flex items-center justify-center w-full bg-white text-black font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold px-8 py-5 rounded-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <><Loader2 className="size-4 animate-spin" /> Processing...</>
                ) : (
                  <>Get Instant Access <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
            </button>
          </div>
        </div>

        <p className="text-white/40 mt-12 text-center text-[11px] font-sans uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Closing permanently next Friday at midnight
        </p>
      </div>
    </section>
  )
}
