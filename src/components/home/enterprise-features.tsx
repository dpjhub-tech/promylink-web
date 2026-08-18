"use client";

import { ArrowRight, BarChart3, Building2, CreditCard, DollarSign, Gift, Link as LinkIcon, Share2, TrendingUp, UserPlus, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";

const referralSteps = [
  { icon: LinkIcon, title: "Generate referral code", description: "Create a unique referral link from your business dashboard in one click.", color: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  { icon: Share2, title: "Share with prospects", description: "Send via email, WhatsApp, social media, or embed on your website.", color: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  { icon: UserPlus, title: "Client onboards", description: "When someone signs up through your link they become your tracked client.", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  { icon: Gift, title: "Earn 100 credits", description: "You receive 100 credits instantly for every successful onboarding.", color: "bg-violet-500/15 text-violet-600 dark:text-violet-400" },
];

const dashboardFeatures = [
  { icon: Users, label: "Active Clients", value: "248", change: "+12 this week" },
  { icon: Wallet, label: "Total Earnings", value: "₹47,500", change: "+₹3,200 today" },
  { icon: TrendingUp, label: "Conversion Rate", value: "68%", change: "+5% vs last month" },
  { icon: BarChart3, label: "Pending Invites", value: "34", change: "18 opened" },
];

const commissionExamples = [
  { action: "Client recharges wallet", amount: "₹1,000", rate: "5%", earning: "₹50", icon: CreditCard },
  { action: "Client purchases credits", amount: "₹5,000", rate: "5%", earning: "₹250", icon: Wallet },
  { action: "Client upgrades plan", amount: "₹10,000", rate: "5%", earning: "₹500", icon: DollarSign },
];

export function EnterpriseFeatures() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.05);

  return (
    <section ref={sectionRef} className="relative px-4 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-transparent to-orange-50/30 dark:from-amber-950/15 dark:via-transparent dark:to-orange-950/10" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-warning/5 blur-[120px] animate-float" />

      <div className="container relative z-10">
        <div className={`text-center mb-14 ${isVisible ? "animate-blur-in" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-4 py-2 text-sm font-semibold text-foreground mb-4">
            <Building2 className="h-4 w-4 text-warning" />
            Enterprise features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Everything your business needs to{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              scale earnings
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            From referral codes to real-time commissions — here&apos;s exactly how Promylink helps enterprise teams grow.
          </p>
        </div>

        <div className="mb-16">
          <h3 className={`text-xl font-bold text-foreground mb-6 flex items-center gap-2 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <Share2 className="h-5 w-5 text-warning" />
            Referral Workflow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {referralSteps.map((step, i) => (
              <div
                key={step.title}
                className={`relative rounded-2xl border border-border/60 bg-card/90 backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.2 + i * 0.12}s` }}
              >
                <div className="absolute -top-3 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-warning text-warning-foreground text-xs font-bold shadow-md">
                  {i + 1}
                </div>
                {i < referralSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-4 border-t-2 border-dashed border-warning/40" />
                )}
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.color} mb-3`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className={`text-xl font-bold text-foreground mb-6 flex items-center gap-2 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <BarChart3 className="h-5 w-5 text-warning" />
            Client Dashboard Overview
          </h3>

          <div
            className={`rounded-[2rem] border border-border/50 bg-gradient-to-br from-card via-card to-warning/5 p-6 md:p-8 shadow-lg ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/40">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-destructive/60" />
                <span className="h-3 w-3 rounded-full bg-warning/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 h-6 rounded-lg bg-muted/60 max-w-xs" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardFeatures.map((feat, i) => (
                <div
                  key={feat.label}
                  className={`rounded-2xl border border-border/50 bg-background/80 p-4 transition-shadow duration-300 hover:shadow-md ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.45 + i * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <feat.icon className="h-4 w-4 text-warning" />
                    <span className="text-xs text-muted-foreground font-medium">{feat.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{feat.value}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">{feat.change}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-border/40 bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground mb-3 font-medium">Weekly commission trend</p>
              <div className="flex items-end gap-1.5 h-16">
                {[35, 50, 42, 65, 58, 80, 72].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-warning/80 to-warning/40 transition-all duration-700"
                    style={{ height: isVisible ? `${h}%` : "0%", transitionDelay: `${0.7 + i * 0.08}s` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="text-[10px] text-muted-foreground flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className={`text-xl font-bold text-foreground mb-6 flex items-center gap-2 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <DollarSign className="h-5 w-5 text-warning" />
            Commission Examples
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {commissionExamples.map((ex, i) => (
              <div
                key={ex.action}
                className={`group relative rounded-2xl border border-border/60 bg-card/90 p-5 transition-all duration-300 hover:shadow-lg hover:border-warning/40 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}
                style={{ animationDelay: `${0.3 + i * 0.15}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15 text-warning">
                    <ex.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{ex.action}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-muted/50 p-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Amount</p>
                    <p className="text-sm font-bold text-foreground">{ex.amount}</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Rate</p>
                    <p className="text-sm font-bold text-warning">{ex.rate}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">You earn</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{ex.earning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
          <Link href="/business/login">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 gap-2 shadow-lg shadow-amber-500/20">
              Start Earning as a Business Partner
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-3">
            Free to join • 5% lifetime commission • Unlimited referrals
          </p>
        </div>
      </div>
    </section>
  );
}
