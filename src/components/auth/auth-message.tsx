export function AuthMessage({ type, text }: { type: "error" | "success"; text: string }) {
  const styles =
    type === "error"
      ? "bg-brand-error-bg text-brand-error"
      : "bg-brand-success-bg text-brand-success";

  return <div className={`mb-4 rounded-lg px-3 py-2 text-sm ${styles}`}>{text}</div>;
}
