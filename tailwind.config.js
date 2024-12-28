import { createPreset } from "fumadocs-ui/tailwind-plugin";

const neutral = {
  light: {
    background: "30 100% 96%",
    foreground: "30 100% 3.9%",
    muted: "0 0% 96.1%",
    "muted-foreground": "0 0% 45.1%",
    popover: "0 0% 98%",
    "popover-foreground": "0 0% 15.1%",
    card: "30 100% 94.7%",
    "card-foreground": "30 100% 3.9%",
    border: "0 0% 89.8%",
    primary: "0 0% 9%",
    "primary-foreground": "0 0% 98%",
    secondary: "0 0% 93.1%",
    "secondary-foreground": "0 0% 9%",
    accent: "30 100% 90.1%",
    "accent-foreground": "30 100% 9%",
    ring: "0 0% 63.9%",
  },
  dark: {
    background: "0 0% 8.04%",
    foreground: "0 0% 92%",
    muted: "0 0% 12.9%",
    "muted-foreground": "0 0% 60.9%",
    popover: "0 0% 9.8%",
    "popover-foreground": "0 0% 88%",
    card: "0 0% 9.8%",
    "card-foreground": "0 0% 98%",
    border: "0 0% 14%",
    primary: "0 0% 98%",
    "primary-foreground": "0 0% 9%",
    secondary: "0 0% 12.9%",
    "secondary-foreground": "0 0% 98%",
    accent: "0 0% 16.9%",
    "accent-foreground": "0 0% 90%",
    ring: "0 0% 14.9%",
  },
  css: {
    ".dark #nd-sidebar": {
      "--muted": "0deg 0% 16%",
      "--secondary": "0deg 0% 18%",
      "--muted-foreground": "0 0% 72%",
    },
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.{ts,tsx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  presets: [
    createPreset({
      preset: neutral,
    }),
  ],
};
