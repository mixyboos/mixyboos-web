"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Get current state from DOM since it's already initialized
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = React.useCallback(() => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Show loading state until mounted
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-8" disabled>
        <Icons.sun className="h-4 w-4 opacity-50" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={toggleTheme}
    >
      {isDark ? (
        <Icons.sun className="h-4 w-4" />
      ) : (
        <Icons.moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
