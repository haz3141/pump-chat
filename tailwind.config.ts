/**
 * File: /tailwind.config.ts
 * Description: Tailwind CSS configuration for Pump.Chat. This file specifies the content
 * paths, extends the default theme with custom colors and other utilities, and lists plugins.
 */

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
