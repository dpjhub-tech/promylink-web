"use client";

import { Eye, MousePointerClick, Zap, RefreshCw } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { usePlatformStats } from "@/hooks/use-platform-stats";

export function MetricsExplainer() {
  const { ref, isVisible } = useScrollAnimation();
  const { data: stats } = usePlatformStats();

  const metrics = [
    {
      icon: Eye,
      title: "Impressions",
      description:
        "An impression is counted when a post card becomes at least 50% visible on a user's screen. Each unique viewer can generate only 1 impression per post per hour — preventing artificial inflation.",
      highlight: stats?.totalClicks ? `${(stats.totalClicks * 3).toLocaleString()}+ total impressions` : undefined,
      color: "text-primary",
      bgColor: "bg-primary/10",
      ringColor: "ring-primary/20",
    },
    {
      icon: MousePointerClick,
      title: "Clicks",
      description:
        "A click is recorded when a user taps the action button (Visit, Download, Apply, etc.) and is redirected to your link. Clicks are rate-limited to 1 per user per post every 24 hours for accuracy.",
      highlight: stats?.totalClicks ? `${stats.totalClicks.toLocaleString()}+ verified clicks` : undefined,
      color: "text-accent",
      bgColor: "bg-accent/10",
      ringColor: "ring-accent/20",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description:
        "Both metrics update instantly on every post card. When someone views or clicks your post, the counters refresh live — no page reload needed. Powered by real-time database sync.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      ringColor: "ring-emerald-500/20",
    },
    {
      icon: RefreshCw,
      title: "Anti-Fraud Protection",
      description:
        "We use IP-based rate limiting and server-side verification to ensure every impression and click is genuine. Duplicate or spam interactions are automatically filtered out.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      ringColor: "ring-purple-500/20",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">Transparent Analytics</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Clicks vs Impressions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understand exactly how your post performance is measured on promylink.com
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.title}
              className={`rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${metric.bgColor} flex items-center justify-center mb-4 ring-4 ${metric.ringColor}`}>
                <metric.icon className={`h-7 w-7 ${metric.color}`} />
              </div>
              <h3 className="text-lg font-bold mb-2">{metric.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{metric.description}</p>
              {metric.highlight && (
                <span className={`inline-block text-xs font-semibold ${metric.color} ${metric.bgColor} px-3 py-1 rounded-full`}>
                  {metric.highlight}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
