"use client";

import { Search, MousePointerClick, Star, Smartphone, ArrowDown, CheckCircle2, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Search Any Premium Link",
    description: "Browse thousands of verified premium links — coupons, jobs, apps, services, courses & more. All in one place.",
    highlight: "Find anything premium instantly",
    gradient: "from-[hsl(200_85%_45%)] to-[hsl(200_85%_60%)]",
  },
  {
    icon: MousePointerClick,
    number: "02",
    title: "Click & Apply Directly",
    description: "Every link is verified by our team. Click to visit, apply coupons, download apps, or access services — zero redirects.",
    highlight: "One click, zero hassle",
    gradient: "from-[hsl(320_72%_48%)] to-[hsl(340_80%_55%)]",
  },
  {
    icon: Star,
    number: "03",
    title: "Save & Rate Links",
    description: "Bookmark your favourites, rate quality, and help the community discover the best premium content.",
    highlight: "Your personal premium library",
    gradient: "from-[hsl(280_70%_50%)] to-[hsl(320_72%_48%)]",
  },
  {
    icon: Smartphone,
    number: "04",
    title: "Get Notifications",
    description: "Install the app and receive push alerts when new premium links drop in your favourite categories.",
    highlight: "Never miss a premium deal",
    gradient: "from-[hsl(160_65%_40%)] to-[hsl(200_85%_45%)]",
  },
];

export function HowPromylinkWorks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Super Simple</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            How <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Promylink</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding and applying premium links has never been this easy. Four simple steps to access the best services globally.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-40px]"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border-l-4 border-transparent hover:border-l-primary">
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                    {step.number}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {step.highlight}
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center my-2 text-muted-foreground/30">
                  <ArrowDown className="h-6 w-6 animate-bounce" style={{ animationDelay: `${index * 200}ms` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
