"use client";

import { ChevronDown } from "lucide-react";

export interface CountryInfo {
  flag: string;
  code: string;
  iso: string;
  name: string;
  digits: number;
  placeholder: string;
}

export const COUNTRY_CODES: CountryInfo[] = [
  { flag: "🇮🇳", code: "+91", iso: "IN", name: "India", digits: 10, placeholder: "10-digit mobile number" },
  { flag: "🇺🇸", code: "+1", iso: "US", name: "United States", digits: 10, placeholder: "10-digit phone number" },
  { flag: "🇬🇧", code: "+44", iso: "GB", name: "United Kingdom", digits: 10, placeholder: "10-digit phone number" },
  { flag: "🇦🇪", code: "+971", iso: "AE", name: "UAE", digits: 9, placeholder: "9-digit mobile number" },
  { flag: "🇦🇺", code: "+61", iso: "AU", name: "Australia", digits: 9, placeholder: "9-digit mobile number" },
  { flag: "🇸🇬", code: "+65", iso: "SG", name: "Singapore", digits: 8, placeholder: "8-digit mobile number" },
  { flag: "🇩🇪", code: "+49", iso: "DE", name: "Germany", digits: 11, placeholder: "10-11 digit phone number" },
  { flag: "🇨🇦", code: "+1", iso: "CA", name: "Canada", digits: 10, placeholder: "10-digit phone number" },
];

interface PhoneInputProps {
  label?: string;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
}

export function PhoneInput({
  label = "Phone Number",
  countryCode,
  onCountryCodeChange,
  value,
  onChange,
  onBlur,
  error,
  hint,
  disabled,
}: PhoneInputProps) {
  const activeCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept numeric digits
    const digitsOnly = e.target.value.replace(/\D/g, "");
    // Limit to country maximum digits
    const maxDigits = activeCountry.digits;
    onChange(digitsOnly.slice(0, maxDigits));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-medium text-brand-text-primary">
          {label}
        </label>
        <span className="text-[11px] text-brand-text-muted">
          {activeCountry.name} ({activeCountry.digits} digits)
        </span>
      </div>
      <div
        className={`flex rounded-[10px] border bg-brand-surface transition-colors ${
          error
            ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500"
            : "border-brand-border focus-within:ring-2 focus-within:ring-brand-primary/30 focus-within:border-brand-primary"
        }`}
      >
        <div className="relative flex items-center">
          <select
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            disabled={disabled}
            className="appearance-none h-12 pl-3 pr-7 bg-transparent text-sm text-brand-text-primary focus:outline-none cursor-pointer"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={`${c.iso}-${c.code}`} value={c.code}>
                {c.flag} {c.code} ({c.name})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-muted pointer-events-none" />
        </div>
        <div className="w-px bg-brand-border my-2.5" />
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          placeholder={activeCountry.placeholder}
          maxLength={activeCountry.digits}
          disabled={disabled}
          className="flex-1 h-12 rounded-r-[10px] bg-transparent pl-3 pr-4 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none"
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-brand-text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
