"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  RotateCw,
  ArrowRight,
  X,
  Lock,
  Edit2,
} from "lucide-react";

interface DualOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  phone: string;
  countryCode: string;
  onEmailVerified: () => void;
  onPhoneVerified: () => void;
  onAllVerified: () => void;
  onEditContact?: () => void;
}

export function DualOtpModal({
  isOpen,
  onClose,
  email,
  phone,
  countryCode,
  onEmailVerified,
  onPhoneVerified,
  onAllVerified,
  onEditContact,
}: DualOtpModalProps) {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  // Email OTP state
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [isEmailDone, setIsEmailDone] = useState(false);
  const [emailCooldown, setEmailCooldown] = useState(45);
  const [emailError, setEmailError] = useState("");
  const emailInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Phone OTP state
  const [phoneOtp, setPhoneOtp] = useState(["", "", "", "", "", ""]);
  const [isPhoneDone, setIsPhoneDone] = useState(false);
  const [phoneCooldown, setPhoneCooldown] = useState(45);
  const [phoneError, setPhoneError] = useState("");
  const phoneInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccessAll, setShowSuccessAll] = useState(false);

  const DEMO_VALID_OTP = "123456";
  const onAllVerifiedRef = useRef(onAllVerified);

  useEffect(() => {
    onAllVerifiedRef.current = onAllVerified;
  }, [onAllVerified]);

  // Email cooldown timer
  useEffect(() => {
    if (!isOpen || emailCooldown <= 0) return;
    const t = setInterval(() => {
      setEmailCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [isOpen, emailCooldown]);

  // Phone cooldown timer
  useEffect(() => {
    if (!isOpen || phoneCooldown <= 0) return;
    const t = setInterval(() => {
      setPhoneCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [isOpen, phoneCooldown]);

  // Focus the first input of active tab on open or tab switch
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      if (activeTab === "email" && !isEmailDone) {
        emailInputsRef.current[0]?.focus();
      } else if (activeTab === "phone" && !isPhoneDone) {
        phoneInputsRef.current[0]?.focus();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isOpen, activeTab, isEmailDone, isPhoneDone]);

  // Handle successful completion of both channels
  useEffect(() => {
    if (isEmailDone && isPhoneDone && !showSuccessAll) {
      setShowSuccessAll(true);
      const timer = setTimeout(() => {
        onAllVerifiedRef.current();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isEmailDone, isPhoneDone, showSuccessAll]);

  if (!isOpen) return null;

  const handleManualProceed = () => {
    onAllVerifiedRef.current();
  };

  const handleOtpChange = (
    channel: "email" | "phone",
    index: number,
    val: string
  ) => {
    if (!/^\d?$/.test(val)) return;

    if (channel === "email") {
      setEmailError("");
      const next = [...emailOtp];
      next[index] = val;
      setEmailOtp(next);
      if (val && index < 5) {
        emailInputsRef.current[index + 1]?.focus();
      }
      // Auto verify when 6 digits entered
      if (val && index === 5 && next.every((d) => d.length === 1)) {
        verifyEmailCode(next.join(""));
      }
    } else {
      setPhoneError("");
      const next = [...phoneOtp];
      next[index] = val;
      setPhoneOtp(next);
      if (val && index < 5) {
        phoneInputsRef.current[index + 1]?.focus();
      }
      // Auto verify when 6 digits entered
      if (val && index === 5 && next.every((d) => d.length === 1)) {
        verifyPhoneCode(next.join(""));
      }
    }
  };

  const handleKeyDown = (
    channel: "email" | "phone",
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const currentOtp = channel === "email" ? emailOtp : phoneOtp;
    const refArray = channel === "email" ? emailInputsRef : phoneInputsRef;

    if (e.key === "Backspace" && !currentOtp[index] && index > 0) {
      refArray.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    channel: "email" | "phone",
    e: React.ClipboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((char, idx) => {
      if (idx < 6) next[idx] = char;
    });

    if (channel === "email") {
      setEmailOtp(next);
      const focusIndex = Math.min(pasted.length, 5);
      emailInputsRef.current[focusIndex]?.focus();
      if (pasted.length === 6) {
        verifyEmailCode(pasted);
      }
    } else {
      setPhoneOtp(next);
      const focusIndex = Math.min(pasted.length, 5);
      phoneInputsRef.current[focusIndex]?.focus();
      if (pasted.length === 6) {
        verifyPhoneCode(pasted);
      }
    }
  };

  const verifyEmailCode = (code: string) => {
    if (code.length < 6) {
      setEmailError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    setEmailError("");

    setTimeout(() => {
      setIsVerifying(false);
      // Valid if it matches bypass OTP 123456
      if (code === DEMO_VALID_OTP) {
        setIsEmailDone(true);
        onEmailVerified();
        if (!isPhoneDone) {
          setActiveTab("phone");
        }
      } else {
        setEmailError("Invalid verification code. Please try again or request a new code.");
      }
    }, 400);
  };

  const verifyPhoneCode = (code: string) => {
    if (code.length < 6) {
      setPhoneError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    setPhoneError("");

    setTimeout(() => {
      setIsVerifying(false);
      // Valid if it matches bypass OTP 123456
      if (code === DEMO_VALID_OTP) {
        setIsPhoneDone(true);
        onPhoneVerified();
      } else {
        setPhoneError("Invalid verification code. Please try again or request a new code.");
      }
    }, 400);
  };

  const handleResendEmail = () => {
    setEmailCooldown(60);
    setEmailOtp(["", "", "", "", "", ""]);
    setEmailError("");
    emailInputsRef.current[0]?.focus();
  };

  const handleResendPhone = () => {
    setPhoneCooldown(60);
    setPhoneOtp(["", "", "", "", "", ""]);
    setPhoneError("");
    phoneInputsRef.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-brand-border bg-brand-surface shadow-2xl p-6 sm:p-7 overflow-hidden text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-brand-text-muted hover:bg-brand-surface-secondary hover:text-brand-text-primary transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {showSuccessAll ? (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-success/10 text-brand-success">
              <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-text-primary">Contact Details Verified!</h3>
              <p className="text-sm text-brand-text-secondary mt-1">
                Your email and phone number have been authenticated successfully.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleManualProceed}
                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-[0.99]"
              >
                <span>Continue to Business Information</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleManualProceed}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors cursor-pointer"
              >
                <span className="animate-pulse">Redirecting automatically...</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-text-primary">Verify Your Contact Details</h3>
                <p className="text-xs text-brand-text-muted mt-0.5">
                  Complete 2-step OTP verification to secure your organization account.
                </p>
              </div>
            </div>

            {/* Dual Channel Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-xl bg-brand-surface-secondary border border-brand-border/60">
              {/* Email Tab */}
              <button
                type="button"
                onClick={() => setActiveTab("email")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "email"
                    ? "bg-brand-surface text-brand-primary shadow-xs border border-brand-border/50"
                    : "text-brand-text-secondary hover:text-brand-text-primary"
                }`}
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">Email OTP</span>
                {isEmailDone ? (
                  <span className="inline-flex items-center text-brand-success text-[11px] font-bold ml-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0 ml-1" />
                )}
              </button>

              {/* Phone Tab */}
              <button
                type="button"
                onClick={() => setActiveTab("phone")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "phone"
                    ? "bg-brand-surface text-brand-primary shadow-xs border border-brand-border/50"
                    : "text-brand-text-secondary hover:text-brand-text-primary"
                }`}
              >
                <Smartphone className="h-4 w-4 shrink-0" />
                <span className="truncate">SMS Phone OTP</span>
                {isPhoneDone ? (
                  <span className="inline-flex items-center text-brand-success text-[11px] font-bold ml-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0 ml-1" />
                )}
              </button>
            </div>

            {/* Email OTP Card Body */}
            {activeTab === "email" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-brand-surface-secondary/60 rounded-xl p-3 border border-brand-border/60">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-brand-text-muted leading-tight">Verification code sent to</p>
                      <p className="text-xs font-semibold text-brand-text-primary truncate">{email}</p>
                    </div>
                  </div>
                  {onEditContact && !isEmailDone && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onEditContact();
                      }}
                      className="text-xs font-medium text-brand-primary hover:underline flex items-center gap-1 shrink-0 ml-2"
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </button>
                  )}
                </div>

                {isEmailDone ? (
                  <div className="rounded-xl border border-brand-success/30 bg-brand-success/5 p-4 text-center space-y-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-success/10 text-brand-success">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-brand-success">Work Email Verified</p>
                    <p className="text-xs text-brand-text-muted">
                      {isPhoneDone
                        ? "Both channels verified. Preparing next step..."
                        : "Switch to SMS OTP tab to complete phone verification."}
                    </p>
                    {!isPhoneDone && (
                      <button
                        type="button"
                        onClick={() => setActiveTab("phone")}
                        className="inline-flex items-center gap-1.5 mt-2 rounded-lg bg-brand-primary text-white text-xs font-semibold px-4 py-2 hover:bg-brand-primary-dark transition-colors cursor-pointer"
                      >
                        Verify Phone Number
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div
                      className="flex justify-center gap-2.5 py-1"
                      onPaste={(e) => handlePaste("email", e)}
                    >
                      {emailOtp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            emailInputsRef.current[i] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange("email", i, e.target.value)}
                          onKeyDown={(e) => handleKeyDown("email", i, e)}
                          className={`w-11 h-12 sm:w-12 sm:h-13 text-center text-lg font-bold rounded-xl border bg-brand-surface text-brand-text-primary focus:outline-none focus:ring-2 transition-all ${
                            emailError
                              ? "border-brand-error focus:ring-brand-error/30"
                              : digit
                              ? "border-brand-primary bg-brand-primary/[0.02] focus:ring-brand-primary/30"
                              : "border-brand-border focus:ring-brand-primary/30"
                          }`}
                        />
                      ))}
                    </div>

                    {emailError && (
                      <p className="text-center text-xs text-brand-error font-medium">{emailError}</p>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        type="button"
                        onClick={handleResendEmail}
                        disabled={emailCooldown > 0}
                        className="inline-flex items-center gap-1 text-brand-text-secondary hover:text-brand-primary disabled:text-brand-text-muted disabled:cursor-not-allowed cursor-pointer"
                      >
                        <RotateCw className="h-3.5 w-3.5" />
                        {emailCooldown > 0 ? `Resend code in ${emailCooldown}s` : "Resend Email Code"}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => verifyEmailCode(emailOtp.join(""))}
                      disabled={isVerifying || emailOtp.join("").length < 6}
                      className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
                    >
                      {isVerifying ? "Verifying..." : "Verify Email OTP"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Phone OTP Card Body */}
            {activeTab === "phone" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-brand-surface-secondary/60 rounded-xl p-3 border border-brand-border/60">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-brand-text-muted leading-tight">SMS code sent to</p>
                      <p className="text-xs font-semibold text-brand-text-primary truncate">
                        {countryCode} {phone}
                      </p>
                    </div>
                  </div>
                  {onEditContact && !isPhoneDone && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onEditContact();
                      }}
                      className="text-xs font-medium text-brand-primary hover:underline flex items-center gap-1 shrink-0 ml-2"
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </button>
                  )}
                </div>

                {isPhoneDone ? (
                  <div className="rounded-xl border border-brand-success/30 bg-brand-success/5 p-4 text-center space-y-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-success/10 text-brand-success">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-brand-success">Phone Number Verified</p>
                    <p className="text-xs text-brand-text-muted">
                      {isEmailDone
                        ? "Both channels verified. Preparing next step..."
                        : "Switch to Email OTP tab to complete email verification."}
                    </p>
                    {!isEmailDone && (
                      <button
                        type="button"
                        onClick={() => setActiveTab("email")}
                        className="inline-flex items-center gap-1.5 mt-2 rounded-lg bg-brand-primary text-white text-xs font-semibold px-4 py-2 hover:bg-brand-primary-dark transition-colors cursor-pointer"
                      >
                        Verify Work Email
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div
                      className="flex justify-center gap-2.5 py-1"
                      onPaste={(e) => handlePaste("phone", e)}
                    >
                      {phoneOtp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            phoneInputsRef.current[i] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange("phone", i, e.target.value)}
                          onKeyDown={(e) => handleKeyDown("phone", i, e)}
                          className={`w-11 h-12 sm:w-12 sm:h-13 text-center text-lg font-bold rounded-xl border bg-brand-surface text-brand-text-primary focus:outline-none focus:ring-2 transition-all ${
                            phoneError
                              ? "border-brand-error focus:ring-brand-error/30"
                              : digit
                              ? "border-brand-primary bg-brand-primary/[0.02] focus:ring-brand-primary/30"
                              : "border-brand-border focus:ring-brand-primary/30"
                          }`}
                        />
                      ))}
                    </div>

                    {phoneError && (
                      <p className="text-center text-xs text-brand-error font-medium">{phoneError}</p>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        type="button"
                        onClick={handleResendPhone}
                        disabled={phoneCooldown > 0}
                        className="inline-flex items-center gap-1 text-brand-text-secondary hover:text-brand-primary disabled:text-brand-text-muted disabled:cursor-not-allowed cursor-pointer"
                      >
                        <RotateCw className="h-3.5 w-3.5" />
                        {phoneCooldown > 0 ? `Resend SMS in ${phoneCooldown}s` : "Resend SMS Code"}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => verifyPhoneCode(phoneOtp.join(""))}
                      disabled={isVerifying || phoneOtp.join("").length < 6}
                      className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
                    >
                      {isVerifying ? "Verifying..." : "Verify SMS OTP"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Footer Trust Note */}
            <div className="mt-5 pt-4 border-t border-brand-border/60 flex items-center justify-center gap-2 text-[11px] text-brand-text-muted">
              <Lock className="h-3.5 w-3.5 text-brand-text-muted" />
              <span>256-bit encrypted verification. PromyLink never shares your contact details.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
