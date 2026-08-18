"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/use-categories";

// Faithful port of Promylink/src/pages/Categories.tsx. Subcategories now
// come nested off GET /categories (see categories.service.ts), so no
// separate subcategories query is needed like the original's second
// supabase.from('subcategories') call.
export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover verified promotions across all categories.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-64" />
                        <div className="flex gap-2 mt-3">
                          {Array.from({ length: 4 }).map((_, j) => (
                            <Skeleton key={j} className="h-6 w-20 rounded-full" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-9 w-28 rounded-lg flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="glass-card p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{category.icon}</div>
                      <div>
                        <h2 className="text-xl font-semibold mb-1">{category.name}</h2>
                        <p className="text-muted-foreground mb-4">{category.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/feed?category=${category.id}`}
                              className="category-chip text-xs"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/feed?category=${category.id}`}
                      className="hidden sm:flex items-center gap-2 text-primary hover:underline font-medium whitespace-nowrap"
                    >
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <Link
                    href={`/feed?category=${category.id}`}
                    className="sm:hidden mt-4 flex items-center justify-center gap-2 text-primary font-medium"
                  >
                    View All Posts
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
