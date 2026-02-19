import { Lock, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center text-white overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        src="https://pub-5362e8f7fec4465dbabad7d613891569.r2.dev/Version%20for%20MusicalBio%20copy.mp4"
      />

      {/* Multi-layer overlay for cinematic depth */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Decorative line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--gold)]/50 to-[var(--gold)] mb-8" />

        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-medium text-[var(--gold)] mb-8">
          A Farewell to the Early Days
        </p>

        <h1 className="font-serif tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-8xl">
          The Musical Basics
          <br />
          <span className="text-gold-gradient">Lifetime Vault.</span>
        </h1>

        <p className="font-sans text-white/50 max-w-xl mx-auto mt-8 text-base md:text-lg leading-relaxed text-pretty">
          Before my teaching academy graduates to premium retail pricing, get
          lifetime access to every course and piece of sheet music I{"'"}ve ever
          created for one final price.
        </p>

        {/* CTA Button */}
        <a
          href="#pricing"
          className="group mt-12 relative inline-flex items-center gap-3 bg-gradient-to-r from-[#a08339] via-[#c9a84c] to-[#a08339] text-white font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.35em] font-bold px-10 py-4 rounded-none hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-500 btn-shimmer"
        >
          {"UNLOCK THE VAULT \u2014 $147"}
        </a>

        <p className="mt-6 flex items-center gap-2 text-white/30 text-sm font-sans">
          <Lock className="size-3.5" />
          <span>
            Secure checkout via Stripe. One-time payment. Yours forever.
          </span>
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-sans">Scroll</span>
        <ChevronDown className="size-4 text-white/20" />
      </div>
    </section>
  )
}
