"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardCheck,
  Building2,
  User,
  CreditCard,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Edit3,
  FileText,
  AlertCircle,
  Landmark,
  MapPin,
  Scale,
  PenTool,
  Lock,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";
import {
  useOrganizationSignup,
  BUSINESS_TYPES,
  SecondaryDocKey,
} from "@/contexts/organization-signup-context";

export default function ReviewSubmitPage() {
  const router = useRouter();
  const { state, updateState, submitApplication } = useOrganizationSignup();
  const currentStructure = BUSINESS_TYPES[state.businessType];

  const [agreed, setAgreed] = useState(state.finalPoliciesAgreed || false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSecondary = state.secondaryDocType || currentStructure.secondaryOptions[0].id;
  const secondaryOptionMeta =
    currentStructure.secondaryOptions.find((o) => o.id === selectedSecondary) ||
    currentStructure.secondaryOptions[0];

  const isSolePropOrOpc =
    state.businessType === "sole_proprietorship" || state.businessType === "opc";

  const getSecondaryDocDetails = () => {
    switch (selectedSecondary) {
      case "pan":
        return {
          label: secondaryOptionMeta.label,
          identifier: "",
          file: state.panDoc,
          icon: CreditCard,
        };
      case "gst":
        return {
          label: "GST Certificate",
          identifier: state.gstin ? `GSTIN: ${state.gstin}` : "",
          file: state.gstDoc,
          icon: FileText,
        };
      case "udyam":
        return {
          label: "Udyam Certificate",
          identifier: "",
          file: state.udyamDoc,
          icon: FileText,
        };
      case "shop_establishment":
        return {
          label: "Shop & Establishment Certificate",
          identifier: state.shopEstablishmentNumber ? `Reg: ${state.shopEstablishmentNumber}` : "",
          file: state.shopEstablishmentDoc,
          icon: FileText,
        };
      case "firm_registration":
        return {
          label: "Firm Registration Certificate",
          identifier: state.firmRegistrationNumber ? `ROF: ${state.firmRegistrationNumber}` : "",
          file: state.firmRegistrationDoc,
          icon: FileText,
        };
      case "address":
        return {
          label: `Address Proof (${state.addressProofType || "Document"})`,
          identifier: "",
          file: state.addressDoc,
          icon: MapPin,
        };
      case "bank":
        return {
          label: `Bank Proof (${state.bankIfsc ? `IFSC: ${state.bankIfsc}` : "Bank Statement"})`,
          identifier: state.bankAccountNumber
            ? `A/C: ••••${state.bankAccountNumber.slice(-4)}`
            : "",
          file: state.bankDoc,
          icon: Landmark,
        };
      default:
        return {
          label: secondaryOptionMeta.label,
          identifier: "",
          file: state.panDoc,
          icon: CreditCard,
        };
    }
  };

  const secondaryDetails = getSecondaryDocDetails();
  const SecondaryIcon = secondaryDetails.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Please accept the authorization & policy declaration checkbox to submit your application.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      updateState({ finalPoliciesAgreed: true });
      submitApplication();
      router.push("/organization/signup/all-set");
    } catch {
      setError("An error occurred while submitting your application. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <WizardShell
      currentIndex={4}
      backHref="/organization/signup/declaration"
      containerClassName="max-w-3xl"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary bg-brand-primary/5 border border-brand-primary/20 px-3 py-1 rounded-full w-fit mb-2">
          <ClipboardCheck className="h-3.5 w-3.5" />
          Step 5 of 6: Final Review
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Review &amp; Submit Application
        </h1>
        <p className="text-sm text-brand-text-muted mt-1">
          Review your organization profile, verification documents, and signed declaration before submitting for compliance approval.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-3.5 mb-6 rounded-xl border border-brand-error/30 bg-brand-error/5 text-brand-error text-xs font-medium">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Account Information */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div className="flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-brand-primary" />
              <h2 className="text-sm sm:text-base font-bold text-brand-text-primary">
                1. Account &amp; Representative Details
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-brand-success bg-brand-success/10 px-2 py-0.5 rounded">
              Authenticated ✓
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-brand-text-muted block mb-0.5">Admin Name</span>
              <p className="font-semibold text-brand-text-primary text-sm">
                {state.name || "—"}
              </p>
            </div>

            <div>
              <span className="text-brand-text-muted block mb-0.5">Email Address</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-brand-text-primary text-sm">
                  {state.email || "—"}
                </span>
                <span className="text-[10px] text-brand-success font-medium bg-brand-success/10 px-1.5 py-0.2 rounded">
                  Verified
                </span>
              </div>
            </div>

            <div>
              <span className="text-brand-text-muted block mb-0.5">Phone Number</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-brand-text-primary text-sm">
                  {state.countryCode} {state.phone || "—"}
                </span>
                <span className="text-[10px] text-brand-success font-medium bg-brand-success/10 px-1.5 py-0.2 rounded">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Business Profile */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4.5 w-4.5 text-brand-primary" />
              <h2 className="text-sm sm:text-base font-bold text-brand-text-primary">
                2. Business Profile
              </h2>
            </div>
            <button
              type="button"
              onClick={() => router.push("/organization/signup/business-details")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-primary-dark cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" /> Edit
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-brand-text-muted block mb-0.5">Legal Business Name</span>
              <p className="font-semibold text-brand-text-primary text-sm">
                {state.organizationName || "—"}
              </p>
            </div>

            <div>
              <span className="text-brand-text-muted block mb-0.5">Entity Structure</span>
              <p className="font-semibold text-brand-text-primary text-sm">
                {currentStructure.label}
              </p>
            </div>

            <div>
              <span className="text-brand-text-muted block mb-0.5">Industry Category</span>
              <p className="font-semibold text-brand-text-primary text-sm">
                {state.industry || "—"}
              </p>
            </div>

            <div>
              <span className="text-brand-text-muted block mb-0.5">Website / Digital Link</span>
              <p className="font-semibold text-brand-text-primary text-sm truncate">
                {state.website || "None"}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: KYC Documents */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4.5 w-4.5 text-brand-primary" />
              <h2 className="text-sm sm:text-base font-bold text-brand-text-primary">
                3. KYC Documents
              </h2>
            </div>
            <button
              type="button"
              onClick={() => router.push("/organization/signup/verification-documents")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-primary-dark cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" /> Edit
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Primary Document */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-brand-border/80 bg-brand-surface-secondary/40">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-success/15 text-brand-success">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-brand-text-primary truncate">
                    1. Primary: {currentStructure.keyDocName}
                  </p>
                  <p className="text-[11px] text-brand-text-muted truncate">
                    {state.keyRegistrationDoc?.fileName || "No file uploaded"} {state.keyRegistrationDoc?.fileSize ? `(${state.keyRegistrationDoc.fileSize})` : ""}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-brand-success bg-brand-success/10 px-2 py-0.5 rounded shrink-0">
                Uploaded ✓
              </span>
            </div>

            {/* Mandatory Aadhaar Card for Sole Prop & OPC */}
            {isSolePropOrOpc && (
              <div className="flex items-center justify-between p-3 rounded-xl border border-brand-border/80 bg-brand-surface-secondary/40">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-success/15 text-brand-success">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-brand-text-primary truncate">
                      2. {state.businessType === "sole_proprietorship" ? "Proprietor" : "Director"} Aadhaar Card Copy
                    </p>
                    <p className="text-[11px] text-brand-text-muted truncate">
                      {state.aadharDoc?.fileName || "No file uploaded"} {state.aadharDoc?.fileSize ? `(${state.aadharDoc.fileSize})` : ""}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-brand-success bg-brand-success/10 px-2 py-0.5 rounded shrink-0">
                  Uploaded ✓
                </span>
              </div>
            )}

            {/* Selected Secondary Document */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-brand-border/80 bg-brand-surface-secondary/40">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-success/15 text-brand-success">
                  <SecondaryIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-brand-text-primary truncate">
                    {isSolePropOrOpc ? "3. Secondary: " : "2. Secondary: "}{secondaryDetails.label} {secondaryDetails.identifier ? `(${secondaryDetails.identifier})` : ""}
                  </p>
                  <p className="text-[11px] text-brand-text-muted truncate">
                    {secondaryDetails.file?.fileName || "No file uploaded"} {secondaryDetails.file?.fileSize ? `(${secondaryDetails.file.fileSize})` : ""}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-brand-success bg-brand-success/10 px-2 py-0.5 rounded shrink-0">
                Uploaded ✓
              </span>
            </div>

            {/* Optional GST Certificate if added separately */}
            {selectedSecondary !== "gst" && Boolean(state.gstin || state.gstDoc?.fileName) && (
              <div className="flex items-center justify-between p-3 rounded-xl border border-brand-border/80 bg-brand-surface-secondary/40">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-brand-text-primary truncate">
                      Optional: GST Certificate {state.gstin ? `(${state.gstin})` : ""}
                    </p>
                    <p className="text-[11px] text-brand-text-muted truncate">
                      {state.gstDoc?.fileName || "No file uploaded"}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded shrink-0">
                  Optional Added
                </span>
              </div>
            )}

            {/* Optional Udyam Certificate if added separately */}
            {selectedSecondary !== "udyam" && Boolean(state.udyamNumber || state.udyamDoc?.fileName) && (
              <div className="flex items-center justify-between p-3 rounded-xl border border-brand-border/80 bg-brand-surface-secondary/40">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-brand-text-primary truncate">
                      Optional: Udyam Registration {state.udyamNumber ? `(${state.udyamNumber})` : ""}
                    </p>
                    <p className="text-[11px] text-brand-text-muted truncate">
                      {state.udyamDoc?.fileName || "No file uploaded"}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded shrink-0">
                  Optional Added
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Business Declaration & Digital Signature */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="h-4.5 w-4.5 text-brand-primary" />
              <h2 className="text-sm sm:text-base font-bold text-brand-text-primary">
                4. Business Declaration &amp; Responsibility Agreement
              </h2>
            </div>
            <button
              type="button"
              onClick={() => router.push("/organization/signup/declaration")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-primary-dark cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" /> Edit
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs bg-brand-surface-secondary/50 p-4 rounded-xl border border-brand-border/60">
            <div>
              <span className="text-brand-text-muted block mb-0.5">Agreement Status</span>
              <span className="inline-flex items-center gap-1 font-semibold text-brand-success text-xs bg-brand-success/10 px-2 py-0.5 rounded">
                <CheckCircle2 className="h-3.5 w-3.5" /> Accepted &amp; Signed
              </span>
            </div>

            <div>
              <span className="text-brand-text-muted block mb-0.5">Digital Signatory</span>
              <p className="font-semibold text-brand-text-primary text-sm truncate">
                {state.digitalSignature || state.name || "—"}
              </p>
            </div>

            <div>
              <span className="text-brand-text-muted block mb-0.5">Signed Date</span>
              <p className="font-semibold text-brand-text-primary text-sm">
                {state.declarationSignedAt || "19/10/2026"}
              </p>
            </div>
          </div>
        </div>

        {/* Final Mandatory Policy Acceptance Checkbox */}
        <div className="rounded-2xl border border-brand-primary/30 bg-brand-primary/[0.02] p-4.5 sm:p-5 shadow-2xs">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (e.target.checked) setError("");
              }}
              className="mt-1 h-4 w-4 rounded border-brand-border text-brand-primary focus:ring-brand-primary/30 accent-brand-primary cursor-pointer"
            />
            <div className="text-xs text-brand-text-secondary leading-relaxed">
              <span className="font-semibold text-brand-text-primary block mb-0.5">
                Final Authorization &amp; Policy Acceptance
              </span>
              I confirm that I am authorised to represent this business and accept the PromyLink Business Declaration, Terms of Use, Privacy Policy and Acceptable Use &amp; Prohibited Content Policy.
            </div>
          </label>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={() => router.push("/organization/signup/declaration")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-border bg-brand-surface px-5 py-2.5 text-sm font-semibold text-brand-text-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Declaration
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !agreed}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white transition-all shadow-sm ${
              agreed && !isSubmitting
                ? "bg-brand-primary hover:bg-brand-primary-dark cursor-pointer active:scale-[0.99]"
                : "bg-brand-primary/50 cursor-not-allowed opacity-70"
            }`}
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application for Verification"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
