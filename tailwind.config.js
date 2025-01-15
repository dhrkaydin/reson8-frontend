/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: "#FFB3BA",
        pastelOrange: "#FFDFBA",
        pastelYellow: "#FFFFBA",
        pastelGreen: "#BAFFC9",
        pastelBlue: "#BAE1FF",
        pastelPurple: "#D4BAFF",
      },
    },
  },
  plugins: [],
}