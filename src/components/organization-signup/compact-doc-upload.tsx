"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  Check,
  X,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { UploadedDocInfo } from "@/contexts/organization-signup-context";

interface CompactDocUploadProps {
  label: string;
  sublabel?: string;
  isMandatory?: boolean;
  uploadedDoc?: UploadedDocInfo;
  onFileSelect: (info: UploadedDocInfo) => void;
  onFileRemove: () => void;
  acceptedFormats?: string;
  maxSizeMB?: number;
  error?: string;
}

export function CompactDocUpload({
  label,
  sublabel,
  isMandatory = true,
  uploadedDoc,
  onFileSelect,
  onFileRemove,
  acceptedFormats = ".pdf,.jpg,.jpeg,.png",
  maxSizeMB = 10,
  error,
}: CompactDocUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds maximum limit of ${maxSizeMB}MB`);
      return;
    }

    const sizeStr =
      file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    const fileInfo: UploadedDocInfo = {
      fileName: file.name,
      fileSize: sizeStr,
      uploadedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onFileSelect(fileInfo);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const hasUploaded = Boolean(uploadedDoc?.fileName);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <label className="text-xs sm:text-sm font-semibold text-brand-text-primary">
            {label}
          </label>
          {isMandatory ? (
            <span className="text-[11px] font-semibold text-brand-error">*</span>
          ) : (
            <span className="text-[10px] font-medium text-brand-text-muted bg-brand-surface-secondary px-1.5 py-0.5 rounded">
              Optional
            </span>
          )}
        </div>

        {sublabel && (
          <span className="text-[11px] text-brand-text-muted truncate max-w-[200px]">
            {sublabel}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileChange}
        className="hidden"
      />

      {hasUploaded ? (
        <div className="flex items-center justify-between rounded-xl border border-brand-success/40 bg-brand-success/[0.04] p-3 transition-all">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-success/15 text-brand-success">
              <FileCheck className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-brand-text-primary truncate">
                {uploadedDoc?.fileName}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-brand-text-muted mt-0.5">
                <span>{uploadedDoc?.fileSize}</span>
                <span>•</span>
                <span className="text-brand-success font-medium flex items-center gap-1">
                  <Check className="h-3 w-3" /> Ready
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs font-semibold text-brand-primary hover:text-brand-primary-dark px-2.5 py-1 rounded-md hover:bg-brand-primary/5 transition-colors cursor-pointer"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={onFileRemove}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-brand-text-muted hover:bg-brand-surface-secondary hover:text-brand-error transition-colors cursor-pointer"
              title="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex items-center justify-between rounded-xl border border-dashed p-3 sm:p-3.5 transition-all cursor-pointer ${
            isDragging
              ? "border-brand-primary bg-brand-primary/[0.06] scale-[1.005]"
              : error
                ? "border-brand-error/50 bg-brand-error/[0.02] hover:border-brand-error"
                : "border-brand-border bg-brand-surface hover:border-brand-primary/50 hover:bg-brand-surface-secondary/40"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                error
                  ? "bg-brand-error/10 text-brand-error"
                  : "bg-brand-primary/10 text-brand-primary"
              }`}
            >
              <UploadCloud className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-brand-text-primary">
                Click or drag & drop document
              </p>
              <p className="text-[11px] text-brand-text-muted mt-0.5">
                PDF, JPG, PNG (Max {maxSizeMB}MB)
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/15 px-3 py-1.5 rounded-lg shrink-0 transition-colors">
            Upload
          </span>
        </div>
      )}

      {error && (
        <p className="flex items-center gap-1 text-xs text-brand-error font-medium mt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
