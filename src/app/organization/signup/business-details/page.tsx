"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ArrowRight,
  Grid3x3,
  AlertCircle,
  ChevronLeft,
  Briefcase,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";
import { AuthInput } from "@/components/auth/auth-input";
import { BusinessTypeSelector } from "@/components/organization-signup/business-type-selector";
import {
  useOrganizationSignup,
  BusinessType,
  BUSINESS_TYPES,
} from "@/contexts/organization-signup-context";

const INDUSTRIES = [
  "Software & Technology",
  "E-commerce & Direct-to-Consumer (D2C)",
  "Fashion, Apparel & Lifestyle",
  "Health, Fitness & Wellness",
  "Finance & Fintech",
  "Food, Beverage & Hospitality",
  "Media & Entertainment",
  "Education & EdTech",
  "Agency & Marketing",
  "Real Estate & Construction",
  "Travel & Tourism",
  "Other / Diversified",
];

export default function BusinessDetailsPage() {
  const router = useRouter();
  const { state, updateState } = useOrganizationSignup();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!state.organizationName.trim()) {
      errs.organizationName = "Legal organization name is required";
    } else if (state.organizationName.trim().length < 2) {
      errs.organizationName = "Name must be at least 2 characters";
    }

    if (!state.industry) {
      errs.industry = "Please select your primary industry";
    }

    if (!state.businessType) {
      errs.businessType = "Please select your business structure";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      router.push("/organization/signup/verification-documents");
    }
  };

  return (
    <WizardShell
      currentIndex={1}
      backHref="/organization/signup"
      containerClassName="max-w-3xl"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary bg-brand-primary/5 border border-brand-primary/20 px-3 py-1 rounded-full w-fit mb-2">
          <Building2 className="h-3.5 w-3.5" />
          Step 2 of 5: Business Profile
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Business Details
        </h1>
        <p className="text-sm text-brand-text-muted mt-1">
          Tell us about your organization structure and industry domain.
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="flex items-center gap-3 p-3.5 mb-6 rounded-xl border border-brand-error/30 bg-brand-error/5 text-brand-error text-xs font-medium">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>Please complete the required fields to continue.</span>
        </div>
      )}

      <form onSubmit={handleContinue} className="space-y-6" noValidate>
        {/* Card 1: Basic Legal & Industry Info */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-brand-text-primary border-b border-brand-border/60 pb-2.5">
            General Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <AuthInput
              label="Organization / Legal Name *"
              icon={Building2}
              type="text"
              placeholder="e.g. Acme Technologies Pvt Ltd"
              value={state.organizationName}
              onChange={(e) => {
                updateState({ organizationName: e.target.value });
                if (errors.organizationName) {
                  setErrors((prev) => ({ ...prev, organizationName: "" }));
                }
              }}
              error={errors.organizationName}
              required
            />

            <div>
              <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
                Industry / Category <span className="text-brand-error">*</span>
              </label>
              <div className="relative">
                <Grid3x3 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
                <select
                  value={state.industry}
                  onChange={(e) => {
                    updateState({ industry: e.target.value });
                    if (errors.industry) {
                      setErrors((prev) => ({ ...prev, industry: "" }));
                    }
                  }}
                  className={`w-full h-12 appearance-none rounded-[10px] border bg-brand-surface pl-11 pr-4 text-sm text-brand-text-primary focus:outline-none focus:ring-2 transition-colors cursor-pointer ${
                    errors.industry
                      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                      : "border-brand-border focus:ring-brand-primary/30 focus:border-brand-primary"
                  }`}
                >
                  <option value="" disabled>
                    Select Industry / Category
                  </option>
                  {INDUSTRIES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              {errors.industry && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.industry}</p>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Business Structure Selector */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs">
          <BusinessTypeSelector
            value={state.businessType}
            onChange={(type) => {
              updateState({
                businessType: type,
                secondaryDocType: BUSINESS_TYPES[type].secondaryOptions[0].id,
              });
              if (errors.businessType) {
                setErrors((prev) => ({ ...prev, businessType: "" }));
              }
            }}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={() => router.push("/organization/signup")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-border bg-brand-surface px-5 py-2.5 text-sm font-semibold text-brand-text-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Account
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark px-7 py-3 text-sm font-semibold text-white transition-all shadow-sm cursor-pointer"
          >
            Continue to Verification &amp; Documents
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
