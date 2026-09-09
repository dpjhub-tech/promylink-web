"use client";

import { useRef, useState } from "react";
import { UploadCloud, Trash2, Image as ImageIcon } from "lucide-react";

const MAX_SIZE_BYTES = 2 * 1024 * 1024;

function formatSize(bytes: number) {
  return `${Math.round(bytes / 1024)} KB`;
}

export function LogoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (selected: File | null) => {
    if (!selected) return;
    if (selected.size > MAX_SIZE_BYTES) {
      setError("File is larger than 2MB.");
      return;
    }
    setError(null);
    setFile(selected);
  };

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-[10px] border border-brand-border bg-brand-surface p-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
          <ImageIcon className="h-5 w-5 text-brand-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-brand-text-primary truncate">{file.name}</p>
          <p className="text-xs text-brand-text-muted">{formatSize(file.size)}</p>
        </div>
        <button
          type="button"
          onClick={() => setFile(null)}
          className="p-2 rounded-lg text-brand-text-muted hover:bg-brand-surface-secondary hover:text-brand-error transition-colors"
          aria-label="Remove logo"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full flex flex-col items-center justify-center gap-1.5 rounded-[10px] border-2 border-dashed border-brand-border bg-brand-surface py-6 hover:border-brand-primary/40 transition-colors"
      >
        <UploadCloud className="h-5 w-5 text-brand-primary" />
        <span className="text-sm font-semibold text-brand-primary">Upload Logo</span>
        <span className="text-xs text-brand-text-muted">PNG, JPG or SVG (Max 2MB)</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      {error && <p className="mt-1.5 text-xs text-brand-error">{error}</p>}
    </div>
  );
}
