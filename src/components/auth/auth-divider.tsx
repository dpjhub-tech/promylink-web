export function AuthDivider() {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-brand-border" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-brand-surface px-3 text-brand-text-muted">OR</span>
      </div>
    </div>
  );
}
