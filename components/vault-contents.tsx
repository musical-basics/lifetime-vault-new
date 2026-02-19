import Image from "next/image"

const rows = [
  {
    title: "The Complete Piano Course",
    value: "$320 Value",
    body: "My flagship masterclass system. Learn the exact techniques I use to tackle the hardest romantic repertoire.",
    image: "/images/piano-hands-bw.jpg",
    imageAlt: "Pianist hands playing grand piano in black and white",
  },
  {
    title: "The Sheet Music Archive",
    value: "$200+ Value",
    body: "Every single piece of sheet music I have ever written, transcribed, or arranged. High-quality PDFs ready to print and play.",
    image: "/images/sheet-music-piano.jpg",
    imageAlt: "Sheet music book open on piano music stand",
  },
  {
    title: "Future Updates Included",
    value: "Priceless",
    body: "Whenever I release new sheet music or add new masterclasses to the academy, you get it automatically. No monthly fees.",
    image: "/images/pianist-bw.jpg",
    imageAlt: "Pianist seated at grand piano in black and white",
  },
]

export function VaultContents() {
  return (
    <section className="bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="pt-28 pb-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--gold)]/40" />
          </div>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--gold)]/70 mb-4">
            What You Get
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-none text-center text-balance">
            What{"'"}s inside the Vault?
          </h2>
        </div>
      </div>

      {rows.map((row, i) => {
        const imageFirst = i % 2 === 0

        const imageBlock = (
          <div key={`img-${i}`} className="relative aspect-[4/3] w-full overflow-hidden group">
            <Image
              src={row.image}
              alt={row.imageAlt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              {...(i === 0 ? { priority: true, loading: "eager" as const } : {})}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )

        const textBlock = (
          <div key={`txt-${i}`} className="flex flex-col justify-center px-6 lg:px-16 py-12 lg:py-0">
            <span className="uppercase tracking-[0.2em] text-[10px] border border-[var(--gold)]/30 px-4 py-1.5 inline-block mb-8 text-[var(--gold)] self-start font-sans">
              {row.value}
            </span>
            <h3 className="font-serif text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-tight mb-6 text-balance">
              {row.title}
            </h3>
            <p className="font-sans text-white/50 text-base lg:text-lg leading-relaxed max-w-md">
              {row.body}
            </p>
            {/* Decorative gold line */}
            <div className="w-16 h-px bg-gradient-to-r from-[var(--gold)]/40 to-transparent mt-8" />
          </div>
        )

        return (
          <div
            key={row.title}
            className="grid md:grid-cols-2 gap-0 max-w-6xl mx-auto items-center py-8 md:py-0 border-t border-white/[0.06] first:border-t-0"
          >
            {imageFirst ? (
              <>
                {imageBlock}
                {textBlock}
              </>
            ) : (
              <>
                <div className="order-2 md:order-1">{textBlock}</div>
                <div className="order-1 md:order-2">{imageBlock}</div>
              </>
            )}
          </div>
        )
      })}
    </section>
  )
}
