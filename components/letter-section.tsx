import Image from "next/image"

export function LetterSection() {
  return (
    <section className="relative bg-[#faf8f5] text-[#1a1a1a] py-28 md:py-36 px-6 overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center relative">
        {/* Image with decorative frame */}
        <div className="relative">
          <div className="absolute -inset-3 border border-[var(--gold)]/20" />
          <div className="absolute -inset-1.5 border border-[var(--gold)]/10" />
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/images/early-days.jpg"
              alt="Lionel Yu at the piano"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              priority
              loading="eager"
            />
          </div>
        </div>

        <div>
          {/* Gold decorative element */}
          <div className="w-12 h-px bg-[var(--gold)] mb-8" />

          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-[1.1] mb-10 text-balance">
            An end to the {"\u201C"}early days{"\u201D"}.
          </h2>

          <div className="space-y-5 text-base lg:text-lg font-sans text-[#1a1a1a]/70 leading-relaxed">
            <p>Hi everyone, it{"'"}s Lionel.</p>

            <p>
              For the last two years, I{"'"}ve been pouring my life savings into
              building the DreamPlay One, a professional piano keyboard
              designed for hands that don{"'"}t fit the standard size.
            </p>

            <p>
              We are finally entering the manufacturing phase. Because my time
              is now completely consumed by bringing this physical instrument to
              life, I am officially restructuring my digital teaching academy.
            </p>

            <p>
              Starting next Monday, my private lessons are moving to $80, and
              my Lifetime Piano Course is graduating from its beta price to
              $320.
            </p>

            <p>
              But to help fund the final manufacturing costs of the piano,
              and to say thank you to the people who have supported my
              music for years, I am doing something I{"'"}ve never done
              before. I am opening the Lifetime Vault.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="w-8 h-px bg-[var(--gold)]/50" />
            <p className="font-serif italic text-[#1a1a1a]/50 text-lg">
              Lionel Yu
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
