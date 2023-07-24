const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      // Background Colors
      surface: {
        default: "var(--cp-surface)",
        subdued: "var(--cp-surface-subdued)",
        hovered: "var(--cp-surface-hovered)",
        pressed: "var(--cp-surface-pressed)",
        active: "var(--cp-surface-active)",
        input: "var(--cp-surface-input)",
        disabled: "var(--cp-surface-disabled)",

        primary: "var(--cp-surface-primary)",
        "primary-subdued": "var(--cp-surface-primary-subdued)",
        "primary-hovered": "var(--cp-surface-primary-hovered)",
        "primary-pressed": "var(--cp-surface-primary-pressed)",
        "primary-active": "var(--cp-surface-primary-active)",
        "primary-disabled": "var(--cp-surface-primary-disabled)",

        secondary: "var(--cp-surface-secondary)",
        "secondary-subdued": "var(--cp-surface-secondary-subdued)",
        "secondary-hovered": "var(--cp-surface-secondary-hovered)",
        "secondary-pressed": "var(--cp-surface-secondary-pressed)",
        "secondary-active": "var(--cp-surface-secondary-active)",

        tertiary: "var(--cp-surface-tertiary)",
        "tertiary-hovered": "var(--cp-surface-tertiary-hovered)",
        "tertiary-pressed": "var(--cp-surface-tertiary-pressed)",

        critical: "var(--cp-surface-critical)",
        "critical-subdued": "var(--cp-surface-critical-subdued)",
        "critical-hovered": "var(--cp-surface-critical-hovered)",
        "critical-pressed": "var(--cp-surface-critical-pressed)",

        warning: "var(--cp-surface-warning)",
        "warning-subdued": "var(--cp-surface-warning-subdued)",

        success: "var(--cp-surface-success)",
        "success-subdued": "var(--cp-surface-success-subdued)",
      },
      // Text Colors
      foreground: {
        default: "var(--cp-text)",
        strong: "var(--cp-text-strong)",
        soft: "var(--cp-text-soft)",
        disabled: "var(--cp-text-disabled)",
        critical: "var(--cp-text-critical)",
        warning: "var(--cp-text-warning)",
        success: "var(--cp-text-success)",
        primary: "var(--cp-text-primary)",
        secondary: "var(--cp-text-secondary)",
        "on-primary": "var(--cp-text-on-primary)",
        "on-tertiary": "var(--cp-text-on-tertiary)",
      },
      // Icon Colors
      icon: {
        default: "var(--cp-icon)",
        strong: "var(--cp-icon-strong)",
        soft: "var(--cp-icon-soft)",
        disabled: "var(--cp-icon-disabled)",
        critical: "var(--cp-icon-critical)",
        warning: "var(--cp-icon-warning)",
        success: "var(--cp-icon-success)",
        primary: "var(--cp-icon-primary)",
        secondary: "var(--cp-icon-secondary)",
        "on-primary": "var(--cp-icon-on-primary)",
        "on-tertiary": "var(--cp-icon-on-tertiary)",
      },
      // Border Colors
      border: {
        default: "var(--cp-border)",
        critical: "var(--cp-border-critical)",
        warning: "var(--cp-border-warning)",
        success: "var(--cp-border-success)",
        primary: "var(--cp-border-primary)",
        secondary: "var(--cp-border-secondary)",
        tertiary: "var(--cp-border-tertiary)",
      },
      white: "var(--cp-white)",
      black: "var(--cp-black)",
      transparent: "var(--cp-transparent)",
    },
    container: {
      center: true,
      screens: {
        "2xl": "1200px",
      },
    },
    boxShadow: {
      0.25: "var(--cp-shadow-025)",
      0.5: "var(--cp-shadow-050)",
      0.75: "var(--cp-shadow-075)",
      1: "var(--cp-shadow-100)",
      2: "var(--cp-shadow-200)",
    },
    extend: {
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
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

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
}
