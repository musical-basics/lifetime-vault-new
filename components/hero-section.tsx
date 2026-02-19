import { Lock } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-32 text-center text-white overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium text-white/50 mb-8">
          A Farewell to the Early Days
        </p>

        <h1 className="font-serif tracking-tight leading-none text-5xl md:text-6xl lg:text-7xl max-w-4xl text-balance">
          The Musical Basics
          <br />
          Lifetime Vault.
        </h1>

        <p className="font-sans text-white/60 max-w-2xl mx-auto mt-6 text-lg md:text-xl leading-relaxed text-pretty">
          Before my teaching academy graduates to premium retail pricing, get
          lifetime access to every course and piece of sheet music I{"'"}ve ever
          created for one final price.
        </p>

        <a
          href="#pricing"
          className="mt-10 inline-block bg-white text-black font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold px-8 py-4 rounded-none hover:bg-white/90 transition-colors"
        >
          {"UNLOCK THE VAULT \u2014 $147"}
        </a>

        <p className="mt-6 flex items-center gap-2 text-white/40 text-sm font-sans">
          <Lock className="size-3.5" />
          <span>
            Secure checkout via Stripe. One-time payment. Yours forever.
          </span>
        </p>
      </div>
    </section>
  )
}
