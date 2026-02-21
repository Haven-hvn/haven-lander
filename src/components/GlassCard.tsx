import { forwardRef, useState, useCallback } from 'react';
import { Box, BoxProps } from '@mui/material';
import { liquidGlassTokens, glassStyles, glowEffects } from '@/styles/theme';

type GlowColor = 'cyan' | 'magenta' | 'amber' | 'success' | 'error' | 'none';
type CardVariant = 'surface' | 'elevated' | 'hero' | 'compact';

interface GlassCardProps extends Omit<BoxProps, 'ref'> {
  variant?: CardVariant;
  glowColor?: GlowColor;
  interactive?: boolean;
  focused?: boolean;
  animateEntry?: boolean;
  borderRadius?: number | string;
  showHighlight?: boolean;
  onFocusVisible?: () => void;
  children?: React.ReactNode;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({
  variant = 'surface',
  glowColor = 'none',
  interactive = true,
  focused = false,
  animateEntry = false,
  borderRadius,
  showHighlight = true,
  onFocusVisible,
  children,
  sx,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  
  const variantStyles = {
    surface: {
      borderRadius: borderRadius ?? liquidGlassTokens.radius.lg,
      padding: liquidGlassTokens.spacing.md,
    },
    elevated: {
      borderRadius: borderRadius ?? liquidGlassTokens.radius.lg,
      padding: liquidGlassTokens.spacing.lg,
      boxShadow: `
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 0 0 1px rgba(0, 0, 0, 0.5),
        0 16px 48px rgba(0, 0, 0, 0.5)
      `,
    },
    hero: {
      borderRadius: borderRadius ?? liquidGlassTokens.radius.lg,
      padding: liquidGlassTokens.spacing.lg,
      background: 'rgba(255, 255, 255, 0.08)',
      boxShadow: `
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.5),
        0 24px 64px rgba(0, 0, 0, 0.6)
      `,
    },
    compact: {
      borderRadius: borderRadius ?? liquidGlassTokens.radius.sm,
      padding: liquidGlassTokens.spacing.sm,
    },
  };
  
  const glowColorMap: Record<GlowColor, string | null> = {
    cyan: glowEffects.cyan(0.25),
    magenta: glowEffects.magenta(0.25),
    amber: glowEffects.amber(0.25),
    success: glowEffects.success(0.25),
    error: glowEffects.error(0.25),
    none: null,
  };
  
  const handleFocus = useCallback((e: React.FocusEvent) => {
    if (e.target === e.currentTarget) {
      setIsFocusVisible(true);
      onFocusVisible?.();
    }
  }, [onFocusVisible]);
  
  const handleBlur = useCallback(() => {
    setIsFocusVisible(false);
  }, []);
  
  const handleMouseEnter = useCallback(() => {
    if (interactive) setIsHovered(true);
  }, [interactive]);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  
  const currentGlow = glowColorMap[glowColor];
  
  return (
    <Box
      ref={ref}
      tabIndex={interactive ? 0 : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        ...glassStyles.base,
        ...variantStyles[variant],
        
        position: 'relative',
        overflow: 'hidden',
        
        transition: `
          all ${liquidGlassTokens.motion.durationNormal} ${liquidGlassTokens.motion.enter},
          transform ${liquidGlassTokens.motion.durationFast} ${liquidGlassTokens.motion.enter}
        `,
        
        ...(animateEntry && {
          animation: `surface-in ${liquidGlassTokens.motion.durationSlow} ${liquidGlassTokens.motion.enter} forwards`,
        }),
        
        ...(interactive && isHovered && {
          background: liquidGlassTokens.glass.fillHover,
          transform: 'translateY(-2px)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.5),
            0 12px 40px rgba(0, 0, 0, 0.5)
            ${currentGlow ? `, ${currentGlow}` : ''}
          `,
        }),
        
        ...((focused || isFocusVisible) && {
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.5),
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 2px ${liquidGlassTokens.glass.borderFocus}
            ${currentGlow ? `, ${currentGlow}` : ''}
          `,
          outline: 'none',
        }),
        
        '&:focus-visible': {
          outline: 'none',
        },
        
        ...sx,
      }}
      {...props}
    >
      {showHighlight && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            ...glassStyles.innerHighlight,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            opacity: isHovered ? 0.8 : 0.5,
            transition: `opacity ${liquidGlassTokens.motion.durationFast} ease`,
          }}
        />
      )}
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
});

GlassCard.displayName = 'GlassCard';

export const HeroCard = forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant'>>(({
  children,
  glowColor = 'cyan',
  ...props
}, ref) => (
  <GlassCard
    ref={ref}
    variant="hero"
    glowColor={glowColor}
    {...props}
  >
    {children}
  </GlassCard>
));

HeroCard.displayName = 'HeroCard';

export const CompactCard = forwardRef<HTMLDivElement, Omit<GlassCardProps, 'variant'>>(({
  children,
  ...props
}, ref) => (
  <GlassCard
    ref={ref}
    variant="compact"
    {...props}
  >
    {children}
  </GlassCard>
));

CompactCard.displayName = 'CompactCard';

export default GlassCard;
