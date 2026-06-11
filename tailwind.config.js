/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsl(var(${variableName}) / ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
  			headings: ['Poppins', 'sans-serif']
  		},
  		fontSize: {
  			'display-xl': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
  			'display-l': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
  			'heading-1': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
  			'heading-2': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
  			'heading-3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
  			'body-large': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
  			'body-medium': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
  			'caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }]
  		},
  		colors: {
  			border: withOpacity('--border'),
  			input: withOpacity('--input'),
  			ring: withOpacity('--ring'),
  			background: withOpacity('--background'),
  			foreground: withOpacity('--foreground'),
  			primary: {
  				DEFAULT: withOpacity('--primary'),
  				foreground: withOpacity('--primary-foreground'),
  				light: withOpacity('--primary-light'),
  				soft: withOpacity('--primary-soft')
  			},
  			secondary: {
  				DEFAULT: withOpacity('--secondary'),
  				foreground: withOpacity('--secondary-foreground')
  			},
  			destructive: {
  				DEFAULT: withOpacity('--destructive'),
  				foreground: withOpacity('--destructive-foreground')
  			},
  			muted: {
  				DEFAULT: withOpacity('--muted'),
  				foreground: withOpacity('--muted-foreground')
  			},
  			accent: {
  				DEFAULT: withOpacity('--accent'),
  				foreground: withOpacity('--accent-foreground'),
  				blue: withOpacity('--accent-blue'),
  				purple: withOpacity('--accent-purple')
  			},
  			popover: {
  				DEFAULT: withOpacity('--popover'),
  				foreground: withOpacity('--popover-foreground')
  			},
  			card: {
  				DEFAULT: withOpacity('--card'),
  				foreground: withOpacity('--card-foreground')
  			},
  			success: withOpacity('--success'),
  			warning: withOpacity('--warning'),
  			danger: withOpacity('--danger'),
  			'dark-green': withOpacity('--dark-green'),
  			status: {
  				available: withOpacity('--status-available'),
  				held: withOpacity('--status-held'),
  				reserved: withOpacity('--status-reserved'),
  				blocked: withOpacity('--status-blocked'),
  				sold: withOpacity('--status-sold')
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			card: 'var(--radius-card)',
  			'project-card': 'var(--radius-project-card)',
  			'hero-card': 'var(--radius-hero-card)',
  			'bottom-sheet': 'var(--radius-bottom-sheet)',
  			button: 'var(--radius-button)',
  			input: 'var(--radius-input)',
  			modal: 'var(--radius-modal)'
  		},
  		boxShadow: {
  			xs: '0 2px 4px rgba(0, 0, 0, 0.02)',
  			sm: '0 4px 12px rgba(0, 0, 0, 0.03)',
  			md: '0 8px 24px rgba(0, 0, 0, 0.04)',
  			lg: '0 12px 32px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.02)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-5px)'
  				}
  			},
  			'pulse-soft': {
  				'0%, 100%': {
  					opacity: 1
  				},
  				'50%': {
  					opacity: 0.8
  				}
  			},
  			'slide-up-fade': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			float: 'float 4s ease-in-out infinite',
  			'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
