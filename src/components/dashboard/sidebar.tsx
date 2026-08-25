"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Grid3x3,
  FilePlus,
  Video,
  Link2,
  FileText,
  Briefcase,
  Megaphone,
  Handshake,
  BarChart3,
  Wallet,
  UserCircle,
  Settings as SettingsIcon,
} from "lucide-react";
import { AuthLogo } from "@/components/auth/auth-logo";

interface NavItem {
  label: string;
  href: string;
  icon: typeof Home;
  soon?: boolean; // no backend/page for this yet — shown honestly, not linked
  badge?: string;
}

const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Explore", href: "/dashboard", icon: Compass, soon: true },
  { label: "Categories", href: "/categories", icon: Grid3x3 },
];

const CREATE_NAV: NavItem[] = [
  { label: "New Post", href: "/dashboard", icon: FilePlus, soon: true },
  { label: "New Video", href: "/dashboard", icon: Video, soon: true, badge: "New" },
  { label: "Affiliate Link", href: "/dashboard", icon: Link2, soon: true },
];

const CREATOR_NAV: NavItem[] = [
  { label: "My Posts", href: "/dashboard", icon: FileText, soon: true },
  { label: "Portfolio", href: "/dashboard", icon: Briefcase, soon: true },
  { label: "Campaigns", href: "/dashboard", icon: Megaphone, soon: true },
  { label: "Affiliate Opportunities", href: "/dashboard", icon: Handshake, soon: true },
];

const INSIGHTS_NAV: NavItem[] = [
  { label: "Analytics", href: "/dashboard", icon: BarChart3, soon: true },
  { label: "Earnings", href: "/dashboard", icon: Wallet, soon: true },
];

const ACCOUNT_NAV: NavItem[] = [
  { label: "Profile", href: "/settings", icon: UserCircle },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

function NavSection({ title, items }: { title?: string; items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <div className="space-y-0.5">
      {title && (
        <p className="px-3 mb-1.5 text-[11px] font-semibold tracking-wider text-brand-text-muted">{title}</p>
      )}
      {items.map((item) => {
        const active = !item.soon && pathname === item.href;
        const Icon = item.icon;

        if (item.soon) {
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-brand-text-muted/60 cursor-default"
              title="Coming soon"
            >
              <Icon className="h-4.5 w-4.5" />
              <span className="flex-1">{item.label}</span>
              <span className="text-[10px] rounded-full bg-brand-surface-secondary px-1.5 py-0.5">Soon</span>
            </div>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-primary/10 text-brand-primary"
                : "text-brand-text-secondary hover:bg-brand-surface-secondary hover:text-brand-text-primary"
            }`}
          >
            <Icon className="h-4.5 w-4.5" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-semibold rounded-full bg-brand-accent/10 text-brand-accent px-1.5 py-0.5">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-brand-border bg-brand-surface h-screen sticky top-0">
      <div className="px-5 py-5">
        <AuthLogo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-5 pb-4">
        <NavSection items={MAIN_NAV} />
        <NavSection title="CREATE" items={CREATE_NAV} />
        <NavSection title="CREATOR" items={CREATOR_NAV} />
        <NavSection title="INSIGHTS" items={INSIGHTS_NAV} />
        <NavSection title="ACCOUNT" items={ACCOUNT_NAV} />
      </nav>

      <div className="p-4">
        <div className="brand-gradient rounded-2xl p-4 text-white">
          <p className="font-bold text-sm">Upgrade Your Creator Journey</p>
          <p className="text-xs text-white/85 mt-1 mb-3">
            Unlock advanced analytics, more credits, and exclusive opportunities.
          </p>
          <button
            disabled
            title="Coming soon"
            className="w-full rounded-lg bg-white/15 py-2 text-xs font-semibold cursor-not-allowed"
          >
            Upgrade Soon
          </button>
        </div>
      </div>
    </aside>
  );
}
