"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { Download, Smartphone, CheckCircle2, Zap, Shield, Wifi } from "lucide-react";

// Faithful port of Promylink/src/pages/Install.tsx.
export default function InstallPage() {
  const { canInstall, isInstalled, install } = usePWAInstall();

  const benefits = [
    { icon: Zap, title: "Lightning Fast", desc: "Instant load times with offline support" },
    { icon: Shield, title: "Safe & Secure", desc: "Same trusted platform, app experience" },
    { icon: Wifi, title: "Works Offline", desc: "Browse saved content without internet" },
    { icon: Smartphone, title: "Home Screen", desc: "Launch like a native app from your device" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center">
            <Smartphone className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-3">Get the Promylink App</h1>
          <p className="text-muted-foreground mb-8">
            Install Promylink on your device for the best experience — no app store needed.
          </p>

          {isInstalled ? (
            <div className="flex items-center justify-center gap-2 text-primary font-medium mb-8">
              <CheckCircle2 className="h-5 w-5" />
              App is already installed!
            </div>
          ) : canInstall ? (
            <Button variant="gradient" size="lg" className="gap-2 mb-8" onClick={install}>
              <Download className="h-5 w-5" />
              Install Now
            </Button>
          ) : (
            <div className="glass-card p-4 mb-8 text-left text-sm space-y-2">
              <p className="font-medium">How to install:</p>
              <p className="text-muted-foreground">
                <strong>Android:</strong> Tap the browser menu (⋮) → &quot;Add to Home Screen&quot;
              </p>
              <p className="text-muted-foreground">
                <strong>iPhone/iPad:</strong> Tap Share (↑) → &quot;Add to Home Screen&quot;
              </p>
              <p className="text-muted-foreground">
                <strong>Desktop:</strong> Click the install icon in your browser&apos;s address bar
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="glass-card p-4 text-center">
                <b.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-semibold text-sm">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
