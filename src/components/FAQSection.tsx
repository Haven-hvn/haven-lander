import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material';
import { liquidGlassTokens } from '@/styles/theme';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How does encryption work?',
    answer: 'Haven uses Lit Protocol for client-side encryption. This means your video is encrypted in your browser before it ever leaves your device. The encryption keys are decentralized across the Lit network, meaning only you (or those you authorize) can decrypt and view your content. Not even Haven can access your unencrypted videos.',
  },
  {
    question: 'What happens if I lose my wallet?',
    answer: 'Your encrypted content remains safe on the network, but you will lose access to it without your wallet. We strongly recommend backing up your wallet recovery phrase in a secure location. In a future update, we plan to support social recovery and multi-signature options for added security.',
  },
  {
    question: 'Can I share my encrypted content?',
    answer: 'Yes! Haven allows you to share access to specific videos with other wallet addresses. When you share, the recipient receives the decryption permissions through Lit Protocol, while you retain full ownership. You can revoke access at any time.',
  },
  {
    question: 'How much does storage cost?',
    answer: 'Storage costs are determined by the Filecoin network and vary based on network conditions. You pay only for what you store, with no monthly subscriptions. Current rates average around $0.000001 per GB per month—significantly cheaper than centralized alternatives.',
  },
  {
    question: 'Is my content really private?',
    answer: 'Absolutely. With client-side encryption, your content is encrypted before upload using keys that only you control. The encrypted data is distributed across the IPFS/Filecoin network, but without your authorization, it remains unreadable. This is true zero-knowledge architecture.',
  },
  {
    question: 'What video formats are supported?',
    answer: 'Haven supports all major video formats including MP4, MOV, AVI, MKV, and WebM. Videos are stored in their original format and quality—no re-encoding or compression unless you choose to enable it.',
  },
  {
    question: 'How do I access my videos?',
    answer: 'Simply connect your wallet to Haven. Your library will automatically load, showing all your encrypted videos. Click any video to decrypt and stream it in real-time. The decryption happens locally in your browser for maximum security.',
  },
  {
    question: 'Can I download my videos?',
    answer: 'Yes, you can download your original encrypted files at any time. You will need to decrypt them locally using your wallet. This ensures you always have a backup of your content, independent of any platform.',
  },
];

const FAQSection: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="faq"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: liquidGlassTokens.neon.cyan,
              fontWeight: 600,
              letterSpacing: '0.1em',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <HelpIcon sx={{ fontSize: 16 }} />
            Got Questions?
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Everything you need to know about Haven. Can't find what you're 
            looking for? Reach out to our community on Discord.
          </Typography>
        </Box>

        {/* FAQ Accordions */}
        <Box>
          {faqData.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                background: liquidGlassTokens.glass.fill,
                backdropFilter: `blur(${liquidGlassTokens.glass.blur})`,
                border: `1px solid ${liquidGlassTokens.glass.border}`,
                borderRadius: `${liquidGlassTokens.radius.md}px !important`,
                mb: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  borderColor: liquidGlassTokens.neon.cyan,
                  boxShadow: `0 4px 24px rgba(0, 245, 255, 0.1)`,
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: expanded === `panel${index}`
                        ? liquidGlassTokens.neon.cyan
                        : `rgba(255, 255, 255, ${liquidGlassTokens.text.tertiary})`,
                    }}
                  />
                }
                sx={{
                  py: 1,
                  px: 3,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.02)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: expanded === `panel${index}`
                      ? liquidGlassTokens.neon.cyan
                      : 'white',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  pb: 3,
                  pt: 0,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                    lineHeight: 1.7,
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact CTA */}
        <Box
          sx={{
            mt: 6,
            textAlign: 'center',
            p: 4,
            borderRadius: `${liquidGlassTokens.radius.lg}px`,
            background: 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${liquidGlassTokens.glass.border}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: 'white',
            }}
          >
            Still have questions?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
            }}
          >
            Join our Discord community for real-time support from the team and fellow archivists.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;
