"use client";

import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Building2,
  User,
  CreditCard,
  Building,
  Landmark,
  FileCheck,
  FileText,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { WizardTopbar } from "@/components/organization-signup/wizard-topbar";
import {
  useOrganizationSignup,
  BUSINESS_TYPES,
} from "@/contexts/organization-signup-context";

export default function SubmittedInformationPage() {
  const router = useRouter();
  const { state } = useOrganizationSignup();
  const currentTypeMeta = BUSINESS_TYPES[state.businessType];

  return (
    <div className="min-h-screen flex flex-col bg-brand-background -mt-16">
      <WizardTopbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        {/* Top Back Nav & Status Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/organization/signup/all-set")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary transition-colors mb-3 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Verification Status
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-brand-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-brand-text-primary">
                  Application Summary &amp; Dossier
                </h1>
                <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
                  {state.applicationId}
                </span>
              </div>
              <p className="text-sm text-brand-text-muted">
                Detailed record of submitted organization information, contact credentials, and KYC documents.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800 self-start sm:self-auto">
              <Clock className="h-3.5 w-3.5 animate-spin" />
              Under Compliance Review
            </div>
          </div>
        </div>

        {/* Details Cards */}
        <div className="space-y-6">
          {/* Card 1: Account & Contact Verification */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/60">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  <User className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-base font-bold text-brand-text-primary">
                  Account &amp; Contact Credentials
                </h2>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-brand-success bg-brand-success/10 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Dual OTP Verified
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs text-brand-text-muted">Full Name</p>
                <p className="font-semibold text-brand-text-primary mt-0.5">
                  {state.name || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-brand-text-muted">Work Email</p>
                <p className="font-semibold text-brand-text-primary mt-0.5">
                  {state.email || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-brand-text-muted">Phone Number</p>
                <p className="font-semibold text-brand-text-primary mt-0.5">
                  {state.phone ? `${state.countryCode} ${state.phone}` : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Organization Profile & Structure */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-brand-border/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                <Building2 className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-base font-bold text-brand-text-primary">
                Organization &amp; Legal Structure
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs text-brand-text-muted">Legal Entity Name</p>
                <p className="font-semibold text-brand-text-primary mt-0.5">
                  {state.organizationName || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-brand-text-muted">Business Structure</p>
                <p className="font-semibold text-brand-text-primary mt-0.5">
                  {currentTypeMeta.label}
                </p>
              </div>
              <div>
                <p className="text-xs text-brand-text-muted">Industry / Sector</p>
                <p className="font-semibold text-brand-text-primary mt-0.5">
                  {state.industry || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: KYC Verification Dossier & Documents */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/60">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  <FileCheck className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-base font-bold text-brand-text-primary">
                  Submitted KYC Documents (2 Required Documents)
                </h2>
              </div>
              <span className="text-xs text-brand-text-muted">
                Turnaround: 24–48 hours
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Primary Compulsory Document */}
              <div className="p-3.5 rounded-xl border border-brand-border bg-brand-surface-secondary/40">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-brand-text-primary">
                    1. Primary Registration Proof
                  </p>
                  <span className="text-[10px] font-bold text-brand-error bg-brand-error/10 px-2 py-0.5 rounded">
                    Compulsory
                  </span>
                </div>
                <p className="text-[11px] text-brand-text-muted">{currentTypeMeta.keyDocName}</p>
                <div className="flex items-center justify-between mt-2.5 text-xs">
                  <div className="flex items-center gap-2 text-brand-text-secondary">
                    <FileText className="h-4 w-4 text-brand-primary" />
                    <span className="truncate max-w-[170px]">
                      {state.keyRegistrationDoc.fileName || "Uploaded Document"}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    In Review
                  </span>
                </div>
              </div>

              {/* Selected Secondary Document */}
              <div className="p-3.5 rounded-xl border border-brand-border bg-brand-surface-secondary/40">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-brand-text-primary">
                    2. Secondary Document (Selected)
                  </p>
                  <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                    Chosen 1
                  </span>
                </div>

                {state.secondaryDocType === "pan" && (
                  <>
                    <p className="text-[11px] font-mono text-brand-text-muted">
                      PAN: {state.panNumber || "—"}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 text-xs">
                      <div className="flex items-center gap-2 text-brand-text-secondary">
                        <CreditCard className="h-4 w-4 text-brand-primary" />
                        <span className="truncate max-w-[170px]">
                          {state.panDoc.fileName || "Uploaded Document"}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        In Review
                      </span>
                    </div>
                  </>
                )}

                {state.secondaryDocType === "gst" && (
                  <>
                    <p className="text-[11px] font-mono text-brand-text-muted">
                      GSTIN: {state.gstin || "—"}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 text-xs">
                      <div className="flex items-center gap-2 text-brand-text-secondary">
                        <Building className="h-4 w-4 text-brand-primary" />
                        <span className="truncate max-w-[170px]">
                          {state.gstDoc.fileName || "Uploaded Document"}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        In Review
                      </span>
                    </div>
                  </>
                )}

                {state.secondaryDocType === "udyam" && (
                  <>
                    <p className="text-[11px] font-mono text-brand-text-muted">
                      Udyam: {state.udyamNumber || "—"}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 text-xs">
                      <div className="flex items-center gap-2 text-brand-text-secondary">
                        <FileText className="h-4 w-4 text-brand-primary" />
                        <span className="truncate max-w-[170px]">
                          {state.udyamDoc.fileName || "Uploaded Document"}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        In Review
                      </span>
                    </div>
                  </>
                )}

                {state.secondaryDocType === "shop_establishment" && (
                  <>
                    <p className="text-[11px] font-mono text-brand-text-muted">
                      Registration: {state.shopEstablishmentNumber || "—"}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 text-xs">
                      <div className="flex items-center gap-2 text-brand-text-secondary">
                        <Building className="h-4 w-4 text-brand-primary" />
                        <span className="truncate max-w-[170px]">
                          {state.shopEstablishmentDoc.fileName || "Uploaded Document"}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        In Review
                      </span>
                    </div>
                  </>
                )}

                {state.secondaryDocType === "firm_registration" && (
                  <>
                    <p className="text-[11px] font-mono text-brand-text-muted">
                      ROF Number: {state.firmRegistrationNumber || "—"}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 text-xs">
                      <div className="flex items-center gap-2 text-brand-text-secondary">
                        <FileCheck className="h-4 w-4 text-brand-primary" />
                        <span className="truncate max-w-[170px]">
                          {state.firmRegistrationDoc.fileName || "Uploaded Document"}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        In Review
                      </span>
                    </div>
                  </>
                )}

                {state.secondaryDocType === "address" && (
                  <>
                    <p className="text-[11px] text-brand-text-muted">
                      Type: {state.addressProofType || "Address Proof"}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 text-xs">
                      <div className="flex items-center gap-2 text-brand-text-secondary">
                        <Landmark className="h-4 w-4 text-brand-primary" />
                        <span className="truncate max-w-[170px]">
                          {state.addressDoc.fileName || "Uploaded Document"}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        In Review
                      </span>
                    </div>
                  </>
                )}

                {state.secondaryDocType === "bank" && (
                  <>
                    <p className="text-[11px] text-brand-text-muted">
                      Bank Account Proof
                    </p>
                    <div className="flex items-center justify-between mt-2.5 text-xs">
                      <div className="flex items-center gap-2 text-brand-text-secondary">
                        <CreditCard className="h-4 w-4 text-brand-primary" />
                        <span className="truncate max-w-[170px]">
                          {state.bankDoc.fileName || "Uploaded Document"}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        In Review
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back Action Bar */}
        <div className="mt-8 pt-6 border-t border-brand-border flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/organization/signup/all-set")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-brand-border bg-brand-surface px-5 py-2.5 text-sm font-semibold text-brand-text-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Application Status
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-primary hover:bg-brand-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Go to Homepage
          </button>
        </div>
      </main>
    </div>
  );
}
