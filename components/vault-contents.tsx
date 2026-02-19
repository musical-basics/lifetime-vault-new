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
    <section className="bg-[#0a0a0f] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl lg:text-5xl tracking-tight leading-none text-center pt-24 pb-16 text-balance">
          What{"'"}s inside the Vault?
        </h2>
      </div>

      {rows.map((row, i) => {
        const imageFirst = i % 2 === 0

        const imageBlock = (
          <div key={`img-${i}`} className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={row.image}
              alt={row.imageAlt}
              fill
              className="object-cover grayscale"
              {...(i === 0 ? { priority: true, loading: "eager" as const } : {})}
            />
          </div>
        )

        const textBlock = (
          <div key={`txt-${i}`} className="flex flex-col justify-center px-6 lg:px-16">
            <span className="uppercase tracking-widest text-xs border border-white/20 px-3 py-1 inline-block mb-6 text-white/60 self-start">
              {row.value}
            </span>
            <h3 className="font-serif text-4xl lg:text-5xl tracking-tight leading-tight mb-6 text-balance">
              {row.title}
            </h3>
            <p className="font-sans text-white/60 text-lg leading-relaxed max-w-md">
              {row.body}
            </p>
          </div>
        )

        return (
          <div
            key={row.title}
            className="grid md:grid-cols-2 gap-0 max-w-6xl mx-auto items-center py-24 md:py-32 border-t border-white/5 first:border-t-0"
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
