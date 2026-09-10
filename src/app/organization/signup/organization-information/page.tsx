"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganizationInformationRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/organization/signup/business-details");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-background">
      <p className="text-sm text-brand-text-muted">Redirecting to Business Details...</p>
    </div>
  );
}
