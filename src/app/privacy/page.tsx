import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileCheck,
  Server,
  UserCheck,
  Cookie,
  Mail,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | PromyLink",
  description:
    "Official Privacy Policy explaining how PromyLink collects, uses, processes, stores, and protects information for businesses, representatives, and users.",
};

const SECTIONS = [
  { id: "scope", number: "1", title: "Scope" },
  { id: "information-we-collect", number: "2", title: "Information We May Collect" },
  { id: "how-we-use-information", number: "3", title: "How We Use Information" },
  { id: "legal-disclosures", number: "4", title: "Legal and Regulatory Disclosures" },
  { id: "fraud-and-abuse-prevention", number: "5", title: "Fraud, Security and Abuse Prevention" },
  { id: "user-submitted-content", number: "6", title: "User-Submitted Content" },
  { id: "third-party-providers", number: "7", title: "Third-Party Service Providers" },
  { id: "data-security", number: "8", title: "Data Security" },
  { id: "data-retention", number: "9", title: "Data Retention" },
  { id: "user-privacy-requests", number: "10", title: "User Privacy Requests" },
  { id: "cookies", number: "11", title: "Cookies and Similar Technologies" },
  { id: "childrens-privacy", number: "12", title: "Children's Privacy" },
  { id: "changes-to-policy", number: "13", title: "Changes to This Privacy Policy" },
  { id: "privacy-contact", number: "14", title: "Privacy Contact Information" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-background text-brand-text-primary">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero Header Banner */}
        <section className="border-b border-brand-border bg-brand-surface py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1 text-xs font-semibold text-brand-primary mb-4">
              <Lock className="h-3.5 w-3.5" />
              Privacy &amp; Data Protection
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-text-primary mb-4">
              PROMYLINK PRIVACY POLICY
            </h1>

            <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-3xl mb-6">
              PromyLink (&quot;PromyLink&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
              respects the privacy of businesses, representatives, and individuals who use our
              website and Services. This Privacy Policy explains how PromyLink may collect, use,
              process, store, and disclose information when you access or use PromyLink.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-text-muted">
              <div className="flex items-center gap-1.5 bg-brand-surface-secondary px-3 py-1.5 rounded-lg border border-brand-border">
                <Calendar className="h-4 w-4 text-brand-primary" />
                <span>Effective Date: <strong>19/10/2026</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-surface-secondary px-3 py-1.5 rounded-lg border border-brand-border">
                <Calendar className="h-4 w-4 text-brand-primary" />
                <span>Last Updated: <strong>19/10/2026</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <div className="container mx-auto px-4 max-w-5xl pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            {/* Sticky Table of Contents (Desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-brand-border bg-brand-surface p-5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-3">
                  Table of Contents
                </h2>
                <nav className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 text-xs">
                  {SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-brand-text-secondary hover:text-brand-primary hover:bg-brand-primary/5 transition-colors"
                    >
                      <span className="font-semibold text-brand-text-muted w-4">{sec.number}.</span>
                      <span className="truncate">{sec.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Privacy Document */}
            <article className="space-y-10 text-sm sm:text-[15px] leading-relaxed text-brand-text-secondary">
              {/* Introduction Box */}
              <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/[0.02] p-6">
                <p className="text-brand-text-primary font-medium mb-2">
                  PromyLink is committed to transparency and enterprise-grade data protection.
                </p>
                <p className="text-brand-text-secondary text-xs sm:text-sm">
                  By creating an account, registering your business, or using our Services, you
                  acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>

              {/* Section 1 */}
              <section id="scope" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 1</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  1. Scope
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  This Privacy Policy applies to information collected through:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary">
                  <li>The PromyLink website;</li>
                  <li>Business Account registration;</li>
                  <li>Business verification;</li>
                  <li>Marketing and promotional services;</li>
                  <li>Customer support;</li>
                  <li>Communications with PromyLink;</li>
                  <li>Transactions, where applicable; and</li>
                  <li>Other PromyLink Services.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="information-we-collect" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 2</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  2. Information We May Collect
                </h2>
                <p className="mb-4">
                  Depending on how you use PromyLink, we may collect the following categories of information:
                </p>

                <div className="space-y-4">
                  <div className="rounded-xl border border-brand-border/80 bg-brand-surface p-4">
                    <h3 className="font-bold text-sm text-brand-text-primary mb-2 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-brand-primary" />
                      Business Information
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-brand-text-secondary">
                      <li>Legal business name</li>
                      <li>Trade/brand name</li>
                      <li>Business type</li>
                      <li>Business address</li>
                      <li>Business registration information</li>
                      <li>GST information, where applicable</li>
                      <li>PAN information</li>
                      <li>Udyam or other registration information</li>
                      <li>Business website</li>
                      <li>Business category and industry</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-brand-border/80 bg-brand-surface p-4">
                    <h3 className="font-bold text-sm text-brand-text-primary mb-2 flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-brand-primary" />
                      Account Information
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-brand-text-secondary">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Mobile number</li>
                      <li>Designation</li>
                      <li>Login information</li>
                      <li>Account preferences</li>
                      <li>Communications with PromyLink</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-brand-border/80 bg-brand-surface p-4">
                    <h3 className="font-bold text-sm text-brand-text-primary mb-2 flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-brand-primary" />
                      Verification Information
                    </h3>
                    <p className="text-xs sm:text-sm mb-2 text-brand-text-secondary">
                      Where required, PromyLink may collect information or documents necessary to verify:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-brand-text-secondary mb-2">
                      <li>Business existence</li>
                      <li>Identity</li>
                      <li>Authorised representatives</li>
                      <li>Tax registration</li>
                      <li>Business registration</li>
                      <li>Payment/payout information</li>
                    </ul>
                    <p className="text-xs text-brand-text-muted italic">
                      PromyLink will seek to limit the collection of personal information to information reasonably necessary for the relevant purpose.
                    </p>
                  </div>

                  <div className="rounded-xl border border-brand-border/80 bg-brand-surface p-4">
                    <h3 className="font-bold text-sm text-brand-text-primary mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-brand-primary" />
                      Content and Links
                    </h3>
                    <p className="text-xs sm:text-sm mb-2 text-brand-text-secondary">
                      We may process content submitted through the platform, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-brand-text-secondary">
                      <li>URLs</li>
                      <li>Advertisements</li>
                      <li>Promotional content</li>
                      <li>Text, images, and videos</li>
                      <li>Documents</li>
                      <li>Campaign information and other business content</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-brand-border/80 bg-brand-surface p-4">
                    <h3 className="font-bold text-sm text-brand-text-primary mb-2 flex items-center gap-2">
                      <Server className="h-4 w-4 text-brand-primary" />
                      Technical Information
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-brand-text-secondary">
                      <li>IP address</li>
                      <li>Browser type and device information</li>
                      <li>Operating system</li>
                      <li>Access times and log information</li>
                      <li>Security information and platform usage analytics</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="how-we-use-information" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 3</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  3. How We Use Information
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  PromyLink may use collected information to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary">
                  <li>Create and manage Business Accounts;</li>
                  <li>Verify businesses;</li>
                  <li>Provide Services;</li>
                  <li>Process payments or payouts where applicable;</li>
                  <li>Provide customer support;</li>
                  <li>Detect fraud and abuse;</li>
                  <li>Identify malicious or harmful links;</li>
                  <li>Maintain platform security;</li>
                  <li>Investigate violations;</li>
                  <li>Enforce our Terms and policies;</li>
                  <li>Respond to complaints;</li>
                  <li>Comply with applicable laws;</li>
                  <li>Respond to lawful government or law-enforcement requests;</li>
                  <li>Maintain business and legal records; and</li>
                  <li>Improve our Services.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="legal-disclosures" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 4</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  4. Legal and Regulatory Disclosures
                </h2>
                <p className="mb-3">
                  PromyLink may disclose information when required or permitted by applicable law. Recipients may include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                  {[
                    "Police authorities",
                    "Law-enforcement agencies",
                    "Courts",
                    "Government authorities",
                    "Regulators",
                    "Statutory authorities",
                    "Investigative agencies",
                    "Legal advisers",
                    "Professional advisers",
                    "Other legally authorised entities",
                  ].map((entity) => (
                    <div key={entity} className="flex items-center gap-2 bg-brand-surface-secondary/60 px-3 py-1.5 rounded-lg border border-brand-border/40 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                      <span>{entity}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3">
                  Where PromyLink receives a valid legal request, court order, warrant, statutory notice or other legally enforceable demand, PromyLink may provide information required by that request in accordance with applicable law.
                </p>
              </section>

              {/* Section 5 */}
              <section id="fraud-and-abuse-prevention" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 5</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  5. Fraud, Security and Abuse Prevention
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  PromyLink may process and retain relevant information to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Detect fraudulent activity;</li>
                  <li>Investigate suspicious accounts;</li>
                  <li>Identify malicious links;</li>
                  <li>Prevent platform abuse;</li>
                  <li>Protect users;</li>
                  <li>Protect PromyLink systems;</li>
                  <li>Investigate security incidents;</li>
                  <li>Enforce platform policies; and</li>
                  <li>Comply with legal obligations.</li>
                </ul>
                <p className="text-xs text-brand-text-muted">
                  Where appropriate, information relating to suspected unlawful activity may be preserved and provided to legally authorised authorities.
                </p>
              </section>

              {/* Section 6 */}
              <section id="user-submitted-content" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 6</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  6. User-Submitted Content
                </h2>
                <p className="mb-3">
                  Businesses are responsible for ensuring that they have the necessary rights and authority to submit content to PromyLink.
                </p>
                <p className="mb-3 font-semibold text-brand-error">
                  Businesses should not upload unnecessary confidential or sensitive personal information belonging to customers, employees, or other individuals.
                </p>
                <p>
                  PromyLink may process submitted content to provide Services, maintain platform security, investigate violations, and comply with legal obligations.
                </p>
              </section>

              {/* Section 7 */}
              <section id="third-party-providers" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 7</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  7. Third-Party Service Providers
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  PromyLink may engage third-party service providers for purposes such as:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Cloud hosting and infrastructure;</li>
                  <li>Platform security and DDoS protection;</li>
                  <li>Analytics and performance monitoring;</li>
                  <li>Transactional email and communications;</li>
                  <li>SMS / OTP verification gateways;</li>
                  <li>Payment processing and escrow disbursements;</li>
                  <li>Business verification services;</li>
                  <li>Customer support systems; and</li>
                  <li>Other technical or operational services.</li>
                </ul>
                <p className="text-xs text-brand-text-muted">
                  These providers may process information on PromyLink&apos;s behalf as necessary to provide their services and subject to applicable contractual and legal requirements.
                </p>
              </section>

              {/* Section 8 */}
              <section id="data-security" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 8</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  8. Data Security
                </h2>
                <p className="mb-3">
                  PromyLink will take reasonable technical and organisational measures designed to protect information from unauthorised access, misuse, loss, alteration, or disclosure.
                </p>
                <p className="mb-3">
                  However, no internet transmission or electronic storage system can be guaranteed to be completely secure.
                </p>
                <p className="font-medium text-brand-text-primary">
                  Users are responsible for protecting their login credentials.
                </p>
              </section>

              {/* Section 9 */}
              <section id="data-retention" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 9</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  9. Data Retention
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  PromyLink may retain information for as long as reasonably necessary for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Providing Services;</li>
                  <li>Maintaining account records;</li>
                  <li>Security;</li>
                  <li>Fraud prevention;</li>
                  <li>Legal compliance;</li>
                  <li>Regulatory requirements;</li>
                  <li>Accounting;</li>
                  <li>Dispute resolution; and</li>
                  <li>Establishing, exercising, or defending legal claims.</li>
                </ul>
                <p className="text-xs text-brand-text-muted">
                  Information may therefore be retained after account closure where required or permitted by applicable law or reasonably necessary for legitimate business or legal purposes.
                </p>
              </section>

              {/* Section 10 */}
              <section id="user-privacy-requests" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 10</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  10. User Privacy Requests
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  Subject to applicable law, individuals may contact PromyLink regarding applicable privacy requests, including requests relating to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Access;</li>
                  <li>Correction;</li>
                  <li>Updating information;</li>
                  <li>Deletion;</li>
                  <li>Withdrawal of consent where applicable; and</li>
                  <li>Other legally recognised rights.</li>
                </ul>
                <p className="text-xs text-brand-text-muted">
                  PromyLink may need to verify the identity of the person making a request and may be unable to fulfil certain requests where legal exceptions apply.
                </p>
              </section>

              {/* Section 11 */}
              <section id="cookies" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 11</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  11. Cookies and Similar Technologies
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  PromyLink may use cookies and similar technologies for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Authentication;</li>
                  <li>Security;</li>
                  <li>Preferences;</li>
                  <li>Analytics;</li>
                  <li>Performance; and</li>
                  <li>Improving the Services.</li>
                </ul>
                <p>
                  Users may be able to manage certain cookies through their browser or device settings.
                </p>
              </section>

              {/* Section 12 */}
              <section id="childrens-privacy" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 12</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  12. Children&apos;s Privacy
                </h2>
                <p className="mb-3">
                  PromyLink&apos;s Business Services are intended for legitimate business and professional use.
                </p>
                <p className="mb-3">
                  PromyLink does not knowingly seek to create business accounts for children.
                </p>
                <p>
                  If you believe that information relating to a child has been submitted to PromyLink, please contact us using the details below.
                </p>
              </section>

              {/* Section 13 */}
              <section id="changes-to-policy" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 13</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  13. Changes to This Privacy Policy
                </h2>
                <p className="mb-3">
                  PromyLink may update this Privacy Policy from time to time.
                </p>
                <p>
                  The updated version will be published on the PromyLink website with a revised &quot;Last Updated&quot; date.
                </p>
              </section>

              {/* Section 14 */}
              <section id="privacy-contact" className="scroll-mt-28 pb-4">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 14</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  14. Privacy Contact Information
                </h2>
                <p className="mb-4">
                  Please include sufficient information in your request for PromyLink to understand and process the request:
                </p>

                <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm space-y-3.5">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-brand-text-primary">PromyLink Privacy &amp; Legal Desk</p>
                      <p className="text-xs text-brand-text-muted">Registered Office: Hitech City buziness square building 4th floor</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2.5 bg-brand-surface-secondary/80 p-3 rounded-xl border border-brand-border/60">
                      <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-brand-text-muted">Privacy Inquiries</p>
                        <a href="mailto:privacy@promylink.com" className="text-xs font-semibold text-brand-primary hover:underline truncate block">
                          privacy@promylink.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-brand-surface-secondary/80 p-3 rounded-xl border border-brand-border/60">
                      <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-brand-text-muted">Legal Department</p>
                        <a href="mailto:legal@promylink.com" className="text-xs font-semibold text-brand-primary hover:underline truncate block">
                          legal@promylink.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-brand-surface-secondary text-center text-xs text-brand-text-muted border border-brand-border/50">
                  By using the Services, you acknowledge that you have read this Privacy Policy.
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
