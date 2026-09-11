"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Rocket,
  Users,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Circle,
  KeyRound,
} from "lucide-react";
import { AuthLogo } from "@/components/auth/auth-logo";
import { AuthTopNav } from "@/components/auth/auth-top-nav";
import { AuthInput } from "@/components/auth/auth-input";
import { PasswordInput } from "@/components/auth/password-input";
import { PhoneInput, COUNTRY_CODES } from "@/components/auth/phone-input";
import { CityIllustration } from "@/components/organization-signup/city-illustration";
import { DualOtpModal } from "@/components/organization-signup/dual-otp-modal";
import { useOrganizationSignup } from "@/contexts/organization-signup-context";

const FEATURES = [
  {
    icon: Rocket,
    title: "Run Powerful Campaigns",
    description: "Launch and manage verified marketing campaigns that deliver measurable business impact.",
  },
  {
    icon: Users,
    title: "Access Top Verified Creators",
    description: "Connect with authenticated creators tailored to your brand niche and audience.",
  },
  {
    icon: TrendingUp,
    title: "Track Real-Time ROI",
    description: "Measure engagement metrics, attribution, and conversions with unified analytics.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "Multi-layered verification, secure escrow disbursements, and compliance protection.",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BLOCKED_PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "rocketmail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "zoho.com",
  "protonmail.com",
  "proton.me",
  "mail.com",
  "gmx.com",
  "yandex.com",
  "rediffmail.com",
]);

export default function BusinessSignupPage() {
  const router = useRouter();
  const {
    state,
    updateState,
    markEmailVerified,
    markPhoneVerified,
  } = useOrganizationSignup();

  const [countryCode, setCountryCode] = useState(state.countryCode || "+91");
  const [formData, setFormData] = useState({
    name: state.name || "",
    email: state.email || "",
    phone: state.phone || "",
    password: state.password || "",
    confirmPassword: state.password || "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });

  const [agreed, setAgreed] = useState(true);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  // Active country for phone rules
  const activeCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  // Validation checks
  const isNameValid = formData.name.trim().length >= 2;
  
  const getEmailValidationError = (email: string): string | undefined => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return "Work email is required";
    if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address";
    const domain = trimmed.split("@")[1];
    if (domain && BLOCKED_PERSONAL_EMAIL_DOMAINS.has(domain)) {
      return "Please enter your official work email (personal domains like Gmail, Outlook, Yahoo are not allowed)";
    }
    return undefined;
  };

  const emailError = getEmailValidationError(formData.email);
  const isEmailValid = !emailError;
  const isPhoneValid = formData.phone.length === activeCountry.digits;

  // Password strength checks (min 8 chars, letters, numbers, symbols)
  const passwordHasMinLength = formData.password.length >= 8;
  const passwordHasLetter = /[a-zA-Z]/.test(formData.password);
  const passwordHasNumber = /[0-9]/.test(formData.password);
  const passwordHasSymbol = /[^a-zA-Z0-9]/.test(formData.password);
  const isPasswordValid =
    passwordHasMinLength && passwordHasLetter && passwordHasNumber && passwordHasSymbol;

  const isConfirmPasswordValid =
    formData.confirmPassword.length > 0 &&
    formData.confirmPassword === formData.password;

  // All fields mandatory + valid + terms agreed
  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    agreed;

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({
        name: true,
        email: true,
        phone: true,
        password: true,
        confirmPassword: true,
        terms: true,
      });
      return;
    }

    // Save to context
    updateState({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      countryCode,
      password: formData.password,
    });

    // If both are already verified (e.g. returning to step), navigate immediately
    if (state.isEmailVerified && state.isPhoneVerified) {
      router.push("/organization/signup/business-details");
      return;
    }

    // Otherwise open the Dual OTP verification modal
    setIsOtpModalOpen(true);
  };

  const handleAllVerified = () => {
    setIsOtpModalOpen(false);
    router.push("/organization/signup/business-details");
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white -mt-16">
      <header className="shrink-0 flex items-center justify-between w-full px-6 lg:px-12 py-4 bg-white border-b border-brand-border/40">
        <AuthLogo />
        <div className="flex items-center text-sm text-brand-text-secondary">
          <AuthTopNav
            question="Already have an account?"
            linkText="Log in"
            linkHref="/login"
            variant="button"
          />
        </div>
      </header>

      <div className="flex-1 min-h-0 grid lg:grid-cols-[42%_58%]">
        {/* Left Side: Marketing / Value Prop / Illustration */}
        <div className="hidden lg:flex flex-col justify-between overflow-y-auto bg-brand-surface-secondary/40 pl-24 pr-10 xl:pl-24 xl:pr-14 pt-8 pb-0 border-r border-brand-border/40">
          <div className="pl-24 xl:pl-28 pt-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3.5 py-1 text-xs font-semibold text-brand-primary mb-4">
              <KeyRound className="h-3.5 w-3.5" />
              Step 1 of 5: Account &amp; Verification
            </div>

            <h1 className="text-3xl xl:text-[36px] font-bold text-brand-text-primary tracking-tight leading-[1.18] mb-3">
              Create your{" "}
              <span className="text-brand-primary block">organization account</span>
            </h1>
            <p className="text-brand-text-secondary text-sm xl:text-[15px] leading-relaxed mb-8 max-w-sm">
              Join PromyLink to launch campaigns, discover verified creators, and scale your brand partnerships with trusted escrow.
            </p>

            <div className="space-y-4">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-text-primary text-[15px] leading-snug">
                      {title}
                    </p>
                    <p className="text-xs text-brand-text-muted leading-relaxed mt-0.5">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mt-auto pt-6">
            <CityIllustration />
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="flex justify-center lg:justify-start items-center overflow-y-auto px-6 py-6 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-28 bg-white">
          <div className="w-full max-w-[680px] my-auto py-6">
            <div className="mb-5">
              <h2 className="text-2xl xl:text-[26px] font-bold text-brand-text-primary tracking-tight">
                Create your account
              </h2>
              <p className="text-sm text-brand-text-muted mt-1">
                Enter your basic details. We&apos;ll verify your work email and mobile number via OTP.
              </p>
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <AuthInput
                  label="Full Name *"
                  icon={User}
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, name: val }));
                  }}
                  onBlur={() => handleBlur("name")}
                  error={
                    touched.name && !isNameValid
                      ? formData.name.trim().length === 0
                        ? "Full name is required"
                        : "Name must be at least 2 characters"
                      : undefined
                  }
                  required
                />
                <AuthInput
                  label="Work Email *"
                  icon={Mail}
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, email: val }));
                  }}
                  onBlur={() => handleBlur("email")}
                  error={touched.email ? emailError : undefined}
                  required
                />
              </div>

              <PhoneInput
                label="Phone Number *"
                countryCode={countryCode}
                onCountryCodeChange={(code) => {
                  setCountryCode(code);
                  setFormData((prev) => ({ ...prev, phone: "" }));
                }}
                value={formData.phone}
                onChange={(phone) => {
                  setFormData((prev) => ({ ...prev, phone }));
                }}
                onBlur={() => handleBlur("phone")}
                error={
                  touched.phone && !isPhoneValid
                    ? formData.phone.length === 0
                      ? "Phone number is required"
                      : `Please enter a valid ${activeCountry.digits}-digit ${activeCountry.name} phone number (${formData.phone.length}/${activeCountry.digits})`
                    : undefined
                }
              />

              <div className="space-y-1.5">
                <PasswordInput
                  label="Password *"
                  value={formData.password}
                  onChange={(password) => {
                    setFormData((prev) => ({ ...prev, password }));
                  }}
                  onBlur={() => handleBlur("password")}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  error={
                    touched.password && !isPasswordValid
                      ? formData.password.length === 0
                        ? "Password is required"
                        : "Password must meet all strength requirements below"
                      : undefined
                  }
                />

                {/* Password Strength Checklist */}
                {formData.password.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-1 pb-1 px-1">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {passwordHasMinLength ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-success shrink-0" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-brand-text-muted shrink-0" />
                      )}
                      <span
                        className={
                          passwordHasMinLength
                            ? "text-brand-success font-medium"
                            : "text-brand-text-muted"
                        }
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {passwordHasLetter ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-success shrink-0" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-brand-text-muted shrink-0" />
                      )}
                      <span
                        className={
                          passwordHasLetter
                            ? "text-brand-success font-medium"
                            : "text-brand-text-muted"
                        }
                      >
                        At least 1 letter (a-z, A-Z)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {passwordHasNumber ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-success shrink-0" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-brand-text-muted shrink-0" />
                      )}
                      <span
                        className={
                          passwordHasNumber
                            ? "text-brand-success font-medium"
                            : "text-brand-text-muted"
                        }
                      >
                        At least 1 number (0-9)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {passwordHasSymbol ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-success shrink-0" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-brand-text-muted shrink-0" />
                      )}
                      <span
                        className={
                          passwordHasSymbol
                            ? "text-brand-success font-medium"
                            : "text-brand-text-muted"
                        }
                      >
                        At least 1 symbol (!@#$...)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <PasswordInput
                label="Confirm Password *"
                value={formData.confirmPassword}
                onChange={(confirmPassword) => {
                  setFormData((prev) => ({ ...prev, confirmPassword }));
                }}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="Confirm your password"
                autoComplete="new-password"
                error={
                  touched.confirmPassword && !isConfirmPasswordValid
                    ? formData.confirmPassword.length === 0
                      ? "Please confirm your password"
                      : "Passwords do not match"
                    : undefined
                }
              />

              <div>
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="terms-checkbox"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      setTouched((prev) => ({ ...prev, terms: true }));
                    }}
                    className="h-4 w-4 mt-0.5 rounded border-brand-border text-brand-primary focus:ring-brand-primary/30 accent-brand-primary cursor-pointer"
                  />
                  <label
                    htmlFor="terms-checkbox"
                    className="text-xs text-brand-text-secondary leading-relaxed cursor-pointer select-none"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-brand-primary font-medium hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-brand-primary font-medium hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Privacy Policy
                    </Link>
                    <span className="text-brand-error ml-0.5">*</span>
                  </label>
                </div>
                {touched.terms && !agreed && (
                  <p className="mt-1 text-xs text-brand-error font-medium">
                    You must agree to the Terms of Service and Privacy Policy to continue
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-base transition-all shadow-sm mt-2 cursor-pointer active:scale-[0.99]"
              >
                Verify Contact &amp; Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-brand-text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-text-muted" />
              <span>We&apos;ll never share your information with third parties.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual OTP Verification Modal */}
      <DualOtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        email={formData.email}
        phone={formData.phone}
        countryCode={countryCode}
        onEmailVerified={markEmailVerified}
        onPhoneVerified={markPhoneVerified}
        onAllVerified={handleAllVerified}
      />
    </div>
  );
}
