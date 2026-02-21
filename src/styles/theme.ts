import { createTheme } from '@mui/material/styles';

// Liquid Glass Design System Tokens
export const liquidGlassTokens = {
  // Canvas Colors
  canvas: {
    base: '#0A0A0F',
    elevated: '#12121A',
    deep: '#050508',
  },
  
  // Glass Properties
  glass: {
    fill: 'rgba(255, 255, 255, 0.06)',
    fillHover: 'rgba(255, 255, 255, 0.08)',
    fillActive: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.12)',
    borderFocus: 'rgba(0, 245, 255, 0.3)',
    blur: '16px',
    blurHover: '20px',
    blurFocus: '24px',
  },
  
  // Neon Accent Colors
  neon: {
    cyan: '#00F5FF',      // Archive/Data
    magenta: '#FF00E5',   // Active/Alert
    amber: '#FFB800',     // Rewards/Achievement
    success: '#00FF88',
    warning: '#FFB800',
    error: '#FF3366',
  },
  
  // Glow Properties
  glow: {
    radiusSm: '12px',
    radiusMd: '24px',
    radiusLg: '40px',
    opacity: 0.3,
    opacityHover: 0.2,
    opacityFocus: 0.4,
  },
  
  // Text Opacity
  text: {
    primary: 1,
    secondary: 0.7,
    tertiary: 0.4,
  },
  
  // Motion
  motion: {
    enter: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    exit: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    durationFast: '200ms',
    durationNormal: '300ms',
    durationSlow: '400ms',
  },
  
  // Spacing (8px base)
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },
  
  // Border Radius
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
};

// Glow effect generators
export const glowEffects = {
  cyan: (intensity: number = 0.3) => `0 0 ${liquidGlassTokens.glow.radiusMd} rgba(0, 245, 255, ${intensity})`,
  magenta: (intensity: number = 0.3) => `0 0 ${liquidGlassTokens.glow.radiusMd} rgba(255, 0, 229, ${intensity})`,
  amber: (intensity: number = 0.3) => `0 0 ${liquidGlassTokens.glow.radiusMd} rgba(255, 184, 0, ${intensity})`,
  success: (intensity: number = 0.3) => `0 0 ${liquidGlassTokens.glow.radiusMd} rgba(0, 255, 136, ${intensity})`,
  error: (intensity: number = 0.3) => `0 0 ${liquidGlassTokens.glow.radiusMd} rgba(255, 51, 102, ${intensity})`,
};

// Glass surface styles generator
export const glassStyles = {
  base: {
    background: liquidGlassTokens.glass.fill,
    backdropFilter: `blur(${liquidGlassTokens.glass.blur}) saturate(180%)`,
    WebkitBackdropFilter: `blur(${liquidGlassTokens.glass.blur}) saturate(180%)`,
    border: `1px solid ${liquidGlassTokens.glass.border}`,
    boxShadow: `
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.5),
      0 8px 32px rgba(0, 0, 0, 0.4)
    `,
  },
  hover: {
    background: liquidGlassTokens.glass.fillHover,
    boxShadow: `
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.5),
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(0, 245, 255, 0.1)
    `,
  },
  active: {
    background: liquidGlassTokens.glass.fillActive,
    border: `1px solid rgba(255, 255, 255, 0.15)`,
  },
  focused: {
    boxShadow: `
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.5),
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 2px ${liquidGlassTokens.glass.borderFocus}
    `,
  },
  innerHighlight: {
    background: `linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 100%
    )`,
  },
};

// Create the MUI theme
export const liquidGlassTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: liquidGlassTokens.neon.cyan,
      light: '#66F9FF',
      dark: '#00C4CC',
      contrastText: '#000000',
    },
    secondary: {
      main: liquidGlassTokens.neon.magenta,
      light: '#FF66F0',
      dark: '#CC00B8',
      contrastText: '#000000',
    },
    warning: {
      main: liquidGlassTokens.neon.amber,
      light: '#FFCC33',
      dark: '#CC9300',
    },
    success: {
      main: liquidGlassTokens.neon.success,
      light: '#66FFAA',
      dark: '#00CC6A',
    },
    error: {
      main: liquidGlassTokens.neon.error,
      light: '#FF6688',
      dark: '#CC2952',
    },
    background: {
      default: liquidGlassTokens.canvas.base,
      paper: liquidGlassTokens.canvas.elevated,
    },
    text: {
      primary: `rgba(255, 255, 255, ${liquidGlassTokens.text.primary})`,
      secondary: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
      disabled: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontWeight: 500,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      letterSpacing: '0.02em',
    },
    overline: {
      fontWeight: 500,
      fontSize: '0.6875rem',
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background: ${liquidGlassTokens.canvas.base};
          color: rgba(255, 255, 255, ${liquidGlassTokens.text.primary});
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        ::selection {
          background: rgba(0, 245, 255, 0.3);
          color: white;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        
        @keyframes circuit-flow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes surface-in {
          0% {
            opacity: 0;
            transform: translateY(16px);
            backdrop-filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            backdrop-filter: blur(16px);
          }
        }
        
        @keyframes glow-bloom {
          0% {
            box-shadow: 0 0 0 rgba(0, 245, 255, 0);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 245, 255, 0.4);
          }
          100% {
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes count-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .surface-enter {
          animation: surface-in 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
        
        .glow-bloom {
          animation: glow-bloom 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: liquidGlassTokens.radius.sm,
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 24px',
          transition: `all ${liquidGlassTokens.motion.durationNormal} ${liquidGlassTokens.motion.enter}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
            opacity: 0,
            transition: `opacity ${liquidGlassTokens.motion.durationFast} ease`,
          },
          '&:hover::before': {
            opacity: 1,
          },
        },
        contained: {
          ...glassStyles.base,
          color: 'white',
          '&:hover': {
            ...glassStyles.hover,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}20 0%, ${liquidGlassTokens.neon.cyan}10 100%)`,
          border: `1px solid ${liquidGlassTokens.neon.cyan}40`,
          color: liquidGlassTokens.neon.cyan,
          '&:hover': {
            background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}30 0%, ${liquidGlassTokens.neon.cyan}15 100%)`,
            boxShadow: glowEffects.cyan(0.3),
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            borderColor: liquidGlassTokens.neon.cyan,
            background: 'rgba(0, 245, 255, 0.05)',
            boxShadow: glowEffects.cyan(0.15),
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          ...glassStyles.base,
          borderRadius: liquidGlassTokens.radius.lg,
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...glassStyles.base,
          borderRadius: liquidGlassTokens.radius.lg,
          backgroundImage: 'none',
          transition: `all ${liquidGlassTokens.motion.durationNormal} ${liquidGlassTokens.motion.enter}`,
          '&:hover': {
            ...glassStyles.hover,
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
});

export default liquidGlassTheme;
