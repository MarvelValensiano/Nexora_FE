import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/landing/hero";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { MissionsSection } from "@/components/landing/missions";
import { ProductLimitsSection } from "@/components/landing/product-limits";
import { FinalCtaSection } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 pt-16">
        <HeroSection />
        <HowItWorksSection />
        <MissionsSection />
        <ProductLimitsSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
