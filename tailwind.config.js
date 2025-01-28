import { createPreset } from "fumadocs-ui/tailwind-plugin";

const neutral = {
  light: {
    background: "0 0% 96%",
    foreground: "0 0% 3.9%",
    muted: "0 0% 96.1%",
    "muted-foreground": "0 0% 45.1%",
    popover: "0 0% 98%",
    "popover-foreground": "0 0% 15.1%",
    card: "0 0% 94.7%",
    "card-foreground": "0 0% 3.9%",
    border: "0 0% 89.8%",
    primary: "0 0% 9%",
    "primary-foreground": "0 0% 98%",
    secondary: "0 0% 93.1%",
    "secondary-foreground": "0 0% 9%",
    accent: "0 0% 90.1%",
    "accent-foreground": "0 0% 9%",
    ring: "0 0% 63.9%",
  },
  dark: {
    background: "0 0% 8.04%",
    foreground: "0 0% 92%",
    muted: "0 0% 12.9%",
    "muted-foreground": "0 0% 60.9%",
    popover: "0 0% 9.8%",
    "popover-foreground": "0 0% 88%",
    card: "0 0% 9.8%",
    "card-foreground": "0 0% 98%",
    border: "0 0% 14%",
    primary: "0 0% 98%",
    "primary-foreground": "0 0% 9%",
    secondary: "0 0% 12.9%",
    "secondary-foreground": "0 0% 98%",
    accent: "0 0% 16.9%",
    "accent-foreground": "0 0% 90%",
    ring: "0 0% 14.9%",
  },
  css: {
    ".dark #nd-sidebar": {
      "--muted": "0deg 0% 16%",
      "--secondary": "0deg 0% 18%",
      "--muted-foreground": "0 0% 72%",
    },
  },
};

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.{ts,tsx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  presets: [
    createPreset({
      preset: "vitepress",
    }),
  ],
    plugins: [require("tailwindcss-animate")],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
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
    			},
    			'color-1': 'hsl(var(--color-1))',
    			'color-2': 'hsl(var(--color-2))',
    			'color-3': 'hsl(var(--color-3))',
    			'color-4': 'hsl(var(--color-4))',
    			'color-5': 'hsl(var(--color-5))'
    		},
    		animation: {
    			rainbow: 'rainbow var(--speed, 2s) infinite linear',
    			'shiny-text': 'shiny-text 8s infinite',
    			meteor: 'meteor 5s linear infinite',
    			marquee: 'marquee var(--duration) infinite linear',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
    			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
    			'background-position-spin': 'background-position-spin 3000ms infinite alternate'
    		},
    		keyframes: {
    			rainbow: {
    				'0%': {
    					'background-position': '0%'
    				},
    				'100%': {
    					'background-position': '200%'
    				}
    			},
    			'shiny-text': {
    				'0%, 90%, 100%': {
    					'background-position': 'calc(-100% - var(--shiny-width)) 0'
    				},
    				'30%, 60%': {
    					'background-position': 'calc(100% + var(--shiny-width)) 0'
    				}
    			},
    			meteor: {
    				'0%': {
    					transform: 'rotate(215deg) translateX(0)',
    					opacity: '1'
    				},
    				'70%': {
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'rotate(215deg) translateX(-500px)',
    					opacity: '0'
    				}
    			},
    			marquee: {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			},
    			'border-beam': {
    				'100%': {
    					'offset-distance': '100%'
    				}
    			},
    			'background-position-spin': {
    				'0%': {
    					backgroundPosition: 'top center'
    				},
    				'100%': {
    					backgroundPosition: 'bottom center'
    				}
    			}
    		}
    	}
    }
};
