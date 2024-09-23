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
        pody: {
          dark: '#07070A',
          primary: '#96EA63',
          gray: '#A6A7AD',
          border: '#212429',
        }
      },
      fontFamily: {
        podyfont: ['var(--font-manrope)']
      }
    },
  },
  plugins: [],
};
export default config;
