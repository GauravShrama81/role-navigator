import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { RolesSection } from '@/components/landing/RolesSection';
import { RequirementsSection } from '@/components/landing/RequirementsSection';
import { CTASection } from '@/components/landing/CTASection';
import { LandingNav } from '@/components/landing/LandingNav';

const Index = () => (
  <div className="min-h-screen">
    <LandingNav />
    <HeroSection />
    <div id="features"><FeaturesSection /></div>
    <div id="roles"><RolesSection /></div>
    <div id="requirements"><RequirementsSection /></div>
    <CTASection />
    <footer className="py-8 bg-navy text-center">
      <p className="text-sm text-navy-foreground/50">
        © 2026 Curriculum Intelligence Platform — Risepoint Academic Services
      </p>
    </footer>
  </div>
);

export default Index;
