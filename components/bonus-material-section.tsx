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
          <div className="pt-28 pb-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-px h-10 bg-gradient-to-b from-transparent to-[var(--gold)]/30" />
            </div>
            <span className="uppercase tracking-[0.2em] text-[10px] border border-[var(--gold)]/30 px-4 py-1.5 inline-block text-[var(--gold)] font-sans mb-6">
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
            <div className="relative aspect-[4/3] w-full overflow-hidden group">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
          )

          const textBlock = (
            <div className="flex flex-col justify-center px-6 lg:px-16 py-12 lg:py-0">
              <div className="w-12 h-px bg-[var(--gold)]/30 mb-8" />
              <h3 className="font-serif text-3xl lg:text-4xl tracking-tight leading-tight mb-6 text-balance">
                {item.title}
              </h3>
              <p className="font-sans text-white/50 text-base lg:text-lg leading-relaxed max-w-md">
                {item.description}
              </p>
            </div>
          )

          return (
            <div
              key={item.title}
              className="grid md:grid-cols-2 gap-0 max-w-6xl mx-auto items-center py-12 md:py-0 border-t border-white/[0.06]"
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
