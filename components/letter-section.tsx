import Image from "next/image"

export function LetterSection() {
  return (
    <section className="bg-[#050505] text-white py-32 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 max-w-6xl mx-auto items-center relative z-10">

        {/* Editorial Image Framing */}
        <div className="relative w-full aspect-[3/4] p-3 sm:p-5 border border-white/10 group">
          <div className="relative w-full h-full overflow-hidden bg-[#0A0A0A]">
            <Image
              src="/images/early-days.jpg"
              alt="Lionel Yu Piano keys early days"
              fill
              className="object-cover grayscale contrast-125 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              priority
              loading="eager"
            />
            {/* Inner shadow overlay for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight leading-[1.1] mb-12 text-balance">
            An end to the <span className="italic text-[#D4AF37]">{"\u201C"}early days{"\u201D"}</span>.
          </h2>

          <div className="space-y-8 text-lg font-sans text-white/70 leading-relaxed font-light">
            <p>
              <span className="float-left text-6xl font-serif leading-[0.8] pr-3 text-white">H</span>
              i everyone, it{"'"}s Lionel. For the last two years, I{"'"}ve been pouring my life savings into
              building the DreamPlay One{"\u2014"}a professional piano keyboard
              designed for hands that don{"'"}t fit the standard size.
            </p>

            <p>
              We are finally entering the manufacturing phase. Because my time
              is now completely consumed by bringing this physical instrument to
              life, I am officially restructuring my digital teaching academy.
            </p>

            <p>
              Starting next Monday, my private lessons are moving to <strong className="text-white font-normal">$80</strong>, and
              my Lifetime Piano Course is graduating from its beta price to <strong className="text-white font-normal">$320</strong>.
            </p>

            <p>
              But to help fund the final manufacturing costs of the piano
              {"\u2014"}and to say thank you to the people who have supported my
              music for years{"\u2014"}I am doing something I{"'"}ve never done
              before. I am opening the Lifetime Vault.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-6">
            <div className="size-14 rounded-full border border-white/20 overflow-hidden relative shrink-0">
              <Image src="/images/pianist-bw.jpg" alt="Lionel" fill className="object-cover grayscale" />
            </div>
            <div>
              <p className="font-serif italic text-white text-xl">Lionel Yu</p>
              <p className="text-[10px] font-sans tracking-[0.2em] text-[#D4AF37] uppercase mt-1">Founder & Pianist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
