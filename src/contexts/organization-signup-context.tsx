"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type BusinessType =
  | "sole_proprietorship"
  | "partnership_firm"
  | "llp"
  | "opc"
  | "pvt_ltd"
  | "ltd";

export type SecondaryDocKey =
  | "pan"
  | "gst"
  | "udyam"
  | "shop_establishment"
  | "firm_registration"
  | "address"
  | "bank";

export interface SecondaryDocOption {
  id: SecondaryDocKey;
  label: string;
  sublabel: string;
  fieldLabel?: string;
  placeholder?: string;
}

export interface BusinessTypeMeta {
  id: BusinessType;
  label: string;
  badge: string;
  description: string;
  keyDocName: string;
  keyDocDescription: string;
  secondaryOptions: SecondaryDocOption[];
}

export const BUSINESS_TYPES: Record<BusinessType, BusinessTypeMeta> = {
  sole_proprietorship: {
    id: "sole_proprietorship",
    label: "Sole Proprietorship",
    badge: "Individual Owned",
    description: "Unincorporated business owned and managed by a single individual",
    keyDocName: "Business / Proprietorship Registration Proof",
    keyDocDescription: "Trade license, MSME, or local municipal registration certificate",
    secondaryOptions: [
      {
        id: "pan",
        label: "Proprietor PAN Card",
        sublabel: "Personal PAN",
        fieldLabel: "Proprietor PAN Number",
        placeholder: "e.g. ABCDE1234F",
      },
      {
        id: "gst",
        label: "GST Certificate",
        sublabel: "Form GST REG-06",
        fieldLabel: "GSTIN Number",
        placeholder: "e.g. 36AAAAA0000A1Z5",
      },
      {
        id: "udyam",
        label: "Udyam Certificate",
        sublabel: "MSME Registration",
        fieldLabel: "Udyam Number",
        placeholder: "e.g. UDYAM-TS-00-0000000",
      },
      {
        id: "shop_establishment",
        label: "Shop & Establishment",
        sublabel: "Municipal Certificate",
        fieldLabel: "Certificate / Registration No",
        placeholder: "e.g. SEA/2024/00192",
      },
      {
        id: "address",
        label: "Business Address Proof",
        sublabel: "Utility Bill / Lease",
      },
      {
        id: "bank",
        label: "Bank Proof",
        sublabel: "Cancelled Cheque / Passbook",
      },
    ],
  },
  partnership_firm: {
    id: "partnership_firm",
    label: "Partnership Firm",
    badge: "Unincorporated",
    description: "Business formed by two or more partners under a registered Partnership Deed",
    keyDocName: "Partnership Deed",
    keyDocDescription: "Official signed Partnership Deed of the firm",
    secondaryOptions: [
      {
        id: "pan",
        label: "Firm PAN Card",
        sublabel: "Firm's Entity PAN",
        fieldLabel: "Partnership Firm PAN Number",
        placeholder: "e.g. ABCDE1234F",
      },
      {
        id: "gst",
        label: "GST Certificate",
        sublabel: "Form GST REG-06",
        fieldLabel: "GSTIN Number",
        placeholder: "e.g. 36AAAAA0000A1Z5",
      },
      {
        id: "firm_registration",
        label: "Firm Registration Certificate",
        sublabel: "ROF Certificate",
        fieldLabel: "Registration Number",
        placeholder: "e.g. ROF/HYD/123/2023",
      },
      {
        id: "udyam",
        label: "Udyam Certificate",
        sublabel: "MSME Registration",
        fieldLabel: "Udyam Number",
        placeholder: "e.g. UDYAM-TS-00-0000000",
      },
      {
        id: "address",
        label: "Business Address Proof",
        sublabel: "Utility Bill / Lease",
      },
      {
        id: "bank",
        label: "Bank Proof",
        sublabel: "Cancelled Cheque / Passbook",
      },
    ],
  },
  llp: {
    id: "llp",
    label: "Limited Liability Partnership (LLP)",
    badge: "MCA Registered",
    description: "Body corporate with limited partner liability registered with MCA",
    keyDocName: "LLP Incorporation Certificate",
    keyDocDescription: "Certificate of Incorporation issued by Registrar of Companies (ROC)",
    secondaryOptions: [
      {
        id: "pan",
        label: "LLP PAN Card",
        sublabel: "Entity PAN",
        fieldLabel: "LLP PAN Number",
        placeholder: "e.g. ABCDE1234F",
      },
      {
        id: "gst",
        label: "GST Certificate",
        sublabel: "Form GST REG-06",
        fieldLabel: "GSTIN Number",
        placeholder: "e.g. 36AAAAA0000A1Z5",
      },
      {
        id: "udyam",
        label: "Udyam Certificate",
        sublabel: "MSME Registration",
        fieldLabel: "Udyam Number",
        placeholder: "e.g. UDYAM-TS-00-0000000",
      },
      {
        id: "address",
        label: "Business Address Proof",
        sublabel: "Utility Bill / Lease",
      },
      {
        id: "bank",
        label: "Bank Proof",
        sublabel: "Cancelled Cheque / Passbook",
      },
    ],
  },
  opc: {
    id: "opc",
    label: "One Person Company (OPC)",
    badge: "Private Limited",
    description: "Corporate entity with single shareholder / member structure",
    keyDocName: "Certificate of Incorporation",
    keyDocDescription: "MCA Certificate of Incorporation (COI)",
    secondaryOptions: [
      {
        id: "pan",
        label: "Business PAN Card",
        sublabel: "Company PAN",
        fieldLabel: "Company PAN Number",
        placeholder: "e.g. ABCDE1234F",
      },
      {
        id: "gst",
        label: "GST Certificate",
        sublabel: "Form GST REG-06",
        fieldLabel: "GSTIN Number",
        placeholder: "e.g. 36AAAAA0000A1Z5",
      },
      {
        id: "udyam",
        label: "Udyam Certificate",
        sublabel: "MSME Registration",
        fieldLabel: "Udyam Number",
        placeholder: "e.g. UDYAM-TS-00-0000000",
      },
      {
        id: "address",
        label: "Business Address Proof",
        sublabel: "Utility Bill / Lease",
      },
      {
        id: "bank",
        label: "Bank Proof",
        sublabel: "Cancelled Cheque / Passbook",
      },
    ],
  },
  pvt_ltd: {
    id: "pvt_ltd",
    label: "Private Limited Company (Pvt. Ltd.)",
    badge: "Most Common",
    description: "Privately held commercial entity registered under Companies Act",
    keyDocName: "Certificate of Incorporation",
    keyDocDescription: "MCA Certificate of Incorporation (COI)",
    secondaryOptions: [
      {
        id: "pan",
        label: "Business PAN Card",
        sublabel: "Company PAN",
        fieldLabel: "Company PAN Number",
        placeholder: "e.g. ABCDE1234F",
      },
      {
        id: "gst",
        label: "GST Certificate",
        sublabel: "Form GST REG-06",
        fieldLabel: "GSTIN Number",
        placeholder: "e.g. 36AAAAA0000A1Z5",
      },
      {
        id: "udyam",
        label: "Udyam Certificate",
        sublabel: "MSME Registration",
        fieldLabel: "Udyam Number",
        placeholder: "e.g. UDYAM-TS-00-0000000",
      },
      {
        id: "address",
        label: "Business Address Proof",
        sublabel: "Utility Bill / Lease",
      },
      {
        id: "bank",
        label: "Bank Proof",
        sublabel: "Cancelled Cheque / Passbook",
      },
    ],
  },
  ltd: {
    id: "ltd",
    label: "Public Limited Company (Ltd)",
    badge: "Public Corporation",
    description: "Corporate entity that can offer public shares and securities",
    keyDocName: "Certificate of Incorporation",
    keyDocDescription: "MCA Certificate of Incorporation (COI)",
    secondaryOptions: [
      {
        id: "pan",
        label: "Business PAN Card",
        sublabel: "Company PAN",
        fieldLabel: "Company PAN Number",
        placeholder: "e.g. ABCDE1234F",
      },
      {
        id: "gst",
        label: "GST Certificate",
        sublabel: "Form GST REG-06",
        fieldLabel: "GSTIN Number",
        placeholder: "e.g. 36AAAAA0000A1Z5",
      },
      {
        id: "udyam",
        label: "Udyam Certificate",
        sublabel: "MSME Registration",
        fieldLabel: "Udyam Number",
        placeholder: "e.g. UDYAM-TS-00-0000000",
      },
      {
        id: "address",
        label: "Business Address Proof",
        sublabel: "Utility Bill / Lease",
      },
      {
        id: "bank",
        label: "Bank Proof",
        sublabel: "Cancelled Cheque / Passbook",
      },
    ],
  },
};

export interface UploadedDocInfo {
  fileName?: string;
  fileSize?: string;
  fileDataUrl?: string;
  uploadedAt?: string;
}

export interface OrganizationSignupState {
  // Step 1: User & Auth Details
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;

  // Step 2: Simple & Clean Business Details
  organizationName: string;
  businessType: BusinessType;
  industry: string;
  website: string;

  // 2-Document KYC (1 compulsory primary + 1 selected secondary)
  keyRegistrationDoc: UploadedDocInfo;
  secondaryDocType: SecondaryDocKey;
  panNumber: string;
  panDoc: UploadedDocInfo;
  gstin: string;
  gstDoc: UploadedDocInfo;
  udyamNumber: string;
  udyamDoc: UploadedDocInfo;
  shopEstablishmentNumber: string;
  shopEstablishmentDoc: UploadedDocInfo;
  firmRegistrationNumber: string;
  firmRegistrationDoc: UploadedDocInfo;
  addressProofType: string;
  addressDoc: UploadedDocInfo;
  bankAccountNumber: string;
  bankIfsc: string;
  bankName: string;
  bankDoc: UploadedDocInfo;

  // Step 3: Application Submission Status
  applicationId: string;
  submittedAt: string;
  status: "draft" | "under_review" | "approved";
}

const initialState: OrganizationSignupState = {
  name: "",
  email: "",
  phone: "",
  countryCode: "+91",
  password: "",
  isEmailVerified: false,
  isPhoneVerified: false,

  organizationName: "",
  businessType: "pvt_ltd",
  industry: "",
  website: "",

  keyRegistrationDoc: {},
  secondaryDocType: "pan",
  panNumber: "",
  panDoc: {},
  gstin: "",
  gstDoc: {},
  udyamNumber: "",
  udyamDoc: {},
  shopEstablishmentNumber: "",
  shopEstablishmentDoc: {},
  firmRegistrationNumber: "",
  firmRegistrationDoc: {},
  addressProofType: "",
  addressDoc: {},
  bankAccountNumber: "",
  bankIfsc: "",
  bankName: "",
  bankDoc: {},

  applicationId: "",
  submittedAt: "",
  status: "draft",
};

interface OrganizationSignupContextType {
  state: OrganizationSignupState;
  updateState: (updates: Partial<OrganizationSignupState>) => void;
  setDocFile: (docKey: keyof OrganizationSignupState, fileInfo: UploadedDocInfo) => void;
  removeDocFile: (docKey: keyof OrganizationSignupState) => void;
  markEmailVerified: () => void;
  markPhoneVerified: () => void;
  submitApplication: () => void;
  resetSignup: () => void;
}

const OrganizationSignupContext = createContext<OrganizationSignupContextType | undefined>(undefined);

export function OrganizationSignupProvider({ children }: { children: ReactNode }) {
  // State is purely in-memory during flow navigation and resets cleanly on refresh
  const [state, setState] = useState<OrganizationSignupState>(initialState);

  const updateState = (updates: Partial<OrganizationSignupState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const setDocFile = (docKey: keyof OrganizationSignupState, fileInfo: UploadedDocInfo) => {
    setState((prev) => ({
      ...prev,
      [docKey]: fileInfo,
    }));
  };

  const removeDocFile = (docKey: keyof OrganizationSignupState) => {
    setState((prev) => ({
      ...prev,
      [docKey]: {},
    }));
  };

  const markEmailVerified = () => {
    setState((prev) => ({ ...prev, isEmailVerified: true }));
  };

  const markPhoneVerified = () => {
    setState((prev) => ({ ...prev, isPhoneVerified: true }));
  };

  const submitApplication = () => {
    const timestamp = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setState((prev) => ({
      ...prev,
      applicationId: prev.applicationId || "ORG-" + Math.floor(100000 + Math.random() * 900000),
      submittedAt: timestamp,
      status: "under_review",
    }));
  };

  const resetSignup = () => {
    setState(initialState);
  };

  return (
    <OrganizationSignupContext.Provider
      value={{
        state,
        updateState,
        setDocFile,
        removeDocFile,
        markEmailVerified,
        markPhoneVerified,
        submitApplication,
        resetSignup,
      }}
    >
      {children}
    </OrganizationSignupContext.Provider>
  );
}

export function useOrganizationSignup() {
  const context = useContext(OrganizationSignupContext);
  if (!context) {
    throw new Error("useOrganizationSignup must be used within an OrganizationSignupProvider");
  }
  return context;
}
