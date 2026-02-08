/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: {
           DEFAULT: "#0f4c81", // Proper Scooboo Blue
           foreground: "#ffffff",
        },
        secondary: {
           DEFAULT: "#f3f4f6",
           foreground: "#1f2937",
        },
        accent: {
           DEFAULT: "#f59e0b", // Scooboo Orange/Yellow
           foreground: "#ffffff",
        },
        muted: {
           DEFAULT: "var(--muted)",
           foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        sans: ['var(--font-outfit)'],
      }
    },
  },
  plugins: [],
};
