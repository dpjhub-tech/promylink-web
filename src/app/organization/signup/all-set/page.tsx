"use client";

import { useRouter } from "next/navigation";
import {
  Check,
  Clock,
  Mail,
  Lock,
  ShieldCheck,
  Building2,
  FileCheck,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Sparkles,
  PhoneCall,
  UserCheck,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";
import {
  useOrganizationSignup,
  BUSINESS_TYPES,
} from "@/contexts/organization-signup-context";

export function UnderReviewGraphic() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-brand-primary/10 blur-xl animate-pulse" />
      <div className="relative w-18 h-20 rounded-2xl border border-brand-primary/30 bg-brand-surface shadow-lg p-3 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="h-2 w-8 rounded bg-brand-primary/30" />
          <div className="h-1.5 w-11 rounded bg-brand-border" />
          <div className="h-1.5 w-7 rounded bg-brand-border" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-4.5 w-4.5 rounded-full bg-brand-success/15 flex items-center justify-center">
            <Check className="h-3 w-3 text-brand-success stroke-[3]" />
          </div>
          <div className="h-1.5 w-5 rounded bg-brand-primary/40" />
        </div>
      </div>
      <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-surface bg-brand-primary text-white shadow-md">
        <Clock className="h-4.5 w-4.5 animate-spin" />
      </div>
    </div>
  );
}

export default function VerificationUnderReviewPage() {
  const router = useRouter();
  const { state } = useOrganizationSignup();
  const currentTypeMeta = BUSINESS_TYPES[state.businessType];

  const submittedDate = state.submittedAt || "Just now";
  const orgDisplayName = state.organizationName || "Your Organization";

  return (
    <WizardShell
      currentIndex={4}
      backHref="/organization/signup/review-submit"
      containerClassName="max-w-3xl"
    >
      {/* Top Graphic & Header */}
      <div className="text-center mb-8">
        <UnderReviewGraphic />

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-primary bg-brand-primary/5 border border-brand-primary/20 px-3 py-1 rounded-full w-fit mx-auto mb-2.5">
          <Clock className="h-3.5 w-3.5" />
          Step 5 of 5: Verification Status &amp; Timeline
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 mb-3">
          <Clock className="h-3.5 w-3.5" />
          Application Reference: {state.applicationId}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight">
          Application Submitted for Review
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1 max-w-md mx-auto">
          We have received all required business documents for{" "}
          <span className="font-semibold text-brand-text-primary">{orgDisplayName}</span>.
        </p>
      </div>

      {/* Main Feature: Live Verification Timeline */}
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-7 shadow-xs mb-6">
        <div className="flex items-center justify-between border-b border-brand-border/60 pb-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-brand-text-primary">
              Verification Status &amp; Timeline
            </h2>
            <p className="text-xs text-brand-text-muted mt-0.5">
              Track the progress of your organization approval in real-time.
            </p>
          </div>
          <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-md">
            24 – 48 hrs SLA
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-brand-border">
          {/* Timeline Step 1: Completed */}
          <div className="relative">
            <div className="absolute -left-6 sm:-left-8 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-success text-white shadow-xs">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <p className="text-sm font-bold text-brand-text-primary">
                  1. Application &amp; OTP Verification Completed
                </p>
                <span className="text-[11px] font-medium text-brand-success">
                  {submittedDate}
                </span>
              </div>
              <p className="text-xs text-brand-text-secondary mt-1 leading-relaxed">
                Contact information authenticated via Email &amp; SMS OTP. Business registration dossier successfully uploaded.
              </p>
            </div>
          </div>

          {/* Timeline Step 2: Active / In Progress */}
          <div className="relative">
            <div className="absolute -left-6 sm:-left-8 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-50 text-amber-600 shadow-xs">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-amber-900">
                    2. Document &amp; Compliance Verification
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                    In Progress
                  </span>
                </div>
                <span className="text-[11px] font-medium text-amber-700">
                  Est. 24–48 hours
                </span>
              </div>
              <p className="text-xs text-amber-900/80 mt-1.5 leading-relaxed">
                Our compliance team is verifying your{" "}
                <span className="font-semibold">{currentTypeMeta.label}</span> documentation (
                {currentTypeMeta.keyDocName} and selected supporting records).
              </p>
            </div>
          </div>

          {/* Timeline Step 3: Upcoming */}
          <div className="relative">
            <div className="absolute -left-6 sm:-left-8 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-border bg-brand-surface text-brand-text-muted">
              <Lock className="h-3 w-3" />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-text-muted">
                3. Workspace Activation &amp; Creator Access
              </p>
              <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
                Once approved, your brand workspace will be fully unlocked. You will receive an immediate confirmation email and SMS with your login credentials.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Application Summary Card */}
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 mb-6 shadow-2xs">
        <div className="flex items-center justify-between border-b border-brand-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
              <Building2 className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-brand-text-primary">
              Submitted Business Overview
            </h3>
          </div>
          <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full">
            {currentTypeMeta.label}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
          <div>
            <p className="text-brand-text-muted">Organization Legal Name</p>
            <p className="font-semibold text-brand-text-primary text-sm mt-0.5">
              {state.organizationName || "Acme Technologies Pvt Ltd"}
            </p>
          </div>
          <div>
            <p className="text-brand-text-muted">Business Structure</p>
            <p className="font-semibold text-brand-text-primary text-sm mt-0.5">
              {currentTypeMeta.label}
            </p>
          </div>
          <div>
            <p className="text-brand-text-muted">Primary Contact</p>
            <p className="font-semibold text-brand-text-primary mt-0.5">
              {state.name || "Kiran Kumar"}
            </p>
          </div>
          <div>
            <p className="text-brand-text-muted">Verified Email &amp; Phone</p>
            <p className="font-semibold text-brand-text-primary mt-0.5">
              {state.email || "kiran@company.com"} • {state.countryCode} {state.phone || "9876543210"}
            </p>
          </div>
        </div>

        {/* Uploaded Documents List */}
        <div className="pt-3 border-t border-brand-border/60">
          <p className="text-xs font-semibold text-brand-text-primary mb-2.5">
            Uploaded KYC Dossier (2 Required Documents)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Primary Compulsory Doc */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-brand-border bg-brand-surface-secondary/40 text-xs">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block">
                  1. Primary Document (Compulsory)
                </span>
                <span className="font-semibold text-brand-text-primary truncate block mt-0.5" title={currentTypeMeta.keyDocName}>
                  {currentTypeMeta.keyDocName}
                </span>
                <span className="text-[11px] text-brand-text-muted truncate block">
                  {state.keyRegistrationDoc.fileName || "Uploaded Certificate"}
                </span>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded shrink-0">
                In Review
              </span>
            </div>

            {/* Selected Secondary Doc */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-brand-border bg-brand-surface-secondary/40 text-xs">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block">
                  2. Secondary Document (Selected)
                </span>
                {state.secondaryDocType === "pan" && (
                  <>
                    <span className="font-semibold text-brand-text-primary truncate block mt-0.5">
                      {currentTypeMeta.secondaryOptions.find((o) => o.id === "pan")?.label || "PAN Card"} ({state.panNumber || "PAN"})
                    </span>
                    <span className="text-[11px] text-brand-text-muted truncate block">
                      {state.panDoc.fileName || "PAN_Card.pdf"}
                    </span>
                  </>
                )}
                {state.secondaryDocType === "gst" && (
                  <>
                    <span className="font-semibold text-brand-text-primary truncate block mt-0.5">
                      GST Certificate ({state.gstin || "GSTIN"})
                    </span>
                    <span className="text-[11px] text-brand-text-muted truncate block">
                      {state.gstDoc.fileName || "GST_Certificate.pdf"}
                    </span>
                  </>
                )}
                {state.secondaryDocType === "udyam" && (
                  <>
                    <span className="font-semibold text-brand-text-primary truncate block mt-0.5">
                      Udyam Certificate ({state.udyamNumber || "Udyam"})
                    </span>
                    <span className="text-[11px] text-brand-text-muted truncate block">
                      {state.udyamDoc.fileName || "Udyam_Certificate.pdf"}
                    </span>
                  </>
                )}
                {state.secondaryDocType === "shop_establishment" && (
                  <>
                    <span className="font-semibold text-brand-text-primary truncate block mt-0.5">
                      Shop &amp; Establishment ({state.shopEstablishmentNumber || "Certificate"})
                    </span>
                    <span className="text-[11px] text-brand-text-muted truncate block">
                      {state.shopEstablishmentDoc.fileName || "Shop_Establishment_Certificate.pdf"}
                    </span>
                  </>
                )}
                {state.secondaryDocType === "firm_registration" && (
                  <>
                    <span className="font-semibold text-brand-text-primary truncate block mt-0.5">
                      Firm Registration ({state.firmRegistrationNumber || "ROF Certificate"})
                    </span>
                    <span className="text-[11px] text-brand-text-muted truncate block">
                      {state.firmRegistrationDoc.fileName || "Firm_Registration_Certificate.pdf"}
                    </span>
                  </>
                )}
                {state.secondaryDocType === "address" && (
                  <>
                    <span className="font-semibold text-brand-text-primary truncate block mt-0.5">
                      Address Proof ({state.addressProofType})
                    </span>
                    <span className="text-[11px] text-brand-text-muted truncate block">
                      {state.addressDoc.fileName || "Address_Proof.pdf"}
                    </span>
                  </>
                )}
                {state.secondaryDocType === "bank" && (
                  <>
                    <span className="font-semibold text-brand-text-primary truncate block mt-0.5">
                      Bank Proof ({state.bankName || "Commercial Bank"})
                    </span>
                    <span className="text-[11px] text-brand-text-muted truncate block">
                      {state.bankDoc.fileName || "Bank_Statement.pdf"}
                    </span>
                  </>
                )}
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded shrink-0">
                In Review
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 SLA & Security Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl border border-brand-border bg-brand-surface p-3.5 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <Clock className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[11px] text-brand-text-muted">Turnaround SLA</p>
            <p className="text-xs sm:text-sm font-semibold text-brand-text-primary">
              24 – 48 hours
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-brand-border bg-brand-surface p-3.5 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <Mail className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[11px] text-brand-text-muted">Notification</p>
            <p className="text-xs sm:text-sm font-semibold text-brand-text-primary">
              Email &amp; SMS Alerts
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-brand-border bg-brand-surface p-3.5 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[11px] text-brand-text-muted">Security</p>
            <p className="text-xs sm:text-sm font-semibold text-brand-text-primary">
              256-Bit Encrypted
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/organization/signup/submitted-information")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-primary bg-brand-surface px-6 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-primary/5 transition-all shadow-xs cursor-pointer"
        >
          View Detailed Application Dossier
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark px-6 py-3 text-sm font-semibold text-white transition-all shadow-xs cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    </WizardShell>
  );
}
