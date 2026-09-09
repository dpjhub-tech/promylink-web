"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, Search } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 gradient-hero relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/15 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Search className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-white/90">India&apos;s No 1 Premium Search Engine</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Reach Your Audience?</h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Join thousands of verified posters who are growing their reach with promylink.com.
            Get verified, create your first post, and start tracking results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/organization/signup">
              <Button variant="hero" size="xl" className="gap-2 min-w-[200px] group">
                <Shield className="h-5 w-5" />
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="heroOutline" size="xl" className="min-w-[200px] group">
                View Pricing
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/50">
            No credit card required • Free tier available • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
