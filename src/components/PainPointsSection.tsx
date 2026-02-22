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
    problem: 'Your creative work deleted without warning',
    problemIcon: '😰',
    solution: 'Your content lives on decentralized networks, immune to censorship',
    solutionIcon: '🛡️',
  },
  {
    problem: 'Locked out of your own digital memories',
    problemIcon: '🔒',
    solution: 'Cryptographic access—only you control the keys',
    solutionIcon: '🔓',
  },
  {
    problem: 'Trapped in endless subscription hell',
    problemIcon: '💸',
    solution: 'Own your storage, not rent it. Pay once, keep forever',
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
            What's Broken
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Reclaiming the Internet for the User
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Your data deserves to be yours—composable, interoperable, and free from 
            platform lock-in. Own your digital footprint with encryption, 
            decentralized storage, and true data sovereignty.
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

        {/* Philosophical Statement */}
        <Box sx={{ textAlign: 'center', mt: 8, mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontStyle: 'italic',
              background: `linear-gradient(135deg, #FFFFFF 0%, ${liquidGlassTokens.neon.cyan} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.4,
            }}
          >
            The internet was meant to be open, permissionless, and free...
          </Typography>
        </Box>

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
            Join the Reclamation
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
            Join the movement reclaiming the internet for users through 
            true data ownership, composability, and sovereign infrastructure.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PainPointsSection;
