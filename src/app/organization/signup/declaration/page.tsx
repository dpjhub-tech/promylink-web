"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  Calendar,
  PenTool,
  Lock,
  Scale,
  AlertTriangle,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";
import { useOrganizationSignup } from "@/contexts/organization-signup-context";

const DECLARATION_SECTIONS = [
  {
    number: "1",
    title: "Authority and Accuracy",
    content: [
      "I am the proprietor, owner, partner, director, authorised signatory, employee, representative, or otherwise duly authorised person permitted to create and operate this Business Account.",
      "All information and documents submitted to PromyLink are true, accurate, complete and current to the best of my knowledge.",
      "I will promptly update PromyLink if any material information relating to the Business Account changes.",
      "I have the necessary authority and permissions to submit information, content, links, advertisements and promotional material on behalf of the Business.",
    ],
  },
  {
    number: "2",
    title: "Sole Responsibility for Business Activity",
    content: [
      "I acknowledge that the Business and its authorised users are responsible for all activities conducted through the Business Account.",
      "This includes, without limitation: links and URLs uploaded or shared, advertisements, promotions, offers, marketing campaigns, images, videos, text, documents, products or services promoted, third-party links, customer-facing content, and any other material submitted or distributed through PromyLink.",
      "The Business accepts full responsibility for ensuring that such activities and content are lawful, accurate, authorised and compliant with applicable laws and PromyLink policies.",
    ],
  },
  {
    number: "3",
    title: "Prohibited and Unlawful Activities",
    content: [
      "I confirm that the Business will not use PromyLink for: fake or deceptive links, fraudulent activities, phishing or scams, malicious redirects, malware or harmful software, false or misleading promotions, harassment, threats, stalking or abuse, unlawful sexually explicit content, sexual exploitation, child sexual exploitation or abuse, unlawful collection or disclosure of personal information, intellectual-property infringement, impersonation, illegal products or services, or any other activity prohibited by applicable law or PromyLink policies.",
    ],
  },
  {
    number: "4",
    title: "Responsibility for Links and Promotions",
    content: [
      "I specifically acknowledge that every link, URL, advertisement, promotion or landing page submitted through the Business Account is the responsibility of the Business.",
      "The Business is responsible for ensuring that links are genuine, functional, safe, accurately represented and legally compliant.",
      "PromyLink does not guarantee or certify that a Business's links, websites, products, services, advertisements or promotional claims are lawful, accurate, safe or legitimate.",
    ],
  },
  {
    number: "5",
    title: "Responsibility for Authorised Users",
    content: [
      "The Business is responsible for the conduct of persons accessing or operating its PromyLink account on its behalf, including employees, contractors, agencies, representatives, partners, agents and other authorised users.",
      "The Business must ensure that such persons comply with the PromyLink Terms of Use, Privacy Policy, Acceptable Use & Prohibited Content Policy and other applicable policies.",
    ],
  },
  {
    number: "6",
    title: "Complaints, Investigations and Legal Matters",
    content: [
      "I understand that if PromyLink receives a complaint, report, legal notice, court order, government request, law-enforcement request or other legally valid request concerning activity associated with the Business Account, PromyLink may investigate and take appropriate action.",
      "Such action may include: reviewing relevant account information, removing or restricting content, disabling links, suspending the Business Account, terminating the Business Account, preserving relevant information, and disclosing relevant information where required or permitted by applicable law.",
    ],
  },
  {
    number: "7",
    title: "Government and Law-Enforcement Disclosure",
    content: [
      "I acknowledge and agree that PromyLink may cooperate with police authorities, law-enforcement agencies, courts, regulators, government authorities and other legally authorised entities.",
      "Where PromyLink receives a valid legal request or is otherwise required or permitted by applicable law, PromyLink may disclose relevant information associated with the Business Account (including business information, contact details, account identifiers, submitted links, uploaded content, transaction logs, IP addresses, technical information, and account activity).",
      "I understand that PromyLink may not always be able to notify the Business before making such disclosure where notification is prohibited, restricted or not reasonably practicable under applicable law.",
    ],
  },
  {
    number: "8",
    title: "No Misuse of PromyLink",
    content: [
      "I confirm that the Business will not use PromyLink to cause harm to another person, business, organisation, system or network.",
      "The Business will not attempt to bypass security controls, access unauthorised information, manipulate the Platform, or otherwise misuse PromyLink.",
    ],
  },
  {
    number: "9",
    title: "Business Indemnification",
    content: [
      "To the extent permitted by applicable law, the Business agrees to indemnify and hold harmless PromyLink, its owners, directors, officers, employees, contractors, affiliates and service providers against claims, losses, liabilities, damages, penalties, costs and reasonable legal expenses arising from or relating to: the Business's content, links or URLs submitted, advertisements or promotions, products or services promoted, violation of PromyLink policies, violation of applicable law, infringement of third-party rights, or misuse of the Business Account.",
      "This provision applies to the extent permitted by applicable law and does not exclude liability that cannot legally be excluded.",
    ],
  },
  {
    number: "10",
    title: "Account Suspension or Termination",
    content: [
      "I understand that PromyLink may suspend, restrict or terminate the Business Account where PromyLink reasonably believes that: the account has been misused, prohibited content has been submitted, fraud or unlawful activity is suspected, malicious or deceptive links have been submitted, required business verification cannot be completed, the account creates a security or safety risk, or action is required to comply with applicable law.",
      "Serious or urgent violations may result in immediate action without prior notice where permitted by applicable law.",
    ],
  },
  {
    number: "11",
    title: "Acknowledgement of Platform Role",
    content: [
      "I understand that PromyLink provides a platform and related Services and that, unless expressly stated otherwise, PromyLink is not the seller, manufacturer, service provider, advertiser, owner or operator of products, services or third-party websites promoted by Businesses.",
      "The Business remains responsible for its own products, services, advertisements, claims, links and business activities.",
    ],
  },
  {
    number: "12",
    title: "Agreement to PromyLink Policies",
    content: [
      "By submitting this declaration, I confirm that I have read and agree to comply with: PromyLink Terms of Use, PromyLink Privacy Policy, PromyLink Acceptable Use & Prohibited Content Policy, and other applicable PromyLink policies published on the Platform.",
    ],
  },
  {
    number: "13",
    title: "Final Declaration",
    content: [
      "I declare that the information provided by me and the Business is accurate and that I am authorised to operate this Business Account.",
      "I understand that the Business is responsible for its activities, content, links, advertisements, promotions and authorised users on PromyLink.",
      "I understand that misuse of the Platform may result in content removal, account suspension or termination, investigation, preservation of relevant information and disclosure to legally authorised authorities where required or permitted by applicable law.",
      "I agree to comply with all applicable laws and PromyLink policies.",
    ],
  },
];

export default function BusinessDeclarationPage() {
  const router = useRouter();
  const { state, updateState } = useOrganizationSignup();

  const [agreeTerms, setAgreeTerms] = useState(state.declarationAgreed || false);
  const [agreeAuth, setAgreeAuth] = useState(state.declarationAuthorized || false);
  const [signatureName, setSignatureName] = useState(state.digitalSignature || "");
  const [touched, setTouched] = useState(false);

  // Formatted date string
  const todayFormatted = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  const representativeName = state.name || "Authorized Representative";
  const businessName = state.organizationName || "Your Organization Name";

  // Validate digital signature
  const isSignatureValid = signatureName.trim().length >= 2;
  const isReadyToProceed = agreeTerms && agreeAuth && isSignatureValid;

  const handleContinue = () => {
    setTouched(true);
    if (!isReadyToProceed) return;

    updateState({
      declarationAgreed: agreeTerms,
      declarationAuthorized: agreeAuth,
      digitalSignature: signatureName.trim(),
      declarationSignedAt: todayFormatted,
    });

    router.push("/organization/signup/review-submit");
  };

  return (
    <WizardShell
      currentIndex={3}
      backHref="/organization/signup/verification-documents"
      containerClassName="max-w-3xl"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary bg-brand-primary/5 border border-brand-primary/20 px-3 py-1 rounded-full w-fit mb-2">
          <Scale className="h-3.5 w-3.5" />
          Step 4 of 6: Responsibility Agreement
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Business Declaration &amp; Responsibility Agreement
        </h1>
        <p className="text-sm text-brand-text-muted mt-1">
          Review the legal responsibility agreement and digitally sign to operate your Business Account.
        </p>
      </div>

      <div className="space-y-6">
        {/* Signatory Metadata Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 lg:p-6 shadow-sm">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Scale className="h-4 w-4" />
            Signatory &amp; Entity Identification
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="bg-brand-surface-secondary/70 p-3.5 rounded-xl border border-brand-border/60">
              <div className="flex items-center gap-1.5 text-brand-text-muted text-xs mb-1">
                <Building2 className="h-3.5 w-3.5 text-brand-primary" />
                <span>Business / Organization Name</span>
              </div>
              <p className="font-bold text-brand-text-primary text-sm truncate">
                {businessName}
              </p>
            </div>

            <div className="bg-brand-surface-secondary/70 p-3.5 rounded-xl border border-brand-border/60">
              <div className="flex items-center gap-1.5 text-brand-text-muted text-xs mb-1">
                <User className="h-3.5 w-3.5 text-brand-primary" />
                <span>Authorised Representative Name</span>
              </div>
              <p className="font-bold text-brand-text-primary text-sm truncate">
                {representativeName}
              </p>
            </div>

            <div className="bg-brand-surface-secondary/70 p-3.5 rounded-xl border border-brand-border/60">
              <div className="flex items-center gap-1.5 text-brand-text-muted text-xs mb-1">
                <Calendar className="h-3.5 w-3.5 text-brand-primary" />
                <span>Declaration Date</span>
              </div>
              <p className="font-bold text-brand-text-primary text-sm">
                {todayFormatted}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Agreement Agreement Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface shadow-sm overflow-hidden">
          <div className="border-b border-brand-border px-6 py-4 bg-brand-surface-secondary/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-brand-primary" />
              <div>
                <h3 className="text-sm font-bold text-brand-text-primary uppercase tracking-wide">
                  PROMYLINK BUSINESS DECLARATION &amp; RESPONSIBILITY AGREEMENT
                </h3>
                <p className="text-[11px] text-brand-text-muted">
                  Effective Date: 19/10/2026 • Last Updated: 19/10/2026
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary">
              13 Clauses
            </span>
          </div>

          <div className="p-6 max-h-[380px] overflow-y-auto space-y-6 text-xs sm:text-sm text-brand-text-secondary leading-relaxed divide-y divide-brand-border/50">
            <div className="pb-4">
              <p className="font-medium text-brand-text-primary">
                By creating, registering, accessing, or operating a Business Account on PromyLink (&quot;Platform&quot;), the undersigned Business and its authorised representative acknowledge, confirm, declare and agree to the following terms and responsibility allocations:
              </p>
            </div>

            {DECLARATION_SECTIONS.map((sec) => (
              <div key={sec.number} className="pt-4 first:pt-0">
                <h4 className="font-bold text-brand-text-primary text-sm mb-2 flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-[11px] font-bold text-brand-primary">
                    {sec.number}
                  </span>
                  {sec.title}
                </h4>
                <div className="space-y-2 pl-7">
                  {sec.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-brand-border bg-brand-surface-secondary/40 px-6 py-3 text-[11px] text-brand-text-muted flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-brand-primary shrink-0" />
            <span>
              Electronic acceptance of this declaration shall have the same effect as legal acceptance through the PromyLink online registration process, to the extent permitted by applicable law.
            </span>
          </div>
        </div>

        {/* Declarations & Digital Signature Section */}
        <div className="rounded-2xl border border-brand-primary/30 bg-brand-primary/[0.02] p-6 space-y-5">
          <h3 className="font-bold text-sm text-brand-text-primary flex items-center gap-2">
            <PenTool className="h-4 w-4 text-brand-primary" />
            Authorised Declarations &amp; Digital Signature
          </h3>

          <div className="space-y-3">
            {/* Checkbox 1 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-brand-border bg-white cursor-pointer hover:bg-brand-surface-secondary/40 transition-colors select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 mt-0.5 rounded border-brand-border text-brand-primary focus:ring-brand-primary/30 accent-brand-primary cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-brand-text-primary font-medium leading-snug">
                I confirm that I have read, understood and agree to this <strong>Business Declaration &amp; Responsibility Agreement</strong>.
              </span>
            </label>

            {/* Checkbox 2 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-brand-border bg-white cursor-pointer hover:bg-brand-surface-secondary/40 transition-colors select-none">
              <input
                type="checkbox"
                checked={agreeAuth}
                onChange={(e) => setAgreeAuth(e.target.checked)}
                className="h-4 w-4 mt-0.5 rounded border-brand-border text-brand-primary focus:ring-brand-primary/30 accent-brand-primary cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-brand-text-primary font-medium leading-snug">
                I confirm that I am authorised to represent and operate this <strong>Business Account</strong> on behalf of <strong>{businessName}</strong>.
              </span>
            </label>
          </div>

          {/* Digital Signature Input */}
          <div className="pt-2 border-t border-brand-border/60">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">
              Digital Signature (Full Legal Name) *
            </label>
            <div className="relative">
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder={`Type "${representativeName}" to sign`}
                className="w-full h-11 rounded-xl border border-brand-border bg-white px-4 text-sm font-medium placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
              />
              {signatureName && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-semibold text-brand-success bg-brand-success/10 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Digitally Recorded</span>
                </div>
              )}
            </div>
            <p className="text-[11px] text-brand-text-muted mt-1.5">
              Entering your full legal name acts as a legally binding electronic signature for this registration.
            </p>
          </div>

          {touched && !isReadyToProceed && (
            <div className="flex items-center gap-2 text-xs text-brand-error font-medium bg-brand-error/10 p-3 rounded-xl border border-brand-error/20">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>Please accept both declaration checkboxes and enter your full name as digital signature to proceed.</span>
            </div>
          )}
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={() => router.push("/organization/signup/verification-documents")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white hover:bg-brand-surface-secondary px-5 py-2.5 text-sm font-semibold text-brand-text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Documents
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!isReadyToProceed}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white transition-all shadow-sm ${
              isReadyToProceed
                ? "bg-brand-primary hover:bg-brand-primary-dark cursor-pointer active:scale-[0.99]"
                : "bg-brand-primary/50 cursor-not-allowed opacity-70"
            }`}
          >
            Continue to Review &amp; Submit
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </WizardShell>
  );
}
