import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { liquidGlassTokens, glowEffects } from '@/styles/theme';

interface NavigationProps {
  onScrollToSection: (id: string) => void;
}

const navItems = [
  { label: 'Features', id: 'features' },
  { label: 'Technology', id: 'tech-stack' },
  { label: 'Compare', id: 'comparison' },
  { label: 'FAQ', id: 'faq' },
];

const Navigation: React.FC<NavigationProps> = ({ onScrollToSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const trigger = useScrollTrigger({
    threshold: 100,
    disableHysteresis: true,
  });

  useEffect(() => {
    setScrolled(trigger);
  }, [trigger]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        background: liquidGlassTokens.canvas.elevated,
        pt: 2,
      }}
    >
      <Box sx={{ px: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}30 0%, ${liquidGlassTokens.neon.magenta}20 100%)`,
            border: `1px solid ${liquidGlassTokens.neon.cyan}40`,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: glowEffects.cyan(0.2),
          }}
        >
          <img src="/haven-icon.ico" alt="Haven" style={{ width: 20, height: 20 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
          Haven
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(item.id)}
              sx={{
                py: 1.5,
                px: 3,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: { color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})` },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? `${liquidGlassTokens.canvas.elevated}F0`
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? `1px solid ${liquidGlassTokens.glass.border}` : 'none',
        }}
      >
        <Toolbar
          sx={{
            height: 72,
            maxWidth: 1400,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 4, lg: 6 },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'scale(1.02)' },
            }}
            onClick={() => handleNavClick('hero')}
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
                fontWeight: 600,
                color: 'white',
                letterSpacing: '-0.01em',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Haven
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                sx={{
                  color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: `${liquidGlassTokens.radius.sm}px`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* CTA Button */}
          <Button
            variant="contained"
            onClick={() => handleNavClick('hero')}
            sx={{
              background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}20 0%, ${liquidGlassTokens.neon.cyan}10 100%)`,
              border: `1px solid ${liquidGlassTokens.neon.cyan}40`,
              color: liquidGlassTokens.neon.cyan,
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: `${liquidGlassTokens.radius.sm}px`,
              display: { xs: 'none', sm: 'flex' },
              transition: 'all 0.2s ease',
              '&:hover': {
                background: `linear-gradient(135deg, ${liquidGlassTokens.neon.cyan}30 0%, ${liquidGlassTokens.neon.cyan}15 100%)`,
                boxShadow: glowEffects.cyan(0.3),
                transform: 'translateY(-1px)',
              },
            }}
          >
            Join the Reclamation
          </Button>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: 'none' },
              color: `rgba(255, 255, 255, ${liquidGlassTokens.text.secondary})`,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              background: liquidGlassTokens.canvas.elevated,
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </Slide>
  );
};

export default Navigation;
