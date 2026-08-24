import { ReactNode } from "react";
import { BackButton } from "./back-button";

const DEFAULT_CLASSNAME = "w-full max-w-[460px] rounded-3xl shadow-xl shadow-slate-900/5 p-8 md:p-10";

export function AuthCard({ children, className = DEFAULT_CLASSNAME }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-brand-surface ${className}`}>
      <BackButton />
      <div className="mt-6">{children}</div>
    </div>
  );
}
