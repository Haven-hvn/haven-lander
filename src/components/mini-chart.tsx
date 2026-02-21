import { Box } from '@mui/material';
import { liquidGlassTokens } from '@/styles/theme';

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
  showArea?: boolean;
}

/**
 * MiniChart - A lightweight SVG chart component for displaying trends
 * Used in stat cards to show recent data history
 */
export function MiniChart({ 
  data, 
  color = liquidGlassTokens.neon.cyan,
  height = 40,
  showArea = true 
}: MiniChartProps) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  // Create area path (for gradient fill)
  const areaPath = showArea 
    ? `0,100 ${points} 100,100`
    : '';

  return (
    <Box
      sx={{
        width: '100%',
        height: `${height}px`,
        mt: 2,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        {showArea && (
          <polygon
            points={areaPath}
            fill={`url(#gradient-${color.replace('#', '')})`}
          />
        )}

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 4px ${color}50)`,
          }}
        />

        {/* Data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value - min) / range) * 100;
          const isLast = index === data.length - 1;
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={isLast ? 3 : 1.5}
              fill={isLast ? color : `${color}80`}
              stroke={isLast ? '#fff' : 'none'}
              strokeWidth={isLast ? 1 : 0}
            />
          );
        })}
      </svg>
    </Box>
  );
}

export default MiniChart;
