"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Plus, LogOut, Settings, Building2, Video, Search } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { HeaderCredits } from "@/components/layout/header-credits";
import { PostTypeChooser } from "@/components/create-post/post-type-chooser";
import { PromylinkLogoIcon } from "@/components/ui/promylink-logo";
import { useToast } from "@/hooks/use-toast";

// Faithful structural port of Promylink/src/components/layout/Header.tsx.
// Wallet credits (HeaderCredits) are wired to real data. Notifications,
// the language selector, live user search, and the create-post flow depend
// on unbuilt backend modules and stay simplified to static/visual
// stand-ins for now — see the comments inline.
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTypeChooserOpen, setIsTypeChooserOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  // Mirrors CreatePostProvider.openTypeChooser from the original: the
  // header button opens a type-chooser popup, it never navigates to a
  // "/create-post" page. The deeper Banner Link / Short Video creation
  // forms (multi-step, KYC + payment gated) aren't built yet — out of
  // scope for this pass — so picking either option here just says so
  // instead of opening a broken flow.
  const handleCreatePostClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setIsTypeChooserOpen(true);
  };

  const handleChooseType = (type: "link" | "video") => {
    toast({
      title: "Coming soon",
      description: type === "link"
        ? "Banner link posting is still being built."
        : "Short video posting is still being built.",
    });
  };

  const navLinks = [
    { name: "Categories", href: "/categories" },
    { name: "Search Profiles", href: "/profiles" },
    { name: "Pricing", href: "/pricing" },
    { name: "Saved", href: "/saved" },
    { name: "Customer Service", href: "/customer-service" },
    ...(user ? [{ name: "My Posts", href: "/dashboard" }] : []),
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <PromylinkLogoIcon className="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight brand-text-animated">PromyLink</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search profiles…"
                className="input-search !pl-10"
                readOnly
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <HeaderCredits />
            <Button variant="gradient" size="sm" className="gap-1.5 whitespace-nowrap" onClick={handleCreatePostClick}>
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
            {user ? (
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">Sign in</Button>
              </Link>
            )}
          </div>

          <button
            className="p-2 rounded-lg hover:bg-secondary flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="py-4 border-t border-border animate-slide-up">
            {user && (
              <div className="md:hidden px-4 mb-3 flex items-center gap-3">
                <HeaderCredits />
              </div>
            )}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border flex flex-col gap-2">
                {user ? (
                  <>
                    <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <Settings className="h-4 w-4" />
                        Account Settings
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => { signOut(); setIsMenuOpen(false); }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign in</Button>
                    </Link>
                    <Link href="/creator/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full gap-2 text-accent">
                        <Video className="h-4 w-4" />
                        Creator Login
                      </Button>
                    </Link>
                    <Link href="/business/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full gap-2 text-amber-600 dark:text-amber-400">
                        <Building2 className="h-4 w-4" />
                        Business Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      <PostTypeChooser
        open={isTypeChooserOpen}
        onOpenChange={setIsTypeChooserOpen}
        onChooseLink={() => handleChooseType("link")}
        onChooseVideo={() => handleChooseType("video")}
      />
    </header>
  );
}
