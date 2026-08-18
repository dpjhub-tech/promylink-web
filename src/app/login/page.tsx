"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

const emailSchema = z.string().trim().email("Invalid email address").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(128);
const nameSchema = z.string().trim().min(1, "Name is required").max(100);

// Simplified from Promylink/src/pages/Login.tsx for this pass:
// business-referral-code handling is dropped, and toasts are replaced with
// inline messages. Google sign-in uses Supabase's native OAuth flow (see
// auth-context.tsx) instead of the original's Lovable-specific
// `lovable.auth.signInWithOAuth`, which only works inside the Lovable
// platform.
export default function LoginPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signIn, signUp, signInWithGoogle } = useAuth();

  const [isLogin, setIsLogin] = useState(pathname !== "/signup");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const email = emailSchema.parse(formData.email);
      const password = passwordSchema.parse(formData.password);

      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setMessage({ type: "error", text: error.message });
        } else {
          router.push("/");
        }
      } else {
        const name = nameSchema.parse(formData.name);
        const { error } = await signUp(email, password, name);
        if (error) {
          const msg = error.message?.includes("already registered")
            ? "This email is already registered. Please sign in instead."
            : error.message;
          setMessage({ type: "error", text: msg });
        } else {
          setMessage({
            type: "success",
            text: "Check your email — we sent you a confirmation link.",
          });
        }
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 md:py-12 px-4 pt-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-delayed" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="glass-card p-6 md:p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
                  <Image src="/logo.png" alt="Promylink" width={40} height={40} className="h-10 w-10 rounded-xl object-contain" />
                </div>
                <h1 className="text-2xl font-bold mb-1.5">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isLogin ? "Sign in to continue" : "Join the verified promotion platform"}
                </p>
              </div>

              {message && (
                <div
                  className={`mb-4 rounded-lg px-3 py-2 text-sm ${
                    message.type === "error"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="input-search"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@yourcompany.com"
                      className="input-search"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min. 6 characters"
                      className="input-search pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-md transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full gap-2 h-12 text-base font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    "Please wait…"
                  ) : (
                    <>
                      {isLogin ? "Sign in" : "Create account"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 h-11 hover:bg-secondary/80 transition-all duration-300"
                onClick={async () => {
                  setLoading(true);
                  setMessage(null);
                  const { error } = await signInWithGoogle();
                  if (error) {
                    setMessage({ type: "error", text: error.message });
                    setLoading(false);
                  }
                  // On success the browser redirects to Google, so no need
                  // to clear `loading` here.
                }}
                disabled={loading}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </Button>

              <p className="mt-5 text-center text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-semibold hover:underline transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
