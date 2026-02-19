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
]

export function FaqSection() {
  return (
    <section className="bg-[#050505] text-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl tracking-tight leading-none text-center mb-16 text-balance">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-white/10 last:border-b-0"
            >
              <AccordionTrigger className="font-sans text-base text-white/90 hover:text-white hover:no-underline py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-white/60 leading-relaxed text-base pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
