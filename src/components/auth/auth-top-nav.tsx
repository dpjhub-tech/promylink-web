import Link from "next/link";

interface AuthTopNavProps {
  question: string;
  linkText: string;
  linkHref: string;
  // "button": bordered pill (sign-in's "Create account"). "link": plain
  // underline-on-hover text (signup's "Sign in") — matches each page's
  // original mockup, not a mistake to unify.
  variant?: "button" | "link";
}

export function AuthTopNav({ question, linkText, linkHref, variant = "link" }: AuthTopNavProps) {
  return (
    <>
      <span className="hidden sm:inline">{question} </span>
      <Link
        href={linkHref}
        className={
          variant === "button"
            ? "sm:ml-1 rounded-lg border border-brand-primary px-3 py-1.5 font-semibold text-brand-primary hover:bg-brand-primary/5 transition-colors whitespace-nowrap"
            : "font-semibold text-brand-primary hover:underline whitespace-nowrap"
        }
      >
        {linkText}
      </Link>
    </>
  );
}
