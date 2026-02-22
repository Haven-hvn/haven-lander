import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import {
  Warning as WarningIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';
import GlassCard from './GlassCard';

interface PainPoint {
  problem: string;
  problemDetail: string;
  solution: string;
  solutionDetail: string;
}

const painPoints: PainPoint[] = [
  {
    problem: 'You pay Big Tech $20/month for 2TB',
    problemDetail: 'Maybe $2 goes to storage. The rest is their margin.',
    solution: 'Pay providers directly',
    solutionDetail: 'No markup. Protocol rates.',
  },
  {
    problem: 'Every storage platform takes a cut',
    problemDetail: 'Even Web3 ones add fees on top.',
    solution: 'Haven isn\'t a platform',
    solutionDetail: 'We don\'t take a cut because we\'re not in the middle.',
  },
  {
    problem: 'You\'re renting access to your own data',
    problemDetail: 'Stop paying recurring fees for your own files.',
    solution: 'You own the storage relationship',
    solutionDetail: 'If Haven disappears tomorrow, nothing changes.',
  },
];

const PainPointsSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(painPoints.length).fill(false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <Box
      id="pain-points"
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
              color: liquidGlassTokens.neon.error,
              fontWeight: 600,
              letterSpacing: '0.1em',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <WarningIcon sx={{ fontSize: 16 }} />
            You&apos;re Overpaying for Middlemen
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Stop Feeding the Middlemen
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Storage doesn&apos;t have to be expensive. You&apos;re paying for executive salaries, 
            marketing budgets, and shareholder returns—not just storage.
          </Typography>
        </Box>

        {/* Problem/Solution Cards */}
        <Grid container spacing={4}>
          {painPoints.map((point, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                ref={(el: HTMLDivElement | null) => { cardRefs.current[index] = el; }}
                sx={{
                  opacity: visibleCards[index] ? 1 : 0,
                  transform: visibleCards[index] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                }}
              >
                <GlassCard
                  sx={{
                    p: 0,
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  <Stack sx={{ height: '100%' }}>
                    {/* Problem Side */}
                    <Box
                      sx={{
                        p: 3,
                        background: 'rgba(255, 51, 102, 0.05)',
                        borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                        flex: 1,
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography
                          variant="overline"
                          sx={{
                            color: liquidGlassTokens.neon.error,
                            fontWeight: 600,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.1em',
                          }}
                        >
                          The Problem
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1.125rem',
                          }}
                        >
                          {point.problem}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                          }}
                        >
                          {point.problemDetail}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Solution Side */}
                    <Box
                      sx={{
                        p: 3,
                        background: 'rgba(0, 255, 136, 0.05)',
                        flex: 1,
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography
                          variant="overline"
                          sx={{
                            color: liquidGlassTokens.neon.success,
                            fontWeight: 600,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.1em',
                          }}
                        >
                          Haven&apos;s Solution
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1.125rem',
                          }}
                        >
                          {point.solution}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                          }}
                        >
                          {point.solutionDetail}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </GlassCard>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Box
          sx={{
            mt: 8,
            textAlign: 'center',
            p: 4,
            borderRadius: `${liquidGlassTokens.radius.lg}px`,
            background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}10 0%, ${liquidGlassTokens.neon.magenta}05 100%)`,
            border: `1px solid ${liquidGlassTokens.neon.cyan}30`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'white',
            }}
          >
            Explore Open Source
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              mb: 3,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            We&apos;re sharing a discovery, not selling a product. Audit the code, 
            verify the economics, and decide for yourself.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PainPointsSection;
