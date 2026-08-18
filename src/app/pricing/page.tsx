"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { usePostPrice } from "@/hooks/use-user-location";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight, Check, Crown, CreditCard, HelpCircle, Loader2, MousePointerClick, Sparkles, Star, Wallet, X, Zap,
} from "lucide-react";

// Faithful visual port of Promylink/src/pages/Pricing.tsx. Payments, wallet
// credits, subscriptions and boosts are explicitly out of scope for this
// migration pass (see the scaffolding plan) — no backend module exists yet
// for Razorpay/wallet-spend, so every price/plan/tier display and the
// coupon+custom-slider calculators are fully live (all pure client math,
// same formulas as the original), but the buy/subscribe CTAs fall back to
// the same "not eligible yet" path the original takes for unverified users:
// send them to /login if signed out, /create-post otherwise. The post-picker
// and Boost/ClickPackage dialogs (which call wallet-spend/razorpay under the
// hood) aren't ported — there's no eligible-post flow to pick from yet.

type PlanId = "free" | "premium" | "business_pro" | "enterprise";

type PlanConfig = {
  id: PlanId;
  name: string;
  icon: React.ElementType;
  priceINR: number;
  priceUSD: number;
  monthlyClicks: number;
  monthlyImpressions: number;
  features: string[];
  popular?: boolean;
};

type ClickTierConfig = {
  name: string;
  clicks: number;
  priceINR: number;
  priceUSD: number;
  popular?: boolean;
};

const GST_RATE = 0.18;
const COUPONS: Record<string, { discount: number; label: string }> = {
  WELCOME20: { discount: 0.2, label: "20% OFF" },
};

const PLANS: PlanConfig[] = [
  {
    id: "free",
    name: "Free",
    icon: Sparkles,
    priceINR: 0,
    priceUSD: 0,
    monthlyClicks: 0,
    monthlyImpressions: 0,
    features: [
      "1 free post after KYC",
      "20 clicks + 50 impressions on that first post",
      "Search and browse all live posts",
      "Recharge later with credits or direct payment",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    icon: Star,
    priceINR: 500,
    priceUSD: 15,
    monthlyClicks: 500,
    monthlyImpressions: 800,
    features: [
      "500 monthly clicks",
      "800 monthly impressions",
      "590 bonus credits / month in India",
      "10 AI credits / month",
      "Banner + keyword support",
    ],
  },
  {
    id: "business_pro",
    name: "Business Pro",
    icon: Crown,
    priceINR: 1500,
    priceUSD: 30,
    monthlyClicks: 1000,
    monthlyImpressions: 2000,
    features: [
      "1000 monthly clicks",
      "2000 monthly impressions",
      "1800 bonus credits / month in India",
      "30 AI credits / month",
      "Higher visibility + verified badge",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Sparkles,
    priceINR: 5990,
    priceUSD: 99,
    monthlyClicks: 5000,
    monthlyImpressions: 10000,
    popular: true,
    features: [
      "5000 monthly clicks",
      "10000 monthly impressions",
      "6060 bonus credits / month in India",
      "200 AI credits / month",
      "Top visibility + dedicated support",
    ],
  },
];

const CLICK_TIERS: ClickTierConfig[] = [
  { name: "Basic", clicks: 100, priceINR: 149, priceUSD: 3 },
  { name: "Value", clicks: 300, priceINR: 399, priceUSD: 8, popular: true },
  { name: "Growth", clicks: 750, priceINR: 799, priceUSD: 15 },
  { name: "Mega", clicks: 2000, priceINR: 1499, priceUSD: 30 },
];

const BOOST_TIERS = [
  { name: "Starter", duration: "6 hours", priceINR: 299, priceUSD: 7, credits: "+60 credits" },
  { name: "Quick", duration: "1 day", priceINR: 599, priceUSD: 12, credits: "+200 credits" },
  { name: "Growth", duration: "3 days", priceINR: 1299, priceUSD: 25, credits: "+600 credits" },
  { name: "Pro", duration: "7 days", priceINR: 2499, priceUSD: 45, credits: "+2000 credits" },
] as const;

const formatClickCount = (n: number) => {
  if (n >= 10000000) return `${(n / 10000000).toFixed(n % 10000000 === 0 ? 0 : 1)}Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return n.toString();
};

export default function PricingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const { loading: locationLoading, isIndia, currency, symbol } = usePostPrice();

  const walletBalance = 0;

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [customClicks, setCustomClicks] = useState(1000);
  const [customClicksInput, setCustomClicksInput] = useState("1000");
  const [customBoostHours, setCustomBoostHours] = useState(24);
  const [customBoostInput, setCustomBoostInput] = useState("24");

  const discountMultiplier = appliedCoupon ? 1 - appliedCoupon.discount : 1;

  const formatPrice = (base: number) => {
    if (base <= 0) return 0;
    const discounted = Math.round(base * discountMultiplier * 100) / 100;
    const gst = Math.round(discounted * GST_RATE * 100) / 100;
    return discounted + gst;
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const coupon = COUPONS[code];
    if (!coupon) {
      setAppliedCoupon(null);
      toast({ title: "Invalid Coupon", description: "This coupon code is not valid.", variant: "destructive" });
      return;
    }
    setAppliedCoupon({ code, ...coupon });
    toast({ title: "Coupon Applied! 🎉", description: `${coupon.label} added.` });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const updateCustomClicks = (value: number) => {
    const next = Math.max(50, Math.min(value, 100000000));
    setCustomClicks(next);
    setCustomClicksInput(String(next));
  };

  const updateCustomBoost = (value: number) => {
    const next = Math.max(1, Math.min(value, 8760));
    setCustomBoostHours(next);
    setCustomBoostInput(String(next));
  };

  const customClickBase = Math.max(Math.round(customClicks * (isIndia ? 10 : 0.2) * discountMultiplier * 100) / 100, (isIndia ? 200 : 1) * discountMultiplier);
  const customClickPrice = Math.round((customClickBase + customClickBase * GST_RATE) * 100) / 100;

  const customBoostBase = Math.max(Math.round(customBoostHours * (isIndia ? 300 : 6) * discountMultiplier * 100) / 100, (isIndia ? 300 : 6) * discountMultiplier);
  const customBoostPrice = Math.round((customBoostBase + customBoostBase * GST_RATE) * 100) / 100;
  const customBoostCredits = Math.round(customBoostHours * 8);

  // No wallet/payment backend yet — same fallback the original uses for
  // ineligible users (not KYC'd / no eligible posts), except the original's
  // target (/create-post) is a page we haven't built, so this says so
  // instead of leading to a 404.
  const goToCheckout = () => {
    if (!user) return router.push("/login");
    toast({ title: "Coming soon", description: "Post creation is still being built." });
  };

  const pageLoading = locationLoading;
  const isCurrentPlan = (planId: PlanId) => planId === "free";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Clicks, boosts, credits, and subscriptions</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Use wallet credits or pay directly. When clicks or impressions finish, recharge whichever way you prefer.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">All prices in {currency}. GST added at checkout where applicable.</p>

            <div className="mx-auto mt-6 max-w-sm">
              {appliedCoupon ? (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3">
                  <Badge variant="verified" className="gap-1">{appliedCoupon.code} — {appliedCoupon.label}</Badge>
                  <button onClick={removeCoupon} className="rounded-full p-1 transition-colors hover:bg-destructive/10">
                    <X className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    className="text-center font-semibold tracking-wider"
                  />
                  <Button variant="outline" onClick={applyCoupon}>Apply</Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {pageLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                  <h2 className="mb-2 text-2xl font-bold">Choose Your Plan</h2>
                  <p className="mx-auto max-w-md text-sm text-muted-foreground">Subscriptions include monthly allocation, bonus credits, and reusable recharge options.</p>
                </div>
                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {PLANS.map((plan) => {
                    const base = isIndia ? plan.priceINR : plan.priceUSD;
                    const total = formatPrice(base);
                    const current = isCurrentPlan(plan.id);
                    const Icon = plan.icon;
                    return (
                      <div key={plan.id} className={`glass-card relative flex flex-col p-6 ${plan.popular ? "ring-2 ring-primary shadow-glow" : ""}`}>
                        {plan.popular && <Badge variant="verified" className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">Most Popular</Badge>}
                        <div className="mb-5 mt-2 text-center">
                          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold">{plan.name}</h3>
                          <div className="mt-2 flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold">{base > 0 ? `${symbol}${total % 1 === 0 ? total : total.toFixed(2)}` : "Free"}</span>
                            {base > 0 && <span className="text-muted-foreground">/mo</span>}
                          </div>
                          {base > 0 && <p className="mt-1 text-xs font-medium text-primary">{plan.monthlyClicks} clicks + {plan.monthlyImpressions} impressions / month</p>}
                        </div>
                        <ul className="mb-6 flex-1 space-y-3 text-sm">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>
                          ))}
                        </ul>
                        {current ? (
                          <Button disabled variant="outline">Current Plan</Button>
                        ) : plan.id === "free" ? (
                          <Button disabled variant="outline">Default Plan</Button>
                        ) : (
                          <Button onClick={goToCheckout} variant={plan.popular ? "gradient" : "default"} className="gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Subscribe
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="bg-secondary/30 py-16">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-xl">
                  <div className="glass-card p-8 text-center ring-2 ring-primary shadow-glow">
                    <h2 className="mb-2 text-2xl font-bold">Posting works with free starter reach</h2>
                    <p className="mb-6 text-sm text-muted-foreground">New verified users get 1 free post after KYC with 20 clicks and 50 impressions. After that, recharge with wallet credits or direct payment.</p>
                    <div className="mb-6 space-y-2 text-left text-sm">
                      {[
                        "1 free post after approved KYC",
                        "20 clicks + 50 impressions on the free starter post",
                        "Paid recharges available later via credits or cash",
                        "Custom click packs and hourly boosts stay available",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</div>
                      ))}
                    </div>
                    <Button
                      variant="gradient"
                      size="lg"
                      className="w-full gap-2"
                      onClick={() => (user ? toast({ title: "Coming soon", description: "Post creation is still being built." }) : router.push("/login"))}
                    >
                      Create Post <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                  <Badge variant="secondary" className="mb-4 gap-1"><MousePointerClick className="h-3 w-3" />Click Packages</Badge>
                  <h2 className="mb-2 text-2xl font-bold">Buy Clicks</h2>
                  <p className="mx-auto max-w-md text-sm text-muted-foreground">Top up posts anytime using direct payment or wallet credits.</p>
                </div>
                <div className="mx-auto mb-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {CLICK_TIERS.map((pkg) => {
                    const total = formatPrice(isIndia ? pkg.priceINR : pkg.priceUSD);
                    return (
                      <div key={pkg.name} className={`glass-card p-5 text-center ${pkg.popular ? "ring-2 ring-primary" : ""}`}>
                        {pkg.popular && <Badge variant="verified" className="mb-2">Best Value</Badge>}
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <MousePointerClick className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{pkg.name}</h3>
                        <p className="text-2xl font-bold text-primary">{pkg.clicks.toLocaleString()}</p>
                        <p className="mb-4 text-xs text-muted-foreground">clicks</p>
                        <p className="mb-4 text-lg font-bold">{symbol}{total % 1 === 0 ? total : total.toFixed(2)}</p>
                        <Button variant="outline" size="sm" className="w-full" onClick={goToCheckout}>Buy Clicks</Button>
                      </div>
                    );
                  })}
                </div>

                <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /><span className="text-sm font-medium">Wallet Balance</span></div>
                    <span className="text-sm font-bold text-primary">{walletBalance.toLocaleString()} credits</span>
                  </div>
                  <h3 className="text-center text-xl font-semibold">Custom Click Package</h3>
                  <p className="mb-4 text-center text-sm text-muted-foreground">Choose any amount and pay however you want.</p>
                  <div className="space-y-4">
                    <Slider
                      value={[Math.min(Math.log10(Math.max(customClicks, 50)) * 10, 90)]}
                      onValueChange={([v]) => updateCustomClicks(Math.max(50, Math.round(Math.pow(10, v / 10) / 50) * 50))}
                      min={17}
                      max={90}
                      step={1}
                    />
                    <Input
                      type="number"
                      min={50}
                      max={100000000}
                      value={customClicksInput}
                      onChange={(e) => setCustomClicksInput(e.target.value)}
                      onBlur={() => updateCustomClicks(parseInt(customClicksInput || "1000", 10))}
                      className="text-center font-bold"
                    />
                    <div className="border-t border-border pt-3 text-center">
                      <p className="text-3xl font-bold text-primary">{symbol}{customClickPrice % 1 === 0 ? customClickPrice.toLocaleString() : customClickPrice.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{formatClickCount(customClicks)} clicks · {symbol}{(customClickPrice / customClicks).toFixed(4)}/click</p>
                    </div>
                    <Button variant="gradient" className="w-full gap-2" onClick={goToCheckout}>
                      <CreditCard className="h-4 w-4" />
                      Pay {symbol}{customClickPrice % 1 === 0 ? customClickPrice.toLocaleString() : customClickPrice.toFixed(2)} via Razorpay
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-secondary/30 py-16">
              <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                  <Badge variant="boost" className="mb-4 gap-1"><Zap className="h-3 w-3" />Boosts</Badge>
                  <h2 className="mb-2 text-2xl font-bold">Buy Boosts</h2>
                  <p className="text-sm text-muted-foreground">Hourly visibility boosts can also be paid from wallet or direct checkout.</p>
                </div>
                <div className="mx-auto mb-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {BOOST_TIERS.map((boost) => {
                    const total = formatPrice(isIndia ? boost.priceINR : boost.priceUSD);
                    return (
                      <div key={boost.name} className="glass-card p-5 text-center">
                        <div className="gradient-boost mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold">{boost.name}</h3>
                        <p className="mb-3 text-sm text-muted-foreground">{boost.duration}</p>
                        <p className="text-lg font-bold">{symbol}{total % 1 === 0 ? total : total.toFixed(2)}</p>
                        <p className="mb-4 text-xs font-medium text-primary">{boost.credits}</p>
                        <Button variant="outline" size="sm" className="w-full" onClick={goToCheckout}>Add Boost</Button>
                      </div>
                    );
                  })}
                </div>

                <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /><span className="text-sm font-medium">Wallet Balance</span></div>
                    <span className="text-sm font-bold text-primary">{walletBalance.toLocaleString()} credits</span>
                  </div>
                  <h3 className="text-center text-xl font-semibold">Custom Boost Duration</h3>
                  <p className="mb-4 text-center text-sm text-muted-foreground">Choose any duration and recharge when needed.</p>
                  <div className="space-y-4">
                    <Slider value={[Math.min(customBoostHours, 8760)]} onValueChange={([v]) => updateCustomBoost(v)} min={1} max={8760} step={1} />
                    <Input type="number" min={1} max={8760} value={customBoostInput} onChange={(e) => setCustomBoostInput(e.target.value)} onBlur={() => updateCustomBoost(parseInt(customBoostInput || "24", 10))} className="text-center font-bold" />
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-sm font-medium">{customBoostHours} hours</p>
                      <p className="text-xs text-muted-foreground">+{customBoostCredits.toLocaleString()} bonus credits</p>
                    </div>
                    <div className="border-t border-border pt-3 text-center">
                      <p className="text-3xl font-bold text-primary">{symbol}{customBoostPrice % 1 === 0 ? customBoostPrice.toLocaleString() : customBoostPrice.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">hourly basis boost with recharge flexibility</p>
                    </div>
                    <Button variant="gradient" className="w-full gap-2" onClick={goToCheckout}>
                      <CreditCard className="h-4 w-4" />
                      Pay {symbol}{customBoostPrice % 1 === 0 ? customBoostPrice.toLocaleString() : customBoostPrice.toFixed(2)} via Razorpay
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl space-y-4">
                  {[
                    { q: "What happens when clicks or impressions run out?", a: "The post slows down or goes on hold, and you can recharge later using credits or direct payment." },
                    { q: "Can I buy clicks without a subscription?", a: "Yes. Click packs and custom click purchases work independently from subscriptions." },
                    { q: "Can I boost on an hourly basis?", a: "Yes. Fixed boosts and custom hourly boosts are both available." },
                    { q: "Do I need Twilio for these changes?", a: "No. Payment and recharge flows work without mobile OTP setup." },
                  ].map((faq) => (
                    <div key={faq.q} className="glass-card p-5">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <h3 className="mb-2 font-semibold">{faq.q}</h3>
                          <p className="text-sm text-muted-foreground">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
