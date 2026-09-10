// Shared step list for the organization signup wizard.
export const WIZARD_STEPS = [
  {
    key: "account",
    label: "Account",
    description: "Account credentials & OTP verification.",
    path: "/organization/signup",
  },
  {
    key: "business-details",
    label: "Business Details",
    description: "Legal name, industry & business structure.",
    path: "/organization/signup/business-details",
  },
  {
    key: "verification-documents",
    label: "Verification & Documents",
    description: "Registration certificate & KYC proofs.",
    path: "/organization/signup/verification-documents",
  },
  {
    key: "review-submit",
    label: "Review & Submit",
    description: "Application summary & submission.",
    path: "/organization/signup/review-submit",
  },
  {
    key: "all-set",
    label: "Verification Status",
    description: "Review timeline & SLA tracking.",
    path: "/organization/signup/all-set",
  },
] as const;

export type WizardStepKey = (typeof WIZARD_STEPS)[number]["key"];

