import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#DBB58F",
        "secondary-color": "#B08566",
        "light-color": "#F3DEBC",
        "accent-color": "#E74040",
        "text-gray": "#737373",
      },
      fontFamily: {
        dancing: ["var(--font-dancing)"],
        montserrat: ["var(--font-montserrat)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // Plugin for RTL support
    function({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
          textAlign: 'right',
        },
        '.ltr': {
          direction: 'ltr',
          textAlign: 'left',
        },
        // Logical properties for RTL support
        '.ms-auto': {
          'margin-inline-start': 'auto',
        },
        '.me-auto': {
          'margin-inline-end': 'auto',
        },
        '.ps-1': {
          'padding-inline-start': '0.25rem',
        },
        '.ps-2': {
          'padding-inline-start': '0.5rem',
        },
        '.ps-3': {
          'padding-inline-start': '0.75rem',
        },
        '.ps-4': {
          'padding-inline-start': '1rem',
        },
        '.pe-1': {
          'padding-inline-end': '0.25rem',
        },
        '.pe-2': {
          'padding-inline-end': '0.5rem',
        },
        '.pe-3': {
          'padding-inline-end': '0.75rem',
        },
        '.pe-4': {
          'padding-inline-end': '1rem',
        },
        '.start-0': {
          'inset-inline-start': '0',
        },
        '.end-0': {
          'inset-inline-end': '0',
        },
        '.start-auto': {
          'inset-inline-start': 'auto',
        },
        '.end-auto': {
          'inset-inline-end': 'auto',
        },
        '.border-s': {
          'border-inline-start-width': '1px',
        },
        '.border-e': {
          'border-inline-end-width': '1px',
        },
        '.rounded-s': {
          'border-start-start-radius': '0.25rem',
          'border-end-start-radius': '0.25rem',
        },
        '.rounded-e': {
          'border-start-end-radius': '0.25rem',
          'border-end-end-radius': '0.25rem',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;