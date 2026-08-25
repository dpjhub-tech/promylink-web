"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { User, Briefcase, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthTopNav } from "@/components/auth/auth-top-nav";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthDivider } from "@/components/auth/auth-divider";
import { GoogleButton } from "@/components/auth/google-button";
import { AuthMessage } from "@/components/auth/auth-message";
import { PrivacyNote } from "@/components/auth/privacy-note";
import { AuthFooter } from "@/components/auth/auth-footer";
import { TrustBadgesGrid } from "@/components/auth/trust-badges";
import { RoleCard } from "@/components/auth/role-card";

const emailSchema = z.string().trim().email("Invalid email address").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(128);
const nameSchema = z.string().trim().min(1, "Name is required").max(100);

const ROLE_COPY = {
  creator: { heading: "Creator", subtitle: "Start your journey as a creator on PromyLink." },
  business: { heading: "Business", subtitle: "Start growing your business on PromyLink." },
} as const;

// Mirrors /login's section widths/grid for visual consistency between the
// two auth pages. Unlike /login, the left column here is NOT hidden below
// xl — it holds the Creator/Business role picker, which is functionally
// required before submitting, not just marketing copy.
const HEADER_CONTAINER = "mx-auto w-[85%]";
const MAIN_CONTAINER = "mx-auto w-[65%]";
const FOOTER_CONTAINER = "mx-auto w-[92%]";
const GRID = "grid gap-8 xl:grid-cols-[1fr_1fr] xl:gap-6 items-center";

export default function SignupPage() {
  const router = useRouter();
  const { user, signUp, signInWithGoogle } = useAuth();

  const [role, setRole] = useState<"creator" | "business">("creator");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const name = nameSchema.parse(formData.name);
      const email = emailSchema.parse(formData.email);
      const password = passwordSchema.parse(formData.password);

      const { error } = await signUp(email, password, name, role);
      if (error) {
        const msg = error.message?.includes("already registered")
          ? "This email is already registered. Please sign in instead."
          : error.message;
        setMessage({ type: "error", text: msg });
      } else {
        setMessage({ type: "success", text: "Check your email — we sent you a confirmation link." });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setMessage({ type: "error", text: err.issues[0]?.message ?? "Validation error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell
      headerContainerClassName={HEADER_CONTAINER}
      mainContainerClassName={MAIN_CONTAINER}
      gridClassName={GRID}
      rightWrapperClassName="flex justify-center xl:justify-end"
      topRight={
        <AuthTopNav question="Already have an account?" linkText="Sign in" linkHref="/login" variant="link" />
      }
      footer={<AuthFooter containerClassName={FOOTER_CONTAINER} />}
      left={
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-2.5 h-6 text-xs font-semibold text-brand-primary mb-5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified. Trusted. Trackable.
          </span>

          <h1 className="max-w-[500px] text-[40px] font-semibold leading-[1.15] tracking-[-0.5px] text-brand-text-primary mb-4">
            Create your PromyLink account
          </h1>
          <p className="max-w-[500px] text-base leading-[1.5] text-brand-text-secondary mb-8">
            Join India&apos;s premium platform for verified links, creators and businesses.
          </p>

          <p className="text-sm font-semibold text-brand-text-primary mb-3">Choose how you&apos;ll use PromyLink</p>
          <div className="grid grid-cols-2 gap-3.5 max-w-[420px] mb-8">
            <RoleCard
              icon={User}
              title="Creator"
              description="Publish, grow and earn."
              buttonLabel="Continue as Creator"
              tone="primary"
              selected={role === "creator"}
              onSelect={() => setRole("creator")}
            />
            <RoleCard
              icon={Briefcase}
              title="Business"
              description="Promote, collaborate and manage campaigns."
              buttonLabel="Continue as Business"
              tone="accent"
              selected={role === "business"}
              onSelect={() => setRole("business")}
            />
          </div>

          <TrustBadgesGrid />

          <div className="mt-6">
            <PrivacyNote />
          </div>
        </div>
      }
      right={
        <AuthCard className="w-full max-w-[480px] xl:max-w-none rounded-2xl border border-brand-border shadow-sm p-10">
          <h2 className="text-2xl font-semibold text-brand-text-primary">Create your {ROLE_COPY[role].heading} account</h2>
          <p className="text-sm text-brand-text-muted mt-1 mb-6">{ROLE_COPY[role].subtitle}</p>

          {message && <AuthMessage type={message.type} text={message.text} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              label="Full Name"
              icon={User}
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <AuthInput
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <PasswordInput
              label="Password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              placeholder="Create a strong password"
              hint="Use at least 6 characters with a mix of letters, numbers & symbols."
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "Please wait…" : (
                <>
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <AuthDivider />

          <GoogleButton
            label="Sign up with Google"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              setMessage(null);
              const { error } = await signInWithGoogle();
              if (error) {
                setMessage({ type: "error", text: error.message });
                setLoading(false);
              }
            }}
          />

          <p className="mt-5 text-center text-xs text-brand-text-muted">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-brand-primary hover:underline">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</Link>.
          </p>
        </AuthCard>
      }
    />
  );
}
