"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Check, X, Minus } from "lucide-react";

const features = [
  { name: "Verified Poster Identity", promylink: true, socialMedia: false, classifieds: false, adPlatforms: "partial" as const },
  { name: "Link Click Analytics", promylink: true, socialMedia: "partial" as const, classifieds: false, adPlatforms: true },
  { name: "Pay-Per-Click Pricing", promylink: true, socialMedia: false, classifieds: false, adPlatforms: true },
  { name: "No Minimum Budget", promylink: true, socialMedia: false, classifieds: true, adPlatforms: false },
  { name: "Admin Post Review", promylink: true, socialMedia: false, classifieds: false, adPlatforms: "partial" as const },
  { name: "Category-Based Discovery", promylink: true, socialMedia: false, classifieds: true, adPlatforms: false },
  { name: "Real-Time Boost", promylink: true, socialMedia: "partial" as const, classifieds: false, adPlatforms: true },
  { name: "No Algorithm Dependency", promylink: true, socialMedia: false, classifieds: true, adPlatforms: false },
];

type Val = boolean | "partial";

function StatusIcon({ value }: { value: Val }) {
  if (value === true) return <Check className="h-5 w-5 text-emerald-400" />;
  if (value === "partial") return <Minus className="h-5 w-5 text-warning" />;
  return <X className="h-5 w-5 text-destructive/60" />;
}

export function PlatformComparison() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">Compare</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why promylink.com?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we stack up against traditional platforms for link promotion
          </p>
        </div>

        <div className={`max-w-5xl mx-auto overflow-x-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Feature</th>
                <th className="py-4 px-4 text-center">
                  <div className="inline-flex flex-col items-center gap-1">
                    <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">promylink</span>
                    <div className="w-full h-0.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </th>
                <th className="py-4 px-4 text-center text-sm font-medium text-muted-foreground">Social Media</th>
                <th className="py-4 px-4 text-center text-sm font-medium text-muted-foreground">Classifieds</th>
                <th className="py-4 px-4 text-center text-sm font-medium text-muted-foreground">Ad Platforms</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={`border-t border-border/40 transition-all duration-500 hover:bg-secondary/30 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  style={{ transitionDelay: `${300 + index * 80}ms` }}
                >
                  <td className="py-4 px-4 text-sm font-medium">{feature.name}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <StatusIcon value={feature.promylink} />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4"><div className="flex justify-center"><StatusIcon value={feature.socialMedia} /></div></td>
                  <td className="py-4 px-4"><div className="flex justify-center"><StatusIcon value={feature.classifieds} /></div></td>
                  <td className="py-4 px-4"><div className="flex justify-center"><StatusIcon value={feature.adPlatforms} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
