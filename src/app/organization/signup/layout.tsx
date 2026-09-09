"use client";

import { ReactNode } from "react";
import { OrganizationSignupProvider } from "@/contexts/organization-signup-context";

export default function OrganizationSignupLayout({ children }: { children: ReactNode }) {
  return <OrganizationSignupProvider>{children}</OrganizationSignupProvider>;
}
