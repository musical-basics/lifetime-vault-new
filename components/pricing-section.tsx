import { Check } from "lucide-react"
import Image from "next/image"

const bullets = [
  "The Complete Video Course",
  "The Entire Sheet Music Library",
  "All Future Digital Releases",
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-[#0c0c0c] text-white border-t border-white/5 py-24 px-6"
    >
      <div className="grid md:grid-cols-2 max-w-6xl mx-auto items-center gap-12">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="/images/piano-hands-bw.jpg"
            alt="Pianist hands on piano keys"
            fill
            className="object-cover grayscale"
          />
        </div>

        <div className="bg-[#050505] border border-white/10 p-8 md:p-10">
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium text-white/50 mb-4">
            The Founder{"'"}s Pass
          </p>

          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-serif text-6xl tracking-tight leading-none">
              $147
            </span>
            <span className="text-white/40 line-through text-sm font-sans">
              Total Real World Value: $520.00+
            </span>
          </div>

          <p className="text-white/60 text-sm font-sans mb-8">
            One-time payment. Lifetime access.
          </p>

          <div className="border-b border-white/10 mb-8" />

          <ul className="space-y-4 mb-10">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-white/80 font-sans"
              >
                <Check className="size-4 shrink-0" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="block w-full bg-white text-black text-center font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold px-8 py-5 rounded-none hover:bg-white/90 transition-colors"
          >
            Get Instant Access
          </a>
        </div>
      </div>

      <p className="text-white/40 mt-12 text-center text-sm font-sans">
        Warning: This offer will be taken down permanently next week.
      </p>
    </section>
  )
}
