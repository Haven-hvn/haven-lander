import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { liquidGlassTokens } from '@/styles/theme';

interface AnimatedCounterProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  label: string;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  source?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
  label,
  subValue,
  trend,
  source,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
    
    if (isNaN(numericValue)) {
      setDisplayValue(numericValue);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;
    const endValue = numericValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  const formatValue = (val: number): string => {
    if (decimals > 0) {
      return val.toFixed(decimals);
    }
    return Math.floor(val).toLocaleString();
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return liquidGlassTokens.neon.success;
      case 'down':
        return liquidGlassTokens.neon.error;
      default:
        return `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        textAlign: 'center',
        p: 3,
        position: 'relative',
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          mb: 1,
          display: 'block',
        }}
      >
        {label}
      </Typography>
      
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: liquidGlassTokens.neon.cyan,
          textShadow: `0 0 30px ${liquidGlassTokens.neon.cyan}40`,
          lineHeight: 1.1,
          mb: 1,
        }}
      >
        {prefix}{formatValue(displayValue)}{suffix}
      </Typography>
      
      {subValue && (
        <Typography
          variant="body2"
          sx={{
            color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
            fontSize: '0.875rem',
            mb: trend ? 0.5 : 0,
          }}
        >
          {subValue}
        </Typography>
      )}
      
      {trend && (
        <Typography
          variant="caption"
          sx={{
            color: getTrendColor(),
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          <span>{getTrendIcon()}</span>
          <span>Growing</span>
        </Typography>
      )}
      
      {source && (
        <Typography
          variant="caption"
          sx={{
            color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
            fontSize: '0.625rem',
            display: 'block',
            mt: 1.5,
            opacity: 0.7,
          }}
        >
          Source: {source}
        </Typography>
      )}
    </Box>
  );
};

export default AnimatedCounter;
