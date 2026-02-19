import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is this really a one-time fee?",
    a: "Yes. No subscriptions. You pay $147 once and own the content forever.",
  },
  {
    q: "How do I access the files?",
    a: "Immediately after checkout, you will be securely redirected to the private Vault folder to download your PDFs and access your private video links.",
  },
  {
    q: "I\u2019m already a monthly subscriber, what should I do?",
    a: "Nothing! You are grandfathered into your current rate forever as long as you don\u2019t cancel. This vault is for people who want to own everything upfront without a subscription.",
  },
  {
    q: "What if I\u2019m not satisfied?",
    a: "We offer a 30-day no-questions-asked refund policy. If the Vault isn\u2019t right for you, just email us within 30 days and we\u2019ll issue a full refund.",
  },
  {
    q: "Will future content be included?",
    a: "Yes. Every new course, sheet music release, and bonus material will be added to your Vault automatically at no additional cost. Lifetime means lifetime.",
  },
]

export function FaqSection() {
  return (
    <section className="relative bg-[#0a0a0f] text-white py-28 md:py-36 px-6 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-[var(--gold)]/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-[var(--gold)]/30" />
          </div>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--gold)]/60 mb-4">
            Questions
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight leading-none text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-white/[0.06] last:border-b-0"
            >
              <AccordionTrigger className="font-sans text-base text-white/80 hover:text-[var(--gold)] hover:no-underline py-7 transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-white/50 leading-relaxed text-base pb-7">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-white/[0.06]">
          <p className="font-sans text-white/40 text-sm mb-6">
            Still have questions? We{"'"}re here to help.
          </p>
          <a
            href="mailto:hello@musicalbasics.com"
            className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[var(--gold)] border border-[var(--gold)]/30 px-6 py-3 hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]/50 transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
