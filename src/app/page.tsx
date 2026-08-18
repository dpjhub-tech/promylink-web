import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { HowPromylinkWorks } from "@/components/home/how-promylink-works";
import { AllInOnePlatform } from "@/components/home/all-in-one-platform";
import { AppDownloadShowcase } from "@/components/home/app-download-showcase";
import { PostingBenefits } from "@/components/home/posting-benefits";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedPosts } from "@/components/home/featured-posts";
import { PlatformComparison } from "@/components/home/platform-comparison";
import { MetricsExplainer } from "@/components/home/metrics-explainer";
import { BusinessOnboardingSection } from "@/components/home/business-onboarding-section";
import { BusinessShowcase } from "@/components/home/business-showcase";
import { EnterpriseFeatures } from "@/components/home/enterprise-features";
import { HowItWorks } from "@/components/home/how-it-works";
import { CTASection } from "@/components/home/cta-section";

// Full port of Promylink/src/pages/Index.tsx (logged-out view). The
// logged-in AuthenticatedFeed variant isn't ported yet — out of scope for
// this pass, tracked separately.
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowPromylinkWorks />
        <AllInOnePlatform />
        <AppDownloadShowcase />
        <PostingBenefits />
        <CategoryShowcase />
        <FeaturedPosts />
        <PlatformComparison />
        <MetricsExplainer />
        <BusinessOnboardingSection />
        <BusinessShowcase />
        <EnterpriseFeatures />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
