import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Skeleton,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Speed as SpeedIcon,
  AccountBalance as BalanceIcon,
  Refresh as RefreshIcon,
  Error as ErrorIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';
import AnimatedCounter from './AnimatedCounter';
import GlassCard from './GlassCard';
import { MiniChart } from './mini-chart';
import { useArkivStats } from '@/hooks/useArkivStats';
import { useLitStats } from '@/hooks/useLitStats';
import { useFilecoinPayStats } from '@/hooks/useFilecoinPayStats';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  suffix: string;
  subValue: string;
  trend: 'up' | 'down' | 'neutral';
  source: string;
  color: string;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  onRetry: () => void;
  decimals?: number;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  suffix,
  subValue,
  trend,
  source,
  color,
  isLoading,
  error,
  lastUpdated,
  onRetry,
  decimals = 0,
  children,
}) => {
  return (
    <GlassCard
      glowColor={color === liquidGlassTokens.neon.cyan ? 'cyan' : 
                 color === liquidGlassTokens.neon.success ? 'success' : 'amber'}
      sx={{
        height: '100%',
        p: 4,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
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
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Icon */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '16px',
          background: `${color}15`,
          border: `1px solid ${color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
          boxShadow: `0 0 20px ${color}20`,
        }}
      >
        <Icon
          sx={{
            fontSize: 32,
            color: color,
          }}
        />
      </Box>

      {/* Content */}
      {isLoading ? (
        <Box sx={{ py: 2 }}>
          <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto', bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto', mt: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mx: 'auto', mt: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Box>
      ) : error ? (
        <Box sx={{ py: 2 }}>
          <ErrorIcon sx={{ color: liquidGlassTokens.neon.error, fontSize: 32, mb: 1 }} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
            Data temporarily unavailable
          </Typography>
          <Button
            size="small"
            onClick={onRetry}
            startIcon={<RefreshIcon />}
            sx={{
              color: liquidGlassTokens.neon.cyan,
              borderColor: `${liquidGlassTokens.neon.cyan}50`,
              '&:hover': {
                borderColor: liquidGlassTokens.neon.cyan,
                background: `${liquidGlassTokens.neon.cyan}10`,
              },
            }}
            variant="outlined"
          >
            Retry
          </Button>
        </Box>
      ) : (
        <>
          <AnimatedCounter
            label={label}
            value={value}
            suffix={suffix}
            decimals={decimals}
            subValue={subValue}
            trend={trend}
            source={source}
          />
          {children}
        </>
      )}

      {/* Last Updated */}
      {!isLoading && !error && lastUpdated && (
        <Tooltip title={`Last updated: ${lastUpdated.toLocaleString()}`}>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              opacity: 0.5,
            }}
          >
            <TimeIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }} />
            <Typography variant="caption" sx={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.5)' }}>
              {formatTimeAgo(lastUpdated)}
            </Typography>
          </Box>
        </Tooltip>
      )}

      {/* Decorative Element */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        }}
      />
    </GlassCard>
  );
};

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const LiveStatsSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // Fetch data from all three services
  const arkiv = useArkivStats({ 
    days: 30, 
    pollInterval: 60 * 60 * 1000 // 1 hour
  });
  
  const lit = useLitStats({ 
    hours: 24, 
    pollInterval: 5 * 60 * 1000 // 5 minutes
  });
  
  const filecoin = useFilecoinPayStats({ 
    pollInterval: 5 * 60 * 1000 // 5 minutes
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get last 7 days of data for the chart
  const last7DaysData = arkiv.data.dailyData.slice(-7).map(d => d.gb);
  
  // Calculate 7-day growth
  const last7DaysGrowth = last7DaysData.length >= 2
    ? last7DaysData[last7DaysData.length - 1] - last7DaysData[0]
    : 0;

  // Manual refresh all
  const handleRefreshAll = useCallback(() => {
    arkiv.refetch();
    lit.refetch();
    filecoin.refetch();
  }, [arkiv, lit, filecoin]);

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
          
          {/* Refresh Button */}
          <Tooltip title="Refresh all stats">
            <IconButton
              onClick={handleRefreshAll}
              disabled={arkiv.isLoading || lit.isLoading || filecoin.isLoading}
              sx={{
                mt: 2,
                color: liquidGlassTokens.neon.cyan,
                '&:hover': {
                  background: `${liquidGlassTokens.neon.cyan}10`,
                },
              }}
            >
              <RefreshIcon 
                sx={{
                  animation: (arkiv.isLoading || lit.isLoading || filecoin.isLoading) 
                    ? 'spin 1s linear infinite' 
                    : 'none',
                  '@keyframes spin': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                  },
                }} 
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3}>
          {/* Arkiv Card with Chart */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease 0s`,
              }}
            >
              <StatCard
                icon={StorageIcon}
                label="Total Data Secured"
                value={arkiv.data.totalGB}
                suffix=" GB"
                subValue={`30-Day Growth: ${arkiv.data.totalGrowth30DaysGB.toFixed(2)} GB`}
                trend="up"
                source="Arkiv Network"
                color={liquidGlassTokens.neon.cyan}
                isLoading={arkiv.isLoading}
                error={arkiv.error}
                lastUpdated={arkiv.lastFetchTime}
                onRetry={arkiv.retry}
                decimals={2}
              >
                {!arkiv.isLoading && !arkiv.error && last7DaysData.length > 0 && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${liquidGlassTokens.glass.border}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                      <TrendingUpIcon sx={{ fontSize: 14, color: liquidGlassTokens.neon.success }} />
                      <Typography variant="caption" sx={{ color: liquidGlassTokens.neon.success, fontWeight: 600 }}>
                        +{last7DaysGrowth.toFixed(2)} GB (7 days)
                      </Typography>
                    </Box>
                    <MiniChart 
                      data={last7DaysData} 
                      color={liquidGlassTokens.neon.cyan}
                      height={50}
                    />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem' }}>
                      Last 7 Days Trend
                    </Typography>
                  </Box>
                )}
              </StatCard>
            </Box>
          </Grid>

          {/* Lit Protocol Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease 0.15s`,
              }}
            >
              <StatCard
                icon={SpeedIcon}
                label="Decryption Success Rate"
                value={lit.data.successRate}
                suffix="%"
                subValue={`Avg Response: ${lit.data.averageResponseTime}ms • ${lit.data.totalExecutions.toLocaleString()} executions`}
                trend="up"
                source="Lit Protocol"
                color={liquidGlassTokens.neon.success}
                isLoading={lit.isLoading}
                error={lit.error}
                lastUpdated={lit.lastFetchTime}
                onRetry={lit.retry}
                decimals={1}
              />
            </Box>
          </Grid>

          {/* Filecoin Pay Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease 0.3s`,
              }}
            >
              <StatCard
                icon={BalanceIcon}
                label="Total USDFC Transacted"
                value={filecoin.data.totalUSDFCTransacted}
                suffix=""
                subValue={`${filecoin.data.totalUSDFCLocked} USDFC Locked • Active Storage Deals: ${filecoin.data.activeStorageDeals}`}
                trend="up"
                source="Filecoin Pay"
                color={liquidGlassTokens.neon.amber}
                isLoading={filecoin.isLoading}
                error={filecoin.error}
                lastUpdated={filecoin.lastFetchTime}
                onRetry={filecoin.retry}
                decimals={0}
              />
            </Box>
          </Grid>
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
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.6s ease 0.45s`,
          }}
        >
          {[
            { 
              label: 'Total Decryptions', 
              value: lit.data.totalExecutions > 0 
                ? lit.data.totalExecutions.toLocaleString() 
                : '1,626' 
            },
            { 
              label: 'USDFC Locked', 
              value: filecoin.data.totalUSDFCLocked 
            },
            { 
              label: 'Active Archives', 
              value: '100+' 
            },
            { 
              label: 'Network Uptime', 
              value: `${lit.data.uptime}%` 
            },
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
