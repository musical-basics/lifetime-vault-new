import { StickyBanner } from "@/components/sticky-banner"
import { HeroSection } from "@/components/hero-section"
import { LetterSection } from "@/components/letter-section"
import { VaultContents } from "@/components/vault-contents"
import { BonusMaterialSection } from "@/components/bonus-material-section"
import { ConcertTourSection } from "@/components/concert-tour-section"
import { BehindTheScenesSection } from "@/components/behind-the-scenes-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"

export default function Page() {
  return (
    <main>
      <StickyBanner />
      <HeroSection />
      <LetterSection />
      <VaultContents />
      <BonusMaterialSection />
      <ConcertTourSection />
      <BehindTheScenesSection />
      <PricingSection />
      <FaqSection />
    </main>
  )
}
