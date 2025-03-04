import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: 'class',
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		screens: {
			'xs': '350px',
			'__pdsm': '500px',
		},
  		colors: {
  			pody: {
  				dark: '#07070A',
  				dark_secondary: '#0D0E14',
  				primary: '#FFBE6A',
				secondary: '#3F3B60',
  				gray: '#A6A7AD',
  				border: '#CFD3DA',
  				danger: '#F1414F',
				success: '#2AD38D',
				oilblack: '#0C0C0C',
				oxfordblue: '#212A37',
				gunmetal: '#1D1F21',
				mintgreen: '#E9EADB',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			podyfont: ['var(--font-manrope)']
  		},
		background: {
			'pd-bg-gradient': 'linear-gradient(0deg, rgba(105, 145, 214, 0.08), rgb(248 250 253)), #fff',
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
