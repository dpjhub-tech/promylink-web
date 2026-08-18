"use client";

import { useState, useEffect } from "react";

interface LocationInfo {
  isIndia: boolean;
  country: string;
  state: string;
  city: string;
  loading: boolean;
  lat: number | null;
  lon: number | null;
}

async function reverseGeocode(lat: number, lon: number): Promise<{ country: string; countryCode: string; state: string; city: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`,
      { headers: { "User-Agent": "Promylink/1.0" } },
    );
    const data = await res.json();
    return {
      country: data.address?.country || "",
      countryCode: data.address?.country_code?.toUpperCase() || "",
      state: data.address?.state || "",
      city: data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || "",
    };
  } catch {
    return { country: "", countryCode: "", state: "", city: "" };
  }
}

async function ipFallback(): Promise<{ country: string; countryCode: string; state: string; city: string }> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      country: data.country_name ?? "",
      countryCode: data.country_code ?? "",
      state: data.region ?? "",
      city: data.city ?? "",
    };
  } catch {
    return { country: "Unknown", countryCode: "", state: "", city: "" };
  }
}

export function useUserLocation(): LocationInfo {
  const [info, setInfo] = useState<LocationInfo>({
    isIndia: false, country: "", state: "", city: "", loading: true, lat: null, lon: null,
  });

  useEffect(() => {
    let cancelled = false;

    const resolve = (geo: { country: string; countryCode: string; state: string; city: string }, lat: number | null = null, lon: number | null = null) => {
      if (!cancelled) {
        setInfo({
          isIndia: geo.countryCode === "IN",
          country: geo.country || "Unknown",
          state: geo.state || "",
          city: geo.city || "",
          loading: false,
          lat,
          lon,
        });
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const geo = await reverseGeocode(lat, lon);
          if (geo.countryCode) {
            resolve(geo, lat, lon);
          } else {
            const ip = await ipFallback();
            resolve(ip, lat, lon);
          }
        },
        async () => {
          const ip = await ipFallback();
          resolve(ip);
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
      );
    } else {
      ipFallback().then((geo) => resolve(geo));
    }

    return () => { cancelled = true; };
  }, []);

  return info;
}

export function usePostPrice() {
  const location = useUserLocation();
  const isIndia = location.isIndia;
  return {
    ...location,
    postFee: isIndia ? 59 : 1,
    creditCost: 0,
    currency: isIndia ? "INR" : "USD",
    symbol: isIndia ? "₹" : "$",
    pricePerCredit: isIndia ? 20 : 0.2,
    creditRateLabel: isIndia ? "1 credit = ₹20" : "5 credits = $1",
  };
}
