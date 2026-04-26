"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <div>
        <select
          className="select select-bordered fs-sm"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="cupcake">Cupcake</option>
          <option value="bumblebee">Bumblebee</option>
          <option value="dracula">dracula</option>
          <option value="emerald">emerald</option>
          <option value="retro">retro</option>
        </select>
      </div>
    </>
  );
}