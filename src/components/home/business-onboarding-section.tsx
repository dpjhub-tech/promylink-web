"use client";

import { ArrowRight, BadgeCheck, Building2, Mail, Shield, Users } from "lucide-react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";

const onboardingSteps = [
  {
    number: "01",
    icon: Mail,
    title: "Sign up with your company email",
    description: "Use an official business email so the system can identify your organization and guide you into the business onboarding flow.",
  },
  {
    number: "02",
    icon: Shield,
    title: "Verify with domain OTP",
    description: "A one-time password is sent to your official inbox to confirm that you control the company domain before approval continues.",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Unlock your business dashboard",
    description: "Once verified, you can manage clients, run referral programs, and track commission earnings from one dashboard.",
  },
];

const onboardingBenefits = [
  "Trusted company identity with email-domain validation",
  "Separate business access for teams and enterprise accounts",
  "Referral tools, client management, and commission tracking",
];

export function BusinessOnboardingSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.05);

  return (
    <section id="business-onboarding" ref={sectionRef} className="px-4 py-16 md:py-20 overflow-hidden">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border border-warning/25 bg-warning/10 px-4 py-2 text-sm font-semibold text-foreground ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              <Building2 className="h-4 w-4 text-warning" />
              Business onboarding
            </div>

            <h2
              className={`max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-4xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              Company email verification and domain OTP, explained clearly.
            </h2>

            <p
              className={`mt-4 max-w-2xl text-base leading-7 text-muted-foreground ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: "0.3s" }}
            >
              The business onboarding flow is designed to confirm that the account belongs to a real organization before advanced business tools are enabled.
            </p>

            <div className="mt-8 grid gap-4">
              {onboardingSteps.map(({ number, icon: Icon, title, description }, i) => (
                <div
                  key={number}
                  className={`rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
                  style={{ animationDelay: `${0.4 + i * 0.15}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-warning/15 text-warning">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-warning">Step {number}</div>
                      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside
            className={`relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl animate-float" />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Users className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-bold text-foreground">Why this business flow matters</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                It helps protect the platform from fake business profiles while giving real companies a trusted entry point.
              </p>

              <div className="mt-6 space-y-3">
                {onboardingBenefits.map((benefit, i) => (
                  <div
                    key={benefit}
                    className={`flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 ${isVisible ? "animate-blur-in" : "opacity-0"}`}
                    style={{ animationDelay: `${0.6 + i * 0.12}s` }}
                  >
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>

              <Link href="/business/login" className="mt-6 inline-flex">
                <Button size="lg" className="gap-2">
                  Start business onboarding
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
