
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				neon: {
					green: '#39FF14',
					pink: '#FF10F0',
					blue: '#00FFFF',
					yellow: '#FFFF00',
					orange: '#FF6600',
				}
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
				'fly-left-to-right': {
					'0%': { transform: 'translateX(-100vw) translateY(var(--y-pos, 50vh)) rotate(var(--rotation, 0deg))', opacity: '1' },
					'100%': { transform: 'translateX(100vw) translateY(var(--y-pos, 50vh)) rotate(var(--rotation, 0deg))', opacity: '1' }
				},
				'fly-right-to-left': {
					'0%': { transform: 'translateX(100vw) translateY(var(--y-pos, 50vh)) rotate(var(--rotation, 0deg))', opacity: '1' },
					'100%': { transform: 'translateX(-100vw) translateY(var(--y-pos, 50vh)) rotate(var(--rotation, 0deg))', opacity: '1' }
				},
				'rotate-toilet': {
					'0%': { transform: 'rotate(0deg) scale(0.5)' },
					'25%': { transform: 'rotate(-15deg) scale(0.8)' },
					'50%': { transform: 'rotate(0deg) scale(1)' },
					'75%': { transform: 'rotate(15deg) scale(0.8)' },
					'100%': { transform: 'rotate(0deg) scale(0.5)' }
				},
				'windows-popup-in': {
					'0%': { transform: 'scale(0.5)', opacity: '0' },
					'80%': { transform: 'scale(1.1)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-border': {
					'0%': { boxShadow: '0 0 0 0 rgba(255, 102, 0, 0.7)' },
					'70%': { boxShadow: '0 0 0 10px rgba(255, 102, 0, 0)' },
					'100%': { boxShadow: '0 0 0 0 rgba(255, 102, 0, 0)' }
				},
				'vibrate': {
					'0%, 100%': { transform: 'translateX(0)' },
					'20%': { transform: 'translateX(-2px)' },
					'40%': { transform: 'translateX(2px)' },
					'60%': { transform: 'translateX(-2px)' },
					'80%': { transform: 'translateX(2px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fly-left-to-right': 'fly-left-to-right 10s linear forwards',
				'fly-right-to-left': 'fly-right-to-left 10s linear forwards',
				'rotate-toilet': 'rotate-toilet 2s ease-in-out',
				'windows-popup-in': 'windows-popup-in 0.4s ease-out forwards',
				'pulse-border': 'pulse-border 1.5s infinite',
				'vibrate': 'vibrate 0.3s linear infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
