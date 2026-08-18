"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Users, ArrowRight, Sparkles, Building2, CheckCircle2, BadgeCheck } from "lucide-react";
import { usePlatformStats } from "@/hooks/use-platform-stats";

const typewriterWords = [
  "Premium Services", "Verified Businesses", "Trusted Brands",
  "Enterprise Tools", "Professional Networks", "Corporate Solutions",
  "Curated Offers", "Industry Leaders",
];

function useTypewriter(words: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, speed, pause]);

  return text;
}

function CorporateGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
      <div className="hero-grid" />
    </div>
  );
}

function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="hero-mesh hero-mesh-1" />
      <div className="hero-mesh hero-mesh-2" />
      <div className="hero-mesh hero-mesh-3" />
    </div>
  );
}

function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="hero-beam hero-beam-1" />
      <div className="hero-beam hero-beam-2" />
    </div>
  );
}

function Twinkles() {
  const [dots, setDots] = useState<{ top: string; left: string; width: string; height: string; delay: string; duration: string }[]>([]);

  // Random positions computed client-side only, to avoid SSR/client markup
  // mismatches from Math.random() during hydration.
  useEffect(() => {
    setDots(
      Array.from({ length: 24 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        delay: `${Math.random() * 6}s`,
        duration: `${4 + Math.random() * 4}s`,
      })),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="hero-twinkle"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.width,
            height: dot.height,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const { data: stats } = usePlatformStats();
  const typedText = useTypewriter(typewriterWords);

  const formatNumber = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 min-h-[88vh] flex items-center"
      style={{
        background: "linear-gradient(135deg, hsl(222 47% 9%) 0%, hsl(218 42% 13%) 45%, hsl(212 38% 18%) 100%)",
      }}
    >
      <CorporateGrid />
      <GradientMesh />
      <LightBeams />
      <Twinkles />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-[hsl(210_80%_55%/0.18)] rounded-full blur-[140px] animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] bg-[hsl(220_60%_40%/0.15)] rounded-full blur-[140px] animate-float-delayed" />
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 backdrop-blur-md border border-white/10 mb-8 animate-fade-in">
            <BadgeCheck className="h-4 w-4 text-[hsl(210_90%_70%)]" />
            <span className="text-xs font-semibold text-white/80 tracking-[0.18em] uppercase">
              India&apos;s No 1 Premium Search Engine
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-slide-up leading-[1.05] tracking-tight">
            The corporate gateway to{" "}
            <br className="md:hidden" />
            <span className="bg-gradient-to-r from-[hsl(200_90%_75%)] via-white to-[hsl(210_90%_70%)] bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="inline-block w-[3px] h-[0.8em] bg-[hsl(210_90%_70%)] ml-1 animate-blink align-middle" />
            <br />
            <span className="text-xl md:text-2xl lg:text-3xl text-white/65 font-medium">
              One verified platform. Every premium service.
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/65 mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.15s" }}>
            promylink.com unifies verified premium links, businesses, and services into a single corporate-grade search experience — built for professionals, brands, and enterprises. Join free in seconds, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/feed">
              <Button size="xl" className="gap-2 min-w-[220px] group bg-white text-slate-900 hover:bg-white/90 font-semibold rounded-md shadow-lg">
                Explore Platform
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/business/login">
              <Button size="xl" variant="outline" className="min-w-[220px] gap-2 group bg-transparent border-white/25 text-white hover:bg-white/10 hover:text-white rounded-md">
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                List Your Business
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-slide-up" style={{ animationDelay: "0.25s" }}>
            <Link href="/login">
              <Button size="lg" className="gap-2 min-w-[200px] bg-white/5 backdrop-blur-sm border border-white/15 text-white hover:bg-white/10 rounded-md">
                <Users className="h-5 w-5" />
                User Login
              </Button>
            </Link>
            <Link href="/business/login">
              <Button size="lg" className="gap-2 min-w-[200px] bg-white/5 backdrop-blur-sm border border-white/15 text-white hover:bg-white/10 rounded-md">
                <Building2 className="h-5 w-5" />
                Business Login
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {[
              { icon: Shield, label: "KYC Verified" },
              { icon: CheckCircle2, label: "Enterprise Grade" },
              { icon: TrendingUp, label: "Real-Time Analytics" },
              { icon: Users, label: "Fraud Protected" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <Icon className="h-3.5 w-3.5 text-[hsl(210_90%_70%)]" />
                <span className="text-xs font-medium text-white/80 tracking-wide">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 animate-fade-in" style={{ animationDelay: "0.45s" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 backdrop-blur-sm border border-white/10">
              <Shield className="h-3.5 w-3.5 text-white/70" />
              <span className="text-xs text-white/70 font-medium">
                Every click is IP-verified with a 3-hour cooldown — fraud auto-filtered
              </span>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in pt-10 border-t border-white/10" style={{ animationDelay: "0.4s" }}>
          {[
            { label: "Active Listings", value: stats ? `${formatNumber(stats.activePosts)}+` : "—" },
            { label: "Verified Members", value: stats ? `${formatNumber(stats.verifiedPosters)}+` : "—" },
            { label: "Tracked Clicks", value: stats ? `${formatNumber(stats.totalClicks)}` : "—" },
            { label: "Categories", value: stats ? `${stats.totalCategories}+` : "—" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight transition-transform duration-300 group-hover:scale-105">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.15em] text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
