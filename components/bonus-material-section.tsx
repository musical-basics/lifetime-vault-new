"use client"

import Image from "next/image"
import { MembersOnlyGate } from "@/components/members-only-gate"

const items = [
  {
    title: "Warm-Up Routines",
    description:
      "A curated set of daily warm-up exercises designed to build finger independence, strengthen hand posture, and prepare you for demanding repertoire.",
    image: "/images/hands-warmup-bw.jpg",
    imageAlt: "Hands warming up on piano keys",
  },
  {
    title: "Advanced Technique Breakdowns",
    description:
      "In-depth video walkthroughs of advanced techniques including trills, octave runs, legato pedalling, and voicing in dense chordal passages.",
    image: "/images/advanced-technique-bw.jpg",
    imageAlt: "Overhead view of hands playing piano keys in black and white",
  },
]

export function BonusMaterialSection() {
  return (
    <section className="bg-[#0a0a0f] text-white">
      <MembersOnlyGate>
        <div className="max-w-6xl mx-auto px-6">
          <div className="pt-24 pb-4 text-center">
            <span className="uppercase tracking-widest text-xs border border-white/20 px-3 py-1 inline-block text-white/60 font-sans mb-6">
              Members Exclusive
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight leading-none text-balance">
              Bonus Material
            </h2>
          </div>
        </div>

        {items.map((item, i) => {
          const imageFirst = i % 2 === 0

          const imageBlock = (
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover grayscale"
              />
            </div>
          )

          const textBlock = (
            <div className="flex flex-col justify-center px-6 lg:px-16">
              <h3 className="font-serif text-3xl lg:text-4xl tracking-tight leading-tight mb-6 text-balance">
                {item.title}
              </h3>
              <p className="font-sans text-white/60 text-lg leading-relaxed max-w-md">
                {item.description}
              </p>
            </div>
          )

          return (
            <div
              key={item.title}
              className="grid md:grid-cols-2 gap-0 max-w-6xl mx-auto items-center py-20 border-t border-white/5"
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
      </MembersOnlyGate>
    </section>
  )
}
