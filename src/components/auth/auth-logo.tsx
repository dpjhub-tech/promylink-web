import Link from "next/link";
import Image from "next/image";

export function AuthLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.png" alt="PromyLink" width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
      <span className="text-xl font-bold text-brand-text-primary">PromyLink</span>
    </Link>
  );
}
