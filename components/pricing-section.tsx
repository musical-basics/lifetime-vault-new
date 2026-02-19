import { Check, Lock, ShieldCheck, Infinity } from "lucide-react"
import Image from "next/image"

const bullets = [
  "The Complete Video Course",
  "The Entire Sheet Music Library",
  "All Future Digital Releases",
  "Behind-the-Scenes Content",
  "Concert Pre-Sale Access",
]

const guarantees = [
  { icon: ShieldCheck, text: "30-Day Money-Back Guarantee" },
  { icon: Infinity, text: "Lifetime Access — No Expiry" },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative bg-[#050505] text-white py-28 md:py-36 px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--gold)]/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative grid md:grid-cols-2 max-w-6xl mx-auto items-center gap-16">
        {/* Image side */}
        <div className="relative">
          <div className="absolute -inset-3 border border-[var(--gold)]/15" />
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/piano-hands-bw.jpg"
              alt="Pianist hands on piano keys"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Pricing card */}
        <div className="relative border-gradient bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 md:p-12">
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-[var(--gold)] mb-6">
            The Founder{"'"}s Pass
          </p>

          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-serif text-6xl md:text-7xl tracking-tight leading-none text-gold-gradient">
              $147
            </span>
          </div>
          <p className="text-white/30 line-through text-sm font-sans mb-1">
            Total Real World Value: $520.00+
          </p>
          <p className="text-white/50 text-sm font-sans mb-10">
            One-time payment. Lifetime access.
          </p>

          <hr className="divider-gold mb-10" />

          <ul className="space-y-4 mb-10">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-white/80 font-sans"
              >
                <div className="flex items-center justify-center size-5 rounded-full bg-[var(--gold)]/10 shrink-0">
                  <Check className="size-3 text-[var(--gold)]" strokeWidth={2.5} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="group block w-full bg-gradient-to-r from-[#a08339] via-[#c9a84c] to-[#a08339] text-white text-center font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.35em] font-bold px-8 py-5 rounded-none hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] transition-all duration-500 btn-shimmer"
          >
            Get Instant Access
          </a>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-2 mt-6 text-white/30 text-xs font-sans">
            <Lock className="size-3" />
            <span>Secure checkout via Stripe</span>
          </div>

          {/* Guarantees */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-white/[0.06]">
            {guarantees.map((g) => (
              <div key={g.text} className="flex items-center gap-2 text-white/40 text-xs font-sans">
                <g.icon className="size-3.5 text-[var(--gold)]/60" />
                <span>{g.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="relative text-[var(--gold)]/40 mt-16 text-center text-sm font-sans">
        ⚠ This offer will be taken down permanently next week.
      </p>
    </section>
  )
}
