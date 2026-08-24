import Link from "next/link";
import { Globe } from "lucide-react";

const links = [
  { name: "About", href: "/about" },
  { name: "Help Center", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Contact", href: "/contact" },
];

// Deliberately smaller/minimal than the site-wide <Footer /> — matches this
// page's own design rather than the full multi-column marketing footer.
// containerClassName lets each page align this to its own content container
// (e.g. /login's 1120px container instead of the site-wide 1440px one).
export function AuthFooter({ containerClassName = "container mx-auto" }: { containerClassName?: string }) {
  return (
    <footer className="border-t border-brand-border">
      <div className={`${containerClassName} flex flex-col md:flex-row items-center justify-between gap-4 py-5 text-sm text-brand-text-muted`}>
        <p>© {new Date().getFullYear()} PromyLink. All rights reserved.</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-brand-text-secondary transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="inline-flex items-center gap-1.5">
          <Globe className="h-4 w-4" />
          English
        </div>
      </div>
    </footer>
  );
}
