/* eslint-disable @typescript-eslint/no-require-imports */
import { clsx, type ClassValue } from "clsx"

// Fallback implementation if tailwind-merge is not available
function simpleMerge(classNames: string): string {
  // Basic deduplication - removes duplicate classes
  const classes = classNames.split(" ").filter(Boolean)
  const uniqueClasses = [...new Set(classes)]
  return uniqueClasses.join(" ")
}

export function cn(...inputs: ClassValue[]) {
  const merged = clsx(inputs)

  // Try to use twMerge if available, otherwise use simple merge
  try {
    const { twMerge } = require("tailwind-merge")
    return twMerge(merged)
  } catch {
    // Fallback to simple deduplication if tailwind-merge is not available
    return simpleMerge(merged)
  }
}
