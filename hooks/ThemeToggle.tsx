import React, { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Initialize theme on mount
  useEffect(() => {
    // Get saved theme or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    // Set theme in state and on body
    setTheme(initialTheme);
    document.body.setAttribute("data-theme", initialTheme);
  }, []);

  // Sync theme changes to body and localStorage
  useEffect(() => {
    if (theme) {
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Avoid rendering until theme is initialized to prevent hydration mismatch
  if (!theme) return null;

  return (
    <button
      id="theme-toggle"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`p-2 ${theme === "light" ? "bg-black text-white":"bg-white text-black"} hover:bg-primary hover:text-white transition-colors duration-200 rounded-full cursor-pointer`}
    >
      <FiSun className={`${theme === "light" ? "hidden" : ""}`} />
      <FiMoon className={`${theme === "dark" ? "hidden" : ""}`} />
    </button>
  );
};

export default ThemeToggle;
