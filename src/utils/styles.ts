import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Passthrough — kept for future extensibility
export function proxyImageUrl(url: string): string {
  return url;
}
