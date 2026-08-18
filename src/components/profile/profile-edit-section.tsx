"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AtSign, Sparkles, Loader2, Briefcase } from "lucide-react";
import { DESIGNATIONS } from "@/data/designations";

// Scoped-down port of Promylink/src/components/profile/ProfileEditSection.tsx —
// username/bio/designation are wired to the real PATCH /users/me endpoint.
// Cover banner upload and social links (website/instagram/youtube/twitter)
// aren't ported: they'd need Supabase Storage wiring and extra Profile
// columns that are out of scope for this pass. Username uniqueness is
// enforced server-side (unique constraint) rather than live-checked here.
export function ProfileEditSection() {
  const { toast } = useToast();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({ username: "", bio: "", designation: "", designationCustom: "" });

  useEffect(() => {
    if (!profile) return;
    setForm({
      username: profile.username || "",
      bio: profile.bio || "",
      designation: profile.designation || "",
      designationCustom: profile.designationCustom || "",
    });
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile.mutateAsync({
        username: form.username.trim().toLowerCase() || undefined,
        bio: form.bio.trim().slice(0, 300),
        designation: form.designation || undefined,
        designationCustom: form.designationCustom.trim().slice(0, 40),
      });
      toast({ title: "Profile updated! 🎉" });
    } catch (err) {
      toast({ title: "Save failed", description: (err as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <div className="glass-card p-6 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>;
  }

  return (
    <div className="glass-card p-6 space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-lg">Public Profile</h2>
      </div>

      <div>
        <Label htmlFor="username" className="text-sm">Username (handle)</Label>
        <div className="relative mt-1.5">
          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase() })}
            placeholder="yourhandle"
            maxLength={30}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio" className="text-sm">Bio</Label>
        <Textarea
          id="bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value.slice(0, 300) })}
          placeholder="Tell people about yourself..."
          rows={3}
          className="mt-1.5 resize-none"
        />
        <p className="text-[11px] text-muted-foreground mt-1 text-right">{form.bio.length}/300</p>
      </div>

      <div>
        <Label className="text-sm flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-primary" /> Designation
        </Label>
        <p className="text-[11px] text-muted-foreground mt-1">Pick what best describes you, or add a custom one.</p>
        <div className="mt-2 flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
          {DESIGNATIONS.map((d) => {
            const active = form.designation === d.slug;
            return (
              <button
                key={d.slug}
                type="button"
                onClick={() => setForm({ ...form, designation: active ? "" : d.slug })}
                className={`px-2.5 py-1 rounded-full text-xs border transition-all ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40 bg-background"
                }`}
              >
                <span className="mr-1">{d.emoji}</span>{d.label}
              </button>
            );
          })}
        </div>
        <Input
          value={form.designationCustom}
          onChange={(e) => setForm({ ...form, designationCustom: e.target.value.slice(0, 40) })}
          placeholder="Or type custom (e.g. Astrophysicist)"
          maxLength={40}
          className="mt-2"
        />
        <p className="text-[11px] text-muted-foreground mt-1 text-right">{form.designationCustom.length}/40</p>
      </div>

      <Button onClick={handleSave} variant="gradient" className="w-full" disabled={saving}>
        {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</> : "Save Profile"}
      </Button>
    </div>
  );
}
