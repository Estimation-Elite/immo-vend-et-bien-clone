import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import TeamSection from '@/components/TeamSection';
import ComparisonSection from '@/components/ComparisonSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PropertiesCarousel from '@/components/PropertiesCarousel';
import CTASection from '@/components/CTASection';
import EligibilitySection from '@/components/EligibilitySection';
import FAQSection from '@/components/FAQSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import LiveAccelerator from '@/components/LiveAccelerator';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <TeamSection />
      <ComparisonSection />
      <LiveAccelerator className="py-8 px-5" />
      <TestimonialsSection />
      <HowItWorksSection />
      {/* Bloc blanc CTA + avis : les bustes détourés sont ancrés en bas du bloc complet */}
      <div className="relative overflow-x-clip">
        <CTASection />
        <EligibilitySection />
        {/* Alessia — buste détouré, ancré en bas à gauche du bloc */}
        <img
          src="/images/agents/alessia-buste.png"
          alt=""
          className="hidden lg:block absolute left-0 bottom-0 h-3/5 max-h-120 z-1 object-contain object-[bottom_left]"
          aria-hidden="true"
        />
        {/* Véronique — buste détouré, ancré en bas à droite du bloc */}
        <img
          src="/images/agents/veronique-buste.png"
          alt=""
          className="hidden lg:block absolute right-0 bottom-0 h-3/5 max-h-120 z-1 object-contain object-[bottom_right]"
          aria-hidden="true"
        />
      </div>
      <LiveAccelerator className="pt-12 px-5" />
      <PropertiesCarousel />
      <FAQSection />
      <StickyMobileCTA />
      <Footer />
    </main>
  );
}
