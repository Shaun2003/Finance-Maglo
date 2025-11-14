module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-1": "var(--blue-1)",
        "darkish-colorkey-black": "var(--darkish-colorkey-black)",
        "graygray-1": "var(--graygray-1)",
        "graygray-2": "var(--graygray-2)",
        "graygray-3": "var(--graygray-3)",
        "graygray-4": "var(--graygray-4)",
        "graygray-5": "var(--graygray-5)",
        "green-2": "var(--green-2)",
        "primary-color": "var(--primary-color)",
        red: "var(--red)",
        "secondary-color": "var(--secondary-color)",
        "text-colorpure-white": "var(--text-colorpure-white)",
        "text-colortext-1": "var(--text-colortext-1)",
        "text-colortext-2": "var(--text-colortext-2)",
        "text-colortext-3": "var(--text-colortext-3)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "extra-font-size-13-regular":
          "var(--extra-font-size-13-regular-font-family)",
        "extra-font-size-18-semibold":
          "var(--extra-font-size-18-semibold-font-family)",
        "size-12-size-12-medium": "var(--size-12-size-12-medium-font-family)",
        "size-12-size-12-regular": "var(--size-12-size-12-regular-font-family)",
        "size-12-size-12-semibold":
          "var(--size-12-size-12-semibold-font-family)",
        "size-14-size-14-medium": "var(--size-14-size-14-medium-font-family)",
        "size-14-size-14-regular": "var(--size-14-size-14-regular-font-family)",
        "size-14-size-14-semibold":
          "var(--size-14-size-14-semibold-font-family)",
        "size-16-size-16-regular": "var(--size-16-size-16-regular-font-family)",
        "size-16-size-16-semibold":
          "var(--size-16-size-16-semibold-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
