import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-[#050505] text-white border-t border-white/[0.06]">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Brand */}
                    <div>
                        <p className="font-serif text-lg tracking-tight mb-3">Musical Basics</p>
                        <p className="font-sans text-white/30 text-sm leading-relaxed max-w-xs">
                            Piano education reimagined. Courses, sheet music, and exclusive content by Lionel Yu.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">
                            Navigation
                        </p>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/" className="font-sans text-sm text-white/50 hover:text-[var(--gold)] transition-colors">
                                Home
                            </Link>
                            <Link href="/policies" className="font-sans text-sm text-white/50 hover:text-[var(--gold)] transition-colors">
                                Policies & Refunds
                            </Link>
                            <Link href="/login" className="font-sans text-sm text-white/50 hover:text-[var(--gold)] transition-colors">
                                Member Login
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">
                            Contact
                        </p>
                        <a
                            href="mailto:hello@musicalbasics.com"
                            className="font-sans text-sm text-white/50 hover:text-[var(--gold)] transition-colors"
                        >
                            hello@musicalbasics.com
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-sans text-xs text-white/20">
                        &copy; {new Date().getFullYear()} Musical Basics. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1">
                        <div className="w-6 h-px bg-gradient-to-r from-transparent to-[var(--gold)]/20" />
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]/30">
                            Est. 2024
                        </span>
                        <div className="w-6 h-px bg-gradient-to-l from-transparent to-[var(--gold)]/20" />
                    </div>
                </div>
            </div>
        </footer>
    )
}
