import { useCallback, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { liquidGlassTheme } from '@/styles/theme';
import '@/styles/global.css';

// Components
import CircuitSubstrate from '@/components/CircuitSubstrate';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import EconomicsSection from '@/components/EconomicsSection';
import HavenIsSection from '@/components/HavenIsSection';
import LiveStatsSection from '@/components/LiveStatsSection';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import ComparisonSection from '@/components/ComparisonSection';
import TechStackSection from '@/components/TechStackSection';
import PainPointsSection from '@/components/PainPointsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

function App() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for background effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 72; // Height of navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <ThemeProvider theme={liquidGlassTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: '#0A0A0F',
          position: 'relative',
          overflowX: 'hidden',
        }}
      >
        {/* Global Circuit Background */}
        <CircuitSubstrate
          density={scrolled ? 3 : 5}
          opacity={0.12}
          animated={true}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />

        {/* Navigation */}
        <Navigation onScrollToSection={scrollToSection} />

        {/* Main Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Section */}
          <HeroSection onScrollToSection={scrollToSection} />

          {/* Trust Bar */}
          <TrustBar />

          {/* Economics Section - Why Storage Is This Cheap */}
          <EconomicsSection />

          {/* What Haven Is/Isn't Section */}
          <HavenIsSection />

          {/* Live Stats */}
          <LiveStatsSection />

          {/* Value Proposition */}
          <ValuePropositionSection />

          {/* Comparison Table */}
          <ComparisonSection />

          {/* Tech Stack */}
          <TechStackSection />

          {/* Pain Points */}
          <PainPointsSection />

          {/* FAQ */}
          <FAQSection />

          {/* Footer */}
          <Footer />
        </Box>

        {/* Gradient Overlay for depth */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'linear-gradient(180deg, #0A0A0F 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
