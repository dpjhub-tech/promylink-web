"use client";

import { Link2, BarChart3, ShieldCheck, Rocket, Eye, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const benefits = [
  {
    icon: Link2,
    title: "Post Any Link",
    description: "Share product pages, YouTube videos, app links, referral codes – any URL you want to promote.",
    gradient: "from-primary to-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Trusted",
    description: "Every poster is ID-verified. Users trust your links because they know you are real.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: BarChart3,
    title: "Track Every Click",
    description: "See real-time analytics – clicks, views, geographic data, and engagement metrics.",
    gradient: "from-purple-500 to-violet-400",
  },
  {
    icon: CreditCard,
    title: "Pay Only for Clicks",
    description: "No monthly subscriptions required. Buy credits and only spend when users actually click.",
    gradient: "from-warning to-orange-400",
  },
  {
    icon: Rocket,
    title: "Boost for Visibility",
    description: "Push your post to the top of the feed instantly with our affordable boost packages.",
    gradient: "from-accent to-pink-400",
  },
  {
    icon: Eye,
    title: "Reach Real Users",
    description: "No bots, no fake clicks. Our fraud protection ensures genuine engagement.",
    gradient: "from-blue-500 to-indigo-400",
  },
];

export function PostingBenefits() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden" ref={ref}>
      <div className="absolute top-20 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why Post Here</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Promote Links</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re a freelancer, business owner, or content creator – promylink gives you the tools to reach your audience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group glass-card p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <benefit.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link href="/signup">
            <Button variant="gradient" size="xl" className="gap-2 group">
              Start Posting for Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
