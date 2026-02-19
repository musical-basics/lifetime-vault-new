"use client"

import { MembersOnlyGate } from "@/components/members-only-gate"
import { MapPin, Calendar } from "lucide-react"

const tourDates = [
  { date: "Mar 15, 2026", city: "Los Angeles", venue: "The Wiltern", status: "On Sale" },
  { date: "Mar 22, 2026", city: "San Francisco", venue: "Davies Symphony Hall", status: "On Sale" },
  { date: "Apr 5, 2026", city: "New York", venue: "Carnegie Hall", status: "Sold Out" },
  { date: "Apr 12, 2026", city: "Chicago", venue: "Orchestra Hall", status: "On Sale" },
  { date: "Apr 26, 2026", city: "London", venue: "Wigmore Hall", status: "Coming Soon" },
  { date: "May 10, 2026", city: "Tokyo", venue: "Suntory Hall", status: "Coming Soon" },
]

export function ConcertTourSection() {
  return (
    <section className="bg-[#050505] text-white border-t border-white/[0.06]">
      <MembersOnlyGate>
        <div className="max-w-4xl mx-auto px-6 py-28">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-px h-10 bg-gradient-to-b from-transparent to-[var(--gold)]/30" />
            </div>
            <span className="uppercase tracking-[0.2em] text-[10px] border border-[var(--gold)]/30 px-4 py-1.5 inline-block text-[var(--gold)] font-sans mb-6">
              Members Exclusive
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight leading-none text-balance">
              Concert Tour 2026
            </h2>
            <p className="text-white/40 font-sans mt-5 max-w-lg mx-auto text-pretty">
              Get early access to concert dates and exclusive pre-sale tickets as a Vault member.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
            {tourDates.map((show) => (
              <div
                key={`${show.date}-${show.city}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-3 hover:bg-white/[0.02] transition-colors px-4 -mx-4"
              >
                <div className="flex items-center gap-3 text-white/60 font-sans text-sm">
                  <Calendar className="size-4 shrink-0 text-[var(--gold)]/40" strokeWidth={1.5} />
                  <span className="w-28">{show.date}</span>
                </div>

                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <MapPin className="size-4 shrink-0 text-[var(--gold)]/40" strokeWidth={1.5} />
                  <span className="font-sans text-white">
                    {show.city}
                  </span>
                  <span className="text-white/30 font-sans text-sm truncate">
                    {show.venue}
                  </span>
                </div>

                <span
                  className={`text-[10px] uppercase tracking-[0.2em] font-sans px-3 py-1.5 border shrink-0 ${show.status === "Sold Out"
                      ? "border-white/10 text-white/25"
                      : show.status === "Coming Soon"
                        ? "border-white/10 text-white/40"
                        : "border-[var(--gold)]/30 text-[var(--gold)]"
                    }`}
                >
                  {show.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </MembersOnlyGate>
    </section>
  )
}
