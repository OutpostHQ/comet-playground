const {
  COLORS,
  SHADOWS,
  TEXT_SIZE,
  LINE_HEIGHT,
  SCREEN_SIZES,
} = require("./lib/constants/outpost-design.ts")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],

  theme: {
    colors: {
      ...COLORS.GENERIC,
    },
    textColor: {
      ...COLORS.TEXT,
    },
    backgroundColor: {
      ...COLORS.BACKGROUND,
    },
    borderColor: {
      ...COLORS.BORDER,
    },
    divideColor: {
      ...COLORS.DIVIDE,
    },
    ringColor: {
      ...COLORS.RING,
    },
    outlineColor: {
      ...COLORS.OUTLINE,
    },
    boxShadow: {
      ...SHADOWS,
    },
    fontSize: {
      ...TEXT_SIZE,
    },
    lineHeight: {
      ...LINE_HEIGHT,
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      container: {
        center: true,
        screens: {
          ...SCREEN_SIZES,
        },
      },
    },
  },

  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
}
