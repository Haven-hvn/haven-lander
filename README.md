# Haven Landing Page

A high-converting, emotionally resonant landing page for Haven that positions it as the ultimate solution for serious video archivists who value privacy, control, and reliability.

## Overview

The landing page addresses key issues identified in the audit:
- **Lack of trust** → Live statistics, security badges, transparent architecture
- **Emotional disconnect** → Problem/solution framing, fear-based messaging
- **Missing social proof** → Real-time network metrics, partner logos

## Features

### Sections

1. **Hero Section**
   - Compelling headline: "The Video Library Big Tech Can't Delete"
   - Animated data flow visualization showing encryption pipeline
   - Primary CTAs with glass morphism design

2. **Trust Bar**
   - Partner logos: IPFS, Filecoin, Lit Protocol, Arkiv
   - Immediate credibility through established Web3 brands

3. **Live Stats Section**
   - Animated metric cards with real-time data
   - Storage volume, encryption reliability, network activity
   - Source attribution for transparency

4. **Value Proposition**
   - Three-column layout highlighting key benefits
   - Bulletproof encryption, true data ownership, cost-effective storage

5. **Comparison Table**
   - Haven vs Google Drive vs YouTube
   - Feature-by-feature comparison
   - Visual indicators for each platform's capabilities

6. **Tech Stack**
   - Architecture diagram showing data flow
   - Four-step process: Authentication → Encryption → Storage → Access
   - Technology badges for each component

7. **Pain Points**
   - Problem/solution pairs addressing creator fears
   - Emotional resonance through relatable scenarios

8. **FAQ**
   - Expandable accordion design
   - Common questions about encryption, wallets, sharing, pricing

9. **Footer**
   - Navigation links, social media, legal
   - Brand tagline: "Your videos: encrypted, decentralized, yours forever."

## Tech Stack

- **Framework**: React 19 + TypeScript
- **UI Library**: Material-UI (MUI) v7
- **Styling**: Emotion (CSS-in-JS)
- **Build Tool**: Vite 6
- **Design System**: Liquid Glass Theme

## Design System

### Colors
- **Canvas Base**: `#0A0A0F`
- **Canvas Elevated**: `#12121A`
- **Neon Cyan**: `#00F5FF` (Primary accent)
- **Neon Magenta**: `#FF00E5` (Secondary accent)
- **Neon Amber**: `#FFB800` (Tertiary accent)
- **Success**: `#00FF88`
- **Error**: `#FF3366`

### Typography
- **Font**: Inter
- **Headlines**: Bold, tight letter-spacing
- **Body**: Regular, readable line-height

### Effects
- Glass morphism with backdrop blur
- Neon glow effects on hover
- Animated circuit substrate background
- Smooth scroll animations

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server runs on `http://localhost:3000` by default.

## Project Structure

```
haven-lander/
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TrustBar.tsx
│   │   ├── LiveStatsSection.tsx
│   │   ├── ValuePropositionSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── PainPointsSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── Footer.tsx
│   │   ├── CircuitSubstrate.tsx
│   │   ├── GlassCard.tsx
│   │   └── AnimatedCounter.tsx
│   ├── styles/
│   │   ├── theme.ts        # Liquid Glass theme
│   │   └── global.css      # Global styles
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Key Components

### CircuitSubstrate
Animated background component with SVG circuit patterns that create a "living" decentralized network visualization.

### GlassCard
Reusable glass morphism card component with configurable glow colors, hover effects, and variants.

### AnimatedCounter
Smoothly animates numbers counting up when scrolled into view, used for live statistics.

## Customization

### Updating Stats
Edit the `stats` array in `LiveStatsSection.tsx` to update the displayed metrics.

### Changing Colors
Modify the `liquidGlassTokens` object in `src/styles/theme.ts` to update the color palette.

### Adding FAQ Items
Add new objects to the `faqData` array in `FAQSection.tsx`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Lazy-loaded sections
- Optimized animations with `requestAnimationFrame`
- Passive scroll listeners
- Reduced motion support for accessibility

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for the Haven community.
