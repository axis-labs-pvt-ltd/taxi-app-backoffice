import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubdomain = (): string | null => {
  const host = window.location.hostname;
  const parts = host.split(".");

  // localhost-based domains like: axislabs.localhost
  if (host.endsWith("localhost") && parts.length === 2) {
    return parts[0]; // ✅ "axislabs"
  }

  // e.g., axislabs.main.amplifyapp.com (>=4 parts expected)
  if (parts.length >= 2) {
    return parts[0];
  }

  return null;
};
