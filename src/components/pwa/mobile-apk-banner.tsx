"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, X, Smartphone } from "lucide-react";

const DISMISS_KEY = "apk_banner_dismissed";

function useIsMobileUA() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsMobile(/android|iphone|ipad|ipod/.test(ua));
  }, []);
  return isMobile;
}

function isAppInstalled() {
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  if ((window.navigator as unknown as { standalone?: boolean }).standalone === true) return true;
  if ((window as unknown as { Capacitor?: unknown }).Capacitor) return true;
  return false;
}

export function MobileApkBanner() {
  const isMobile = useIsMobileUA();
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isAppInstalled());
    try {
      if (localStorage.getItem(DISMISS_KEY) === "true") setDismissed(true);
    } catch {}
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(DISMISS_KEY, "true"); } catch {}
  };

  if (!isMobile || dismissed || installed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      <div className="bg-card border-t border-border shadow-2xl p-4 relative">
        <div className="container mx-auto max-w-md">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Get Promylink App</p>
              <p className="text-xs text-muted-foreground">
                Download &amp; install for the best experience
              </p>
            </div>
            <Button size="sm" variant="gradient" className="gap-1.5 shrink-0" asChild>
              <Link href="/download">
                <Download className="h-3.5 w-3.5" />
                Install
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
