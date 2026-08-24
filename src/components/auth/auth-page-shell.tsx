import { ReactNode } from "react";
import { AuthLogo } from "./auth-logo";

interface AuthPageShellProps {
  topRight: ReactNode;
  left: ReactNode;
  right: ReactNode;
  footer?: ReactNode;
  // Header, main grid, and footer are three independent sections — each
  // takes its own container width so adjusting one (e.g. widening the grid)
  // never affects the others. All three default to the site-wide .container
  // (1440px) used by /signup; /login overrides them with its own values.
  headerContainerClassName?: string;
  mainContainerClassName?: string;
  gridClassName?: string;
  // Must match whichever breakpoint gridClassName switches to two columns at
  // (e.g. lg: for signup's lg:grid-cols-2, xl: for login's xl:grid-cols-[...]),
  // otherwise the card gets pushed right while still in single-column mode.
  rightWrapperClassName?: string;
}

const DEFAULT_CONTAINER = "container mx-auto";
const DEFAULT_GRID = "grid lg:grid-cols-2 gap-10 items-center";
const DEFAULT_RIGHT_WRAPPER = "flex justify-center lg:justify-end";

// Shared frame for /login and /signup: top bar (logo + contextual link),
// two-column layout (marketing panel + form card), and decorative background
// elements. Page-specific content is passed in via props. Note: the footer
// itself is passed in fully rendered (e.g. <AuthFooter containerClassName=.../>)
// and configures its own width independently — it isn't controlled here.
export function AuthPageShell({
  topRight,
  left,
  right,
  footer,
  headerContainerClassName = DEFAULT_CONTAINER,
  mainContainerClassName = DEFAULT_CONTAINER,
  gridClassName = DEFAULT_GRID,
  rightWrapperClassName = DEFAULT_RIGHT_WRAPPER,
}: AuthPageShellProps) {
  return (
    // -mt-16 cancels out globals.css's `body { padding-top: 4rem }`, which
    // exists to offset content below the site's normal fixed <Header /> —
    // this shell renders its own non-fixed header instead, so that space
    // isn't needed here. Scoped to this shell only; the global rule is
    // untouched since other pages still rely on it.
    <div className="min-h-screen flex flex-col bg-brand-background relative overflow-hidden -mt-16">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl" />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-64 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, var(--brand-border-strong) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <header className={`${headerContainerClassName} relative z-10 flex items-center justify-between py-6`}>
        <AuthLogo />
        <div className="text-sm text-brand-text-secondary">{topRight}</div>
      </header>

      <main className={`${mainContainerClassName} relative z-10 flex-1 ${gridClassName} pb-10`}>
        <div>{left}</div>
        <div className={rightWrapperClassName}>{right}</div>
      </main>

      {footer}
    </div>
  );
}
