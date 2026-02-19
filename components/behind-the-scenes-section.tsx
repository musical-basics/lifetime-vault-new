"use client"

import Image from "next/image"
import { MembersOnlyGate } from "@/components/members-only-gate"
import { Play } from "lucide-react"

const clips = [
  {
    title: "Recording Session: Chopin Ballade No. 1",
    description: "A raw, unedited look at the recording process behind the flagship course.",
    image: "/images/recording-session-chopin.jpg",
  },
  {
    title: "Studio Tour",
    description: "Walk through the home studio setup, gear choices, and acoustic treatment.",
    image: "/images/studio-tour.jpg",
  },
  {
    title: "Rehearsal: Liszt La Campanella",
    description: "Watch the full rehearsal process from sight-reading to performance-ready.",
    image: "/images/rehearsal-liszt.jpg",
  },
  {
    title: "DreamPlay One: Prototype Testing",
    description: "Behind-the-scenes footage of testing the custom-sized keyboard prototype.",
    image: "/images/dreamplay-one-prototype.jpg",
  },
]

export function BehindTheScenesSection() {
  return (
    <section className="bg-[#0a0a0f] text-white border-t border-white/[0.06]">
      <MembersOnlyGate>
        <div className="max-w-6xl mx-auto px-6 py-28">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-px h-10 bg-gradient-to-b from-transparent to-[var(--gold)]/30" />
            </div>
            <span className="uppercase tracking-[0.2em] text-[10px] border border-[var(--gold)]/30 px-4 py-1.5 inline-block text-[var(--gold)] font-sans mb-6">
              Members Exclusive
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight leading-none text-balance">
              Behind the Scenes
            </h2>
            <p className="text-white/40 font-sans mt-5 max-w-lg mx-auto text-pretty">
              Exclusive footage from recording sessions, rehearsals, and the making of the DreamPlay One.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clips.map((clip) => (
              <div
                key={clip.title}
                className="group border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-[var(--gold)]/20 transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={clip.image}
                    alt={clip.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center size-16 rounded-full border border-[var(--gold)]/40 bg-black/60 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Play className="size-6 text-[var(--gold)] ml-0.5" fill="var(--gold)" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl tracking-tight mb-2 group-hover:text-[var(--gold)] transition-colors duration-300">
                    {clip.title}
                  </h3>
                  <p className="font-sans text-white/40 text-sm leading-relaxed">
                    {clip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MembersOnlyGate>
    </section>
  )
}
