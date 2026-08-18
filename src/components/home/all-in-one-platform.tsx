"use client";

import { Link2, ShoppingBag, Briefcase, GraduationCap, Smartphone, Heart, Home, Globe, MapPin, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  { icon: Link2, name: "Premium Links", desc: "Curated, verified links to top services", color: "from-[hsl(200_85%_45%)] to-[hsl(200_85%_60%)]" },
  { icon: ShoppingBag, name: "Coupons & Deals", desc: "Exclusive discounts from trusted brands", color: "from-[hsl(160_65%_40%)] to-[hsl(160_65%_55%)]" },
  { icon: Briefcase, name: "Job Listings", desc: "Verified job openings across industries", color: "from-[hsl(220_70%_50%)] to-[hsl(220_70%_65%)]" },
  { icon: GraduationCap, name: "Courses & Learning", desc: "Best online courses and certifications", color: "from-[hsl(280_70%_50%)] to-[hsl(280_70%_65%)]" },
  { icon: Smartphone, name: "Apps & Software", desc: "Top-rated apps and digital tools", color: "from-[hsl(320_72%_48%)] to-[hsl(340_80%_55%)]" },
  { icon: Heart, name: "Health & Wellness", desc: "Premium health services and products", color: "from-[hsl(350_70%_50%)] to-[hsl(350_70%_65%)]" },
  { icon: Home, name: "Real Estate", desc: "Verified property listings and services", color: "from-[hsl(38_92%_50%)] to-[hsl(38_92%_60%)]" },
  { icon: Globe, name: "Travel & Tourism", desc: "Best travel deals and experiences", color: "from-[hsl(180_60%_40%)] to-[hsl(180_60%_55%)]" },
];

export function AllInOnePlatform() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold text-accent">All-in-1 Platform</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Everything Premium,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">One Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop searching across dozens of websites. Promylink brings every premium service — nearby and globally — into one powerful, verified platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`group glass-card p-5 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <service.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold mb-1">{service.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className={`max-w-4xl mx-auto grid md:grid-cols-2 gap-4 mb-10 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="glass-card p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Find Services Nearby</h3>
              <p className="text-sm text-muted-foreground">
                Location-based discovery shows you the best premium services in your city, state, and country.
              </p>
            </div>
          </div>
          <div className="glass-card p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Globe className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Explore Globally</h3>
              <p className="text-sm text-muted-foreground">
                Access premium links from around the world. The best services aren&apos;t limited by borders.
              </p>
            </div>
          </div>
        </div>

        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link href="/feed">
            <Button variant="gradient" size="xl" className="gap-2 group">
              Explore All Services
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
