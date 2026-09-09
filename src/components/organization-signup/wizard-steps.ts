// Shared step list for the organization signup wizard.
export const WIZARD_STEPS = [
  {
    key: "create-account",
    label: "Account & Verification",
    description: "Contact details & Dual OTP verification.",
  },
  {
    key: "organization-information",
    label: "Business Details & Documents",
    description: "Structure, business details & KYC proofs.",
  },
  {
    key: "all-set",
    label: "Verification Timeline",
    description: "Review submission & timeline tracking.",
  },
] as const;

export type WizardStepKey = (typeof WIZARD_STEPS)[number]["key"];

