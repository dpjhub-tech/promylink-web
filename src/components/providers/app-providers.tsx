"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsentBanner } from "@/components/permissions/cookie-consent-banner";
import { InstallBanner } from "@/components/pwa/install-banner";
import { MobileApkBanner } from "@/components/pwa/mobile-apk-banner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster />
        <CookieConsentBanner />
        <InstallBanner />
        <MobileApkBanner />
      </AuthProvider>
    </QueryClientProvider>
  );
}
