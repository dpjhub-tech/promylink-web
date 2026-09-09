"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ArrowRight,
  Grid3x3,
  AlertCircle,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";
import { AuthInput } from "@/components/auth/auth-input";
import { BusinessTypeSelector } from "@/components/organization-signup/business-type-selector";
import { DocumentUploadMatrix } from "@/components/organization-signup/document-upload-matrix";
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
  "Other / Diversified",
];

export default function OrganizationInformationPage() {
  const router = useRouter();
  const { state, updateState, submitApplication } = useOrganizationSignup();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate simplified Step 2 before submission
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!state.organizationName.trim()) {
      errs.organizationName = "Legal organization name is required";
    }

    // 1. Primary Registration Document (Compulsory)
    if (!state.keyRegistrationDoc.fileName) {
      errs.keyRegistrationDoc = `Primary ${BUSINESS_TYPES[state.businessType].keyDocName} is required`;
    }

    // 2. Selected Secondary Supporting Document (Mandatory)
    const secondaryType = state.secondaryDocType || "pan";

    if (secondaryType === "pan") {
      if (!state.panNumber.trim() || state.panNumber.length !== 10) {
        errs.panNumber = "Valid 10-character PAN number is required";
      }
      if (!state.panDoc.fileName) {
        errs.panDoc = "PAN card document upload is required";
      }
    } else if (secondaryType === "gst") {
      if (!state.gstin.trim() || state.gstin.length !== 15) {
        errs.gstin = "Valid 15-character GSTIN is required";
      }
      if (!state.gstDoc.fileName) {
        errs.gstDoc = "GST Certificate document upload is required";
      }
    } else if (secondaryType === "udyam") {
      if (!state.udyamNumber.trim()) {
        errs.udyamNumber = "Udyam registration number is required";
      }
      if (!state.udyamDoc.fileName) {
        errs.udyamDoc = "Udyam Certificate document upload is required";
      }
    } else if (secondaryType === "shop_establishment") {
      if (!state.shopEstablishmentDoc.fileName) {
        errs.shopEstablishmentDoc = "Shop & Establishment certificate upload is required";
      }
    } else if (secondaryType === "firm_registration") {
      if (!state.firmRegistrationNumber.trim()) {
        errs.firmRegistrationNumber = "Firm registration number is required";
      }
      if (!state.firmRegistrationDoc.fileName) {
        errs.firmRegistrationDoc = "Firm Registration certificate upload is required";
      }
    } else if (secondaryType === "address") {
      if (!state.addressDoc.fileName) {
        errs.addressDoc = "Business address proof document is required";
      }
    } else if (secondaryType === "bank") {
      if (!state.bankDoc.fileName) {
        errs.bankDoc = "Bank proof document is required";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    submitApplication();

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/organization/signup/all-set");
    }, 500);
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
          Step 2 of 3: Business Information &amp; Documents
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Business Details &amp; Documents
        </h1>
        <p className="text-sm text-brand-text-muted mt-1">
          Select your business structure and upload the 2 required KYC documents to verify your organization.
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="flex items-center gap-3 p-3.5 mb-6 rounded-xl border border-brand-error/30 bg-brand-error/5 text-brand-error text-xs font-medium">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>
            Please complete the highlighted fields and upload your 2 documents before continuing.
          </span>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Card 1: Basic Business Info */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-brand-text-primary border-b border-brand-border/60 pb-2.5">
            1. Business Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-3.5">
            <AuthInput
              label="Organization / Company Legal Name *"
              icon={Building2}
              type="text"
              placeholder="e.g. Acme Technologies Pvt Ltd"
              value={state.organizationName}
              onChange={(e) => updateState({ organizationName: e.target.value })}
              error={errors.organizationName}
              required
            />

            <div>
              <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
                Industry / Category
              </label>
              <div className="relative">
                <Grid3x3 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
                <select
                  value={state.industry}
                  onChange={(e) => updateState({ industry: e.target.value })}
                  className="w-full h-12 appearance-none rounded-[10px] border border-brand-border bg-brand-surface pl-11 pr-4 text-sm text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors cursor-pointer"
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
            </div>
          </div>
        </div>

        {/* Card 2: Business Type Selector */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs">
          <BusinessTypeSelector
            value={state.businessType}
            onChange={(type) => {
              updateState({
                businessType: type,
                secondaryDocType: BUSINESS_TYPES[type].secondaryOptions[0].id,
              });
              setErrors({});
            }}
          />
        </div>

        {/* Card 3: Dynamic 2-Document KYC Upload */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div>
              <h2 className="text-base font-bold text-brand-text-primary">
                3. Business KYC Documents (2 Documents Required)
              </h2>
              <p className="text-xs text-brand-text-muted mt-0.5">
                Primary proof (compulsory) + any 1 secondary document.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-success font-semibold bg-brand-success/10 px-2.5 py-1 rounded-md">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure 256-bit
            </div>
          </div>

          <DocumentUploadMatrix
            businessType={state.businessType}
            errors={errors}
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
            Back to Step 1
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark px-7 py-3 text-sm font-semibold text-white transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application for Verification"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
