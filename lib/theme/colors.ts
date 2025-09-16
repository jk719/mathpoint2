export const theme = {
  colors: {
    primary: '#1a3a52',
    primaryDark: '#0f2436',
    accent: '#ff6b35',
    accentLight: '#ff8c5f',
    accentDark: '#e55420',
    success: '#4CAF50',
    error: '#F44336',

    navy: {
      50: '#e8f0f7',
      100: '#d1e1ef',
      200: '#a3c3df',
      300: '#75a5cf',
      400: '#4787bf',
      500: '#1a3a52',
      600: '#152e42',
      700: '#102331',
      800: '#0b1721',
      900: '#060c11',
    },
    orange: {
      50: '#fff4ed',
      100: '#ffe9db',
      200: '#ffd3b7',
      300: '#ffbd93',
      400: '#ffa76f',
      500: '#ff6b35',
      600: '#e55420',
      700: '#cc3d0b',
      800: '#992e08',
      900: '#661f05',
    },
    gray: {
      50: '#f9fafb',
      100: '#f5f5f5',
      200: '#e8e8e8',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  gradients: {
    primary: 'linear-gradient(90deg, #1a3a52 0%, #ff6b35 100%)',
    accent: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5f 100%)',
    navy: 'linear-gradient(to right, #1a3a52, #0f2436)',
    subtle: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
  },

  animations: {
    fadeIn: 'fadeIn 0.5s ease-in',
    slideUp: 'slideUp 0.3s ease-out',
  },
} as const;

export const getGradientClasses = (type: keyof typeof theme.gradients) => {
  switch (type) {
    case 'primary':
      return 'bg-gradient-to-r from-[#1a3a52] to-[#ff6b35]';
    case 'accent':
      return 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c5f]';
    case 'navy':
      return 'bg-gradient-to-r from-[#1a3a52] to-[#0f2436]';
    case 'subtle':
      return 'bg-gradient-to-br from-gray-100 to-gray-200';
    default:
      return '';
  }
};