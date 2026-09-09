"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  ShieldCheck,
  Check,
  User,
  Briefcase,
  Mail,
  Phone,
  ArrowRight,
  FileText,
  X,
  CreditCard,
  Globe,
  FileCheck,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";

const ACCEPTED_DOCS = [
  "Organization Registration Certificate",
  "GST Certificate",
  "Company PAN Card",
  "Address Proof (Utility Bill / Lease Agreement)",
  "Any other government issued document",
];

type IdType = "pan" | "aadhaar" | "passport";

const ID_OPTIONS = [
  {
    id: "pan" as IdType,
    label: "PAN Card",
    sublabel: "Indian Tax ID (10-digit)",
    icon: CreditCard,
  },
  {
    id: "aadhaar" as IdType,
    label: "Aadhaar Card",
    sublabel: "Indian National ID (12-digit)",
    icon: FileCheck,
  },
  {
    id: "passport" as IdType,
    label: "Passport",
    sublabel: "Foreign / International ID",
    icon: Globe,
  },
] as const;

const NOTES_MAX = 500;

// Step 5 of 6: Organization Verification
export default function OrganizationVerificationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idDocInputRef = useRef<HTMLInputElement>(null);

  // Business Document State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Authorized Person Details State
  const [authPersonName, setAuthPersonName] = useState("");
  const [authPersonDesignation, setAuthPersonDesignation] = useState("");
  const [authPersonEmail, setAuthPersonEmail] = useState("");
  const [authPersonPhone, setAuthPersonPhone] = useState("");

  // Representative ID Proof State (PAN / Aadhaar / Passport)
  const [idType, setIdType] = useState<IdType>("pan");
  const [idNumber, setIdNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [uploadedIdFile, setUploadedIdFile] = useState<File | null>(null);

  const [notes, setNotes] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleIdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedIdFile(e.target.files[0]);
    }
  };

  const handleRemoveIdFile = () => {
    setUploadedIdFile(null);
    if (idDocInputRef.current) {
      idDocInputRef.current.value = "";
    }
  };

  // Format Aadhaar with spaces (XXXX XXXX XXXX)
  const handleAadhaarChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 12);
    const parts = raw.match(/.{1,4}/g);
    setIdNumber(parts ? parts.join(" ") : raw);
  };

  // Format PAN in uppercase (ABCDE1234F)
  const handlePanChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10).toUpperCase();
    setIdNumber(cleaned);
  };

  // Switch ID type and clear ID specific values
  const handleSelectIdType = (type: IdType) => {
    setIdType(type);
    setIdNumber("");
    if (type !== "passport") {
      setNationality("");
    }
  };

  return (
    <WizardShell
      currentIndex={4}
      backHref="/organization/signup/workspace-setup"
      containerClassName="max-w-3xl"
    >
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-brand-text-primary">Organization Verification</h2>
        <p className="text-sm text-brand-text-muted mt-1">
          Help us verify your organization to keep PromyLink safe and trusted.
        </p>
      </div>

      {/* Info Alert Box */}
      <div className="flex items-start gap-3.5 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-4 mb-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-text-primary">Your information is secure</p>
          <p className="text-xs text-brand-text-muted mt-0.5 leading-relaxed">
            We only use this information for verification purposes. Your data is encrypted and will
            never be shared with third parties.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/organization/signup/all-set");
        }}
        className="space-y-6"
      >
        {/* Section 1: Organization Documents */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-brand-text-primary">1. Organization Documents</h3>
            <p className="text-xs text-brand-text-muted mt-0.5">
              Upload the required documents to verify your organization. At least one official document
              is required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* Upload Zone */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />

            {uploadedFile ? (
              <div className="flex flex-col justify-between rounded-xl border border-brand-primary/40 bg-brand-primary/[0.03] p-4 min-h-[140px]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <FileText className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-brand-text-primary truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-[11px] text-brand-text-muted">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-brand-text-muted hover:bg-brand-surface-secondary hover:text-brand-error transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-brand-success mt-2">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                  Document ready for upload
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-border bg-brand-surface p-6 text-center hover:bg-brand-surface-secondary/40 hover:border-brand-primary/50 transition-all cursor-pointer min-h-[140px]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary mb-2">
                  <UploadCloud className="h-4.5 w-4.5" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-brand-primary">Upload Document</p>
                <p className="text-[11px] text-brand-text-muted mt-0.5">PDF, JPG or PNG (Max 10MB)</p>
              </div>
            )}

            {/* Accepted Documents List */}
            <div className="rounded-xl border border-brand-border bg-brand-surface p-4 flex flex-col justify-center">
              <p className="text-xs font-semibold text-brand-text-primary mb-2.5">
                Accepted Documents
              </p>
              <ul className="space-y-2 text-xs text-brand-text-secondary">
                {ACCEPTED_DOCS.map((doc) => (
                  <li key={doc} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-brand-success shrink-0 stroke-[2.5]" />
                    <span className="leading-snug">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Authorized Person Details */}
        <div className="space-y-4 pt-2 border-t border-brand-border/60">
          <div>
            <h3 className="text-sm font-semibold text-brand-text-primary">
              2. Authorized Person Details
            </h3>
            <p className="text-xs text-brand-text-muted mt-0.5">
              Provide details and identity verification of the person authorized to represent this organization.
            </p>
          </div>

          {/* Basic Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                <input
                  type="text"
                  value={authPersonName}
                  onChange={(e) => setAuthPersonName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface pl-10 pr-3.5 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                Designation
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                <input
                  type="text"
                  value={authPersonDesignation}
                  onChange={(e) => setAuthPersonDesignation(e.target.value)}
                  placeholder="e.g. Owner, Director, Founder"
                  className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface pl-10 pr-3.5 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                <input
                  type="email"
                  value={authPersonEmail}
                  onChange={(e) => setAuthPersonEmail(e.target.value)}
                  placeholder="Enter official email address"
                  className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface pl-10 pr-3.5 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                <input
                  type="tel"
                  value={authPersonPhone}
                  onChange={(e) => setAuthPersonPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface pl-10 pr-3.5 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Identity Verification Sub-section */}
          <div className="rounded-xl border border-brand-border bg-brand-surface p-4.5 space-y-4 mt-2">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-brand-text-primary">
                  Authorized Person Identity Proof
                </p>
                <span className="text-[11px] text-brand-text-muted">
                  Choose PAN, Aadhaar, or Passport (Foreign)
                </span>
              </div>
              <p className="text-[11px] text-brand-text-muted mt-0.5">
                Select the government identification document for the authorized representative.
              </p>
            </div>

            {/* ID Type Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {ID_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = idType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectIdType(opt.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20"
                        : "border-brand-border bg-brand-surface hover:border-brand-primary/40 hover:bg-brand-surface-secondary/40"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-brand-primary text-white"
                          : "bg-brand-surface-secondary text-brand-text-secondary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-semibold leading-snug ${
                          isSelected ? "text-brand-primary" : "text-brand-text-primary"
                        }`}
                      >
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-brand-text-muted mt-0.5 leading-tight">
                        {opt.sublabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic ID Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {idType === "pan" && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                    PAN Card Number (10 Characters)
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                    <input
                      type="text"
                      value={idNumber}
                      onChange={(e) => handlePanChange(e.target.value)}
                      placeholder="e.g. ABCDE1234F"
                      maxLength={10}
                      className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface pl-10 pr-3.5 text-sm font-mono uppercase tracking-wider text-brand-text-primary placeholder:text-brand-text-muted placeholder:font-sans placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-brand-text-muted mt-1">
                    Enter the authorized person&apos;s 10-character Permanent Account Number.
                  </p>
                </div>
              )}

              {idType === "aadhaar" && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                    Aadhaar Card Number (12 Digits)
                  </label>
                  <div className="relative">
                    <FileCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                    <input
                      type="text"
                      value={idNumber}
                      onChange={(e) => handleAadhaarChange(e.target.value)}
                      placeholder="e.g. 1234 5678 9012"
                      maxLength={14}
                      className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface pl-10 pr-3.5 text-sm font-mono tracking-wider text-brand-text-primary placeholder:text-brand-text-muted placeholder:font-sans placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-brand-text-muted mt-1">
                    Enter the 12-digit UIDAI Aadhaar number of the authorized person.
                  </p>
                </div>
              )}

              {idType === "passport" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                      Passport Number
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                      <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value.toUpperCase())}
                        placeholder="e.g. A12345678"
                        className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface pl-10 pr-3.5 text-sm uppercase tracking-wider text-brand-text-primary placeholder:text-brand-text-muted placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                      Country of Issuance / Nationality
                    </label>
                    <input
                      type="text"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      placeholder="e.g. United States, United Kingdom"
                      className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface px-3.5 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Upload ID Document File */}
            <div className="pt-2 border-t border-brand-border/60">
              <label className="block text-xs font-medium text-brand-text-secondary mb-1.5">
                Upload {idType === "pan" ? "PAN Card" : idType === "aadhaar" ? "Aadhaar Card" : "Passport"} Copy
              </label>

              <input
                ref={idDocInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleIdFileChange}
                className="hidden"
              />

              {uploadedIdFile ? (
                <div className="flex items-center justify-between rounded-xl border border-brand-primary/40 bg-brand-primary/[0.03] p-3.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-brand-text-primary truncate">
                        {uploadedIdFile.name}
                      </p>
                      <p className="text-[11px] text-brand-text-muted">
                        {(uploadedIdFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for review
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveIdFile}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-brand-text-muted hover:bg-brand-surface-secondary hover:text-brand-error transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => idDocInputRef.current?.click()}
                  className="flex items-center justify-between rounded-xl border-2 border-dashed border-brand-border bg-brand-surface p-3.5 hover:bg-brand-surface-secondary/40 hover:border-brand-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <UploadCloud className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brand-primary">
                        Upload ID Document ({idType === "pan" ? "PAN" : idType === "aadhaar" ? "Aadhaar" : "Passport"})
                      </p>
                      <p className="text-[10px] text-brand-text-muted">PDF, JPG or PNG (Max 5MB)</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-md">
                    Browse
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Additional Notes */}
        <div className="pt-2 border-t border-brand-border/60">
          <h3 className="text-sm font-semibold text-brand-text-primary">
            3. Additional Information (Optional)
          </h3>
          <p className="text-xs text-brand-text-muted mb-2">
            If there&apos;s anything else you&apos;d like us to know, feel free to share.
          </p>
          <textarea
            value={notes}
            onChange={(e) => e.target.value.length <= NOTES_MAX && setNotes(e.target.value)}
            rows={3}
            placeholder="Type your message..."
            className="w-full rounded-[10px] border border-brand-border bg-brand-surface p-3.5 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors resize-none"
          />
          <p className="text-right text-xs text-brand-text-muted mt-1">
            {notes.length}/{NOTES_MAX}
          </p>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={() => router.push("/organization/signup/workspace-setup")}
            className="rounded-lg border border-brand-border px-5 py-2.5 text-sm font-semibold text-brand-text-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-[10px] bg-brand-primary hover:bg-brand-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Submit for Review
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </WizardShell>
  );
}

