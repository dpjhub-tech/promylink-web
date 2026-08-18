"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, Eye, EyeOff, CheckCircle2, Shield, Phone, CreditCard, Settings as SettingsIcon, Film, Crown } from "lucide-react";
import { z } from "zod";
import { ProfileEditSection } from "@/components/profile/profile-edit-section";

// Faithful structural port of Promylink/src/pages/Settings.tsx. Password
// change still goes straight to Supabase Auth (unaffected by the backend
// migration). Phone number is wired to the new PATCH /users/me endpoint.
// KYC upload, avatar cropping, native permissions, reels, and subscriptions
// aren't ported yet — see the scaffolding plan's explicit out-of-scope list
// (payments/subscriptions/boosts, reels) plus KYC document upload and image
// cropping, which need Supabase Storage wiring not yet set up. The Reels and
// Plan tabs stay in place structurally with lightweight placeholders instead
// of being removed outright.
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(128, "Password is too long");

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);

  useEffect(() => {
    if (profile?.phone) setPhone(profile.phone);
  }, [profile]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast({ title: "Enter your current password", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    const parsed = passwordSchema.safeParse(newPassword);
    if (!parsed.success) {
      toast({ title: "Validation error", description: parsed.error.issues[0]?.message, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user!.email!,
        password: currentPassword,
      });
      if (signInError) {
        toast({ title: "Incorrect current password", description: "Please enter your current password correctly.", variant: "destructive" });
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Password updated!", description: "Your password has been changed successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="account" className="gap-1.5 text-xs sm:text-sm">
                <SettingsIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger value="reels" className="gap-1.5 text-xs sm:text-sm">
                <Film className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>Reels</span>
              </TabsTrigger>
              <TabsTrigger value="subscription" className="gap-1.5 text-xs sm:text-sm">
                <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>Plan</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <ProfileEditSection />

              <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.15s" }}>
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Mobile Number
                </h2>
                <div className="space-y-3">
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    maxLength={15}
                  />
                  {phone && !/^\d{10,15}$/.test(phone) && (
                    <p className="text-xs text-destructive">Enter a valid 10-15 digit number</p>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={phoneLoading || !phone || !/^\d{10,15}$/.test(phone)}
                    onClick={async () => {
                      setPhoneLoading(true);
                      try {
                        await updateProfile.mutateAsync({ phone });
                        toast({ title: "Phone number updated!" });
                      } catch (err) {
                        toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
                      } finally {
                        setPhoneLoading(false);
                      }
                    }}
                  >
                    {phoneLoading ? "Saving..." : "Save Phone Number"}
                  </Button>
                </div>
              </div>

              <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Change Password
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="current-password"
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded"
                      >
                        {showCurrent ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="new-password"
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded"
                      >
                        {showNew ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="confirm-password"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded"
                      >
                        {showConfirm ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                      </button>
                    </div>
                  </div>
                  {newPassword && confirmPassword && newPassword === confirmPassword && (
                    <p className="text-sm text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Passwords match
                    </p>
                  )}
                  <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
                    {loading ? "Verifying & Updating..." : "Update Password"}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="reels" className="space-y-6">
              <div className="glass-card p-10 text-center">
                <Film className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
                <h3 className="font-semibold mb-1">Reels are coming soon</h3>
                <p className="text-sm text-muted-foreground">Short-video posts aren&apos;t part of this build yet.</p>
              </div>
            </TabsContent>

            <TabsContent value="subscription">
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
                  <Crown className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-bold mb-1">Free Plan</h3>
                <p className="text-sm text-muted-foreground mb-4">Upgrade to unlock premium features.</p>
                <Link href="/pricing">
                  <Button variant="gradient" className="w-full gap-2">
                    <CreditCard className="h-4 w-4" /> View Plans
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
