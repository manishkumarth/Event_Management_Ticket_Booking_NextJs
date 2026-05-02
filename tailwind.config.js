/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
   themes: [
    "default",
    "retro",
    "cyberpunk",
    "valentine",
    "aqua",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "retro",
    // "cyberpunk",
    // "dracula",
    // "aqua"
  ],
  }
};
