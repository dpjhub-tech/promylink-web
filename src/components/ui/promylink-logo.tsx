import React from "react";
import Image from "next/image";

interface PromylinkLogoIconProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function PromylinkLogoIcon({
  className = "h-9 w-auto object-contain",
  size,
  width,
  height,
  priority = true,
}: PromylinkLogoIconProps) {
  const finalWidth = width || size || 40;
  const finalHeight = height || size || 40;

  return (
    <Image
      src="/logo.png"
      alt="PromyLink"
      width={finalWidth}
      height={finalHeight}
      priority={priority}
      className={`select-none shrink-0 drop-shadow-sm transition-transform duration-200 ${className}`}
    />
  );
}
