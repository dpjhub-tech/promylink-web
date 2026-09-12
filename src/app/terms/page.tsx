import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  FileText,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Scale,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use | PromyLink",
  description:
    "Official Terms of Use governing your access to and use of PromyLink platform, business accounts, promotional tools, and advertising services.",
};

const SECTIONS = [
  { id: "eligibility", number: "1", title: "Eligibility" },
  { id: "business-account", number: "2", title: "Business Account" },
  { id: "accuracy-of-information", number: "3", title: "Accuracy of Business Information" },
  { id: "business-responsibility", number: "4", title: "Business and User Responsibility" },
  { id: "links-and-content", number: "5", title: "Links and Promotional Content" },
  { id: "prohibited-activities", number: "6", title: "Prohibited Activities" },
  { id: "advertising-and-promotions", number: "7", title: "Advertising and Promotions" },
  { id: "third-party-websites", number: "8", title: "Third-Party Websites" },
  { id: "content-removal", number: "9", title: "Content Removal" },
  { id: "complaints-and-reports", number: "10", title: "Complaints and Reports" },
  { id: "law-enforcement", number: "11", title: "Law Enforcement and Government Requests" },
  { id: "suspension-and-termination", number: "12", title: "Suspension and Termination" },
  { id: "indemnification", number: "13", title: "Indemnification" },
  { id: "disclaimer", number: "14", title: "Disclaimer" },
  { id: "changes-to-terms", number: "15", title: "Changes to the Terms" },
  { id: "governing-law", number: "16", title: "Governing Law" },
  { id: "contact", number: "17", title: "Contact Information" },
];

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-background text-brand-text-primary">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Header Hero Banner */}
        <section className="border-b border-brand-border bg-brand-surface py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1 text-xs font-semibold text-brand-primary mb-4">
              <FileText className="h-3.5 w-3.5" />
              Legal Agreement
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-text-primary mb-4">
              PROMYLINK TERMS OF USE
            </h1>

            <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-3xl mb-6">
              These Terms of Use (&quot;Terms&quot;) govern your access to and use of the PromyLink
              website, platform, business accounts, marketing services, promotional tools,
              link-sharing services, advertising features, and related services (collectively, the
              &quot;Services&quot;).
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

            {/* Main Terms Document */}
            <article className="space-y-10 text-sm sm:text-[15px] leading-relaxed text-brand-text-secondary">
              {/* Introduction Box */}
              <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/[0.02] p-6">
                <p className="text-brand-text-primary font-medium mb-3">
                  Welcome to PromyLink (&quot;PromyLink&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
                </p>
                <p className="mb-3">
                  By creating an account, accessing, or using PromyLink, you confirm that you have read,
                  understood, and agreed to these Terms.
                </p>
                <p className="font-semibold text-brand-error">
                  If you do not agree with these Terms, you must not use the Services.
                </p>
              </div>

              {/* Section 1 */}
              <section id="eligibility" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 1</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  1. Eligibility
                </h2>
                <p className="mb-3">
                  PromyLink is intended for legitimate business, professional and commercial use.
                </p>
                <p className="mb-2 font-medium text-brand-text-primary">
                  By creating a Business Account, you confirm that:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary">
                  <li>You are legally capable of entering into an agreement;</li>
                  <li>The information you provide is accurate and complete;</li>
                  <li>You are authorised to represent the business or organisation associated with the account;</li>
                  <li>You will comply with applicable laws and regulations; and</li>
                  <li>You will use PromyLink only for legitimate purposes.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="business-account" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 2</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  2. Business Account
                </h2>
                <p className="mb-3">
                  A Business Account may be created only by the business owner, proprietor, partner,
                  director, authorised representative, employee or other person having appropriate
                  authority to act on behalf of the business.
                </p>
                <p className="mb-2 font-medium text-brand-text-primary">
                  The Business is responsible for all activity conducted through its account. This includes activity performed by:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                  {[
                    "The business owner",
                    "Proprietor",
                    "Directors",
                    "Partners",
                    "Employees",
                    "Contractors",
                    "Marketing agencies",
                    "Representatives",
                    "Agents",
                    "Other authorised users",
                  ].map((role) => (
                    <div key={role} className="flex items-center gap-2 bg-brand-surface-secondary/60 px-3 py-1.5 rounded-lg border border-brand-border/40 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3">
                  The Business is responsible for protecting its account credentials and must promptly
                  notify PromyLink if unauthorised access is suspected.
                </p>
              </section>

              {/* Section 3 */}
              <section id="accuracy-of-information" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 3</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  3. Accuracy of Business Information
                </h2>
                <p className="mb-3">
                  The Business must provide accurate, current and complete information during registration and verification.
                </p>
                <p className="mb-2 font-medium text-brand-text-primary">Information may include:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Legal business name;</li>
                  <li>Trade/brand name;</li>
                  <li>Business type;</li>
                  <li>Business address;</li>
                  <li>PAN;</li>
                  <li>GST information, where applicable;</li>
                  <li>Business registration information;</li>
                  <li>Contact information;</li>
                  <li>Authorised representative information; and</li>
                  <li>Payment/bank information where applicable.</li>
                </ul>
                <p>
                  PromyLink may request additional information or documents when reasonably necessary
                  for business verification, security, fraud prevention, payment processing or legal
                  compliance.
                </p>
              </section>

              {/* Section 4 */}
              <section id="business-responsibility" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 4</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  4. Business and User Responsibility
                </h2>
                <p className="mb-3">
                  The Business is solely responsible for all content, links, advertisements, promotions,
                  products, services and information submitted through its account.
                </p>
                <p className="mb-2 font-medium text-brand-text-primary">
                  The Business must ensure that its activities and content:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Are lawful;</li>
                  <li>Are accurate and not misleading;</li>
                  <li>Do not infringe third-party rights;</li>
                  <li>Do not contain malicious or fraudulent links;</li>
                  <li>Do not facilitate illegal activity;</li>
                  <li>Do not harass, threaten or abuse any person;</li>
                  <li>Do not contain prohibited sexual or exploitative material;</li>
                  <li>Do not distribute malware or harmful software; and</li>
                  <li>Comply with applicable laws and regulations.</li>
                </ul>
                <p className="text-xs text-brand-text-muted italic">
                  PromyLink does not assume responsibility for the legality, accuracy, quality or performance of products or services offered by a Business.
                </p>
              </section>

              {/* Section 5 */}
              <section id="links-and-content" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 5</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  5. Links and Promotional Content
                </h2>
                <p className="mb-3">
                  Businesses may submit URLs, advertisements, promotional material and other content through PromyLink. The Business is solely responsible for every link submitted through its account.
                </p>
                <p className="mb-2 font-semibold text-brand-error">
                  Businesses must not submit:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Fake or deceptive URLs;</li>
                  <li>Phishing links;</li>
                  <li>Malicious redirects;</li>
                  <li>Malware or harmful downloads;</li>
                  <li>Links impersonating another person or business;</li>
                  <li>Fraudulent offers;</li>
                  <li>Misleading advertisements;</li>
                  <li>Unlawful content; or</li>
                  <li>Links to prohibited content.</li>
                </ul>
                <p>
                  PromyLink may review, disable, remove or restrict any link or content that it reasonably
                  believes violates these Terms, creates a security risk, harms users, or may violate applicable law.
                </p>
              </section>

              {/* Section 6 */}
              <section id="prohibited-activities" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 6</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  6. Prohibited Activities
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  You must not use PromyLink to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary">
                  <li>Commit or facilitate fraud;</li>
                  <li>Conduct scams or deceptive schemes;</li>
                  <li>Harass, threaten or intimidate others;</li>
                  <li>Distribute malicious software;</li>
                  <li>Conduct phishing or credential theft;</li>
                  <li>Promote unlawful products or services;</li>
                  <li>Distribute unlawful sexually explicit material;</li>
                  <li>Exploit or endanger children;</li>
                  <li>Infringe intellectual-property rights;</li>
                  <li>Impersonate another person or organisation;</li>
                  <li>Manipulate or abuse PromyLink systems;</li>
                  <li>Circumvent security measures;</li>
                  <li>Attempt unauthorised access;</li>
                  <li>Upload unlawful or harmful content; or</li>
                  <li>Conduct any activity prohibited by applicable law.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="advertising-and-promotions" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 7</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  7. Advertising and Promotions
                </h2>
                <p className="mb-3">
                  Businesses are solely responsible for the claims, representations, pricing, offers and
                  other information contained in their advertisements and promotions. The Business must
                  ensure that advertisements are truthful, accurate and legally compliant.
                </p>
                <p>
                  PromyLink does not guarantee the accuracy of claims made by Businesses and does not
                  automatically endorse or certify any Business, product, service or promotion appearing on the platform.
                </p>
              </section>

              {/* Section 8 */}
              <section id="third-party-websites" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 8</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  8. Third-Party Websites
                </h2>
                <p className="mb-3">
                  PromyLink may provide or display links to third-party websites. Third-party websites
                  are independently operated and may have their own terms, privacy policies and practices.
                </p>
                <p className="mb-3">
                  PromyLink does not control third-party websites and, except where liability cannot
                  legally be excluded, is not responsible for their content, security, availability,
                  products, services or privacy practices.
                </p>
                <p className="font-medium text-brand-text-primary">
                  Users access third-party websites at their own risk.
                </p>
              </section>

              {/* Section 9 */}
              <section id="content-removal" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 9</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  9. Content Removal
                </h2>
                <p className="mb-2">
                  PromyLink may, without prior notice where reasonably necessary:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Remove or restrict content;</li>
                  <li>Disable links;</li>
                  <li>Restrict account functionality;</li>
                  <li>Request additional verification;</li>
                  <li>Suspend accounts;</li>
                  <li>Terminate accounts; or</li>
                  <li>Take other appropriate measures.</li>
                </ul>
                <p className="mb-2 font-medium text-brand-text-primary">
                  Such action may be taken where PromyLink reasonably believes that content or activity:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary">
                  <li>Violates these Terms;</li>
                  <li>Violates applicable law;</li>
                  <li>Creates a security or safety risk;</li>
                  <li>Is fraudulent or deceptive;</li>
                  <li>Is abusive or harmful;</li>
                  <li>Infringes third-party rights; or</li>
                  <li>May expose PromyLink or its users to legal or security risks.</li>
                </ul>
              </section>

              {/* Section 10 */}
              <section id="complaints-and-reports" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 10</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  10. Complaints and Reports
                </h2>
                <p className="mb-3">
                  Users may report suspected violations, fraudulent links, abusive activity, prohibited
                  content or other concerns through PromyLink&apos;s designated reporting channels.
                </p>
                <p>
                  PromyLink may review reports and take appropriate action based on the circumstances,
                  available information and applicable law.
                </p>
              </section>

              {/* Section 11 */}
              <section id="law-enforcement" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 11</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  11. Law Enforcement and Government Requests
                </h2>
                <p className="mb-3">
                  PromyLink may cooperate with courts, police authorities, law-enforcement agencies,
                  regulators, government authorities and other legally authorised entities.
                </p>
                <p className="mb-3">
                  Where PromyLink receives a valid legal request, court order, warrant, statutory
                  notice or other legally enforceable demand, PromyLink may disclose information in
                  accordance with applicable law.
                </p>
                <p className="mb-2 font-medium text-brand-text-primary">
                  Depending on the circumstances, information may include:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Business account information;</li>
                  <li>Contact details;</li>
                  <li>Account identifiers;</li>
                  <li>Submitted links;</li>
                  <li>Uploaded content;</li>
                  <li>Transaction information;</li>
                  <li>Technical information;</li>
                  <li>IP addresses;</li>
                  <li>Account activity; and</li>
                  <li>Other information legally required or permitted to be disclosed.</li>
                </ul>
                <p className="mb-3">
                  PromyLink may preserve relevant information where required by law or reasonably
                  necessary for an investigation, dispute or legal proceeding.
                </p>
                <p className="text-xs text-brand-text-muted">
                  PromyLink may not always be able to notify the affected Business before disclosure where notification is prohibited or restricted by law.
                </p>
              </section>

              {/* Section 12 */}
              <section id="suspension-and-termination" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 12</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  12. Suspension and Termination
                </h2>
                <p className="mb-2 font-medium text-brand-text-primary">
                  PromyLink may suspend, restrict or terminate an account if:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>These Terms are violated;</li>
                  <li>Prohibited content is submitted;</li>
                  <li>Fraud or abuse is suspected;</li>
                  <li>Malicious links are submitted;</li>
                  <li>Required verification cannot be completed;</li>
                  <li>The account presents a security risk;</li>
                  <li>The account is being used unlawfully; or</li>
                  <li>Action is required to comply with applicable law.</li>
                </ul>
                <p className="font-semibold text-brand-text-primary">
                  Termination does not remove obligations or liabilities that arose before termination.
                </p>
              </section>

              {/* Section 13 */}
              <section id="indemnification" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 13</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  13. Indemnification
                </h2>
                <p className="mb-2">
                  To the extent permitted by applicable law, the Business agrees to defend, indemnify
                  and hold harmless PromyLink, its owners, directors, officers, employees, contractors,
                  affiliates and service providers from claims, losses, liabilities, damages,
                  penalties, costs and reasonable legal expenses arising from or relating to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary">
                  <li>Content submitted by the Business;</li>
                  <li>Links submitted by the Business;</li>
                  <li>Advertisements or promotions;</li>
                  <li>Products or services promoted by the Business;</li>
                  <li>Violation of these Terms;</li>
                  <li>Violation of applicable law;</li>
                  <li>Infringement of third-party rights; or</li>
                  <li>Misuse of the Services by the Business or its authorised users.</li>
                </ul>
              </section>

              {/* Section 14 */}
              <section id="disclaimer" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 14</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  14. Disclaimer
                </h2>
                <p className="mb-3">
                  PromyLink provides a platform and related Services to businesses.
                </p>
                <p className="mb-2 font-medium text-brand-text-primary">
                  To the maximum extent permitted by applicable law, PromyLink does not guarantee the:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-brand-text-secondary mb-4">
                  <li>Accuracy of user-submitted information;</li>
                  <li>Legitimacy of every Business;</li>
                  <li>Safety of every third-party link;</li>
                  <li>Accuracy of advertisements;</li>
                  <li>Quality of third-party products or services;</li>
                  <li>Performance of a Business; or</li>
                  <li>Availability of third-party websites.</li>
                </ul>
                <p className="text-xs text-brand-text-muted">
                  Nothing in these Terms excludes or limits any liability that cannot lawfully be excluded or limited under applicable law.
                </p>
              </section>

              {/* Section 15 */}
              <section id="changes-to-terms" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 15</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  15. Changes to the Terms
                </h2>
                <p className="mb-3">
                  PromyLink may modify these Terms from time to time.
                </p>
                <p className="mb-3">
                  Updated Terms will be published on the PromyLink website with a revised &quot;Last Updated&quot; date.
                </p>
                <p>
                  Your continued use of the Services after the effective date of updated Terms may
                  constitute acceptance of the revised Terms, to the extent permitted by applicable law.
                </p>
              </section>

              {/* Section 16 */}
              <section id="governing-law" className="scroll-mt-28 border-b border-brand-border/60 pb-8">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 16</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  16. Governing Law
                </h2>
                <p className="mb-3">
                  These Terms shall be governed by the laws of India, subject to applicable mandatory legal provisions.
                </p>
                <p>
                  Disputes shall be subject to the jurisdiction of the courts having appropriate
                  jurisdiction over the matter and PromyLink&apos;s applicable place of business, subject
                  to applicable law.
                </p>
              </section>

              {/* Section 17 */}
              <section id="contact" className="scroll-mt-28 pb-4">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <span>Section 17</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary mb-3">
                  17. Contact Information
                </h2>
                <p className="mb-4">
                  For legal notices, terms inquiries, or general support, contact PromyLink:
                </p>

                <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm space-y-3.5">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-brand-text-primary">PromyLink</p>
                      <p className="text-xs text-brand-text-muted">Corporate Platform &amp; Search Engine</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-xs text-brand-text-muted uppercase tracking-wider">Registered Office</p>
                      <p className="text-brand-text-primary">Hitech City buziness square building 4th floor</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2.5 bg-brand-surface-secondary/80 p-3 rounded-xl border border-brand-border/60">
                      <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-brand-text-muted">Legal Inquiries</p>
                        <a href="mailto:legal@promylink.com" className="text-xs font-semibold text-brand-primary hover:underline truncate block">
                          legal@promylink.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-brand-surface-secondary/80 p-3 rounded-xl border border-brand-border/60">
                      <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-brand-text-muted">General Support</p>
                        <a href="mailto:support@promylink.com" className="text-xs font-semibold text-brand-primary hover:underline truncate block">
                          support@promylink.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-brand-surface-secondary text-center text-xs text-brand-text-muted border border-brand-border/50">
                  By using PromyLink, you acknowledge that you have read and agreed to these Terms of Use.
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
