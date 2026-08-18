"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Download, Smartphone, Star, Shield, Zap, Globe, TrendingUp, ChevronRight, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function PhoneMockup() {
  return (
    <div className="relative w-64 h-[480px] mx-auto phone-float-animation">
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-foreground/90 to-foreground/70 p-2 shadow-2xl">
        <div className="w-full h-full rounded-[2.5rem] bg-background overflow-hidden relative">
          <div className="h-8 bg-foreground/5 flex items-center justify-center">
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
          </div>

          <div className="p-4 space-y-3">
            <div className="h-10 bg-primary/10 rounded-xl flex items-center px-3 gap-2">
              <div className="w-4 h-4 rounded-full bg-primary/30" />
              <div className="flex-1 h-3 bg-primary/15 rounded-full" />
            </div>

            <div className="flex gap-2 overflow-hidden">
              {["Links", "Coupons", "Jobs"].map((cat) => (
                <div key={cat} className="px-3 py-1.5 bg-primary/10 rounded-full text-[10px] font-medium text-primary whitespace-nowrap">
                  {cat}
                </div>
              ))}
            </div>

            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-3 space-y-2 app-card-slide-in" style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-primary" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2.5 bg-foreground/10 rounded-full w-3/4" />
                    <div className="h-2 bg-foreground/5 rounded-full w-1/2" />
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-2.5 w-2.5 text-warning fill-warning" />
                    ))}
                  </div>
                </div>
                <div className="h-2 bg-foreground/5 rounded-full" />
                <div className="h-2 bg-foreground/5 rounded-full w-2/3" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold tracking-wider shadow-lg">
              PROMYLINK
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -inset-8 bg-gradient-to-b from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl -z-10 animate-pulse-slow" />
    </div>
  );
}

const appFeatures = [
  { icon: Zap, title: "Lightning Fast", desc: "Native speed with instant load" },
  { icon: Shield, title: "100% Verified", desc: "Every link admin-approved" },
  { icon: Globe, title: "Global Reach", desc: "Premium links worldwide" },
  { icon: TrendingUp, title: "Smart Rankings", desc: "AI-powered recommendations" },
];

const appStats = [
  { value: 10000, suffix: "+", label: "Premium Links" },
  { value: 50, suffix: "+", label: "Categories" },
  { value: 4.8, suffix: "★", label: "App Rating" },
  { value: 100, suffix: "%", label: "Free to Use" },
];

export function AppDownloadShowcase() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/8 rounded-full blur-3xl app-bg-pulse" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-6 app-badge-shimmer">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold text-accent">Available Now</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            The <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Most Powerful</span> App
            <br className="hidden sm:block" />
            to Find Premium Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All your premium links, coupons, jobs, courses &amp; services — in one beautiful app.
            Download now and never miss a deal again.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <PhoneMockup />
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="grid grid-cols-2 gap-4">
              {appFeatures.map((feature) => (
                <div key={feature.title} className="glass-card p-4 hover:scale-105 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-5 border-l-4 border-primary">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Why Promylink is #1
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary flex-shrink-0" />All premium services in one platform</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary flex-shrink-0" />Nearby &amp; global service discovery</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary flex-shrink-0" />KYC-verified posters only — no spam</li>
                <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary flex-shrink-0" />Push notifications for new premium links</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="gradient" size="lg" className="gap-2 flex-1 group app-download-btn-glow" asChild>
                <a href="/download">
                  <Download className="h-5 w-5 group-hover:animate-bounce" />
                  <div className="text-left">
                    <span className="text-[10px] opacity-80 block leading-none">Download</span>
                    <span className="font-bold text-sm">Android APK</span>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 flex-1 group" asChild>
                <a href="/install">
                  <Smartphone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="text-[10px] opacity-60 block leading-none">Install</span>
                    <span className="font-bold text-sm">Web App (PWA)</span>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {appStats.map((stat) => (
            <div key={stat.label} className="text-center glass-card p-4 hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {typeof stat.value === "number" && stat.value > 100 ? (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                ) : (
                  <>{stat.value}{stat.suffix}</>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
