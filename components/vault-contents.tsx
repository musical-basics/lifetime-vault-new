import Image from "next/image"

const rows = [
  {
    title: "The Complete Piano Course",
    value: "$320 Value",
    body: "My flagship masterclass system. Learn the exact techniques I use to tackle the hardest romantic repertoire. From foundation to virtuosity.",
    image: "/images/piano-hands-bw.jpg",
    imageAlt: "Pianist hands playing grand piano in black and white",
  },
  {
    title: "The Sheet Music Archive",
    value: "$200+ Value",
    body: "Every single piece of sheet music I have ever written, transcribed, or arranged. High-quality editorial PDFs ready to print, study, and play.",
    image: "/images/sheet-music-piano.jpg",
    imageAlt: "Sheet music book open on piano music stand",
  },
  {
    title: "Future Updates Included",
    value: "Priceless",
    body: "Whenever I release new sheet music or add new masterclasses to the academy, you get it automatically. No monthly fees, no hidden costs.",
    image: "/images/pianist-bw.jpg",
    imageAlt: "Pianist seated at grand piano in black and white",
  },
]

export function VaultContents() {
  return (
    <section className="bg-[#050505] text-white py-32 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-white/50 mb-4">
            The Collection
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight leading-none text-balance">
            Inside the Vault.
          </h2>
        </div>

        <div className="space-y-32">
          {rows.map((row, i) => {
            const imageFirst = i % 2 === 0

            const imageBlock = (
              <div key={`img-${i}`} className="relative aspect-[4/3] w-full overflow-hidden border border-white/5 shadow-2xl group cursor-default">
                <Image
                  src={row.image}
                  alt={row.imageAlt}
                  fill
                  className="object-cover grayscale opacity-90 transition-all duration-[1.5s] ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                  {...(i === 0 ? { priority: true, loading: "eager" as const } : {})}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-35 transition-opacity duration-700 group-hover:opacity-20" />
              </div>
            )

            const textBlock = (
              <div key={`txt-${i}`} className="flex flex-col justify-center px-0 md:px-12 lg:px-16 mt-8 md:mt-0">
                <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/5 w-fit px-3 py-1 mb-6">
                  {row.value}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] mb-6 text-balance">
                  {row.title}
                </h3>
                <p className="font-sans text-white/60 text-base md:text-lg leading-relaxed font-light">
                  {row.body}
                </p>
              </div>
            )

            return (
              <div key={row.title} className="grid md:grid-cols-2 gap-8 md:gap-0 items-center">
                {imageFirst ? (
                  <>
                    <div className="order-1">{imageBlock}</div>
                    <div className="order-2">{textBlock}</div>
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
        </div>
      </div>
    </section>
  )
}
