"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
  }

  // To determine current effective theme
  const effectiveTheme = theme === "system" 
    ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  return (
    <button
      onClick={() => setTheme(effectiveTheme === "dark" ? "light" : "dark")}
      className="p-2 text-secondary hover:text-primary transition-colors duration-200 flex items-center justify-center rounded-full hover:bg-surface-variant"
      aria-label="Toggle Dark Mode"
    >
      <span className="material-symbols-outlined">
        {effectiveTheme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
