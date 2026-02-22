import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import {
  Security as SecurityIcon,
  AccountBalanceWallet as WalletIcon,
  Savings as SavingsIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';
import GlassCard from './GlassCard';

interface ValueProp {
  icon: React.ElementType;
  title: string;
  features: string[];
  color: string;
  glowColor: 'cyan' | 'magenta' | 'amber';
}

const valueProps: ValueProp[] = [
  {
    icon: SecurityIcon,
    title: 'Privacy Without Compromise',
    features: [
      'Client-side encryption before upload',
      "Lit Protocol's proven 99.6% reliability",
      'Only you control the decryption keys',
      'Zero-knowledge architecture',
    ],
    color: liquidGlassTokens.neon.cyan,
    glowColor: 'cyan',
  },
  {
    icon: WalletIcon,
    title: 'Unconditional Ownership',
    features: [
      'No accounts, no passwords required',
      'Wallet-based authentication',
      'Your content, your rules',
      'Censorship-resistant storage',
    ],
    color: liquidGlassTokens.neon.magenta,
    glowColor: 'magenta',
  },
  {
    icon: SavingsIcon,
    title: 'Freedom From Platforms',
    features: [
      'Pay only for what you store',
      'No monthly subscriptions',
      'Transparent Filecoin economics',
      'Scale from GBs to TBs',
    ],
    color: liquidGlassTokens.neon.amber,
    glowColor: 'amber',
  },
];

const ValuePropositionSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
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
      id="features"
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
            }}
          >
            The Movement
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Principles of Digital Sovereignty
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Haven isn't just storage—it's a stance. A declaration that your 
            digital life belongs to you, and a tool to reclaim what's rightfully yours.
          </Typography>
        </Box>

        {/* Value Props Grid */}
        <Grid container spacing={4}>
          {valueProps.map((prop, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                ref={(el: HTMLDivElement | null) => { cardRefs.current[index] = el; }}
                sx={{
                  opacity: visibleCards[index] ? 1 : 0,
                  transform: visibleCards[index] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                }}
              >
                <GlassCard
                  glowColor={prop.glowColor}
                  sx={{
                    height: '100%',
                    p: 4,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background Accent */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -30,
                      right: -30,
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${prop.color}10 0%, transparent 70%)`,
                      filter: 'blur(20px)',
                    }}
                  />

                  {/* Icon */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '14px',
                      background: `${prop.color}15`,
                      border: `1px solid ${prop.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: `0 0 20px ${prop.color}20`,
                    }}
                  >
                    <prop.icon
                      sx={{
                        fontSize: 28,
                        color: prop.color,
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: 'white',
                    }}
                  >
                    {prop.title}
                  </Typography>

                  {/* Features List */}
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {prop.features.map((feature, featureIndex) => (
                      <Box
                        component="li"
                        key={featureIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                          mb: 2,
                          '&:last-child': { mb: 0 },
                        }}
                      >
                        <CheckIcon
                          sx={{
                            fontSize: 18,
                            color: prop.color,
                            mt: 0.25,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                            lineHeight: 1.5,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Bottom Accent Line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${prop.color}50, transparent)`,
                    }}
                  />
                </GlassCard>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ValuePropositionSection;
