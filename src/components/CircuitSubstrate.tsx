import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { liquidGlassTokens } from '@/styles/theme';

interface CircuitSubstrateProps {
  primaryColor?: string;
  secondaryColor?: string;
  density?: number;
  speed?: number;
  animated?: boolean;
  opacity?: number;
  networkActive?: boolean;
  sx?: object;
}

interface Node {
  x: number;
  y: number;
  connections: number[];
}

interface Circuit {
  nodes: Node[];
  paths: string[];
}

const CircuitSubstrate: React.FC<CircuitSubstrateProps> = ({
  primaryColor = liquidGlassTokens.neon.cyan,
  secondaryColor = liquidGlassTokens.neon.magenta,
  density = 5,

  animated = true,
  opacity = 0.22,
  networkActive = false,
  sx = {},
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgMounted, setSvgMounted] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);
  
  const CYCLE_PERIOD = 60000;
  const ACTIVE_DURATION = 3000;
  const [isCycleActive, setIsCycleActive] = useState(true);
  const cycleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleStartRef = useRef<number>(Date.now());
  
  const ANIMATION_FRAME_INTERVAL = 33;
  
  const elementsRef = useRef<{
    paths: SVGPathElement[];
    nodes: SVGCircleElement[];
    pathsGroup: SVGGElement | null;
    nodesGroup: SVGGElement | null;
  }>({ paths: [], nodes: [], pathsGroup: null, nodesGroup: null });
  
  const circuit = useMemo<Circuit>(() => {
    const nodes: Node[] = [];
    const paths: string[] = [];
    const gridSize = Math.max(3, Math.min(6, density));
    const spacing = 100 / gridSize;
    
    for (let y = 0; y <= gridSize; y++) {
      for (let x = 0; x <= gridSize; x++) {
        const jitterX = (Math.random() - 0.5) * spacing * 0.3;
        const jitterY = (Math.random() - 0.5) * spacing * 0.3;
        
        nodes.push({
          x: x * spacing + jitterX + spacing / 2,
          y: y * spacing + jitterY + spacing / 2,
          connections: [],
        });
      }
    }
    
    const cols = gridSize + 1;
    for (let i = 0; i < nodes.length; i++) {
      const x = i % cols;
      const y = Math.floor(i / cols);
      
      if (x < gridSize && Math.random() > 0.3) {
        const rightIndex = i + 1;
        nodes[i].connections.push(rightIndex);
        paths.push(createOrthogonalPath(nodes[i], nodes[rightIndex]));
      }
      
      if (y < gridSize && Math.random() > 0.3) {
        const bottomIndex = i + cols;
        nodes[i].connections.push(bottomIndex);
        paths.push(createOrthogonalPath(nodes[i], nodes[bottomIndex]));
      }
    }
    
    return { nodes, paths };
  }, [density]);
  
  function createOrthogonalPath(from: Node, to: Node): string {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    
    if (Math.random() > 0.5) {
      return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`;
    } else {
      return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
    }
  }
  
  useEffect(() => {
    const runCycle = () => {
      const now = Date.now();
      const elapsed = now - cycleStartRef.current;
      const cyclePosition = elapsed % CYCLE_PERIOD;
      
      const shouldBeActive = cyclePosition < ACTIVE_DURATION;
      
      setIsCycleActive(shouldBeActive);
      
      let nextCheckDelay: number;
      if (shouldBeActive) {
        nextCheckDelay = ACTIVE_DURATION - cyclePosition;
      } else {
        nextCheckDelay = CYCLE_PERIOD - cyclePosition;
      }
      
      cycleTimeoutRef.current = setTimeout(runCycle, nextCheckDelay);
    };
    
    cycleStartRef.current = Date.now();
    runCycle();
    
    return () => {
      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    elementsRef.current = {
      paths: Array.from(svg.querySelectorAll('.circuit-path')) as SVGPathElement[],
      nodes: Array.from(svg.querySelectorAll('.circuit-node')) as SVGCircleElement[],
      pathsGroup: svg.querySelector('.circuit-paths-group') as SVGGElement | null,
      nodesGroup: svg.querySelector('.circuit-nodes-group') as SVGGElement | null,
    };
  }, [circuit]);
  
  const animate = useCallback((timestamp: number) => {
    if (!isCycleActive) {
      animationRef.current = undefined;
      return;
    }
    
    if (timestamp - lastFrameTimeRef.current < ANIMATION_FRAME_INTERVAL) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    
    lastFrameTimeRef.current = timestamp;
    
    const period = networkActive ? 3000 : 10000;
    phaseRef.current = (phaseRef.current + ANIMATION_FRAME_INTERVAL) % period;
    const normalizedPhase = phaseRef.current / period;
    
    const intensity = 0.5 + 0.3 * Math.sin(normalizedPhase * Math.PI * 2);
    
    requestAnimationFrame(() => {
      const { pathsGroup, nodesGroup } = elementsRef.current;
      if (pathsGroup) {
        pathsGroup.style.opacity = String(0.4 + intensity * 0.4);
      }
      if (nodesGroup) {
        nodesGroup.style.opacity = String(0.5 + intensity * 0.3);
      }
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [networkActive, isCycleActive]);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
      } else if (animated && svgMounted && isCycleActive) {
        lastFrameTimeRef.current = 0;
        phaseRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const isRunning = animationRef.current !== undefined;
    const shouldAnimate = animated && svgMounted && isCycleActive;
    const shouldStop = !animated || !isCycleActive;
    
    if (shouldStop) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    } else if (shouldAnimate && !isRunning && !document.hidden) {
      lastFrameTimeRef.current = 0;
      phaseRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, animate, svgMounted, isCycleActive]);
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity,
        ...sx,
      }}
    >
      <svg
        ref={(el) => {
          svgRef.current = el;
          if (el && !svgMounted) {
            setSvgMounted(true);
          }
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <filter id="circuit-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
          
          <linearGradient id="circuit-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={primaryColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <style>{`
            @keyframes circuit-flow {
              0% { stroke-dashoffset: 60; }
              100% { stroke-dashoffset: 0; }
            }
            .circuit-path-animated {
              stroke-dasharray: 15 45;
              animation: circuit-flow 4s linear infinite;
              will-change: stroke-dashoffset;
            }
          `}</style>
        </defs>
        
        <g 
          className="circuit-paths-group"
          style={{ opacity: 0.7 }}
        >
          {circuit.paths.map((path, index) => (
            <path
              key={`path-${index}`}
              className="circuit-path"
              d={path}
              fill="none"
              stroke="url(#circuit-gradient)"
              strokeWidth="0.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>
        
        {animated && isCycleActive && (
          <g 
            className="circuit-flow-group"
            style={{ 
              opacity: 0.6,
              mixBlendMode: 'screen',
            }}
          >
            {circuit.paths.filter((_, i) => i % 5 === 0).slice(0, 8).map((path, index) => (
              <path
                key={`flow-${index}`}
                d={path}
                fill="none"
                stroke={primaryColor}
                strokeWidth="0.5"
                strokeLinecap="round"
                className="circuit-path-animated"
                style={{
                  animationDelay: `${index * 0.8}s`,
                  animationDuration: '4s',
                }}
              />
            ))}
          </g>
        )}
        
        <g 
          className="circuit-nodes-group"
          style={{ opacity: 0.6 }}
        >
          {circuit.nodes.map((node, index) => (
            <circle
              key={`node-${index}`}
              cx={node.x}
              cy={node.y}
              r="0.6"
              fill={primaryColor}
              className="circuit-node"
            />
          ))}
        </g>
      </svg>
    </Box>
  );
};

export default CircuitSubstrate;
