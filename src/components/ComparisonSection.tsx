import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Remove as NeutralIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';

interface ComparisonRow {
  feature: string;
  haven: boolean | 'partial';
  googleDrive: boolean | 'partial';
  localDrive: boolean | 'partial';
  highlight?: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: 'Censorship Resistant',
    haven: true,
    googleDrive: false,
    localDrive: true,
    highlight: true,
  },
  {
    feature: 'You Own Your Data',
    haven: true,
    googleDrive: false,
    localDrive: true,
    highlight: true,
  },
  {
    feature: 'Client-Side Encryption',
    haven: true,
    googleDrive: 'partial',
    localDrive: false,
    highlight: true,
  },
  {
    feature: 'Global Reach & Shareable',
    haven: true,
    googleDrive: true,
    localDrive: false,
    highlight: true,
  },
  {
    feature: 'No Account Required',
    haven: true,
    googleDrive: false,
    localDrive: true,
  },
  {
    feature: 'Access Without Internet',
    haven: false,
    googleDrive: false,
    localDrive: true,
  },
  {
    feature: 'Automatic Redundancy / Backup',
    haven: true,
    googleDrive: true,
    localDrive: false,
    highlight: true,
  },
  {
    feature: 'No Risk of Deplatforming',
    haven: true,
    googleDrive: false,
    localDrive: true,
  },
  {
    feature: 'Transparent Pricing',
    haven: true,
    googleDrive: 'partial',
    localDrive: true,
  },
  {
    feature: 'Open Source',
    haven: true,
    googleDrive: false,
    localDrive: false,
  },
  {
    feature: 'No Hardware to Maintain',
    haven: true,
    googleDrive: true,
    localDrive: false,
    highlight: true,
  },
];

const StatusIcon: React.FC<{ status: boolean | 'partial' }> = ({ status }) => {
  if (status === true) {
    return (
      <CheckIcon
        sx={{
          color: liquidGlassTokens.neon.success,
          fontSize: 20,
        }}
      />
    );
  }
  if (status === false) {
    return (
      <CloseIcon
        sx={{
          color: liquidGlassTokens.neon.error,
          fontSize: 20,
        }}
      />
    );
  }
  return (
    <NeutralIcon
      sx={{
        color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
        fontSize: 20,
      }}
    />
  );
};

const ComparisonSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
      id="comparison"
      ref={sectionRef}
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
            Comparison
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            How Haven Compares
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            See why thousands are switching from centralized platforms to 
            Haven's decentralized architecture.
          </Typography>
        </Box>

        {/* Comparison Table */}
        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              background: liquidGlassTokens.glass.fill,
              backdropFilter: `blur(${liquidGlassTokens.glass.blur})`,
              border: `1px solid ${liquidGlassTokens.glass.border}`,
              borderRadius: `${liquidGlassTokens.radius.lg}px`,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <TableCell
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                      fontWeight: 600,
                      borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                      width: isMobile ? '40%' : '50%',
                    }}
                  >
                    Feature
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: liquidGlassTokens.neon.cyan,
                      fontWeight: 700,
                      borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                      width: isMobile ? '20%' : '16.66%',
                      background: `${liquidGlassTokens.neon.cyan}08`,
                    }}
                  >
                    Haven
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                      fontWeight: 600,
                      borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                      width: isMobile ? '20%' : '16.66%',
                    }}
                  >
                    Google Drive
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                      fontWeight: 600,
                      borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                      width: isMobile ? '20%' : '16.66%',
                    }}
                  >
                    Local Drive
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      background: row.highlight
                        ? 'rgba(0, 245, 255, 0.03)'
                        : 'transparent',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.02)',
                      },
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <TableCell
                      sx={{
                        color: row.highlight
                          ? 'white'
                          : `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                        fontWeight: row.highlight ? 600 : 400,
                        borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                        py: 2,
                      }}
                    >
                      {row.feature}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                        background: `${liquidGlassTokens.neon.cyan}05`,
                        py: 2,
                      }}
                    >
                      <StatusIcon status={row.haven} />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                        py: 2,
                      }}
                    >
                      <StatusIcon status={row.googleDrive} />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: `1px solid ${liquidGlassTokens.glass.border}`,
                        py: 2,
                      }}
                    >
                      <StatusIcon status={row.localDrive} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Legend */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 3,
              mt: 4,
            }}
          >
            {[
              { icon: CheckIcon, label: 'Yes / Full Support', color: liquidGlassTokens.neon.success },
              { icon: CloseIcon, label: 'No / Not Available', color: liquidGlassTokens.neon.error },
              { icon: NeutralIcon, label: 'Partial / Limited', color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})` },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <item.icon sx={{ color: item.color, fontSize: 18 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ComparisonSection;
