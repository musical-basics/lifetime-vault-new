import Image from "next/image"

export function LetterSection() {
  return (
    <section className="bg-white text-black py-24 px-6">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src="/images/early-days.jpg"
            alt="Piano keys with bokeh lights in black and white"
            fill
            className="object-cover grayscale"
            priority
            loading="eager"
          />
        </div>

        <div>
          <h2 className="font-serif text-3xl lg:text-4xl tracking-tight leading-none mb-8 text-balance">
            An end to the {"\u201C"}early days{"\u201D"}.
          </h2>

          <div className="space-y-6 text-lg font-sans text-black/80 leading-relaxed">
            <p>Hi everyone, it{"'"}s Lionel.</p>

            <p>
              For the last two years, I{"'"}ve been pouring my life savings into
              building the DreamPlay One{"\u2014"}a professional piano keyboard
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
              But to help fund the final manufacturing costs of the piano
              {"\u2014"}and to say thank you to the people who have supported my
              music for years{"\u2014"}I am doing something I{"'"}ve never done
              before. I am opening the Lifetime Vault.
            </p>
          </div>

          <p className="mt-8 font-serif italic text-black/70 text-lg">
            {"\u2014"} Lionel Yu
          </p>
        </div>
      </div>
    </section>
  )
}
