"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Megaphone,
  Users,
  Search,
  TrendingUp,
  Link2,
  Briefcase,
  Grid3x3,
  ChevronDown,
  ArrowRight,
  Check,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";

const GOAL_OPTIONS = [
  {
    id: "promote-business",
    icon: Megaphone,
    title: "Promote my organization",
    description: "Promote my brand, products or services",
  },
  {
    id: "run-creator-campaigns",
    icon: Users,
    title: "Run creator campaigns",
    description: "Run influencer / creator marketing campaigns",
  },
  {
    id: "find-creators",
    icon: Search,
    title: "Find creators",
    description: "Discover and connect with creators",
  },
  {
    id: "generate-leads",
    icon: TrendingUp,
    title: "Generate leads",
    description: "Drive leads and grow my customer base",
  },
  {
    id: "affiliate-campaigns",
    icon: Link2,
    title: "Affiliate campaigns",
    description: "Run affiliate or performance campaigns",
  },
  {
    id: "manage-campaigns-clients",
    icon: Briefcase,
    title: "Manage campaigns for clients",
    description: "I manage campaigns for other organizations",
  },
];

const TARGET_INDUSTRIES = [
  "Software & Technology",
  "E-commerce & Retail",
  "Fashion & Apparel",
  "Beauty & Personal Care",
  "Health & Wellness",
  "Food & Beverage",
  "Finance & Fintech",
  "Gaming & Esports",
  "Travel & Hospitality",
  "Education & EdTech",
  "Real Estate",
  "Entertainment & Media",
  "Other",
];

const REFERRAL_SOURCES = [
  "Social Media (Instagram, LinkedIn, X, YouTube)",
  "Search Engine (Google, Bing)",
  "Friend or Colleague Recommendation",
  "Creator / Influencer Referral",
  "Industry Event / Conference",
  "Blog / News Article",
  "Online Advertisement",
  "Other",
];

const DESCRIPTION_MAX = 500;

// Step 3 of 6: Goals & Preferences
export default function GoalsPreferencesPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "promote-business",
    "manage-campaigns-clients",
  ]);
  const [targetIndustry, setTargetIndustry] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <WizardShell currentIndex={2} backHref="/organization/signup/organization-information">
      <h2 className="text-2xl font-bold text-brand-text-primary">Goals &amp; Preferences</h2>
      <p className="text-sm text-brand-text-muted mt-1 mb-6">
        Tell us what you want to achieve with PromyLink. You can select multiple options.
      </p>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          // Step 3 -> Step 4 navigation for future work
          router.push("/organization/signup/workspace-setup");
        }}
      >
        {/* Section 1: Goal Selection */}
        <div>
          <label className="block text-sm font-semibold text-brand-text-primary">
            What do you want to use PromyLink for?
          </label>
          <p className="text-xs text-brand-text-muted mb-3">Select all that apply.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {GOAL_OPTIONS.map(({ id, icon: Icon, title, description }) => {
              const isSelected = selectedGoals.includes(id);

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleGoal(id)}
                  className={`flex items-start justify-between text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-brand-primary bg-brand-primary/[0.04] ring-1 ring-brand-primary/20"
                      : "border-brand-border bg-brand-surface hover:border-brand-border-strong"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isSelected
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "bg-brand-surface-secondary text-brand-text-muted"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-brand-text-primary leading-tight">
                        {title}
                      </p>
                      <p className="text-[11px] text-brand-text-muted mt-1 leading-snug">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors mt-0.5 ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-brand-border bg-brand-surface"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Target Industries */}
        <div>
          <label className="block text-sm font-semibold text-brand-text-primary">
            What are your target Industries? (Optional)
          </label>
          <p className="text-xs text-brand-text-muted mb-2">
            Select the industries you primarily work with.
          </p>
          <div className="relative">
            <Grid3x3 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
            <select
              value={targetIndustry}
              onChange={(e) => setTargetIndustry(e.target.value)}
              className="w-full h-12 appearance-none rounded-[10px] border border-brand-border bg-brand-surface pl-11 pr-10 text-sm text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors cursor-pointer"
            >
              <option value="">Select industries</option>
              {TARGET_INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Section 3: Referral Source */}
        <div>
          <label className="block text-sm font-semibold text-brand-text-primary">
            How did you hear about PromyLink? (Optional)
          </label>
          <p className="text-xs text-brand-text-muted mb-2">
            Help us understand how you found us.
          </p>
          <div className="relative">
            <Megaphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
            <select
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
              className="w-full h-12 appearance-none rounded-[10px] border border-brand-border bg-brand-surface pl-11 pr-10 text-sm text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors cursor-pointer"
            >
              <option value="">Select an option</option>
              {REFERRAL_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Section 4: Additional Information */}
        <div>
          <label className="block text-sm font-semibold text-brand-text-primary">
            Additional Information (Optional)
          </label>
          <p className="text-xs text-brand-text-muted mb-2">Anything else you&apos;d like to tell us?</p>
          <textarea
            value={additionalInfo}
            onChange={(e) =>
              e.target.value.length <= DESCRIPTION_MAX && setAdditionalInfo(e.target.value)
            }
            rows={4}
            placeholder="We'd love to hear from you..."
            className="w-full rounded-[10px] border border-brand-border bg-brand-surface p-3.5 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors resize-none"
          />
          <p className="text-right text-xs text-brand-text-muted mt-1">
            {additionalInfo.length}/{DESCRIPTION_MAX}
          </p>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={() => router.push("/organization/signup/organization-information")}
            className="rounded-lg border border-brand-border px-5 py-2.5 text-sm font-semibold text-brand-text-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-[10px] bg-brand-primary hover:bg-brand-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
