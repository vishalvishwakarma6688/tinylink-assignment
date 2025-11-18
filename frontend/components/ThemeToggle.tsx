"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-lg border flex items-center justify-center
                 bg-gray-200 dark:bg-gray-700 dark:border-gray-600"
    >
      {theme === "light" ? (
        <FiMoon size={20} className="text-gray-800" />
      ) : (
        <FiSun size={20} className="text-yellow-300" />
      )}
    </button>
  );
}
