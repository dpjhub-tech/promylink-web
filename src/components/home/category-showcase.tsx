"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function CategoryShowcase() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Browse</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find premium links, deals, and services across every category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`group glass-card p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-3">{category.icon}</div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors text-sm">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
