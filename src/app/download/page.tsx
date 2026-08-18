"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import {
  Download,
  Smartphone,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  Monitor,
  Apple,
} from "lucide-react";

function useDeviceDetect() {
  const [device, setDevice] = useState<"android" | "ios" | "desktop">("desktop");
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) setDevice("android");
    else if (/iphone|ipad|ipod/.test(ua)) setDevice("ios");
    else setDevice("desktop");
  }, []);
  return device;
}

// Faithful port of Promylink/src/pages/DownloadApp.tsx. The "Download APK"
// link points at /promylink.apk, same as the original — that file is only
// produced by a separate Capacitor native-build pipeline, which is out of
// scope for this migration pass (per the scaffolding plan), so it 404s in
// both the original repo and here until that build exists.
export default function DownloadAppPage() {
  const device = useDeviceDetect();
  const { canInstall, isInstalled, install } = usePWAInstall();

  const features = [
    { icon: Zap, title: "Lightning Fast", desc: "Native-like performance with instant load" },
    { icon: Shield, title: "Secure & Verified", desc: "KYC-verified posters only" },
    { icon: Globe, title: "Works Offline", desc: "Browse saved content without internet" },
    { icon: Smartphone, title: "Push Notifications", desc: "Get notified about new promos" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center shadow-lg">
              <Smartphone className="h-12 w-12 text-white" />
            </div>

            <Badge variant="secondary" className="mb-4">
              {device === "android" ? "Android App" : device === "ios" ? "iOS App" : "Get the App"}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Promylink on Your Device
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Install the Promylink app for the best experience — faster, smoother, and always at your fingertips.
            </p>

            <div className="space-y-4">
              {device === "android" && (
                <div className="glass-card p-6 max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3ddc84]/10 flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-[#3ddc84]" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Android APK</p>
                      <p className="text-xs text-muted-foreground">Direct download · No Play Store needed</p>
                    </div>
                  </div>
                  <Button variant="gradient" size="lg" className="w-full gap-2" asChild>
                    <a href="/promylink.apk" download>
                      <Download className="h-5 w-5" />
                      Download APK
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    You may need to enable &quot;Install from unknown sources&quot; in your device settings.
                  </p>
                </div>
              )}

              {device === "ios" && (
                <div className="glass-card p-6 max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <Apple className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Install on iPhone/iPad</p>
                      <p className="text-xs text-muted-foreground">Add to Home Screen from Safari</p>
                    </div>
                  </div>
                  {canInstall ? (
                    <Button variant="gradient" size="lg" className="w-full gap-2" onClick={install}>
                      <Download className="h-5 w-5" />
                      Install App
                    </Button>
                  ) : isInstalled ? (
                    <div className="flex items-center justify-center gap-2 text-primary font-medium py-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Already installed!
                    </div>
                  ) : (
                    <div className="text-left text-sm space-y-2 bg-muted/50 rounded-lg p-4">
                      <p className="font-medium">How to install:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Tap the <strong>Share</strong> button (↑) in Safari</li>
                        <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong></li>
                        <li>Tap <strong>&quot;Add&quot;</strong> to confirm</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {device === "desktop" && (
                <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="glass-card p-5 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#3ddc84]/10 flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-[#3ddc84]" />
                    </div>
                    <p className="font-semibold mb-1">Android</p>
                    <p className="text-xs text-muted-foreground mb-3">Download APK directly</p>
                    <Button variant="outline" size="sm" className="w-full gap-1.5" asChild>
                      <a href="/promylink.apk" download>
                        <Download className="h-3.5 w-3.5" />
                        Download APK
                      </a>
                    </Button>
                  </div>
                  <div className="glass-card p-5 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-muted flex items-center justify-center">
                      <Monitor className="h-6 w-6" />
                    </div>
                    <p className="font-semibold mb-1">Desktop / iOS</p>
                    <p className="text-xs text-muted-foreground mb-3">Install as web app</p>
                    {canInstall ? (
                      <Button variant="outline" size="sm" className="w-full gap-1.5" onClick={install}>
                        <Download className="h-3.5 w-3.5" />
                        Install PWA
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full gap-1.5" asChild>
                        <a href="/install">
                          <Download className="h-3.5 w-3.5" />
                          View Instructions
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Why Use the App?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {features.map((f) => (
                <div key={f.title} className="glass-card p-5 text-center">
                  <f.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="font-semibold mb-1">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-8">How to Install on Android</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Download the APK", desc: "Tap the download button above to get the Promylink APK file." },
                { step: "2", title: "Enable Unknown Sources", desc: "Go to Settings → Security → Enable \"Install from unknown sources\" for your browser." },
                { step: "3", title: "Install the App", desc: "Open the downloaded APK file and tap \"Install\"." },
                { step: "4", title: "Launch & Enjoy", desc: "Find Promylink on your home screen and start exploring verified promotions!" },
              ].map((item) => (
                <div key={item.step} className="glass-card p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0 text-white font-bold">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
