"use client";

import { useRef, useState, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  Check,
  X,
  CreditCard,
  FileCheck,
  Building,
  Landmark,
  ShieldCheck,
  FilePlus,
  Sparkles,
} from "lucide-react";
import {
  BusinessType,
  BUSINESS_TYPES,
  SecondaryDocKey,
  UploadedDocInfo,
  useOrganizationSignup,
} from "@/contexts/organization-signup-context";

interface DocumentUploadMatrixProps {
  businessType: BusinessType;
  errors?: Record<string, string>;
}

interface UploadTileProps {
  label: string;
  sublabel: string;
  isMandatory?: boolean;
  uploadedDoc?: UploadedDocInfo;
  onFileSelect: (info: UploadedDocInfo) => void;
  onFileRemove: () => void;
  acceptedFormats?: string;
  maxSizeMB?: number;
  icon?: React.ElementType;
  error?: string;
}

function UploadTile({
  label,
  sublabel,
  isMandatory = true,
  uploadedDoc,
  onFileSelect,
  onFileRemove,
  acceptedFormats = ".pdf,.jpg,.jpeg,.png",
  maxSizeMB = 10,
  icon: Icon = FileText,
  error,
}: UploadTileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds maximum limit of ${maxSizeMB}MB`);
      return;
    }

    const sizeStr =
      file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    const fileInfo: UploadedDocInfo = {
      fileName: file.name,
      fileSize: sizeStr,
      uploadedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onFileSelect(fileInfo);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-brand-text-primary">
          {label}{" "}
          {isMandatory ? (
            <span className="text-brand-error">*</span>
          ) : (
            <span className="text-brand-text-muted text-[11px] font-normal">(Optional)</span>
          )}
        </label>
        <span className="text-[11px] text-brand-text-muted">{sublabel}</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileChange}
        className="hidden"
      />

      {uploadedDoc?.fileName ? (
        <div className="flex items-center justify-between rounded-xl border border-brand-primary/40 bg-brand-primary/[0.03] p-3 transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-brand-text-primary truncate">
                {uploadedDoc.fileName}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-brand-text-muted">
                <span>{uploadedDoc.fileSize}</span>
                <span>•</span>
                <span className="text-brand-success font-medium flex items-center gap-0.5">
                  <Check className="h-3 w-3 stroke-[3]" />
                  Uploaded
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onFileRemove();
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-brand-text-muted hover:bg-brand-surface-secondary hover:text-brand-error transition-colors cursor-pointer"
            title="Remove document"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex items-center justify-between rounded-xl border-2 border-dashed p-3.5 transition-all cursor-pointer ${
            error
              ? "border-brand-error bg-brand-error/5"
              : isDragging
              ? "border-brand-primary bg-brand-primary/5"
              : "border-brand-border bg-brand-surface hover:border-brand-primary/50 hover:bg-brand-surface-secondary/40"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
              <UploadCloud className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-primary">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-[10px] text-brand-text-muted">PDF, JPG or PNG (Max {maxSizeMB}MB)</p>
            </div>
          </div>
          <span className="text-xs font-medium text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-md shrink-0">
            Browse
          </span>
        </div>
      )}

      {error && <p className="text-[11px] text-brand-error font-medium">{error}</p>}
    </div>
  );
}

const DOC_ICON_MAP: Record<SecondaryDocKey, React.ElementType> = {
  pan: CreditCard,
  gst: Building,
  udyam: FilePlus,
  shop_establishment: Building,
  firm_registration: FileCheck,
  address: Landmark,
  bank: CreditCard,
};

export function DocumentUploadMatrix({
  businessType,
  errors = {},
}: DocumentUploadMatrixProps) {
  const { state, updateState, setDocFile, removeDocFile } = useOrganizationSignup();
  const currentTypeMeta = BUSINESS_TYPES[businessType];

  // Ensure current active secondary doc belongs to the business type's options
  const activeSecondary = state.secondaryDocType || currentTypeMeta.secondaryOptions[0].id;

  useEffect(() => {
    // If previous secondary doc type is not valid for newly selected business type, default to first option
    const isValidForType = currentTypeMeta.secondaryOptions.some(
      (opt) => opt.id === state.secondaryDocType
    );
    if (!isValidForType) {
      updateState({ secondaryDocType: currentTypeMeta.secondaryOptions[0].id });
    }
  }, [businessType, currentTypeMeta, state.secondaryDocType, updateState]);

  const currentSecondaryMeta =
    currentTypeMeta.secondaryOptions.find((opt) => opt.id === activeSecondary) ||
    currentTypeMeta.secondaryOptions[0];

  return (
    <div className="space-y-5">
      {/* 1. Primary Registration Document (COMPULSORY) */}
      <div className="rounded-xl border border-brand-border bg-brand-surface p-4.5 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-brand-border/60 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-primary/10 text-brand-primary">
              <FileCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-text-primary">
                1. Primary Registration Document
              </h3>
              <p className="text-[11px] text-brand-text-muted">
                Compulsory incorporation proof for {currentTypeMeta.label}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-brand-error bg-brand-error/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Compulsory
          </span>
        </div>

        <UploadTile
          label={currentTypeMeta.keyDocName}
          sublabel={currentTypeMeta.keyDocDescription}
          isMandatory={true}
          uploadedDoc={state.keyRegistrationDoc}
          onFileSelect={(info) => setDocFile("keyRegistrationDoc", info)}
          onFileRemove={() => removeDocFile("keyRegistrationDoc")}
          icon={FileCheck}
          error={errors.keyRegistrationDoc}
        />
      </div>

      {/* 2. Secondary Supporting Document (CHOOSE ANY 1) */}
      <div className="rounded-xl border border-brand-border bg-brand-surface p-4.5 space-y-3.5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-brand-border/60 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-primary/10 text-brand-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-text-primary">
                2. Secondary Document (Select Any 1)
              </h3>
              <p className="text-[11px] text-brand-text-muted">
                Pick <strong>1 supporting document</strong> applicable to {currentTypeMeta.label}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider self-start sm:self-auto">
            Choose 1 of {currentTypeMeta.secondaryOptions.length}
          </span>
        </div>

        {/* Dynamic Secondary Tabs based strictly on the selected Business Type */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {currentTypeMeta.secondaryOptions.map((opt) => {
            const Icon = DOC_ICON_MAP[opt.id] || FileText;
            const isSelected = activeSecondary === opt.id;

            let isUploaded = false;
            if (opt.id === "pan" && state.panDoc?.fileName) isUploaded = true;
            if (opt.id === "gst" && state.gstDoc?.fileName) isUploaded = true;
            if (opt.id === "udyam" && state.udyamDoc?.fileName) isUploaded = true;
            if (opt.id === "shop_establishment" && state.shopEstablishmentDoc?.fileName) isUploaded = true;
            if (opt.id === "firm_registration" && state.firmRegistrationDoc?.fileName) isUploaded = true;
            if (opt.id === "address" && state.addressDoc?.fileName) isUploaded = true;
            if (opt.id === "bank" && state.bankDoc?.fileName) isUploaded = true;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateState({ secondaryDocType: opt.id })}
                className={`flex flex-col items-center justify-center text-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20 shadow-xs"
                    : "border-brand-border bg-brand-surface hover:border-brand-primary/40 hover:bg-brand-surface-secondary/40"
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg mb-1 ${
                    isSelected
                      ? "bg-brand-primary text-white"
                      : "bg-brand-surface-secondary text-brand-text-secondary"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <p
                  className={`text-xs font-bold leading-tight ${
                    isSelected ? "text-brand-primary" : "text-brand-text-primary"
                  }`}
                >
                  {opt.label}
                </p>
                <span className="text-[10px] text-brand-text-muted mt-0.5 leading-tight truncate max-w-[130px]">
                  {opt.sublabel}
                </span>

                {isUploaded && (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-brand-success mt-1">
                    <Check className="h-2.5 w-2.5 stroke-[3]" /> Uploaded
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Secondary Document Upload Area */}
        <div className="pt-2">
          {/* 1. PAN Option */}
          {activeSecondary === "pan" && (
            <div className="rounded-xl border border-brand-primary/20 bg-brand-surface-secondary/30 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    {currentSecondaryMeta.fieldLabel || "PAN Number"} (10 Characters) <span className="text-brand-error">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                    <input
                      type="text"
                      value={state.panNumber}
                      onChange={(e) =>
                        updateState({
                          panNumber: e.target.value
                            .replace(/[^a-zA-Z0-9]/g, "")
                            .slice(0, 10)
                            .toUpperCase(),
                        })
                      }
                      placeholder={currentSecondaryMeta.placeholder || "e.g. ABCDE1234F"}
                      maxLength={10}
                      className={`w-full h-11 rounded-[10px] border bg-brand-surface pl-10 pr-3.5 text-sm font-mono uppercase tracking-wider text-brand-text-primary placeholder:text-brand-text-muted placeholder:font-sans focus:outline-none focus:ring-2 focus:border-brand-primary transition-colors ${
                        errors.panNumber
                          ? "border-brand-error focus:ring-brand-error/30"
                          : "border-brand-border focus:ring-brand-primary/30"
                      }`}
                    />
                  </div>
                  {errors.panNumber && (
                    <p className="text-[11px] text-brand-error font-medium mt-1">
                      {errors.panNumber}
                    </p>
                  )}
                </div>

                <UploadTile
                  label={`Upload ${currentSecondaryMeta.label}`}
                  sublabel="Clear scan / photo of PAN card"
                  isMandatory={true}
                  uploadedDoc={state.panDoc}
                  onFileSelect={(info) => setDocFile("panDoc", info)}
                  onFileRemove={() => removeDocFile("panDoc")}
                  icon={CreditCard}
                  error={errors.panDoc}
                />
              </div>
            </div>
          )}

          {/* 2. GST Option */}
          {activeSecondary === "gst" && (
            <div className="rounded-xl border border-brand-primary/20 bg-brand-surface-secondary/30 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    GSTIN Number (15 Characters) <span className="text-brand-error">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted pointer-events-none" />
                    <input
                      type="text"
                      value={state.gstin}
                      onChange={(e) =>
                        updateState({
                          gstin: e.target.value
                            .replace(/[^a-zA-Z0-9]/g, "")
                            .slice(0, 15)
                            .toUpperCase(),
                        })
                      }
                      placeholder="e.g. 36AAAAA0000A1Z5"
                      maxLength={15}
                      className={`w-full h-11 rounded-[10px] border bg-brand-surface pl-10 pr-3.5 text-sm font-mono uppercase tracking-wider text-brand-text-primary placeholder:text-brand-text-muted placeholder:font-sans focus:outline-none focus:ring-2 focus:border-brand-primary transition-colors ${
                        errors.gstin
                          ? "border-brand-error focus:ring-brand-error/30"
                          : "border-brand-border focus:ring-brand-primary/30"
                      }`}
                    />
                  </div>
                  {errors.gstin && (
                    <p className="text-[11px] text-brand-error font-medium mt-1">
                      {errors.gstin}
                    </p>
                  )}
                </div>

                <UploadTile
                  label="Upload GST Certificate"
                  sublabel="Form GST REG-06 registration scan"
                  isMandatory={true}
                  uploadedDoc={state.gstDoc}
                  onFileSelect={(info) => setDocFile("gstDoc", info)}
                  onFileRemove={() => removeDocFile("gstDoc")}
                  icon={Building}
                  error={errors.gstDoc}
                />
              </div>
            </div>
          )}

          {/* 3. Udyam Option */}
          {activeSecondary === "udyam" && (
            <div className="rounded-xl border border-brand-primary/20 bg-brand-surface-secondary/30 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    Udyam Registration Number <span className="text-brand-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={state.udyamNumber}
                    onChange={(e) =>
                      updateState({ udyamNumber: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g. UDYAM-TS-00-0000000"
                    className={`w-full h-11 rounded-[10px] border bg-brand-surface px-3.5 text-sm uppercase tracking-wider text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:border-brand-primary transition-colors ${
                      errors.udyamNumber
                        ? "border-brand-error focus:ring-brand-error/30"
                        : "border-brand-border focus:ring-brand-primary/30"
                    }`}
                  />
                  {errors.udyamNumber && (
                    <p className="text-[11px] text-brand-error font-medium mt-1">
                      {errors.udyamNumber}
                    </p>
                  )}
                </div>

                <UploadTile
                  label="Upload Udyam Certificate"
                  sublabel="Official MSME Certificate copy"
                  isMandatory={true}
                  uploadedDoc={state.udyamDoc}
                  onFileSelect={(info) => setDocFile("udyamDoc", info)}
                  onFileRemove={() => removeDocFile("udyamDoc")}
                  icon={FilePlus}
                  error={errors.udyamDoc}
                />
              </div>
            </div>
          )}

          {/* 4. Shop & Establishment Option (Sole Proprietorship) */}
          {activeSecondary === "shop_establishment" && (
            <div className="rounded-xl border border-brand-primary/20 bg-brand-surface-secondary/30 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    Shop &amp; Establishment Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={state.shopEstablishmentNumber}
                    onChange={(e) =>
                      updateState({
                        shopEstablishmentNumber: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="e.g. SEA/2024/00192"
                    className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface px-3.5 text-sm uppercase tracking-wider text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                  />
                </div>

                <UploadTile
                  label="Upload Shop & Establishment Certificate"
                  sublabel="Municipal registration / license"
                  isMandatory={true}
                  uploadedDoc={state.shopEstablishmentDoc}
                  onFileSelect={(info) => setDocFile("shopEstablishmentDoc", info)}
                  onFileRemove={() => removeDocFile("shopEstablishmentDoc")}
                  icon={Building}
                  error={errors.shopEstablishmentDoc}
                />
              </div>
            </div>
          )}

          {/* 5. Firm Registration Certificate (Partnership Firm) */}
          {activeSecondary === "firm_registration" && (
            <div className="rounded-xl border border-brand-primary/20 bg-brand-surface-secondary/30 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    Firm Registration Number (ROF) <span className="text-brand-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={state.firmRegistrationNumber}
                    onChange={(e) =>
                      updateState({
                        firmRegistrationNumber: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="e.g. ROF/HYD/123/2023"
                    className={`w-full h-11 rounded-[10px] border bg-brand-surface px-3.5 text-sm uppercase tracking-wider text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:border-brand-primary transition-colors ${
                      errors.firmRegistrationNumber
                        ? "border-brand-error focus:ring-brand-error/30"
                        : "border-brand-border focus:ring-brand-primary/30"
                    }`}
                  />
                  {errors.firmRegistrationNumber && (
                    <p className="text-[11px] text-brand-error font-medium mt-1">
                      {errors.firmRegistrationNumber}
                    </p>
                  )}
                </div>

                <UploadTile
                  label="Upload Firm Registration Certificate"
                  sublabel="Certificate issued by Registrar of Firms"
                  isMandatory={true}
                  uploadedDoc={state.firmRegistrationDoc}
                  onFileSelect={(info) => setDocFile("firmRegistrationDoc", info)}
                  onFileRemove={() => removeDocFile("firmRegistrationDoc")}
                  icon={FileCheck}
                  error={errors.firmRegistrationDoc}
                />
              </div>
            </div>
          )}

          {/* 6. Address Proof Option */}
          {activeSecondary === "address" && (
            <div className="rounded-xl border border-brand-primary/20 bg-brand-surface-secondary/30 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    Address Proof Type <span className="text-brand-error">*</span>
                  </label>
                  <select
                    value={state.addressProofType}
                    onChange={(e) =>
                      updateState({ addressProofType: e.target.value })
                    }
                    className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface px-3 text-sm text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors cursor-pointer"
                  >
                    <option value="Electricity Bill">Electricity Bill (Latest &lt; 3 months)</option>
                    <option value="Rent / Lease Agreement">Registered Rent / Lease Agreement</option>
                    <option value="Telephone / Broadband Bill">Telephone / Broadband Bill</option>
                    <option value="Property Tax Receipt">Property Tax Receipt</option>
                  </select>
                </div>

                <UploadTile
                  label="Upload Address Proof"
                  sublabel="Utility bill or lease agreement"
                  isMandatory={true}
                  uploadedDoc={state.addressDoc}
                  onFileSelect={(info) => setDocFile("addressDoc", info)}
                  onFileRemove={() => removeDocFile("addressDoc")}
                  icon={Landmark}
                  error={errors.addressDoc}
                />
              </div>
            </div>
          )}

          {/* 7. Bank Proof Option */}
          {activeSecondary === "bank" && (
            <div className="rounded-xl border border-brand-primary/20 bg-brand-surface-secondary/30 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                <div>
                  <label className="block text-xs font-semibold text-brand-text-primary mb-1.5">
                    Bank Account Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={state.bankAccountNumber}
                    onChange={(e) =>
                      updateState({ bankAccountNumber: e.target.value })
                    }
                    placeholder="Enter account number"
                    className="w-full h-11 rounded-[10px] border border-brand-border bg-brand-surface px-3.5 text-sm font-mono text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                  />
                </div>

                <UploadTile
                  label="Upload Bank Proof"
                  sublabel="Cancelled Cheque / Statement (First page)"
                  isMandatory={true}
                  uploadedDoc={state.bankDoc}
                  onFileSelect={(info) => setDocFile("bankDoc", info)}
                  onFileRemove={() => removeDocFile("bankDoc")}
                  icon={CreditCard}
                  error={errors.bankDoc}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
