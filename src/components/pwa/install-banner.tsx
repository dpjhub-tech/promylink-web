"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { Download, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const DISMISS_KEY = "pwa_install_dismissed";

// Faithful port of Promylink/src/components/pwa/InstallBanner.tsx. Note:
// this only ever appears once the app is served as an installable PWA
// (valid manifest.json + HTTPS/service worker) — Next.js PWA support hasn't
// been set up yet, so `beforeinstallprompt` won't fire and this stays
// silent for now, same as it would in the original on a non-PWA build.
export function InstallBanner() {
  const { canInstall, isInstalled, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "true") setDismissed(true);
    } catch { }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(DISMISS_KEY, "true"); } catch { }
  };

  if (!canInstall || isInstalled || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-fade-in">
      <div className="glass-card p-4 shadow-xl border-primary/20 border-2 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 bg-secondary/60 border border-border/50 shadow-sm relative flex items-center justify-center p-1.5">
            <Image src="/logo.png" alt="Promylink" fill className="object-contain p-1" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">Install Promylink</p>
            <p className="text-xs text-muted-foreground">
              {isMobile
                ? "Add to your home screen for the full app experience"
                : "Install on your desktop for quick access anytime"}
            </p>
          </div>
          <Button size="sm" variant="gradient" className="gap-1.5 shrink-0" onClick={install}>
            <Download className="h-3.5 w-3.5" />
            Install
          </Button>
        </div>
      </div>
    </div>
  );
}
