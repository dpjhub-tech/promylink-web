"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Mail, ShieldCheck, ArrowRight } from "lucide-react";
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
import { TrustBadgesList } from "@/components/auth/trust-badges";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const emailSchema = z.string().trim().email("Invalid email address").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(128);

// Header, the main two-column grid, and the footer are three fully
// independent sections — each has its own container width constant, so
// adjusting one never affects the others. All differ from /signup's (still
// the site-wide 1440px .container).
const HEADER_CONTAINER = "mx-auto w-[85%]";
const MAIN_CONTAINER = "mx-auto w-[65%]";
const FOOTER_CONTAINER = "mx-auto w-[92%]";
// 1fr:1fr = 50%:50% split of the row (after the gap is subtracted).
const GRID = "grid gap-8 xl:grid-cols-[1fr_1fr] xl:gap-6 items-center";

// Simplified from Promylink/src/pages/Login.tsx for this pass:
// business-referral-code handling is dropped, and toasts are replaced with
// inline messages. Google sign-in uses Supabase's native OAuth flow (see
// auth-context.tsx) instead of the original's Lovable-specific
// `lovable.auth.signInWithOAuth`, which only works inside the Lovable
// platform.
export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, signInWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const email = emailSchema.parse(formData.email);
      const password = passwordSchema.parse(formData.password);

      const { error } = await signIn(email, password);
      if (error) {
        setMessage({ type: "error", text: error.message });
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setMessage({ type: "error", text: err.issues[0]?.message ?? "Validation error" });
      }
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
        <AuthTopNav question="New to PromyLink?" linkText="Create account" linkHref="/organization/signup" variant="button" />
      }
      footer={<AuthFooter containerClassName={FOOTER_CONTAINER} />}
      left={
        // Hidden entirely below xl — on smaller screens, show only the
        // sign-in form, not the marketing panel stacked above it.
        // xl:pl-6 nudges it rightward, off the container's left edge, at
        // desktop width where it's narrower relative to the form column.
        <div className="hidden xl:block xl:pl-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-2.5 h-6 text-xs font-semibold text-brand-primary mb-5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified. Trusted. Trackable.
          </span>

          <h1 className="max-w-[500px] text-[40px] font-semibold leading-[1.15] tracking-[-0.5px] text-brand-text-primary mb-4">
            Welcome back to{" "}
            <span className="brand-gradient bg-clip-text text-transparent">PromyLink</span>
          </h1>
          <p className="max-w-[500px] text-base leading-[1.5] text-brand-text-secondary mb-8">
            Sign in to continue discovering verified links, growing your reach and managing your campaigns.
          </p>

          <TrustBadgesList />

          <div className="mt-8 pt-6 border-t border-brand-border flex items-center gap-3">
            <div className="flex -space-x-2">
              {["A", "B", "C"].map((initial) => (
                <Avatar key={initial} className="h-8 w-8 ring-2 ring-brand-background">
                  <AvatarFallback className="bg-brand-primary/10 text-brand-primary text-xs font-semibold">
                    {initial}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm text-brand-text-secondary">
              Trusted by creators and businesses across India. Join thousands of verified users on{" "}
              <span className="font-semibold text-brand-text-primary">PromyLink</span>.
            </p>
          </div>
        </div>
      }
      right={
        <AuthCard className="w-full max-w-[480px] xl:max-w-none rounded-2xl border border-brand-border shadow-sm p-10">
          <h2 className="text-2xl font-semibold text-brand-text-primary">Sign in to PromyLink</h2>
          <p className="text-sm text-brand-text-muted mt-1 mb-6">Enter your details to access your account.</p>

          {message && <AuthMessage type={message.type} text={message.text} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <div>
              <PasswordInput
                label="Password"
                value={formData.password}
                onChange={(value) => setFormData({ ...formData, password: value })}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <div className="text-right mt-1.5">
                <Link href="/forgot-password" className="text-sm font-medium text-brand-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "Please wait…" : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <AuthDivider />

          <GoogleButton
            label="Sign in with Google"
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

          <div className="mt-5">
            <PrivacyNote />
          </div>
        </AuthCard>
      }
    />
  );
}
