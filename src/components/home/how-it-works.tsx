"use client";

import { UserPlus, Shield, FileText, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  { icon: UserPlus, title: "Sign Up", description: "Create your account with email, Google, or mobile OTP verification.", color: "text-primary", bgColor: "bg-primary/10", ringColor: "ring-primary/20" },
  { icon: Shield, title: "Get Verified", description: "Upload your government ID to get a verified badge and unlock posting.", color: "text-accent", bgColor: "bg-accent/10", ringColor: "ring-accent/20" },
  { icon: FileText, title: "Create Posts", description: "Choose a package, fill in your promotion details, and submit for review.", color: "text-emerald-500", bgColor: "bg-emerald-500/10", ringColor: "ring-emerald-500/20" },
  { icon: CheckCircle, title: "Admin Approval", description: "Our team verifies links, checks for spam, and approves quality posts.", color: "text-purple-500", bgColor: "bg-purple-500/10", ringColor: "ring-purple-500/20" },
  { icon: TrendingUp, title: "Track & Grow", description: "Monitor clicks, views, and boost your posts for maximum visibility.", color: "text-blue-500", bgColor: "bg-blue-500/10", ringColor: "ring-blue-500/20" },
];

export function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Step by Step</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From signup to success – here&apos;s how you can start promoting on promylink.com
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 z-0" />

          <div className="grid md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex flex-col items-center text-center transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`w-20 h-20 rounded-2xl ${step.bgColor} flex items-center justify-center mb-4 bg-background ring-4 ${step.ringColor} transition-all duration-300 hover:scale-110 hover:shadow-lg`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white mb-3 shadow-md">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                {index < steps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground/50 mt-4 md:hidden rotate-90" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
