import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lightbulb, Users, Briefcase, ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { categoryDetails } from "@/data/category-details";

// Faithful port of Promylink/src/pages/CategoryInfo.tsx. The original set
// <title>/OG/JSON-LD tags via client-side useEffect hooks (useSEO/useJSONLD)
// — here that's real server-rendered metadata via generateMetadata, which
// is strictly better for SEO (the whole reason this migration moved to
// Next.js in the first place) and JSON-LD emitted directly in the markup.
type Params = { slug: string };

function getCategory(slug: string) {
  return categoryDetails.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return { title: "Category Not Found – Promylink" };
  }

  const title = `${category.name} – Promylink`;
  const description = category.tagline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryInfoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <Link href="/" className="text-primary hover:underline">
              Go back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Categories", item: "/categories" },
      { "@type": "ListItem", position: 3, name: category.name, item: `/category/${category.slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.name,
    description: category.description,
    provider: { "@type": "Organization", name: "Promylink" },
    serviceType: category.name,
    areaServed: "IN",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.useCases.map((useCase) => ({
      "@type": "Question",
      name: `What are the use cases for ${category.name}?`,
      acceptedAnswer: { "@type": "Answer", text: useCase },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-95" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-boost/10 rounded-full blur-3xl" />

          <div className="container relative mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-5xl shrink-0 shadow-glow">
                {category.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                  {category.name}
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl">
                  {category.tagline}
                </p>
              </div>
            </div>

            <p className="text-base md:text-lg text-white/60 max-w-3xl leading-relaxed mb-10">
              {category.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link href="/login">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Step by Step</p>
              <h2 className="text-2xl md:text-4xl font-bold">How It Works</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {category.howItWorks.map((step, i) => (
                <div
                  key={step.step}
                  className="glass-card p-6 text-center relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {i < category.howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                  <div className="w-12 h-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-glow">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Why Choose Us</p>
              <h2 className="text-2xl md:text-4xl font-bold">Benefits</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-8 border-t-4 border-t-primary">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">For Users</h3>
                </div>
                <ul className="space-y-4">
                  {category.benefitsForUsers.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-8 border-t-4 border-t-boost">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl gradient-boost flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">For Businesses</h3>
                </div>
                <ul className="space-y-4">
                  {category.benefitsForBusiness.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-boost mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Inspiration</p>
                <div className="flex items-center gap-3 justify-center">
                  <Lightbulb className="h-6 w-6 text-accent" />
                  <h2 className="text-2xl md:text-4xl font-bold">Real-World Use Cases</h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {category.useCases.map((useCase, i) => (
                  <div
                    key={i}
                    className="glass-card p-5 flex items-start gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground font-bold text-sm">{i + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-95" />
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />

          <div className="container relative mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Ready to get started with {category.name}?
            </h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              Join thousands of users and businesses already benefiting from verified promotions on our platform.
            </p>
            <div className="flex justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link href="/login">
                  Sign Up Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link href="/pricing">See Plans</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
