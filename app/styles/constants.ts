export const UI = {
  colors: {
    primary: {
      50: '#eff6ff',  // blue-50
      100: '#dbeafe', // blue-100
      500: '#3b82f6', // blue-500
      600: '#2563eb', // blue-600
      700: '#1d4ed8', // blue-700
    },
    success: {
      50: '#f0fdf4',  // green-50
      500: '#22c55e', // green-500
      600: '#16a34a', // green-600
      700: '#15803d', // green-700
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  spacing: {
    page: 'max-w-7xl mx-auto px-4',
    section: 'p-6',
    card: 'p-6 rounded-xl shadow-lg',
  },
  text: {
    title: 'text-3xl font-bold text-gray-900',
    subtitle: 'text-lg text-gray-600',
    body: 'text-gray-600',
    label: 'text-sm font-medium text-gray-500',
  },
  buttons: {
    base: 'px-4 py-2 rounded-lg font-medium transition-colors',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    success: 'bg-green-600 text-white hover:bg-green-700',
  },
  animations: {
    fadeIn: 'animate-fade-in',
    slideIn: 'animate-slide-in',
    bounce: 'animate-bounce-slow',
    pulse: 'animate-pulse',
    hover: 'transition-all duration-200 hover:scale-105',
    buttonHover: 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
    cardHover: 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
  },
  effects: {
    glassmorphism: 'backdrop-blur-md bg-white/90',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    cardShadow: 'shadow-lg hover:shadow-xl transition-shadow duration-300',
    smoothBorder: 'border border-gray-200/50',
  }
}; 