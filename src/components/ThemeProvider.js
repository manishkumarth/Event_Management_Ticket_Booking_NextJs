"use client";
import { useState, useEffect, createContext } from "react";

export const ThemeContext = createContext({ theme: "light", setTheme: () => { } });

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  // On mount, load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Update theme whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}