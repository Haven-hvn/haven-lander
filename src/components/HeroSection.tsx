
import { type FC, Fragment } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Description as DocsIcon,
  ArrowForward as ArrowIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  CloudOff as CloudOffIcon,
} from '@mui/icons-material';
import { liquidGlassTokens, glowEffects, glassStyles } from '@/styles/theme';
import { HeroCard } from './GlassCard';

interface HeroSectionProps {
  onScrollToSection: (_id: string) => void;
}

const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        pt: { xs: 12, md: 16 },
        pb: 8,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={8}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left Content */}
          <Box sx={{ flex: 1, maxWidth: 680 }}>
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.75,
                mb: 4,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}15 0%, ${liquidGlassTokens.neon.magenta}10 100%)`,
                border: `1px solid ${liquidGlassTokens.neon.cyan}30`,
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
              <Typography
                variant="caption"
                sx={{
                  color: liquidGlassTokens.neon.cyan,
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}
              >
                Now in Beta
              </Typography>
            </Box>

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' },
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                mb: 3,
                background: `linear-gradient(135deg, #FFFFFF 0%, ${liquidGlassTokens.neon.cyan} 50%, ${liquidGlassTokens.neon.magenta} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Video Library Big Tech Can't Delete
            </Typography>

            {/* Subheadline */}
            <Typography
              variant="h5"
              sx={{
                color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                fontWeight: 400,
                lineHeight: 1.6,
                mb: 4,
                maxWidth: 560,
              }}
            >
              Stop renting space on centralized servers. Use your Web3 wallet to 
              encrypt, store, and stream your content with zero risk of deplatforming.
            </Typography>

            {/* CTAs */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mb: 6 }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}25 0%, ${liquidGlassTokens.neon.cyan}15 100%)`,
                  border: `1px solid ${liquidGlassTokens.neon.cyan}50`,
                  color: liquidGlassTokens.neon.cyan,
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: `${liquidGlassTokens.radius.md}px`,
                  boxShadow: glowEffects.cyan(0.2),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}35 0%, ${liquidGlassTokens.neon.cyan}20 100%)`,
                    boxShadow: glowEffects.cyan(0.4),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Start Encrypting Now
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayIcon />}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 500,
                  px: 3,
                  py: 1.5,
                  borderRadius: `${liquidGlassTokens.radius.md}px`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: liquidGlassTokens.neon.magenta,
                    background: `${liquidGlassTokens.neon.magenta}10`,
                    boxShadow: glowEffects.magenta(0.15),
                  },
                }}
              >
                View Demo
              </Button>

              <Button
                variant="text"
                size="large"
                startIcon={<DocsIcon />}
                sx={{
                  color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                  fontWeight: 500,
                  px: 2,
                  py: 1.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                    background: 'transparent',
                  },
                }}
              >
                Read Docs
              </Button>
            </Stack>

            {/* Trust Indicators */}
            <Stack direction="row" spacing={4} sx={{ opacity: 0.8 }}>
              {[
                { icon: SecurityIcon, label: 'End-to-End Encryption' },
                { icon: StorageIcon, label: 'Decentralized Storage' },
                { icon: CloudOffIcon, label: 'Censorship Resistant' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <item.icon
                    sx={{
                      fontSize: 18,
                      color: liquidGlassTokens.neon.cyan,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Right Content - Data Flow Visualization */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: { xs: '100%', lg: 'auto' },
            }}
          >
            {/* Main Visualization Card */}
            <HeroCard
              sx={{
                width: { xs: '100%', sm: 480, md: 520 },
                p: 4,
                position: 'relative',
              }}
            >
              {/* Data Flow Diagram */}
              <Box sx={{ position: 'relative', height: 320 }}>
                {/* Central Hub */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}30 0%, ${liquidGlassTokens.neon.magenta}20 100%)`,
                    border: `2px solid ${liquidGlassTokens.neon.cyan}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `${glowEffects.cyan(0.3)}, inset 0 0 20px rgba(0, 245, 255, 0.2)`,
                    zIndex: 3,
                  }}
                >
                  <SecurityIcon
                    sx={{
                      fontSize: 40,
                      color: liquidGlassTokens.neon.cyan,
                    }}
                  />
                </Box>

                {/* Orbital Nodes */}
                {[
                  { angle: 0, label: 'Wallet', color: liquidGlassTokens.neon.cyan, icon: '🔐' },
                  { angle: 72, label: 'Encrypt', color: liquidGlassTokens.neon.magenta, icon: '🔒' },
                  { angle: 144, label: 'Verify', color: liquidGlassTokens.neon.amber, icon: '✅' },
                  { angle: 216, label: 'Store', color: liquidGlassTokens.neon.success, icon: '💾' },
                  { angle: 288, label: 'Stream', color: liquidGlassTokens.neon.cyan, icon: '▶️' },
                ].map((node, index) => {
                  const radius = 120;
                  const angleRad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;

                  return (
                    <Fragment key={index}>
                      {/* Connection Line */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: radius,
                          height: 2,
                          background: `linear-gradient(90deg, ${node.color}40, ${node.color}10)`,
                          transformOrigin: 'left center',
                          transform: `translate(0, -50%) rotate(${node.angle}deg)`,
                          zIndex: 1,
                        }}
                      />
                      {/* Node */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          width: 64,
                          height: 64,
                          borderRadius: `${liquidGlassTokens.radius.lg}px`,
                          background: glassStyles.base.background,
                          border: `1px solid ${node.color}40`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 0.5,
                          zIndex: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.1)`,
                            borderColor: node.color,
                            boxShadow: `0 0 20px ${node.color}30`,
                          },
                        }}
                      >
                        <Typography sx={{ fontSize: 20 }}>{node.icon}</Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: node.color,
                            fontWeight: 600,
                            fontSize: '0.625rem',
                          }}
                        >
                          {node.label}
                        </Typography>
                      </Box>
                    </Fragment>
                  );
                })}

                {/* Animated Pulse Rings */}
                {[0, 1, 2].map((ring) => (
                  <Box
                    key={ring}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 80 + ring * 80,
                      height: 80 + ring * 80,
                      borderRadius: '50%',
                      border: `1px solid ${liquidGlassTokens.neon.cyan}${20 - ring * 5}`,
                      animation: `pulse-ring ${3 + ring}s ease-out infinite`,
                      animationDelay: `${ring * 1}s`,
                      '@keyframes pulse-ring': {
                        '0%': {
                          transform: 'translate(-50%, -50%) scale(0.8)',
                          opacity: 0.8,
                        },
                        '100%': {
                          transform: 'translate(-50%, -50%) scale(1.5)',
                          opacity: 0,
                        },
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Status Bar */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: `${liquidGlassTokens.radius.sm}px`,
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: `1px solid ${liquidGlassTokens.glass.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                  <Typography
                    variant="caption"
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                      fontWeight: 500,
                    }}
                  >
                    Network Online
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: liquidGlassTokens.neon.cyan,
                    fontWeight: 600,
                  }}
                >
                  99.6% Uptime
                </Typography>
              </Box>
            </HeroCard>

            {/* Decorative Glows */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${liquidGlassTokens.neon.cyan}20 0%, transparent 70%)`,
                filter: 'blur(40px)',
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${liquidGlassTokens.neon.magenta}15 0%, transparent 70%)`,
                filter: 'blur(30px)',
                zIndex: 0,
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
