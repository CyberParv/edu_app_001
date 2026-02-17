module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./providers/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#f59e0b",
        background: "#f9fafb",
        surface: "#ffffff",
        error: "#ef4444",
        success: "#22c55e"
      }
    }
  },
  plugins: []
};