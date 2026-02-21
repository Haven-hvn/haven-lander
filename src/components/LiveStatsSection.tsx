import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Speed as SpeedIcon,
  AccountBalance as BalanceIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';
import AnimatedCounter from './AnimatedCounter';
import GlassCard from './GlassCard';

interface StatData {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  subValue: string;
  trend: 'up' | 'down' | 'neutral';
  source: string;
  color: string;
}

const LiveStatsSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats: StatData[] = [
    {
      icon: StorageIcon,
      label: 'Total Data Secured',
      value: 80,
      suffix: ' GB',
      subValue: '30-Day Growth: 500 MB/day',
      trend: 'up',
      source: 'Arkiv API',
      color: liquidGlassTokens.neon.cyan,
    },
    {
      icon: SpeedIcon,
      label: 'Decryption Success Rate',
      value: 99.6,
      suffix: '%',
      subValue: 'Avg Response: 418ms',
      trend: 'up',
      source: 'Lit Protocol',
      color: liquidGlassTokens.neon.success,
    },
    {
      icon: BalanceIcon,
      label: 'Total USDFC Transacted',
      value: 5452,
      suffix: '',
      subValue: 'Active Storage Deals: 50',
      trend: 'up',
      source: 'Filecoin Pay',
      color: liquidGlassTokens.neon.amber,
    },
  ];

  return (
    <Box
      id="stats"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: liquidGlassTokens.neon.cyan,
              fontWeight: 600,
              letterSpacing: '0.1em',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: liquidGlassTokens.neon.success,
                boxShadow: `0 0 8px ${liquidGlassTokens.neon.success}`,
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
            Live Network Statistics
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Trusted by Archivists Worldwide
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Real-time metrics from the Haven network. Watch as the ecosystem grows 
            and see the decentralization in action.
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <GlassCard
                glowColor={index === 0 ? 'cyan' : index === 1 ? 'success' : 'amber'}
                sx={{
                  height: '100%',
                  p: 4,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${index * 0.15}s`,
                }}
              >
                {/* Background Glow */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`,
                    filter: 'blur(30px)',
                  }}
                />

                {/* Icon */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '16px',
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: `0 0 20px ${stat.color}20`,
                  }}
                >
                  <stat.icon
                    sx={{
                      fontSize: 32,
                      color: stat.color,
                    }}
                  />
                </Box>

                {/* Counter */}
                <AnimatedCounter
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                  subValue={stat.subValue}
                  trend={stat.trend}
                  source={stat.source}
                />

                {/* Decorative Element */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${stat.color}40, transparent)`,
                  }}
                />
              </GlassCard>
            </Grid>
          ))}
        </Grid>

        {/* Additional Metrics Row */}
        <Box
          sx={{
            mt: 6,
            p: 3,
            borderRadius: `${liquidGlassTokens.radius.lg}px`,
            background: 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${liquidGlassTokens.glass.border}`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: 3,
          }}
        >
          {[
            { label: 'Total Decryptions', value: '1,626' },
            { label: 'USDFC Locked', value: '12,395' },
            { label: 'Active Archives', value: '100+' },
            { label: 'Network Uptime', value: '99.6%' },
          ].map((metric, index) => (
            <Box key={index} sx={{ textAlign: 'center', px: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: liquidGlassTokens.neon.cyan,
                  mb: 0.5,
                }}
              >
                {metric.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                  fontWeight: 500,
                }}
              >
                {metric.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LiveStatsSection;
