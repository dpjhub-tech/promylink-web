"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 rounded-lg border border-brand-border bg-brand-surface px-3 py-1.5 text-sm font-medium text-brand-text-primary hover:bg-brand-surface-secondary transition-colors"
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </button>
  );
}
