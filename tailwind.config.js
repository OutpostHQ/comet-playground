const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "var(--op-transparent)",
      black: "var(--op-black)",
      white: "var(--op-white)",
      primary: "var(--op-text-primary)",
      secondary: "var(--op-text-secondary)",
    },
    textColor: {
      DEFAULT: "var(--op-text)",
      default: "var(--op-text)",
      strong: "var(--op-text-strong)",
      soft: "var(--op-text-soft)",
      disabled: "var(--op-text-disabled)",
      critical: "var(--op-text-critical)",
      warning: "var(--op-text-warning)",
      success: "var(--op-text-success)",
      primary: "var(--op-text-primary)",
      secondary: "var(--op-text-secondary)",
      "on-primary": "var(--op-text-on-primary)",
      "on-secondary": "var(--op-text-on-secondary)",

      icon: "var(--op-icon)",
      "icon-strong": "var(--op-icon-strong)",
      "icon-soft": "var(--op-icon-soft)",
      "icon-disabled": "var(--op-icon-disabled)",

      "icon-critical": "var(--op-icon-critical)",
      "icon-warning": "var(--op-icon-warning)",
      "icon-success": "var(--op-icon-success)",
      "icon-primary": "var(--op-icon-primary)",
      "icon-secondary": "var(--op-icon-secondary)",

      "icon-on-primary": "var(--op-icon-on-primary)",
      "icon-on-tertiary": "var(--op-icon-on-tertiary)",

      transparent: "var(--op-transparent)",
    },
    backgroundColor: {
      DEFAULT: "var(--op-surface)",
      default: "var(--op-surface)",
      subdued: "var(--op-surface-subdued)",
      hovered: "var(--op-surface-hovered)",
      pressed: "var(--op-surface-pressed)",
      active: "var(--op-surface-active)",
      input: "var(--op-surface-input)",
      disabled: "var(--op-surface-disabled)",

      primary: "var(--op-surface-primary)",
      "primary-subdued": "var(--op-surface-primary-subdued)",
      "primary-hovered": "var(--op-surface-primary-hovered)",
      "primary-pressed": "var(--op-surface-primary-pressed)",
      "primary-active": "var(--op-surface-primary-active)",
      "primary-disabled": "var(--op-surface-primary-disabled)",

      secondary: "var(--op-surface-secondary)",
      "secondary-subdued": "var(--op-surface-secondary-subdued)",
      "secondary-hovered": "var(--op-surface-secondary-hovered)",
      "secondary-pressed": "var(--op-surface-secondary-pressed)",
      "secondary-active": "var(--op-surface-secondary-active)",

      tertiary: "var(--op-surface-tertiary)",
      "tertiary-hovered": "var(--op-surface-tertiary-hovered)",
      "tertiary-pressed": "var(--op-surface-tertiary-pressed)",

      critical: "var(--op-surface-critical)",
      "critical-subdued": "var(--op-surface-critical-subdued)",
      "critical-hovered": "var(--op-surface-critical-hovered)",
      "critical-pressed": "var(--op-surface-critical-pressed)",

      warning: "var(--op-surface-warning)",
      "warning-subdued": "var(--op-surface-warning-subdued)",

      success: "var(--op-surface-success)",
      "success-subdued": "var(--op-surface-success-subdued)",

      transparent: "var(--op-transparent)",
    },
    borderColor: {
      DEFAULT: "var(--op-border)",
      default: "var(--op-border)",
      critical: "var(--op-border-critical)",
      warning: "var(--op-border-warning)",
      success: "var(--op-border-success)",
      primary: "var(--op-border-primary)",
      secondary: "var(--op-border-secondary)",
      tertiary: "var(--op-border-tertiary)",
      focus: "var(--op-border-focus)",
      transparent: "var(--op-transparent)",
      text: "var(--op-text)",
      soft: "var(--op-text-soft)",
    },
    divideColor: {
      DEFAULT: "var(--op-border)",
      default: "var(--op-border)",
      critical: "var(--op-border-critical)",
      warning: "var(--op-border-warning)",
      success: "var(--op-border-success)",
      primary: "var(--op-border-primary)",
      secondary: "var(--op-border-secondary)",
      tertiary: "var(--op-border-tertiary)",
      focus: "var(--op-border-focus)",
      transparent: "var(--op-transparent)",
      text: "var(--op-text)",
      soft: "var(--op-text-soft)",
    },
    ringColor: {
      DEFAULT: "var(--op-border-focus)",
      focus: "var(--op-border-focus)",
      transparent: "var(--op-transparent)",
    },
    outlineColor: {
      DEFAULT: "var(--op-border-focus)",
      focus: "var(--op-border-focus)",
      success: "var(--op-border-success)",
      warning: "var(--op-border-warning)",
      critical: "var(--op-border-critical)",
      primary: "var(--op-border-primary)",
      transparent: "var(--op-transparent)",
    },
    boxShadow: {
      0.25: "var(--op-shadow-025)",
      0.5: "var(--op-shadow-050)",
      0.75: "var(--op-shadow-075)",
      1: "var(--op-shadow-100)",
      2: "var(--op-shadow-200)",
    },
    extend: {
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
          "2xl": "1200px",
        },
      },
    },
  },

  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
}
