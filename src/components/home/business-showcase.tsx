"use client";

import Link from "next/link";
import { Building2, Users, Wallet, Share2, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const features = [
  { icon: Share2, title: "Referral Program", description: "Generate unique referral codes, share with clients, and earn 100 credits per successful onboarding.", accent: "from-amber-500 to-orange-500" },
  { icon: Users, title: "Client Management", description: "Track your entire network — onboarded clients, invite status, and real-time growth metrics.", accent: "from-emerald-500 to-teal-500" },
  { icon: Wallet, title: "Commission Earnings", description: "Earn 5% commission on every wallet recharge and service purchase made by your referred clients.", accent: "from-violet-500 to-purple-500" },
  { icon: TrendingUp, title: "Performance Dashboard", description: "Dedicated analytics for revenue, commission history, client activity, and network performance.", accent: "from-blue-500 to-cyan-500" },
  { icon: ShieldCheck, title: "Business Verification", description: "Verify your business via company email & domain OTP for a trusted, verified badge on your profile.", accent: "from-rose-500 to-pink-500" },
  { icon: Building2, title: "Enterprise Plans", description: "Custom Enterprise Pro packages with bespoke pricing, dedicated support, and premium features.", accent: "from-yellow-500 to-amber-500" },
];

export function BusinessShowcase() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-transparent to-orange-50/30 dark:from-amber-950/20 dark:via-transparent dark:to-orange-950/10" />
      <div className="absolute top-10 right-0 w-72 h-72 bg-amber-200/20 dark:bg-amber-800/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-orange-200/15 dark:bg-orange-800/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-14 ${isVisible ? "animate-blur-in" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
            <Building2 className="h-4 w-4" />
            For Businesses &amp; Enterprises
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Grow Your Business with{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              Promylink
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Onboard clients, earn commissions, and manage your entire network from one powerful dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:border-amber-300/50 dark:hover:border-amber-700/50 hover:-translate-y-1 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${feature.accent} text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1.5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={`text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
          <Link href="/business/login">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 gap-2 shadow-lg shadow-amber-500/20">
              Get Started as a Business
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-3">
            Free to join • No credit card required • Instant dashboard access
          </p>
        </div>
      </div>
    </section>
  );
}
