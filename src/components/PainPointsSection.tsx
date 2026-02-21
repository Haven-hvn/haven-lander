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
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';
import GlassCard from './GlassCard';

interface PainPoint {
  problem: string;
  problemIcon: string;
  solution: string;
  solutionIcon: string;
}

const painPoints: PainPoint[] = [
  {
    problem: 'Your YouTube channel deleted overnight',
    problemIcon: '😰',
    solution: 'Your content preserved permanently',
    solutionIcon: '🛡️',
  },
  {
    problem: 'Google Drive locked without warning',
    problemIcon: '🔒',
    solution: 'Always accessible with your wallet',
    solutionIcon: '🔓',
  },
  {
    problem: 'Worried about privacy breaches',
    problemIcon: '👁️',
    solution: 'End-to-end encryption by default',
    solutionIcon: '🔐',
  },
  {
    problem: 'Tired of monthly storage fees',
    problemIcon: '💸',
    solution: 'Pay-as-you-go with transparent costs',
    solutionIcon: '💎',
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
            Problems Solved
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            The Problems Haven Solves
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Content creators face unprecedented risks with centralized platforms. 
            Haven eliminates these threats permanently.
          </Typography>
        </Box>

        {/* Problem/Solution Cards */}
        <Grid container spacing={4}>
          {painPoints.map((point, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Box
                ref={(el: HTMLDivElement | null) => { cardRefs.current[index] = el; }}
                sx={{
                  opacity: visibleCards[index] ? 1 : 0,
                  transform: visibleCards[index] ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                }}
              >
                <GlassCard
                  sx={{
                    p: 0,
                    overflow: 'hidden',
                  }}
                >
                  <Grid container>
                    {/* Problem Side */}
                    <Grid
                      size={{ xs: 12, sm: 6 }}
                      sx={{
                        p: 4,
                        background: 'rgba(255, 51, 102, 0.05)',
                        borderRight: { sm: `1px solid ${liquidGlassTokens.glass.border}` },
                        borderBottom: { xs: `1px solid ${liquidGlassTokens.glass.border}`, sm: 'none' },
                      }}
                    >
                      <Stack spacing={2}>
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
                        <Typography sx={{ fontSize: 40 }}>{point.problemIcon}</Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                            fontWeight: 500,
                          }}
                        >
                          {point.problem}
                        </Typography>
                      </Stack>
                    </Grid>

                    {/* Solution Side */}
                    <Grid
                      size={{ xs: 12, sm: 6 }}
                      sx={{
                        p: 4,
                        background: 'rgba(0, 255, 136, 0.05)',
                      }}
                    >
                      <Stack spacing={2}>
                        <Typography
                          variant="overline"
                          sx={{
                            color: liquidGlassTokens.neon.success,
                            fontWeight: 600,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.1em',
                          }}
                        >
                          Haven's Solution
                        </Typography>
                        <Typography sx={{ fontSize: 40 }}>{point.solutionIcon}</Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                          }}
                        >
                          {point.solution}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  {/* Arrow indicator for desktop */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: liquidGlassTokens.canvas.elevated,
                      border: `2px solid ${liquidGlassTokens.glass.border}`,
                      display: { xs: 'none', sm: 'flex' },
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <CheckIcon
                      sx={{
                        fontSize: 16,
                        color: liquidGlassTokens.neon.success,
                      }}
                    />
                  </Box>
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
            Ready to Take Back Control?
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
            Join thousands of creators who have already made the switch to 
            decentralized, encrypted storage.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PainPointsSection;
