"use client";

import {
  Building2,
  Users,
  Briefcase,
  UserCheck,
  Building,
  Landmark,
  CheckCircle2,
} from "lucide-react";
import {
  BusinessType,
  BUSINESS_TYPES,
} from "@/contexts/organization-signup-context";

interface BusinessTypeSelectorProps {
  value: BusinessType;
  onChange: (type: BusinessType) => void;
}

const TYPE_ICONS: Record<BusinessType, React.ElementType> = {
  sole_proprietorship: UserCheck,
  partnership_firm: Users,
  llp: Briefcase,
  opc: Building,
  pvt_ltd: Building2,
  ltd: Landmark,
};

export function BusinessTypeSelector({
  value,
  onChange,
}: BusinessTypeSelectorProps) {
  const typeKeys = Object.keys(BUSINESS_TYPES) as BusinessType[];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-brand-text-primary">
          Business Structure / Entity Type <span className="text-brand-error">*</span>
        </label>
        <span className="text-xs text-brand-text-muted">
          Determines required KYC documents
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {typeKeys.map((key) => {
          const item = BUSINESS_TYPES[key];
          const Icon = TYPE_ICONS[key];
          const isSelected = value === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-brand-primary bg-brand-primary/[0.04] ring-2 ring-brand-primary/20 shadow-xs"
                  : "border-brand-border bg-brand-surface hover:border-brand-primary/40 hover:bg-brand-surface-secondary/40"
              }`}
            >
              {/* Top Row: Icon + Badge + Check */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isSelected
                      ? "bg-brand-primary text-white"
                      : "bg-brand-surface-secondary text-brand-text-secondary"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                      isSelected
                        ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                        : "bg-brand-surface-secondary text-brand-text-muted border-brand-border/60"
                    }`}
                  >
                    {item.badge}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <p
                  className={`text-sm font-bold leading-tight ${
                    isSelected ? "text-brand-primary" : "text-brand-text-primary"
                  }`}
                >
                  {item.label}
                </p>
                <p className="text-xs text-brand-text-muted mt-1 leading-snug line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Doc Hint */}
              <div className="mt-3 pt-2.5 border-t border-brand-border/60 text-[11px] text-brand-text-secondary flex items-center justify-between">
                <span className="text-brand-text-muted">Key Proof:</span>
                <span className="font-medium truncate max-w-[170px]" title={item.keyDocName}>
                  {item.keyDocName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
