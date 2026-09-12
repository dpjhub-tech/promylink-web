"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileCheck2,
  ArrowRight,
  ChevronLeft,
  Building,
  Plus,
  Trash2,
  AlertCircle,
  CreditCard,
  FileText,
  Landmark,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";
import { CompactDocUpload } from "@/components/organization-signup/compact-doc-upload";
import {
  useOrganizationSignup,
  BUSINESS_TYPES,
  SecondaryDocKey,
  UploadedDocInfo,
} from "@/contexts/organization-signup-context";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const ADDRESS_PROOF_TYPES = [
  "Electricity Bill (within last 3 months)",
  "Telephone / Broadband Bill",
  "Commercial Lease Agreement",
  "Property Tax / Municipal Receipt",
  "Bank Statement with Address",
];

export default function VerificationDocumentsPage() {
  const router = useRouter();
  const { state, updateState, setDocFile, removeDocFile } = useOrganizationSignup();
  const currentStructure = BUSINESS_TYPES[state.businessType];

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOptionalGst, setShowOptionalGst] = useState(
    state.hasGst || (state.secondaryDocType !== "gst" && Boolean(state.gstin || state.gstDoc?.fileName))
  );

  const selectedSecondary = state.secondaryDocType || currentStructure.secondaryOptions[0].id;
  const currentSecondaryMeta =
    currentStructure.secondaryOptions.find((o) => o.id === selectedSecondary) ||
    currentStructure.secondaryOptions[0];

  // Helper to check if secondary document file is uploaded
  const getSecondaryDocFile = (type: SecondaryDocKey): UploadedDocInfo | undefined => {
    switch (type) {
      case "pan":
        return state.panDoc;
      case "gst":
        return state.gstDoc;
      case "udyam":
        return state.udyamDoc;
      case "shop_establishment":
        return state.shopEstablishmentDoc;
      case "firm_registration":
        return state.firmRegistrationDoc;
      case "address":
        return state.addressDoc;
      case "bank":
        return state.bankDoc;
      default:
        return undefined;
    }
  };

  const isSolePropOrOpc =
    state.businessType === "sole_proprietorship" || state.businessType === "opc";

  const validate = () => {
    const errs: Record<string, string> = {};

    // 1. Primary Registration Document
    if (!state.keyRegistrationDoc?.fileName) {
      errs.keyRegistrationDoc = `Please upload your ${currentStructure.keyDocName}`;
    }

    // 2. Mandatory Aadhaar Card for Sole Proprietorship & OPC
    if (isSolePropOrOpc && !state.aadharDoc?.fileName) {
      errs.aadharDoc = `Please upload your ${
        state.businessType === "sole_proprietorship" ? "Proprietor" : "Director / Shareholder"
      } Aadhaar Card copy`;
    }

    // 3. Selected Secondary Document Validation
    switch (selectedSecondary) {
      case "pan": {
        if (!state.panDoc?.fileName) {
          errs.panDoc = `Please upload your ${currentSecondaryMeta.label} copy`;
        }
        break;
      }
      case "gst": {
        const gstinClean = state.gstin.trim().toUpperCase();
        if (!gstinClean) {
          errs.gstin = "GSTIN is required";
        } else if (gstinClean.length !== 15) {
          errs.gstin = "GSTIN must be exactly 15 characters";
        }
        if (!state.gstDoc?.fileName) {
          errs.gstDoc = "Please upload your GST Certificate";
        }
        break;
      }
      case "udyam": {
        if (!state.udyamDoc?.fileName) {
          errs.udyamDoc = "Please upload your Udyam Certificate copy";
        }
        break;
      }
      case "shop_establishment": {
        if (!state.shopEstablishmentNumber.trim()) {
          errs.shopEstablishmentNumber = "Certificate / Registration number is required";
        }
        if (!state.shopEstablishmentDoc?.fileName) {
          errs.shopEstablishmentDoc = "Please upload your Shop & Establishment Certificate";
        }
        break;
      }
      case "firm_registration": {
        if (!state.firmRegistrationNumber.trim()) {
          errs.firmRegistrationNumber = "Firm Registration number is required";
        }
        if (!state.firmRegistrationDoc?.fileName) {
          errs.firmRegistrationDoc = "Please upload your Firm Registration Certificate";
        }
        break;
      }
      case "address": {
        if (!state.addressProofType) {
          errs.addressProofType = "Please select an address proof document type";
        }
        if (!state.addressDoc?.fileName) {
          errs.addressDoc = "Please upload your Address Proof document";
        }
        break;
      }
      case "bank": {
        if (!state.bankAccountNumber.trim()) {
          errs.bankAccountNumber = "Bank account number is required";
        }
        if (!state.bankIfsc.trim()) {
          errs.bankIfsc = "Bank IFSC code is required";
        }
        if (!state.bankDoc?.fileName) {
          errs.bankDoc = "Please upload your Bank Proof (Cancelled Cheque / Passbook)";
        }
        break;
      }
    }

    // 3. Optional GST (if toggled and not selected as primary secondary)
    if (showOptionalGst && selectedSecondary !== "gst") {
      const gstinClean = state.gstin.trim().toUpperCase();
      if (!gstinClean) {
        errs.optionalGstin = "GSTIN is required when optional GST is added";
      } else if (gstinClean.length !== 15) {
        errs.optionalGstin = "GSTIN must be exactly 15 characters";
      }
      if (!state.gstDoc?.fileName) {
        errs.optionalGstDoc = "Please upload your GST Certificate";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      updateState({
        hasGst: showOptionalGst || selectedSecondary === "gst",
      });
      router.push("/organization/signup/declaration");
    }
  };

  const hasPrimaryUploaded = Boolean(state.keyRegistrationDoc?.fileName);
  const hasAadhaarUploaded = Boolean(state.aadharDoc?.fileName);
  const currentSecondaryFile = getSecondaryDocFile(selectedSecondary);
  const hasSecondaryUploaded = Boolean(currentSecondaryFile?.fileName);

  return (
    <WizardShell
      currentIndex={2}
      backHref="/organization/signup/business-details"
      containerClassName="max-w-3xl"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary bg-brand-primary/5 border border-brand-primary/20 px-3 py-1 rounded-full w-fit mb-2">
          <FileCheck2 className="h-3.5 w-3.5" />
          Step 3 of 5: KYC &amp; Verification
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Verification &amp; Documents
        </h1>
        <p className="text-sm text-brand-text-muted mt-1">
          {isSolePropOrOpc
            ? "Upload 1 primary registration proof, 1 Aadhaar card copy, and 1 secondary supporting document."
            : "Upload 1 primary registration proof and 1 secondary supporting document of your choice."}
        </p>
      </div>

      {/* Selected Business Structure Banner */}
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-4 sm:p-5 shadow-2xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary font-bold">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-text-muted">Selected Entity:</span>
              <span className="text-xs font-semibold bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-md border border-brand-primary/20">
                {currentStructure.label} ✓
              </span>
            </div>
            <p className="text-xs text-brand-text-secondary mt-0.5">
              Primary Proof: <span className="font-medium text-brand-text-primary">{currentStructure.keyDocName}</span>
              {isSolePropOrOpc && (
                <span className="ml-1.5 text-brand-primary font-medium">+ Aadhaar Card Copy</span>
              )}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/organization/signup/business-details")}
          className="text-xs font-semibold text-brand-primary hover:text-brand-primary-dark underline self-start sm:self-center cursor-pointer"
        >
          Change Structure
        </button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="flex items-center gap-3 p-3.5 mb-6 rounded-xl border border-brand-error/30 bg-brand-error/5 text-brand-error text-xs font-medium">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>Please complete the required document uploads and fields below.</span>
        </div>
      )}

      <form onSubmit={handleContinue} className="space-y-6" noValidate>
        {/* Section 1: Compulsory Primary Registration Proof */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div>
              <h2 className="text-base font-bold text-brand-text-primary">
                1. Primary Registration Document <span className="text-brand-error">*</span>
              </h2>
              <p className="text-xs text-brand-text-muted mt-0.5">
                Compulsory incorporation / legal proof for {currentStructure.label}.
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                hasPrimaryUploaded
                  ? "bg-brand-success/15 text-brand-success"
                  : "bg-brand-surface-secondary text-brand-text-muted"
              }`}
            >
              {hasPrimaryUploaded ? "Uploaded ✓" : "Pending"}
            </span>
          </div>

          <CompactDocUpload
            label={currentStructure.keyDocName}
            sublabel={currentStructure.keyDocDescription}
            isMandatory={true}
            uploadedDoc={state.keyRegistrationDoc}
            onFileSelect={(info) => {
              setDocFile("keyRegistrationDoc", info);
              if (errors.keyRegistrationDoc) {
                setErrors((prev) => ({ ...prev, keyRegistrationDoc: "" }));
              }
            }}
            onFileRemove={() => removeDocFile("keyRegistrationDoc")}
            error={errors.keyRegistrationDoc}
          />
        </div>

        {/* Section 2: Mandatory Aadhaar Card (Sole Proprietorship & OPC only) */}
        {isSolePropOrOpc && (
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
              <div>
                <h2 className="text-base font-bold text-brand-text-primary">
                  2. {state.businessType === "sole_proprietorship" ? "Proprietor" : "Director / Shareholder"} Aadhaar Card <span className="text-brand-error">*</span>
                </h2>
                <p className="text-xs text-brand-text-muted mt-0.5">
                  Mandatory identity verification document copy for {currentStructure.label}.
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                  hasAadhaarUploaded
                    ? "bg-brand-success/15 text-brand-success"
                    : "bg-brand-surface-secondary text-brand-text-muted"
                }`}
              >
                {hasAadhaarUploaded ? "Uploaded ✓" : "Pending"}
              </span>
            </div>

            <CompactDocUpload
              label={
                state.businessType === "sole_proprietorship"
                  ? "Proprietor Aadhaar Card Copy"
                  : "Director / Shareholder Aadhaar Card Copy"
              }
              sublabel="Clear photo or PDF copy (front & back) of Aadhaar Card"
              isMandatory={true}
              uploadedDoc={state.aadharDoc}
              onFileSelect={(info) => {
                setDocFile("aadharDoc", info);
                if (errors.aadharDoc) {
                  setErrors((prev) => ({ ...prev, aadharDoc: "" }));
                }
              }}
              onFileRemove={() => removeDocFile("aadharDoc")}
              error={errors.aadharDoc}
            />
          </div>
        )}

        {/* Section: Selectable Secondary Document */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div>
              <h2 className="text-base font-bold text-brand-text-primary">
                {isSolePropOrOpc ? "3. Secondary Supporting Document" : "2. Secondary Supporting Document"} <span className="text-brand-error">*</span>
              </h2>
              <p className="text-xs text-brand-text-muted mt-0.5">
                Choose any 1 document below to verify tax/entity identity.
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                hasSecondaryUploaded
                  ? "bg-brand-success/15 text-brand-success"
                  : "bg-brand-surface-secondary text-brand-text-muted"
              }`}
            >
              {hasSecondaryUploaded ? "Uploaded ✓" : "Pending"}
            </span>
          </div>

          {/* Document Type Selection Chips */}
          <div>
            <label className="block text-xs font-semibold text-brand-text-primary mb-2">
              Select Document Type to Upload:
            </label>
            <div className="flex flex-wrap gap-2">
              {currentStructure.secondaryOptions.map((opt) => {
                const isSelected = selectedSecondary === opt.id;
                const hasFile = Boolean(getSecondaryDocFile(opt.id)?.fileName);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      updateState({ secondaryDocType: opt.id });
                      setErrors({});
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-brand-primary text-white shadow-xs"
                        : "bg-brand-surface-secondary/80 text-brand-text-secondary hover:bg-brand-surface-secondary hover:text-brand-text-primary border border-brand-border/60"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {hasFile && (
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected ? "bg-white" : "bg-brand-success"
                        }`}
                        title="Document uploaded"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Input & Upload Area based on Selected Secondary Doc */}
          <div className="rounded-xl border border-brand-border/80 bg-brand-surface-secondary/25 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-2.5">
              <span className="text-xs font-bold text-brand-text-primary">
                {currentSecondaryMeta.label} Details
              </span>
              <span className="text-[11px] text-brand-text-muted">
                {currentSecondaryMeta.sublabel}
              </span>
            </div>

            {/* If PAN */}
            {selectedSecondary === "pan" && (
              <div className="space-y-3">
                <CompactDocUpload
                  label={`${currentSecondaryMeta.label} Copy`}
                  sublabel="Clear photo or official PDF of PAN Card"
                  isMandatory={true}
                  uploadedDoc={state.panDoc}
                  onFileSelect={(info) => {
                    setDocFile("panDoc", info);
                    if (errors.panDoc) setErrors((prev) => ({ ...prev, panDoc: "" }));
                  }}
                  onFileRemove={() => removeDocFile("panDoc")}
                  error={errors.panDoc}
                />
              </div>
            )}

            {/* If GST */}
            {selectedSecondary === "gst" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    GSTIN Number (15 Characters) <span className="text-brand-error">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="e.g. 36AAAAA0000A1Z5"
                    value={state.gstin}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 15).toUpperCase();
                      updateState({ gstin: cleaned });
                      if (errors.gstin) setErrors((prev) => ({ ...prev, gstin: "" }));
                    }}
                    className={`w-full h-11 rounded-[10px] border bg-brand-surface px-3.5 text-sm font-mono tracking-wider uppercase text-brand-text-primary placeholder:font-sans placeholder:normal-case placeholder:text-brand-text-muted focus:outline-none focus:ring-2 transition-colors ${
                      errors.gstin ? "border-red-500" : "border-brand-border focus:border-brand-primary"
                    }`}
                  />
                  {errors.gstin && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.gstin}</p>
                  )}
                </div>

                <CompactDocUpload
                  label="GST Certificate (Form GST REG-06)"
                  sublabel="Official GST Registration Certificate"
                  isMandatory={true}
                  uploadedDoc={state.gstDoc}
                  onFileSelect={(info) => {
                    setDocFile("gstDoc", info);
                    if (errors.gstDoc) setErrors((prev) => ({ ...prev, gstDoc: "" }));
                  }}
                  onFileRemove={() => removeDocFile("gstDoc")}
                  error={errors.gstDoc}
                />
              </div>
            )}

            {/* If Udyam */}
            {selectedSecondary === "udyam" && (
              <div className="space-y-3">
                <CompactDocUpload
                  label="Udyam Certificate Copy"
                  sublabel="Official MSME Registration Certificate PDF or clear photo"
                  isMandatory={true}
                  uploadedDoc={state.udyamDoc}
                  onFileSelect={(info) => {
                    setDocFile("udyamDoc", info);
                    if (errors.udyamDoc) setErrors((prev) => ({ ...prev, udyamDoc: "" }));
                  }}
                  onFileRemove={() => removeDocFile("udyamDoc")}
                  error={errors.udyamDoc}
                />
              </div>
            )}

            {/* If Shop & Establishment */}
            {selectedSecondary === "shop_establishment" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    Certificate / Registration Number <span className="text-brand-error">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SEA/2024/00192"
                    value={state.shopEstablishmentNumber}
                    onChange={(e) => {
                      updateState({ shopEstablishmentNumber: e.target.value });
                      if (errors.shopEstablishmentNumber)
                        setErrors((prev) => ({ ...prev, shopEstablishmentNumber: "" }));
                    }}
                    className={`w-full h-11 rounded-[10px] border bg-brand-surface px-3.5 text-sm text-brand-text-primary focus:outline-none focus:ring-2 ${
                      errors.shopEstablishmentNumber ? "border-red-500" : "border-brand-border focus:border-brand-primary"
                    }`}
                  />
                  {errors.shopEstablishmentNumber && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.shopEstablishmentNumber}</p>
                  )}
                </div>

                <CompactDocUpload
                  label="Shop & Establishment Certificate"
                  sublabel="Municipal / Trade registration document"
                  isMandatory={true}
                  uploadedDoc={state.shopEstablishmentDoc}
                  onFileSelect={(info) => {
                    setDocFile("shopEstablishmentDoc", info);
                    if (errors.shopEstablishmentDoc)
                      setErrors((prev) => ({ ...prev, shopEstablishmentDoc: "" }));
                  }}
                  onFileRemove={() => removeDocFile("shopEstablishmentDoc")}
                  error={errors.shopEstablishmentDoc}
                />
              </div>
            )}

            {/* If Firm Registration */}
            {selectedSecondary === "firm_registration" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    Firm Registration (ROF) Number <span className="text-brand-error">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ROF/HYD/123/2023"
                    value={state.firmRegistrationNumber}
                    onChange={(e) => {
                      updateState({ firmRegistrationNumber: e.target.value });
                      if (errors.firmRegistrationNumber)
                        setErrors((prev) => ({ ...prev, firmRegistrationNumber: "" }));
                    }}
                    className={`w-full h-11 rounded-[10px] border bg-brand-surface px-3.5 text-sm text-brand-text-primary focus:outline-none focus:ring-2 ${
                      errors.firmRegistrationNumber ? "border-red-500" : "border-brand-border focus:border-brand-primary"
                    }`}
                  />
                  {errors.firmRegistrationNumber && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.firmRegistrationNumber}</p>
                  )}
                </div>

                <CompactDocUpload
                  label="Firm Registration Certificate"
                  sublabel="Registrar of Firms (ROF) Certificate"
                  isMandatory={true}
                  uploadedDoc={state.firmRegistrationDoc}
                  onFileSelect={(info) => {
                    setDocFile("firmRegistrationDoc", info);
                    if (errors.firmRegistrationDoc)
                      setErrors((prev) => ({ ...prev, firmRegistrationDoc: "" }));
                  }}
                  onFileRemove={() => removeDocFile("firmRegistrationDoc")}
                  error={errors.firmRegistrationDoc}
                />
              </div>
            )}

            {/* If Address Proof */}
            {selectedSecondary === "address" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    Address Proof Type <span className="text-brand-error">*</span>
                  </label>
                  <select
                    value={state.addressProofType}
                    onChange={(e) => {
                      updateState({ addressProofType: e.target.value });
                      if (errors.addressProofType)
                        setErrors((prev) => ({ ...prev, addressProofType: "" }));
                    }}
                    className={`w-full h-11 rounded-[10px] border bg-brand-surface px-3.5 text-sm text-brand-text-primary focus:outline-none focus:ring-2 ${
                      errors.addressProofType ? "border-red-500" : "border-brand-border focus:border-brand-primary"
                    }`}
                  >
                    <option value="" disabled>
                      Select Document Type
                    </option>
                    {ADDRESS_PROOF_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.addressProofType && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.addressProofType}</p>
                  )}
                </div>

                <CompactDocUpload
                  label="Business Address Proof"
                  sublabel="Utility bill, lease agreement, or property receipt"
                  isMandatory={true}
                  uploadedDoc={state.addressDoc}
                  onFileSelect={(info) => {
                    setDocFile("addressDoc", info);
                    if (errors.addressDoc) setErrors((prev) => ({ ...prev, addressDoc: "" }));
                  }}
                  onFileRemove={() => removeDocFile("addressDoc")}
                  error={errors.addressDoc}
                />
              </div>
            )}

            {/* If Bank Proof */}
            {selectedSecondary === "bank" && (
              <div className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                      Account Number <span className="text-brand-error">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 123456789012"
                      value={state.bankAccountNumber}
                      onChange={(e) => {
                        updateState({ bankAccountNumber: e.target.value });
                        if (errors.bankAccountNumber)
                          setErrors((prev) => ({ ...prev, bankAccountNumber: "" }));
                      }}
                      className={`w-full h-11 rounded-[10px] border bg-brand-surface px-3.5 text-sm text-brand-text-primary focus:outline-none focus:ring-2 ${
                        errors.bankAccountNumber ? "border-red-500" : "border-brand-border focus:border-brand-primary"
                      }`}
                    />
                    {errors.bankAccountNumber && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.bankAccountNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                      IFSC Code <span className="text-brand-error">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC0001234"
                      value={state.bankIfsc}
                      onChange={(e) => {
                        updateState({ bankIfsc: e.target.value.toUpperCase() });
                        if (errors.bankIfsc) setErrors((prev) => ({ ...prev, bankIfsc: "" }));
                      }}
                      className={`w-full h-11 rounded-[10px] border bg-brand-surface px-3.5 text-sm font-mono uppercase text-brand-text-primary focus:outline-none focus:ring-2 ${
                        errors.bankIfsc ? "border-red-500" : "border-brand-border focus:border-brand-primary"
                      }`}
                    />
                    {errors.bankIfsc && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.bankIfsc}</p>
                    )}
                  </div>
                </div>

                <CompactDocUpload
                  label="Bank Proof Document"
                  sublabel="Cancelled cheque, bank passbook, or recent statement"
                  isMandatory={true}
                  uploadedDoc={state.bankDoc}
                  onFileSelect={(info) => {
                    setDocFile("bankDoc", info);
                    if (errors.bankDoc) setErrors((prev) => ({ ...prev, bankDoc: "" }));
                  }}
                  onFileRemove={() => removeDocFile("bankDoc")}
                  error={errors.bankDoc}
                />
              </div>
            )}
          </div>
        </div>

        {/* Section: Optional Additional Documents (e.g. GST if not selected above) */}
        {selectedSecondary !== "gst" && (
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="border-b border-brand-border/60 pb-3">
              <h2 className="text-base font-bold text-brand-text-primary">
                {isSolePropOrOpc ? "4. Optional Supporting Documents" : "3. Optional Supporting Documents"}
              </h2>
              <p className="text-xs text-brand-text-muted mt-0.5">
                Speed up verification by adding optional tax or municipal certificates.
              </p>
            </div>

            {!showOptionalGst ? (
              <button
                type="button"
                onClick={() => setShowOptionalGst(true)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-dashed border-brand-border hover:border-brand-primary/50 hover:bg-brand-surface-secondary/40 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-brand-text-primary">
                      + Add GST Certificate
                    </p>
                    <p className="text-[11px] text-brand-text-muted">
                      Form GST REG-06 / 15-digit GSTIN
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-brand-primary">Add</span>
              </button>
            ) : (
              <div className="rounded-xl border border-brand-border/80 bg-brand-surface-secondary/30 p-4 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-text-primary">
                    GST Certificate (Optional)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOptionalGst(false);
                      updateState({ gstin: "" });
                      removeDocFile("gstDoc");
                    }}
                    className="flex items-center gap-1 text-xs text-brand-error hover:underline cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" /> Remove
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-text-primary mb-1">
                    GSTIN Number (15 Characters)
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="e.g. 36AAAAA0000A1Z5"
                    value={state.gstin}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 15).toUpperCase();
                      updateState({ gstin: cleaned });
                      if (errors.optionalGstin) setErrors((prev) => ({ ...prev, optionalGstin: "" }));
                    }}
                    className={`w-full h-10 rounded-[8px] border bg-brand-surface px-3 text-xs font-mono uppercase tracking-wider text-brand-text-primary focus:outline-none focus:ring-2 ${
                      errors.optionalGstin ? "border-red-500" : "border-brand-border focus:border-brand-primary"
                    }`}
                  />
                  {errors.optionalGstin && (
                    <p className="mt-1 text-xs text-red-500">{errors.optionalGstin}</p>
                  )}
                </div>

                <CompactDocUpload
                  label="GST Registration Document"
                  sublabel="Form GST REG-06"
                  isMandatory={false}
                  uploadedDoc={state.gstDoc}
                  onFileSelect={(info) => {
                    setDocFile("gstDoc", info);
                    if (errors.optionalGstDoc) setErrors((prev) => ({ ...prev, optionalGstDoc: "" }));
                  }}
                  onFileRemove={() => removeDocFile("gstDoc")}
                  error={errors.optionalGstDoc}
                />
              </div>
            )}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={() => router.push("/organization/signup/business-details")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-border bg-brand-surface px-5 py-2.5 text-sm font-semibold text-brand-text-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Business Details
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark px-7 py-3 text-sm font-semibold text-white transition-all shadow-sm cursor-pointer"
          >
            Continue to Review &amp; Submit
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
