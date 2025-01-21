import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        "fluid-h1": "clamp(2.5rem, 2.7vw + 1.25rem, 5rem)",
      },
      margin: {
        fluid: "clamp(2.5rem, 10vw, 5rem)",
      },
      height: {
        fluid: "clamp(2.5rem, 10vw, 5rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;
