// Microsoft OAuth isn't configured in Supabase yet — shown for visual
// completeness (matches the reference design) but inert, same honesty
// pattern as other not-yet-wired features elsewhere in the app.
export function MicrosoftButton() {
  return (
    <button
      type="button"
      disabled
      title="Coming soon"
      className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-[10px] border border-brand-border bg-brand-surface text-sm font-semibold text-brand-text-primary/50 cursor-not-allowed"
    >
      <svg className="h-4.5 w-4.5" viewBox="0 0 23 23">
        <path fill="#F25022" d="M1 1h10v10H1z" />
        <path fill="#7FBA00" d="M12 1h10v10H12z" />
        <path fill="#00A4EF" d="M1 12h10v10H1z" />
        <path fill="#FFB900" d="M12 12h10v10H12z" />
      </svg>
      Continue with Microsoft
    </button>
  );
}
