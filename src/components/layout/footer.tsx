import Link from "next/link";
import { PromylinkLogoIcon } from "@/components/ui/promylink-logo";

const footerLinks: Record<string, { name: string; href: string }[]> = {
  Product: [
    { name: "Features", href: "/feed" },
    { name: "Pricing", href: "/pricing" },
    { name: "Categories", href: "/categories" },
    { name: "For Creators", href: "/creator/login" },
    { name: "For Business", href: "/business/login" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "User Terms", href: "/terms/user" },
    { name: "Poster Terms", href: "/terms/poster" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Community Guidelines", href: "/community-guidelines" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
  Support: [
    { name: "Help Center", href: "/contact" },
    { name: "Report Fraud", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="hidden md:block py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <PromylinkLogoIcon className="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
                <span className="text-xl font-bold brand-text-animated">Promylink</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                promylink.com - India&apos;s No 1 Premium Search Engine
              </p>
            </div>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Promylink. All rights reserved.</p>
              <Link href="/admin/login" className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">Admin</Link>
            </div>
            <a href="https://www.instagram.com/promylink/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Follow us on Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="md:hidden py-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 group">
              <PromylinkLogoIcon className="h-7 w-auto object-contain transition-transform group-hover:scale-105" />
              <span className="font-bold text-sm brand-text-animated">Promylink</span>
            </Link>
            <a href="https://www.instagram.com/promylink/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
            {footerLinks.Legal.map((link) => (
              <Link key={link.name} href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Promylink</p>
            <Link href="/admin/login" className="text-xs text-muted-foreground/30 hover:text-muted-foreground transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
