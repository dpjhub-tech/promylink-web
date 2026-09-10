"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  Briefcase,
  UserCheck,
  Building,
  Landmark,
  CheckCircle2,
  Info,
  Check,
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
  const [activeInfo, setActiveInfo] = useState<BusinessType | null>(null);

  const selectedItem = BUSINESS_TYPES[value];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-brand-text-primary">
          Business Structure / Legal Entity <span className="text-brand-error">*</span>
        </label>
        <span className="text-xs text-brand-text-muted">
          Select one
        </span>
      </div>

      {/* Compact 2-column on mobile, 3-column on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {typeKeys.map((key) => {
          const item = BUSINESS_TYPES[key];
          const Icon = TYPE_ICONS[key];
          const isSelected = value === key;

          return (
            <div
              key={key}
              onClick={() => onChange(key)}
              className={`relative flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-brand-primary bg-brand-primary/[0.05] ring-2 ring-brand-primary/20 shadow-xs"
                  : "border-brand-border bg-brand-surface hover:border-brand-primary/40 hover:bg-brand-surface-secondary/40"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isSelected
                      ? "bg-brand-primary text-white"
                      : "bg-brand-surface-secondary text-brand-text-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-xs sm:text-sm font-semibold truncate leading-tight ${
                      isSelected ? "text-brand-primary font-bold" : "text-brand-text-primary"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-[11px] text-brand-text-muted truncate mt-0.5">
                    {item.badge}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  title="View details"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveInfo(activeInfo === key ? null : key);
                  }}
                  className={`p-1 rounded-md transition-colors ${
                    activeInfo === key
                      ? "text-brand-primary bg-brand-primary/10"
                      : "text-brand-text-muted hover:text-brand-text-primary hover:bg-brand-surface-secondary"
                  }`}
                  aria-label={`Info for ${item.label}`}
                >
                  <Info className="h-3.5 w-3.5" />
                </button>

                <div
                  className={`h-4 w-4 rounded-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-brand-primary text-white"
                      : "border border-brand-border"
                  }`}
                >
                  {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle Information / Key Proof Banner */}
      <div className="rounded-xl border border-brand-border/80 bg-brand-surface-secondary/60 p-3 flex items-start gap-2.5 text-xs">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary mt-0.5">
          <Info className="h-3 w-3" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-brand-text-primary">
            {activeInfo ? BUSINESS_TYPES[activeInfo].label : selectedItem.label}:
          </span>{" "}
          <span className="text-brand-text-secondary">
            {activeInfo ? BUSINESS_TYPES[activeInfo].description : selectedItem.description}
          </span>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-brand-text-muted">
            <span className="font-medium text-brand-text-secondary">Required Proof:</span>
            <span className="text-brand-primary font-medium">
              {activeInfo ? BUSINESS_TYPES[activeInfo].keyDocName : selectedItem.keyDocName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

