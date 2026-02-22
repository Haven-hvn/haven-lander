import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import {
  TrendingDown as TrendingDownIcon,
  AccountBalance as AccountBalanceIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';
import GlassCard from './GlassCard';

const EconomicsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="economics"
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: `linear-gradient(180deg, transparent 0%, rgba(0, 245, 255, 0.02) 50%, transparent 100%)`,
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: liquidGlassTokens.neon.amber,
              fontWeight: 600,
              letterSpacing: '0.1em',
              mb: 2,
            }}
          >
            Why Storage Is This Cheap
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 3,
            }}
          >
            The Economics
          </Typography>
        </Box>

        {/* Economics Cards */}
        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
          }}
        >
          <GlassCard
            glowColor="amber"
            sx={{
              p: { xs: 4, md: 5 },
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Stack spacing={4}>
              {/* Main Explanation */}
              <Typography
                variant="body1"
                sx={{
                  color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  textAlign: 'center',
                }}
              >
                Filecoin pays providers in FIL to store data. It&apos;s how the network bootstraps. 
                Providers earn block rewards based on stored capacity.
              </Typography>

              {/* Key Stats */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: `${liquidGlassTokens.radius.md}px`,
                    background: 'rgba(255, 184, 0, 0.08)',
                    border: `1px solid ${liquidGlassTokens.neon.amber}30`,
                  }}
                >
                  <TrendingDownIcon sx={{ color: liquidGlassTokens.neon.amber, fontSize: 28 }} />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: liquidGlassTokens.neon.amber,
                        fontWeight: 700,
                        fontSize: '1.25rem',
                      }}
                    >
                      ~30%
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                      }}
                    >
                      Network capacity sits empty
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: `${liquidGlassTokens.radius.md}px`,
                    background: 'rgba(0, 245, 255, 0.08)',
                    border: `1px solid ${liquidGlassTokens.neon.cyan}30`,
                  }}
                >
                  <GroupIcon sx={{ color: liquidGlassTokens.neon.cyan, fontSize: 28 }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      Providers want to fill it
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                      }}
                    >
                      Incentivized to offer competitive rates
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              {/* The Problem/Solution */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: `${liquidGlassTokens.radius.md}px`,
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: `1px solid ${liquidGlassTokens.glass.border}`,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <AccountBalanceIcon
                    sx={{
                      color: liquidGlassTokens.neon.magenta,
                      fontSize: 24,
                      mt: 0.5,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                      lineHeight: 1.7,
                    }}
                  >
                    Most people access Filecoin through platforms that mark up prices. 
                    Haven removes the middleman. You deal directly with providers at protocol rates.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </GlassCard>
        </Box>
      </Container>
    </Box>
  );
};

export default EconomicsSection;
