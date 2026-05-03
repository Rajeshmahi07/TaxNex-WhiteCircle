/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 SKY BLUE - New primary light color (replaces white)
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          DEFAULT: '#0ea5e9',
        },
        
        // 🌌 LANDING PAGE - Dark Premium Colors
        landing: {
          bg: '#020617',
          bgGradient: 'linear-gradient(135deg, #020617 0%, #0B1F3A 100%)',
        },
        
        // 🎨 PRIMARY - Blue for Dashboard Actions
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#3b82f6',
        },
        
        // 🟡 GOLD - Landing Page CTA & Highlights
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#f59e0b',
        },
        
        // 🔵 NAVY - Admin Sidebar
        navy: {
          50: '#f0f2f6',
          100: '#e1e5eb',
          200: '#c3cbd7',
          300: '#a4b1c3',
          400: '#8697af',
          500: '#687d9b',
          600: '#4a6387',
          700: '#2c4973',
          800: '#0e2f5f',
          900: '#0f172a',
          DEFAULT: '#0f172a',
        },
        
        // 📝 CLIENT DASHBOARD - Sky Blue Light Colors
        client: {
          bg: '#f0f9ff',      // sky-50
          card: '#e0f2fe',     // sky-100
          cardHover: '#bae6fd', // sky-200
          sidebar: '#f0f9ff',   // sky-50
          border: '#bae6fd',     // sky-200
        },
        
        // 📝 TEXT COLORS
        text: {
          primary: '#0c4a6e',   // sky-900 for headings
          secondary: '#0369a1', // sky-700 for body
          muted: '#7dd3fc',     // sky-300 for subtext
          light: '#FFFFFF',     // White for dark backgrounds
          dark: '#0c4a6e',      // Sky blue dark for light backgrounds
        },
        
        // 🔔 STATUS COLORS
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          DEFAULT: '#16A34A',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          DEFAULT: '#F59E0B',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          DEFAULT: '#DC2626',
        },
        info: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          DEFAULT: '#3B82F6',
        },
      },
      
      // 🌟 SHADOWS
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -2px rgba(0, 0, 0, 0.03), 0 10px 15px -3px rgba(0, 0, 0, 0.03)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.15)',
        'glow-sky': '0 0 20px rgba(14, 165, 233, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      
      // 🎬 ANIMATIONS
      animation: {
        'fade': 'fade 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale': 'scale 0.2s ease-out',
        'float-soft': 'floatSoft 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(59, 130, 246, 0.2)' },
        },
      },
    },
  },
  plugins: [],
}