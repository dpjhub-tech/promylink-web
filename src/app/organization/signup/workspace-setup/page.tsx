"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Clock,
  Lock,
  Globe,
  Plus,
  X,
  Users,
  FolderKanban,
  BarChart3,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";
import { WizardShell } from "@/components/organization-signup/wizard-shell";

const CURRENCIES = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
];

const TIMEZONES = [
  { value: "Asia/Kolkata", label: "(GMT+05:30) Asia/Kolkata" },
  { value: "UTC", label: "(GMT+00:00) UTC" },
  { value: "America/New_York", label: "(GMT-05:00) America/New_York (EST)" },
  { value: "America/Los_Angeles", label: "(GMT-08:00) America/Los_Angeles (PST)" },
  { value: "Asia/Dubai", label: "(GMT+04:00) Asia/Dubai" },
  { value: "Asia/Singapore", label: "(GMT+08:00) Asia/Singapore" },
  { value: "Europe/London", label: "(GMT+01:00) Europe/London" },
];

interface TeamMember {
  email: string;
  role: string;
}

// Step 4 of 6: Workspace Setup
export default function WorkspaceSetupPage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("PromyTech Workspace");
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  // Team invite state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { email: "kiran@promytech.com", role: "Owner" },
  ]);

  const handleAddMember = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) return;
    if (teamMembers.some((m) => m.email.toLowerCase() === inviteEmail.toLowerCase())) return;

    setTeamMembers([...teamMembers, { email: inviteEmail.trim(), role: inviteRole }]);
    setInviteEmail("");
  };

  const handleRemoveMember = (email: string) => {
    setTeamMembers(teamMembers.filter((m) => m.email !== email));
  };

  return (
    <WizardShell
      currentIndex={3}
      backHref="/organization/signup/goals-preferences"
      containerClassName="max-w-5xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-brand-text-primary">Workspace Setup</h2>
        <p className="text-sm text-brand-text-muted mt-1">
          Set up your workspace to get the best experience on PromyLink.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Advances to Step 5: Verification (Optional)
          router.push("/organization/signup/verification");
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-5">
            {/* Field 1: Workspace Name */}
            <div>
              <label className="block text-sm font-semibold text-brand-text-primary">
                Workspace Name
              </label>
              <p className="text-xs text-brand-text-muted mb-2">
                This name will be visible to your team members.
              </p>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Enter workspace name"
                  required
                  className="w-full h-12 rounded-[10px] border border-brand-border bg-brand-surface pl-11 pr-4 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            {/* Field 2: Default Currency */}
            <div>
              <label className="block text-sm font-semibold text-brand-text-primary">
                Default Currency
              </label>
              <p className="text-xs text-brand-text-muted mb-2">
                This will be used for campaigns, payments and reports.
              </p>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full h-12 appearance-none rounded-[10px] border border-brand-border bg-brand-surface pl-4 pr-10 text-sm text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} ({c.symbol}) – {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
              </div>
            </div>

            {/* Field 3: Time Zone */}
            <div>
              <label className="block text-sm font-semibold text-brand-text-primary">Time Zone</label>
              <p className="text-xs text-brand-text-muted mb-2">
                Helps us show accurate dates and times.
              </p>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full h-12 appearance-none rounded-[10px] border border-brand-border bg-brand-surface pl-11 pr-10 text-sm text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors cursor-pointer"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
              </div>
            </div>

            {/* Field 4: Invite Team Members (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-brand-text-primary">
                Invite Team Members (Optional)
              </label>
              <p className="text-xs text-brand-text-muted mb-2">
                You can invite your team now or do it later.
              </p>

              <div className="flex gap-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddMember();
                    }
                  }}
                  placeholder="Enter email address"
                  className="flex-1 h-11 rounded-[10px] border border-brand-border bg-brand-surface px-3.5 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                />
                <div className="relative">
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="h-11 appearance-none rounded-[10px] border border-brand-border bg-brand-surface pl-3 pr-8 text-sm text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors cursor-pointer"
                  >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-muted pointer-events-none" />
                </div>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="inline-flex items-center gap-1 rounded-[10px] border border-brand-border bg-brand-surface px-3.5 h-11 text-sm font-semibold text-brand-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>

              {/* Members List */}
              {teamMembers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.email}
                      className="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-brand-surface px-3 py-1.5 text-xs text-brand-text-primary shadow-xs"
                    >
                      <span className="font-medium">{member.email}</span>
                      <span className="rounded bg-brand-surface-secondary px-1.5 py-0.5 text-[10px] font-semibold text-brand-text-muted">
                        {member.role}
                      </span>
                      {member.role !== "Owner" && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member.email)}
                          className="text-brand-text-muted hover:text-brand-error transition-colors ml-0.5 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Field 5: Workspace Visibility */}
            <div>
              <label className="block text-sm font-semibold text-brand-text-primary">
                Workspace Visibility
              </label>
              <p className="text-xs text-brand-text-muted mb-2">
                Control who can see your workspace information.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Private Card */}
                <button
                  type="button"
                  onClick={() => setVisibility("private")}
                  className={`flex items-start justify-between p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    visibility === "private"
                      ? "border-brand-primary bg-brand-primary/[0.04] ring-1 ring-brand-primary/20"
                      : "border-brand-border bg-brand-surface hover:border-brand-border-strong"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        visibility === "private"
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "bg-brand-surface-secondary text-brand-text-muted"
                      }`}
                    >
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-text-primary">Private</p>
                      <p className="text-xs text-brand-text-muted mt-0.5 leading-snug">
                        Only your team members can see workspace details.
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5 ${
                      visibility === "private"
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-brand-border bg-brand-surface"
                    }`}
                  >
                    {visibility === "private" && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </button>

                {/* Public Card (Coming Soon) */}
                <div className="flex items-start justify-between p-3.5 rounded-xl border-2 border-brand-border/60 bg-brand-surface-secondary/40 text-left opacity-70 cursor-not-allowed">
                  <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-surface text-brand-text-muted">
                      <Globe className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-text-primary">
                        Public <span className="text-xs font-normal text-brand-text-muted">(Coming Soon)</span>
                      </p>
                      <p className="text-xs text-brand-text-muted mt-0.5 leading-snug">
                        Visible to verified creators and partners on PromyLink.
                      </p>
                    </div>
                  </div>
                  <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-brand-border bg-brand-surface mt-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Workspace Preview Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-brand-border bg-brand-surface-secondary/40 p-6 lg:p-7 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary mx-auto mb-3">
                  <Building2 className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-brand-text-primary text-center mb-6">
                  {workspaceName || "Your Workspace"}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-primary shadow-2xs">
                      <Users className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-brand-text-primary">
                        Collaborate with your team
                      </p>
                      <p className="text-xs text-brand-text-muted mt-0.5">
                        Add team members and assign roles.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-primary shadow-2xs">
                      <FolderKanban className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-brand-text-primary">
                        Run impactful campaigns
                      </p>
                      <p className="text-xs text-brand-text-muted mt-0.5">
                        Create and manage campaigns with ease.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-primary shadow-2xs">
                      <BarChart3 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-brand-text-primary">
                        Track performance
                      </p>
                      <p className="text-xs text-brand-text-muted mt-0.5">
                        Get real-time insights and reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-border/60 text-center">
                <p className="text-xs italic text-brand-text-secondary leading-relaxed">
                  &ldquo;Great things happen when brands and creators grow together.&rdquo;
                </p>
                <p className="text-[11px] font-medium text-brand-text-muted mt-1.5">— Team PromyLink</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-brand-border mt-8">
          <button
            type="button"
            onClick={() => router.push("/organization/signup/goals-preferences")}
            className="rounded-lg border border-brand-border px-5 py-2.5 text-sm font-semibold text-brand-text-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-[10px] bg-brand-primary hover:bg-brand-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
