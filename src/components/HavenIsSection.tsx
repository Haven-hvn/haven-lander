import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';
import GlassCard from './GlassCard';

interface IsItem {
  text: string;
  highlight?: string;
}

const isItems: IsItem[] = [
  { text: 'Open-source tool connecting you to Filecoin providers' },
  { text: 'Client-side encryption with your own keys', highlight: 'Lit Protocol' },
  { text: 'Direct payments to providers', highlight: 'USDFC' },
  { text: 'Self-hostable or use hosted version' },
];

const isNotItems: IsItem[] = [
  { text: 'A storage provider—we don\'t store your data' },
  { text: 'A platform taking a cut—we don\'t touch your payments' },
  { text: 'A custodian—we don\'t hold keys or data' },
  { text: 'A middleman—you contract directly with providers' },
];

const HavenIsSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false]);
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
      id="what-is-haven"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: liquidGlassTokens.neon.cyan,
              fontWeight: 600,
              letterSpacing: '0.1em',
              mb: 2,
            }}
          >
            What Haven Is & Isn&apos;t
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 3,
            }}
          >
            Clear Expectations
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            We&apos;re not trying to be everything. Here&apos;s exactly what Haven does—and what it doesn&apos;t.
          </Typography>
        </Box>

        {/* Two Column Comparison */}
        <Grid container spacing={4}>
          {/* IS Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              ref={(el: HTMLDivElement | null) => { cardRefs.current[0] = el; }}
              sx={{
                opacity: visibleCards[0] ? 1 : 0,
                transform: visibleCards[0] ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0s`,
              }}
            >
              <GlassCard
                glowColor="success"
                sx={{
                  height: '100%',
                  p: 4,
                }}
              >
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: `${liquidGlassTokens.neon.success}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckIcon sx={{ color: liquidGlassTokens.neon.success, fontSize: 20 }} />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: liquidGlassTokens.neon.success,
                      }}
                    >
                      Haven IS
                    </Typography>
                  </Box>

                  {isItems.map((item, index) => (
                    <Box key={index}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'white',
                          fontWeight: 500,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.text}
                      </Typography>
                      {item.highlight && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: liquidGlassTokens.neon.cyan,
                            fontWeight: 600,
                            display: 'block',
                            mt: 0.5,
                          }}
                        >
                          {item.highlight}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </GlassCard>
            </Box>
          </Grid>

          {/* IS NOT Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              ref={(el: HTMLDivElement | null) => { cardRefs.current[1] = el; }}
              sx={{
                opacity: visibleCards[1] ? 1 : 0,
                transform: visibleCards[1] ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s`,
              }}
            >
              <GlassCard
                glowColor="error"
                sx={{
                  height: '100%',
                  p: 4,
                }}
              >
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: `${liquidGlassTokens.neon.error}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CloseIcon sx={{ color: liquidGlassTokens.neon.error, fontSize: 20 }} />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: liquidGlassTokens.neon.error,
                      }}
                    >
                      Haven IS NOT
                    </Typography>
                  </Box>

                  {isNotItems.map((item, index) => (
                    <Box key={index}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                          fontWeight: 500,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </GlassCard>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HavenIsSection;
