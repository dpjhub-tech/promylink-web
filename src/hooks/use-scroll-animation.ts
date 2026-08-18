"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
  startVisible = false,
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(startVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const raf = requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        },
        { threshold, rootMargin: "50px" },
      );
      observer.observe(el);
      (el as unknown as { __scrollObserver?: IntersectionObserver }).__scrollObserver = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      const obs = (el as unknown as { __scrollObserver?: IntersectionObserver }).__scrollObserver;
      obs?.disconnect();
    };
  }, [threshold, isVisible]);

  return { ref, isVisible };
}
