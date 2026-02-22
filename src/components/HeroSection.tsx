
import { type FC, Fragment, useState } from 'react';
import { openExternalLink } from '@/utils/links';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Description as DocsIcon,
  ArrowForward as ArrowIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  CloudOff as CloudOffIcon,
  Close as CloseIcon,
  Computer as ComputerIcon,
  Dns as DnsIcon,
} from '@mui/icons-material';
import { liquidGlassTokens, glowEffects, glassStyles } from '@/styles/theme';
import { HeroCard } from './GlassCard';

interface HeroSectionProps {
  onScrollToSection: (_id: string) => void;
}

const HeroSection: FC<HeroSectionProps> = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCliClick = () => {
    openExternalLink('https://github.com/Haven-hvn/haven-cli');
    handleClose();
  };

  const handlePlayerClick = () => {
    openExternalLink('https://github.com/Haven-hvn/haven-player');
    handleClose();
  };

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
              Stop Paying Middlemen for Storage Access
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
              Filecoin providers have excess capacity. Network subsidies make 
              storage cheap. Haven is the open-source tool that connects you 
              directly—zero fees, no platform, your keys.
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
                onClick={handleOpen}
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
                Start Uploading
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayIcon />}
                onClick={() => openExternalLink('https://haven.orbiter.website/')}
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
                onClick={() => openExternalLink('https://github.com/Haven-hvn/haven-player/blob/pluginsystem/docs/plans/ARCHITECTURE.md')}
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

            {/* Upload Options Modal - Hick's Law: Present choices after initial decision */}
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth
              PaperProps={{
                sx: {
                  background: 'linear-gradient(135deg, #12121A 0%, #0A0A0F 100%)',
                  border: `1px solid ${liquidGlassTokens.glass.border}`,
                  borderRadius: `${liquidGlassTokens.radius.lg}px`,
                  boxShadow: `${glowEffects.cyan(0.15)}, 0 25px 50px -12px rgba(0, 0, 0, 0.5)`,
                },
              }}
            >
              <DialogTitle
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pb: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, #FFFFFF 0%, ${liquidGlassTokens.neon.cyan} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Choose Your Path
                </Typography>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                    '&:hover': {
                      color: 'white',
                      background: `${liquidGlassTokens.neon.magenta}15`,
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Typography
                  variant="body2"
                  sx={{
                    color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                    mb: 3,
                  }}
                >
                  Select the option that fits your setup. Both paths lead to the same decentralized storage network.
                </Typography>
                <Stack spacing={2}>
                  {/* Desktop Path - haven-cli */}
                  <Button
                    onClick={handleCliClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      p: 3,
                      borderRadius: `${liquidGlassTokens.radius.md}px`,
                      background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}15 0%, ${liquidGlassTokens.neon.cyan}05 100%)`,
                      border: `1px solid ${liquidGlassTokens.neon.cyan}40`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}25 0%, ${liquidGlassTokens.neon.cyan}10 100%)`,
                        borderColor: liquidGlassTokens.neon.cyan,
                        boxShadow: glowEffects.cyan(0.3),
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: `${liquidGlassTokens.neon.cyan}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <ComputerIcon sx={{ color: liquidGlassTokens.neon.cyan, fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: liquidGlassTokens.neon.cyan,
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Desktop App
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                        }}
                      >
                        haven-cli — For personal computers. Easy setup, GUI included.
                      </Typography>
                    </Box>
                  </Button>

                  {/* Server Path - haven-player */}
                  <Button
                    onClick={handlePlayerClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      p: 3,
                      borderRadius: `${liquidGlassTokens.radius.md}px`,
                      background: `linear-gradient(135deg, ${liquidGlassTokens.neon.magenta}15 0%, ${liquidGlassTokens.neon.magenta}05 100%)`,
                      border: `1px solid ${liquidGlassTokens.neon.magenta}40`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${liquidGlassTokens.neon.magenta}25 0%, ${liquidGlassTokens.neon.magenta}10 100%)`,
                        borderColor: liquidGlassTokens.neon.magenta,
                        boxShadow: glowEffects.magenta(0.3),
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: `${liquidGlassTokens.neon.magenta}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <DnsIcon sx={{ color: liquidGlassTokens.neon.magenta, fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: liquidGlassTokens.neon.magenta,
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Server / VPS
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                        }}
                      >
                        haven-player — For servers, VPS, headless setups. Docker ready.
                      </Typography>
                    </Box>
                  </Button>
                </Stack>
              </DialogContent>
            </Dialog>

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

              {/* Status Bar - LocalFirst Philosophy Metrics */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: `${liquidGlassTokens.radius.sm}px`,
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: `1px solid ${liquidGlassTokens.glass.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                {/* Data Sovereign */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: liquidGlassTokens.neon.success,
                        boxShadow: `0 0 8px ${liquidGlassTokens.neon.success}`,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                        fontWeight: 500,
                      }}
                    >
                      Data Sovereignty
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: liquidGlassTokens.neon.cyan,
                      fontWeight: 600,
                    }}
                  >
                    100%
                  </Typography>
                </Box>

                {/* SelfHosted */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: liquidGlassTokens.neon.amber,
                        boxShadow: `0 0 8px ${liquidGlassTokens.neon.amber}`,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                        fontWeight: 500,
                      }}
                    >
                      Self-Hosting
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: liquidGlassTokens.neon.amber,
                      fontWeight: 600,
                    }}
                  >
                    ✓ Enabled
                  </Typography>
                </Box>

                {/* LocalFirst */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: liquidGlassTokens.neon.magenta,
                        boxShadow: `0 0 8px ${liquidGlassTokens.neon.magenta}`,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                        fontWeight: 500,
                      }}
                    >
                      Local-First
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: liquidGlassTokens.neon.magenta,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    ✓ By Design
                  </Typography>
                </Box>
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
