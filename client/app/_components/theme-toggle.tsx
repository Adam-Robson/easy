"use client";

import { useThemeProvider } from "@/_contexts/theme-provider";
import { Sun, Sunglasses } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import "@/_styles/theme-toggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeProvider();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`
        toggle-theme
        rounded focus:outline-none
        text-sm p-2 z-50 cursor-pointer
        absolute top-4 right-4
      `}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? <Sun /> : <Sunglasses />}
      </motion.div>
    </button>
  );
}
