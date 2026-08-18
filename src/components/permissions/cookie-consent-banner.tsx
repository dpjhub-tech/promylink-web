"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function CookieConsentBanner() {
  const { hasConsented, acceptAll, acceptEssentialOnly, updatePreferences } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  if (hasConsented) return null;

  const handleSavePreferences = () => {
    updatePreferences({ essential: true, analytics: analyticsEnabled });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 animate-fade-in">
      <div className="max-w-lg mx-auto bg-card rounded-xl p-3 border border-border shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <Cookie className="h-4 w-4 text-primary shrink-0" />
          <span className="font-semibold text-xs">We use cookies</span>
          <span className="text-[10px] text-muted-foreground ml-auto">
            <Link href="/privacy" className="underline">Privacy</Link>
          </span>
        </div>

        {showDetails && (
          <div className="space-y-2 py-2 border-t border-border mb-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-muted-foreground" />
                <Label className="text-xs">Essential</Label>
              </div>
              <Switch checked disabled className="opacity-60 scale-75" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Cookie className="h-3 w-3 text-muted-foreground" />
                <Label className="text-xs">Analytics</Label>
              </div>
              <Switch checked={analyticsEnabled} onCheckedChange={setAnalyticsEnabled} className="scale-75" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 flex-wrap">
          <Button size="sm" variant="gradient" onClick={acceptAll} className="text-xs h-7 px-3">
            Accept All
          </Button>
          <Button size="sm" variant="outline" onClick={acceptEssentialOnly} className="text-xs h-7 px-3">
            Essential Only
          </Button>
          {showDetails && (
            <Button size="sm" variant="ghost" onClick={handleSavePreferences} className="text-xs h-7 px-3">
              Save
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs h-7 px-2 ml-auto gap-1"
          >
            {showDetails ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
            {showDetails ? "Less" : "More"}
          </Button>
        </div>
      </div>
    </div>
  );
}
