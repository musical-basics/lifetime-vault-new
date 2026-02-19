import { Lock, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-32 text-center text-white overflow-hidden">
      {/* Background Video with Cinematic Gradients */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-65 mix-blend-luminosity scale-105"
        src="https://pub-5362e8f7fec4465dbabad7d613891569.r2.dev/Version%20for%20MusicalBio%20copy.mp4"
      />
      {/* Luxury vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-[#D4AF37]">
            A Farewell to the Early Days
          </p>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        <h1 className="font-serif tracking-tight leading-[1.05] text-5xl md:text-6xl lg:text-7xl text-balance drop-shadow-2xl">
          The Musical Basics
          <br />
          <span className="italic font-light bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Lifetime Vault.
          </span>
        </h1>

        <p className="font-sans text-white/60 max-w-2xl mx-auto mt-8 text-lg md:text-xl leading-relaxed text-pretty font-light">
          Before my teaching academy graduates to premium retail pricing, secure
          lifetime access to every course and piece of sheet music I{"'"}ve ever
          created for one final, exclusive price.
        </p>

        {/* Premium Luxury Button */}
        <div className="mt-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/40 to-[#D4AF37]/0 blur-md opacity-0 group-hover:opacity-100 transition duration-700" />
          <a
            href="#pricing"
            className="relative flex items-center justify-center gap-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold px-10 py-5 hover:bg-white hover:text-black transition-all duration-500 ease-out"
          >
            Unlock The Vault &mdash; $147
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-white/40 text-[10px] md:text-xs font-sans tracking-wide">
          <Lock className="size-3.5" />
          <span>Secure checkout via Stripe &bull; One-time payment &bull; Yours forever</span>
        </div>
      </div>
    </section>
  )
}
