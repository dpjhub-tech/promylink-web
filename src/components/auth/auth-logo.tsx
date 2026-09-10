import Link from "next/link";
import { PromylinkLogoIcon } from "@/components/ui/promylink-logo";

export function AuthLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <PromylinkLogoIcon className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105" />
      <span className="text-xl font-bold tracking-tight brand-text-animated">PromyLink</span>
    </Link>
  );
}

