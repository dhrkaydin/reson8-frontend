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
        resonBlue: {  DEFAULT: '#A3D8FF',  50: '#FFFFFF',  100: '#FFFFFF',  200: '#FFFFFF',  300: '#F5FBFF',  400: '#CCE9FF',  500: '#A3D8FF',  600: '#6BC0FF',  700: '#33A8FF',  800: '#0090FA',  900: '#0070C2',  950: '#005FA6'},
        resonYellow: {  DEFAULT: '#FDFFC2',  50: '#FFFFFF',  100: '#FFFFFF',  200: '#FFFFFF',  300: '#FFFFFF',  400: '#FEFFEB',  500: '#FDFFC2',  600: '#FBFF8A',  700: '#F9FF52',  800: '#F7FF1A',  900: '#D9E100',  950: '#BEC500'},
        resonPurple: {  DEFAULT: '#FF76CE',  50: '#FFFFFF',  100: '#FFFFFF',  200: '#FFF0FA',  300: '#FFC8EB',  400: '#FF9FDD',  500: '#FF76CE',  600: '#FF3EBA',  700: '#FF06A6',  800: '#CD0083',  900: '#95005F',  950: '#79004D'},
        resonGreen: {  DEFAULT: '#94FFD8',  50: '#FFFFFF',  100: '#FFFFFF',  200: '#FFFFFF',  300: '#E6FFF6',  400: '#BDFFE7',  500: '#94FFD8',  600: '#5CFFC4',  700: '#24FFAF',  800: '#00EB95',  900: '#00B372',  950: '#009760'},
      },
      fontFamily: {
        handjet: ['Handjet', 'sans-serif'],
        micro5: ['Micro5', 'sans-serif'],
        pixelify: ['PixelifySans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}