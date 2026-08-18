"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DESIGNATIONS, getDesignationLabel } from "@/data/designations";
import { apiFetch } from "@/lib/api";
import type { SearchableProfile } from "@/lib/profile-search-types";
import { Search, Star, SlidersHorizontal, CheckCircle2, X, Users } from "lucide-react";

// Faithful port of Promylink/src/pages/Profiles.tsx, backed by the new
// GET /profiles/search endpoint (Prisma `contains`/ilike query over the
// profiles table) instead of a direct Supabase `profiles_searchable` view
// query — search now runs against local Postgres.
const designationGroups = Array.from(new Set(DESIGNATIONS.map((d) => d.group)));

export default function ProfilesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedDesignations, setSelectedDesignations] = useState<string[]>(
    searchParams.get("d")?.split(",").filter(Boolean) || [],
  );
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get("v") === "1");
  const [minRating, setMinRating] = useState<number>(Number(searchParams.get("r")) || 0);
  const [profiles, setProfiles] = useState<SearchableProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set("q", search);
    if (selectedDesignations.length) next.set("d", selectedDesignations.join(","));
    if (verifiedOnly) next.set("v", "1");
    if (minRating > 0) next.set("r", String(minRating));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [search, selectedDesignations, verifiedOnly, minRating, pathname, router]);

  useEffect(() => {
    let active = true;
    const t = setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (search.trim()) params.set("q", search.trim());
      if (selectedDesignations.length) params.set("d", selectedDesignations.join(","));
      if (verifiedOnly) params.set("v", "true");
      if (minRating > 0) params.set("r", String(minRating));

      try {
        const data = await apiFetch<SearchableProfile[]>(`/profiles/search?${params.toString()}`);
        if (active) setProfiles(data);
      } catch {
        if (active) setProfiles([]);
      }
      if (active) setLoading(false);
    }, 300);
    return () => { active = false; clearTimeout(t); };
  }, [search, selectedDesignations, verifiedOnly, minRating]);

  const activeFilterCount = useMemo(
    () => selectedDesignations.length + (verifiedOnly ? 1 : 0) + (minRating > 0 ? 1 : 0),
    [selectedDesignations, verifiedOnly, minRating],
  );

  const clearFilters = () => {
    setSelectedDesignations([]);
    setVerifiedOnly(false);
    setMinRating(0);
  };

  const FiltersPanel = (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold mb-2">Designation</p>
        {designationGroups.map((group) => (
          <div key={group} className="mb-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">{group}</p>
            <div className="flex flex-wrap gap-1.5">
              {DESIGNATIONS.filter((d) => d.group === group).map((d) => {
                const active = selectedDesignations.includes(d.slug);
                return (
                  <button
                    key={d.slug}
                    onClick={() =>
                      setSelectedDesignations((prev) =>
                        prev.includes(d.slug) ? prev.filter((s) => s !== d.slug) : [...prev, d.slug],
                      )
                    }
                    className={`px-2.5 py-1 rounded-full text-xs border transition-all ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/40 bg-background"
                    }`}
                  >
                    <span className="mr-1">{d.emoji}</span>{d.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Minimum Rating</p>
        <div className="flex gap-1.5">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs border transition-all flex items-center justify-center gap-1 ${
                minRating === r ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
              }`}
            >
              {r === 0 ? "Any" : <><Star className="h-3 w-3 fill-current" />{r}+</>}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center justify-between cursor-pointer rounded-lg border border-border p-3 hover:border-primary/40">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Verified profiles only</span>
        </div>
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => setVerifiedOnly(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-primary"
        />
      </label>

      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full gap-1.5">
          <X className="h-3.5 w-3.5" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Discover Profiles
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Search creators, professionals, and businesses by designation, verification, and ratings.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-5 sticky top-16 bg-background/85 backdrop-blur-md py-2 -mx-4 px-4 z-10 border-b border-border/40">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, handle, bio, or designation…"
                className="pl-9"
              />
            </div>
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Profiles</SheetTitle>
                </SheetHeader>
                <div className="mt-4">{FiltersPanel}</div>
              </SheetContent>
            </Sheet>
          </div>

          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedDesignations.map((slug) => (
                <Badge key={slug} variant="secondary" className="gap-1">
                  {getDesignationLabel(slug)}
                  <button onClick={() => setSelectedDesignations((p) => p.filter((s) => s !== slug))}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {verifiedOnly && (
                <Badge variant="secondary" className="gap-1">
                  Verified <button onClick={() => setVerifiedOnly(false)}><X className="h-3 w-3" /></button>
                </Badge>
              )}
              {minRating > 0 && (
                <Badge variant="secondary" className="gap-1">
                  {minRating}+ stars <button onClick={() => setMinRating(0)}><X className="h-3 w-3" /></button>
                </Badge>
              )}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4 h-40 animate-pulse" />
              ))}
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-muted-foreground">No profiles match these filters</p>
              {activeFilterCount > 0 && (
                <Button variant="link" onClick={clearFilters}>Clear filters</Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profiles.map((p) => {
                const label = getDesignationLabel(p.designation, p.designationCustom);
                return (
                  <div
                    key={p.id}
                    className="text-left rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={p.avatarUrl || ""} alt={p.name ?? "User"} />
                        <AvatarFallback>{p.name?.charAt(0) || "?"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold truncate">{p.name || "User"}</p>
                          {p.isVerified && <CheckCircle2 className="h-3.5 w-3.5 text-primary fill-primary stroke-primary-foreground shrink-0" />}
                        </div>
                        {p.username && <p className="text-xs text-muted-foreground truncate">@{p.username}</p>}
                        {label && (
                          <Badge variant="secondary" className="mt-1 text-[10px] px-1.5 py-0 font-normal">
                            {label}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {p.bio && (
                      <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{p.bio}</p>
                    )}
                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">{p.avgRating.toFixed(1)}</span>
                      <span>· {p.ratingCount} {p.ratingCount === 1 ? "rating" : "ratings"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
