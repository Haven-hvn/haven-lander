import { Box, Container, Typography, Stack } from '@mui/material';
import { liquidGlassTokens } from '@/styles/theme';

const partners = [
  { 
    name: 'Filecoin', 
    faviconUrl: 'https://www.google.com/s2/favicons?domain=filecoin.io&sz=128',
    websiteUrl: 'https://filecoin.io/',
    description: 'Verifiable Storage' 
  },
  { 
    name: 'Lit Protocol', 
    faviconUrl: 'https://www.google.com/s2/favicons?domain=litprotocol.com&sz=128',
    websiteUrl: 'https://litprotocol.com/',
    description: 'Encryption' 
  },
  { 
    name: 'Arkiv', 
    faviconUrl: 'https://www.google.com/s2/favicons?domain=arkiv.network&sz=128',
    websiteUrl: 'https://arkiv.network/',
    description: 'Indexing' 
  },
];

const badges = [
  { label: 'Open Source', color: liquidGlassTokens.neon.success },
  { label: 'Zero Fees', color: liquidGlassTokens.neon.cyan },
  { label: 'No Middleman', color: liquidGlassTokens.neon.amber },
];

const TrustBar: React.FC = () => {
  return (
    <Box
      sx={{
        py: 4,
        borderTop: `1px solid ${liquidGlassTokens.glass.border}`,
        borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
        background: 'rgba(255, 255, 255, 0.02)',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          {/* Main Tagline */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                fontWeight: 500,
                letterSpacing: '0.15em',
                fontSize: '0.75rem',
              }}
            >
              Built by data hoarders for data hoarders
            </Typography>
          </Box>

          {/* Badges Row */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            {badges.map((badge) => (
              <Box
                key={badge.label}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: '100px',
                  background: `${badge.color}10`,
                  border: `1px solid ${badge.color}40`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: badge.color,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem',
                  }}
                >
                  {badge.label}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* Divider */}
          <Box
            sx={{
              width: '100%',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${liquidGlassTokens.glass.border}, transparent)`,
            }}
          />

          {/* Powered By Section */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              sx={{
                color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                fontWeight: 500,
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
              }}
            >
              Powered By
            </Typography>

            <Stack
              direction="row"
              spacing={{ xs: 4, sm: 6, md: 8 }}
              divider={
                <Box
                  sx={{
                    width: '1px',
                    height: 32,
                    background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)`,
                    display: { xs: 'none', sm: 'block' },
                  }}
                />
              }
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {partners.map((partner) => (
                <Box
                  key={partner.name}
                  component="a"
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    opacity: 0.7,
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={partner.faviconUrl}
                    alt={`${partner.name} logo`}
                    sx={{
                      width: 32,
                      height: 32,
                      objectFit: 'contain',
                      borderRadius: '4px',
                    }}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      {partner.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                        fontSize: '0.6875rem',
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      {partner.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default TrustBar;
