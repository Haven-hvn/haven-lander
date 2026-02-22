
import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Divider,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Message as DiscordIcon,
  Description as DocsIcon,
} from '@mui/icons-material';
import { liquidGlassTokens, glowEffects } from '@/styles/theme';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Technology', href: '#tech-stack' },
    { label: 'Pricing', href: 'https://filecoin.cloud/service-providers' },
    { label: 'FAQ', href: '#faq' },
  ],
  resources: [
    { label: 'Documentation', href: 'https://github.com/Haven-hvn/haven-player/blob/pluginsystem/docs/plans/ARCHITECTURE.md' },
    { label: 'GitHub', href: 'https://github.com/Haven-hvn/' },
    { label: 'Releases', href: 'https://github.com/Haven-hvn/haven-cli/releases' },
    { label: 'Status', href: 'https://haven.orbiter.website/' },
  ],
  community: [
    { label: 'Twitter', href: 'https://x.com/havenplay3r' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'License', href: '#' },
  ],
};

const socialLinks = [
  { icon: GitHubIcon, href: 'https://github.com/Haven-hvn/', label: 'GitHub' },
  { icon: TwitterIcon, href: 'https://x.com/havenplay3r', label: 'Twitter' },
  { icon: DocsIcon, href: 'https://github.com/Haven-hvn/haven-player/blob/pluginsystem/docs/plans/ARCHITECTURE.md', label: 'Documentation' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        pt: 8,
        pb: 4,
        borderTop: `1px solid ${liquidGlassTokens.glass.border}`,
        background: liquidGlassTokens.canvas.deep,
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        {/* Main Footer Content */}
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={6}
          justifyContent="space-between"
          sx={{ mb: 8 }}
        >
          {/* Brand Column */}
          <Box sx={{ maxWidth: 320 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}30 0%, ${liquidGlassTokens.neon.magenta}20 100%)`,
                  border: `1px solid ${liquidGlassTokens.neon.cyan}40`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: glowEffects.cyan(0.2),
                }}
              >
                <img
                  src="/haven-icon.ico"
                  alt="Haven"
                  style={{
                    width: 22,
                    height: 22,
                    filter: `drop-shadow(0 0 4px ${liquidGlassTokens.neon.cyan})`,
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-0.01em',
                }}
              >
                Haven
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              The Video Library Big Tech Can't Delete. Encrypt, store, and stream 
              your content with zero risk of deplatforming.
            </Typography>
            {/* Social Links */}
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: `${liquidGlassTokens.radius.sm}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${liquidGlassTokens.glass.border}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: liquidGlassTokens.neon.cyan,
                      background: `${liquidGlassTokens.neon.cyan}10`,
                      borderColor: `${liquidGlassTokens.neon.cyan}30`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <social.icon fontSize="small" />
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Links Columns */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 4, sm: 8, md: 12 }}
          >
            {/* Product */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 2,
                  display: 'block',
                }}
              >
                Product
              </Typography>
              <Stack spacing={1.5}>
                {footerLinks.product.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: liquidGlassTokens.neon.cyan,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Resources */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 2,
                  display: 'block',
                }}
              >
                Resources
              </Typography>
              <Stack spacing={1.5}>
                {footerLinks.resources.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: liquidGlassTokens.neon.cyan,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Community */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 2,
                  display: 'block',
                }}
              >
                Community
              </Typography>
              <Stack spacing={1.5}>
                {footerLinks.community.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: liquidGlassTokens.neon.cyan,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: liquidGlassTokens.glass.border, mb: 4 }} />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body2"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
              fontSize: '0.875rem',
            }}
          >
            © {currentYear} Haven. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {footerLinks.legal.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                sx={{
                  color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: liquidGlassTokens.neon.cyan,
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>

        {/* Tagline */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant="caption"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
              fontStyle: 'italic',
              letterSpacing: '0.05em',
            }}
          >
            Your videos: encrypted, decentralized, yours forever.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
