
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom colors
				"neon-red": "#FF0A54",
				"neon-blue": "#4CC9F0",
				"neon-purple": "#7209B7",
				"dark-bg": "#0F0F0F",
				"card-bg": "#1A1A1A",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-neon': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1) blur(0px)'
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(1.2) blur(3px)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'slide-up': {
					from: { 
						transform: 'translateY(20px)',
						opacity: '0'
					},
					to: { 
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-down': {
					from: { 
						transform: 'translateY(-20px)',
						opacity: '0'
					},
					to: { 
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'scale-in': {
					from: { 
						transform: 'scale(0.95)',
						opacity: '0'
					},
					to: { 
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'loader': {
					'0%': {
						transform: 'scaleY(0.1)',
						background: 'rgba(255, 10, 84, 0.5)'
					},
					'50%': {
						transform: 'scaleY(1)',
						background: 'rgba(255, 10, 84, 1)'
					},
					'100%': {
						transform: 'scaleY(0.1)',
						background: 'rgba(255, 10, 84, 0.5)'
					}
				},
				'logo-shine': {
					'0%': { 
						'background-position': '100% 50%',
						opacity: '0.8'
					},
					'100%': { 
						'background-position': '0% 50%',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-neon': 'pulse-neon 2s infinite ease-in-out',
				'float': 'float 6s ease-in-out infinite',
				'slide-up': 'slide-up 0.6s ease-out',
				'slide-down': 'slide-down 0.6s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'loader': 'loader 1s infinite ease-in-out',
				'logo-shine': 'logo-shine 4s linear infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'neon-glow': 'linear-gradient(90deg, rgba(255, 10, 84, 0) 0%, rgba(255, 10, 84, 0.3) 50%, rgba(255, 10, 84, 0) 100%)',
				'blue-glow': 'linear-gradient(90deg, rgba(76, 201, 240, 0) 0%, rgba(76, 201, 240, 0.3) 50%, rgba(76, 201, 240, 0) 100%)',
				'logo-gradient': 'linear-gradient(90deg, #FF0A54, #4CC9F0, #FF0A54)'
			},
			boxShadow: {
				'neon-red': '0 0 10px 0 rgba(255, 10, 84, 0.5), 0 0 20px 0 rgba(255, 10, 84, 0.3)',
				'neon-blue': '0 0 10px 0 rgba(76, 201, 240, 0.5), 0 0 20px 0 rgba(76, 201, 240, 0.3)',
				'neon-purple': '0 0 10px 0 rgba(114, 9, 183, 0.5), 0 0 20px 0 rgba(114, 9, 183, 0.3)',
			},
			transitionTimingFunction: {
				'bounce-ease': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
