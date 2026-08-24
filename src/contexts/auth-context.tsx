"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { apiFetch } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    name: string,
    role?: "creator" | "business",
  ) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Ensures a local profile row exists on our backend the moment someone
      // signs in — the Postgres trigger that used to do this lives in the
      // live Supabase DB, which the local dev backend doesn't share.
      if (event === "SIGNED_IN") {
        apiFetch("/users/me").catch((err) => console.error("Failed to sync profile:", err));
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // `role` is carried as Supabase user_metadata so it survives the signup
  // redirect/confirmation step. NOTE: the backend's profile-creation path
  // (UsersService.findOrCreate) doesn't read this yet and always defaults to
  // the 'user' role — wiring that up is a separate, not-yet-done backend change.
  const signUp = async (email: string, password: string, name: string, role?: "creator" | "business") => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name, ...(role ? { role } : {}) },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  // Standard Supabase OAuth redirect flow — replaces the original's
  // Lovable-specific `lovable.auth.signInWithOAuth`, which brokered Google
  // sign-in through Lovable's own cloud service and isn't usable outside
  // the Lovable platform. Requires a Google OAuth Client ID/Secret entered
  // into this Supabase project's Authentication > Providers > Google.
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
