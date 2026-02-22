import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Lock as LockIcon,
  Storage as StorageIcon,
  Search as SearchIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { liquidGlassTokens, glowEffects } from '@/styles/theme';
import GlassCard from './GlassCard';

interface TechComponent {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  tech: string;
}

const techStack: TechComponent[] = [
  {
    icon: WalletIcon,
    title: 'Authentication',
    description: 'Connect your Web3 wallet for seamless, passwordless access. No accounts to manage, no passwords to forget.',
    color: liquidGlassTokens.neon.cyan,
    tech: 'Web3 Wallet',
  },
  {
    icon: LockIcon,
    title: 'Encryption',
    description: 'Military-grade encryption happens in your browser before any data leaves your device. Only you hold the keys.',
    color: liquidGlassTokens.neon.magenta,
    tech: 'Lit Protocol · 99.6%',
  },
  {
    icon: StorageIcon,
    title: 'Storage',
    description: 'Data is stored on a verifiable foundation where its location and integrity are constantly proven. Access to storage is direct, connecting straight to the global network without middlemen.',
    color: liquidGlassTokens.neon.amber,
    tech: 'Filecoin Network',
  },
  {
    icon: SearchIcon,
    title: 'Metadata',
    description: 'Fast, indexed search across your entire library. Find any video instantly with our Arkiv indexing service.',
    color: liquidGlassTokens.neon.success,
    tech: 'Arkiv Indexing',
  },
];

const TechStackSection: React.FC = () => {
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
      id="tech-stack"
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: `linear-gradient(180deg, transparent 0%, rgba(0, 245, 255, 0.02) 50%, transparent 100%)`,
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
            Architecture
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Built With Battle-Tested Technology
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Haven combines the best of Web3 infrastructure to create a storage 
            solution that's truly decentralized, encrypted, and permanent.
          </Typography>
        </Box>

        {/* Tech Stack Grid with Flow Lines */}
        <Box
          sx={{
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
          }}
        >
          <Grid container spacing={4}>
            {techStack.map((tech, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                <Box sx={{ position: 'relative' }}>
                  <GlassCard
                    glowColor={index === 0 ? 'cyan' : index === 1 ? 'magenta' : index === 2 ? 'amber' : 'success'}
                    sx={{
                      height: '100%',
                      p: 3,
                      position: 'relative',
                    }}
                  >
                    {/* Step Number */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: 24,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: tech.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        color: liquidGlassTokens.canvas.base,
                        boxShadow: `0 0 20px ${tech.color}50`,
                      }}
                    >
                      {index + 1}
                    </Box>

                    {/* Icon */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: `${tech.color}15`,
                        border: `1px solid ${tech.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        mt: 1,
                      }}
                    >
                      <tech.icon
                        sx={{
                          fontSize: 24,
                          color: tech.color,
                        }}
                      />
                    </Box>

                    {/* Tech Badge */}
                    <Typography
                      variant="caption"
                      sx={{
                        color: tech.color,
                        fontWeight: 600,
                        fontSize: '0.6875rem',
                        letterSpacing: '0.05em',
                        mb: 1,
                        display: 'block',
                      }}
                    >
                      {tech.tech}
                    </Typography>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: 'white',
                      }}
                    >
                      {tech.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                        lineHeight: 1.6,
                      }}
                    >
                      {tech.description}
                    </Typography>
                  </GlassCard>

                  {/* Flow Arrow (except last item) */}
                  {index < techStack.length - 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        right: -28,
                        transform: 'translateY(-50%)',
                        display: { xs: 'none', lg: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: liquidGlassTokens.neon.cyan,
                        zIndex: 1,
                      }}
                    >
                      <ArrowIcon sx={{ fontSize: 24, opacity: 0.5 }} />
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Architecture Diagram Summary */}
          <Box
            sx={{
              mt: 6,
              p: 4,
              borderRadius: `${liquidGlassTokens.radius.lg}px`,
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${liquidGlassTokens.glass.border}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Glow */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${liquidGlassTokens.neon.cyan}10 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
            />

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={3}
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              {/* User */}
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}30 0%, ${liquidGlassTokens.neon.magenta}20 100%)`,
                    border: `2px solid ${liquidGlassTokens.neon.cyan}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: glowEffects.cyan(0.3),
                  }}
                >
                  <WalletIcon sx={{ fontSize: 28, color: liquidGlassTokens.neon.cyan }} />
                </Box>
                <Typography variant="caption" sx={{ color: 'white', fontWeight: 500 }}>
                  Your Wallet
                </Typography>
              </Box>

              {/* Arrow */}
              <ArrowIcon sx={{ color: liquidGlassTokens.neon.cyan, opacity: 0.5, fontSize: 28 }} />

              {/* Encryption */}
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '16px',
                    background: `${liquidGlassTokens.neon.magenta}20`,
                    border: `2px solid ${liquidGlassTokens.neon.magenta}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: glowEffects.magenta(0.3),
                  }}
                >
                  <LockIcon sx={{ fontSize: 28, color: liquidGlassTokens.neon.magenta }} />
                </Box>
                <Typography variant="caption" sx={{ color: 'white', fontWeight: 500 }}>
                  Encrypted
                </Typography>
              </Box>

              {/* Arrow */}
              <ArrowIcon sx={{ color: liquidGlassTokens.neon.magenta, opacity: 0.5, fontSize: 28 }} />

              {/* Storage */}
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '16px',
                    background: `${liquidGlassTokens.neon.amber}20`,
                    border: `2px solid ${liquidGlassTokens.neon.amber}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: glowEffects.amber(0.3),
                  }}
                >
                  <StorageIcon sx={{ fontSize: 28, color: liquidGlassTokens.neon.amber }} />
                </Box>
                <Typography variant="caption" sx={{ color: 'white', fontWeight: 500 }}>
                  Decentralized
                </Typography>
              </Box>

              {/* Arrow */}
              <ArrowIcon sx={{ color: liquidGlassTokens.neon.amber, opacity: 0.5, fontSize: 28 }} />

              {/* Access */}
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: `${liquidGlassTokens.neon.success}20`,
                    border: `2px solid ${liquidGlassTokens.neon.success}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    boxShadow: glowEffects.success(0.3),
                  }}
                >
                  <Typography sx={{ fontSize: 28 }}>🎬</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'white', fontWeight: 500 }}>
                  Stream Anywhere
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TechStackSection;
