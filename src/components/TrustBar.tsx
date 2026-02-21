
import { Box, Container, Typography, Stack } from '@mui/material';
import { liquidGlassTokens } from '@/styles/theme';

// SVG Logo Components
const IPFSLogo = () => (
  <svg viewBox="0 0 128 128" width="32" height="32" fill="none">
    <path
      d="M64 4L8 36v56l56 32 56-32V36L64 4z"
      fill="#4A9EA1"
      fillOpacity="0.2"
    />
    <path
      d="M64 4L8 36v56l56 32 56-32V36L64 4z"
      stroke="#4A9EA1"
      strokeWidth="2"
    />
    <path
      d="M64 36L36 52v32l28 16 28-16V52L64 36z"
      fill="#4A9EA1"
      fillOpacity="0.4"
    />
  </svg>
);

const FilecoinLogo = () => (
  <svg viewBox="0 0 128 128" width="32" height="32" fill="none">
    <circle cx="64" cy="64" r="56" fill="#0090FF" fillOpacity="0.2" />
    <circle cx="64" cy="64" r="56" stroke="#0090FF" strokeWidth="2" />
    <path
      d="M64 32L48 48v32l16 16 16-16V48L64 32z"
      fill="#0090FF"
      fillOpacity="0.6"
    />
  </svg>
);

const LitProtocolLogo = () => (
  <svg viewBox="0 0 128 128" width="32" height="32" fill="none">
    <rect
      x="16"
      y="16"
      width="96"
      height="96"
      rx="16"
      fill="#6D28D9"
      fillOpacity="0.2"
    />
    <rect
      x="16"
      y="16"
      width="96"
      height="96"
      rx="16"
      stroke="#6D28D9"
      strokeWidth="2"
    />
    <path
      d="M44 84V44l20-12 20 12v40l-20 12-20-12z"
      fill="#6D28D9"
      fillOpacity="0.6"
    />
  </svg>
);

const ArkivLogo = () => (
  <svg viewBox="0 0 128 128" width="32" height="32" fill="none">
    <circle cx="64" cy="64" r="56" fill="#00F5FF" fillOpacity="0.1" />
    <circle cx="64" cy="64" r="56" stroke="#00F5FF" strokeWidth="2" />
    <path
      d="M64 28L40 52v24l24 24 24-24V52L64 28z"
      stroke="#00F5FF"
      strokeWidth="3"
      fill="none"
    />
  </svg>
);

const partners = [
  { name: 'IPFS', logo: IPFSLogo, description: 'Distributed Storage' },
  { name: 'Filecoin', logo: FilecoinLogo, description: 'Incentive Layer' },
  { name: 'Lit Protocol', logo: LitProtocolLogo, description: 'Encryption' },
  { name: 'Arkiv', logo: ArkivLogo, description: 'Indexing' },
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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="overline"
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
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <partner.logo />
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
      </Container>
    </Box>
  );
};

export default TrustBar;
