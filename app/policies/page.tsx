import { ShieldCheck, Infinity, Mail } from "lucide-react"

export const metadata = {
    title: "Policies & Refunds | The Lifetime Vault",
    description:
        "Our 30-day no-questions-asked refund policy and lifetime membership guarantee.",
}

export default function PoliciesPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            {/* Header */}
            <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
                <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
                    Policies & Refunds
                </p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none text-balance">
                    Your purchase is protected.
                </h1>
                <p className="font-sans text-white/50 mt-6 text-lg leading-relaxed max-w-xl mx-auto text-pretty">
                    We want you to feel completely confident joining the Lifetime Vault.
                    Here{"'"}s exactly what you{"'"}re covered by.
                </p>
            </section>

            {/* 30-Day Refund Policy */}
            <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10">
                <div className="flex items-start gap-5">
                    <div className="flex items-center justify-center size-12 border border-white/10 shrink-0 mt-1">
                        <ShieldCheck className="size-5 text-white/60" />
                    </div>
                    <div>
                        <h2 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight mb-4">
                            30-Day Money-Back Guarantee
                        </h2>
                        <div className="space-y-4 font-sans text-white/60 text-base leading-relaxed">
                            <p>
                                If the Lifetime Vault isn{"'"}t right for you, simply email us
                                within 30 days of your purchase and we{"'"}ll issue a full
                                refund. No questions asked. No hoops to jump through.
                            </p>
                            <p>
                                We don{"'"}t believe in trapping anyone into a purchase they{"'"}re
                                not happy with. If the content doesn{"'"}t meet your
                                expectations, you deserve your money back{"\u2014"}period.
                            </p>
                            <ul className="space-y-3 pl-1">
                                <li className="flex items-start gap-3">
                                    <span className="text-white/30 mt-1.5 text-xs">{"\u2022"}</span>
                                    <span>Full refund within 30 days of purchase</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white/30 mt-1.5 text-xs">{"\u2022"}</span>
                                    <span>No reason required{"\u2014"}just send us an email</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white/30 mt-1.5 text-xs">{"\u2022"}</span>
                                    <span>Refunds processed within 5{"\u20137"} business days</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white/30 mt-1.5 text-xs">{"\u2022"}</span>
                                    <span>Processed back to your original payment method</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lifetime Membership Guarantee */}
            <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10">
                <div className="flex items-start gap-5">
                    <div className="flex items-center justify-center size-12 border border-white/10 shrink-0 mt-1">
                        <Infinity className="size-5 text-white/60" />
                    </div>
                    <div>
                        <h2 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight mb-4">
                            Lifetime Membership Guarantee
                        </h2>
                        <div className="space-y-4 font-sans text-white/60 text-base leading-relaxed">
                            <p>
                                When we say {"\u201C"}lifetime,{"\u201D"} we mean it. Your
                                one-time payment gives you permanent access to every course,
                                every piece of sheet music, and every bonus resource in the
                                Vault.
                            </p>
                            <p>
                                As long as Musical Basics exists, your membership is active.
                                There are no recurring charges, no hidden fees, and no
                                expiration dates.
                            </p>
                            <ul className="space-y-3 pl-1">
                                <li className="flex items-start gap-3">
                                    <span className="text-white/30 mt-1.5 text-xs">{"\u2022"}</span>
                                    <span>One payment. Access forever.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white/30 mt-1.5 text-xs">{"\u2022"}</span>
                                    <span>All future courses and sheet music included at no extra cost</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white/30 mt-1.5 text-xs">{"\u2022"}</span>
                                    <span>No monthly or annual subscriptions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white/30 mt-1.5 text-xs">{"\u2022"}</span>
                                    <span>Your account never expires</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10">
                <div className="flex items-start gap-5">
                    <div className="flex items-center justify-center size-12 border border-white/10 shrink-0 mt-1">
                        <Mail className="size-5 text-white/60" />
                    </div>
                    <div>
                        <h2 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight mb-4">
                            Need Help?
                        </h2>
                        <p className="font-sans text-white/60 text-base leading-relaxed">
                            If you have any questions about our policies, need to request a
                            refund, or just want to say hi, reach out to us at{" "}
                            <a
                                href="mailto:hello@musicalbasics.com"
                                className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                            >
                                hello@musicalbasics.com
                            </a>
                            . We typically respond within 24 hours.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom spacer */}
            <div className="h-24" />
        </main>
    )
}
