import React, { useRef, useState, useEffect } from 'react';
import { 
  Code2, 
  RefreshCw, 
  CheckCircle2, 
  Monitor, 
  ChevronRight,
  Flame,
  Activity,
  PenTool,
  Music,
  Trash2
} from 'lucide-react';

interface InteractiveFooterProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement | null>) => void;
  references: {
    heroRef: React.RefObject<HTMLDivElement | null>;
    websitesRef: React.RefObject<HTMLDivElement | null>;
    productsRef: React.RefObject<HTMLDivElement | null>;
    technicalRef: React.RefObject<HTMLDivElement | null>;
    founderRef: React.RefObject<HTMLDivElement | null>;
  };
}

interface ThemePreset {
  name: string;
  accentGold: string;
  accentGoldText: string;
  accentBlue: string;
  colorName: string;
  colorHex: string;
}

const THEMES: ThemePreset[] = [
  { name: 'Amber Horizon', accentGold: '#C9A227', accentGoldText: '#8A6916', accentBlue: '#2563EB', colorName: 'Premium Gold', colorHex: '#C9A227' },
  { name: 'Cyber Matrix', accentGold: '#10B981', accentGoldText: '#047857', accentBlue: '#3B82F6', colorName: 'Neon Mint', colorHex: '#10B981' },
  { name: 'Electric Void', accentGold: '#8B5CF6', accentGoldText: '#6D28D9', accentBlue: '#EC4899', colorName: 'Quantum Violet', colorHex: '#8B5CF6' },
  { name: 'Solar Flare', accentGold: '#F97316', accentGoldText: '#C2410C', accentBlue: '#2563EB', colorName: 'Solar Orange', colorHex: '#F97316' },
];

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const InteractiveFooter: React.FC<InteractiveFooterProps> = ({ scrollToSection, references }) => {
  const { heroRef, websitesRef, productsRef, technicalRef, founderRef } = references;
  
  // Custom states
  const [isMuted, setIsMuted] = useState(true);
  const [activeTheme, setActiveTheme] = useState('Amber Horizon');
  
  // Music Step Sequencer (4x4 Grid)
  // Rows: Synth Lead (C5), Pad (A4), Mid (G4), Bass (E4)
  // Columns: Steps 0, 1, 2, 3
  const [sequencer, setSequencer] = useState<boolean[][]>([
    [true, false, false, false],  // Row 0: C5
    [false, true, false, false],  // Row 1: A4
    [false, false, true, false],  // Row 2: G4
    [false, false, false, true]   // Row 3: E4
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [isSequencing, setIsSequencing] = useState(true);
  const sequencerTimerRef = useRef<number | null>(null);

  // Console / Diagnostics state
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [systemState, setSystemState] = useState<'ONLINE' | 'OPTIMIZING' | 'OPTIMIZED (100% SPEED)'>('ONLINE');
  const [confettiActive, setConfettiActive] = useState(false);

  // Signature Pad state
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureSubmitted, setSignatureSubmitted] = useState(false);

  // Background Constellation Canvas refs
  const footerContainerRef = useRef<HTMLElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const bgRequestRef = useRef<number | null>(null);
  const bgNodesRef = useRef<ConstellationNode[]>([]);
  const bgParticlesRef = useRef<StarParticle[]>([]);
  const bgMouseRef = useRef({ x: -1000, y: -1000 });

  // FPS & Real-time Telemetry metrics
  const [metrics, setMetrics] = useState({ fps: 60, latency: 16.6 });
  const metricsFrameRef = useRef<{ lastTime: number; frameCount: number }>({ lastTime: performance.now(), frameCount: 0 });

  // Logo Letters Bounce states
  const [hoveredLetterIdx, setHoveredLetterIdx] = useState<number | null>(null);

  // 1. Synth Sound Engine using pure Web Audio API
  const playSynthSound = (type: 'beep' | 'pop' | 'success' | 'note', pitchIndex?: number) => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'pop') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'success') {
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
        frequencies.forEach((freq, idx) => {
          const oscNode = ctx.createOscillator();
          const gainNode = ctx.createGain();
          oscNode.connect(gainNode);
          gainNode.connect(ctx.destination);
          oscNode.type = 'sine';
          oscNode.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gainNode.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.08);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.2);
          oscNode.start(ctx.currentTime + idx * 0.08);
          oscNode.stop(ctx.currentTime + idx * 0.08 + 0.2);
        });
      } else if (type === 'note' && pitchIndex !== undefined) {
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99]; // C Pentatonic Scale
        const freq = scale[pitchIndex % scale.length];
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (err) {
      console.warn('Audio synth blocked by browser autoplay limits.', err);
    }
  };

  // 2. Global Preset Accent Mood Swapping
  const selectThemeMood = (theme: ThemePreset) => {
    setActiveTheme(theme.name);
    document.documentElement.style.setProperty('--accent-gold', theme.accentGold);
    document.documentElement.style.setProperty('--accent-gold-text', theme.accentGoldText);
    document.documentElement.style.setProperty('--accent-blue', theme.accentBlue);
    localStorage.setItem('advait-portfolio-theme', theme.name);
    playSynthSound('beep');
  };

  // Restore saved theme color presets
  useEffect(() => {
    const savedTheme = localStorage.getItem('advait-portfolio-theme');
    if (savedTheme) {
      const match = THEMES.find(t => t.name === savedTheme);
      if (match) {
        document.documentElement.style.setProperty('--accent-gold', match.accentGold);
        document.documentElement.style.setProperty('--accent-gold-text', match.accentGoldText);
        document.documentElement.style.setProperty('--accent-blue', match.accentBlue);
        setActiveTheme(match.name);
      }
    }
  }, []);

  // 3. Step Sequencer Audio Loops (136 BPM sweep)
  const toggleSequencerPad = (rowIdx: number, colIdx: number) => {
    const nextSeq = sequencer.map((row, r) => 
      row.map((pad, c) => (r === rowIdx && c === colIdx ? !pad : pad))
    );
    setSequencer(nextSeq);
    playSynthSound('pop');
  };

  useEffect(() => {
    if (!isSequencing) {
      if (sequencerTimerRef.current) clearInterval(sequencerTimerRef.current);
      return;
    }

    const scaleFrequencies = [523.25, 440.00, 392.00, 329.63]; // C5, A4, G4, E4

    const triggerStep = () => {
      setActiveStep(prev => {
        const next = (prev + 1) % 4;
        
        // Play active row notes in the next column
        if (!isMuted) {
          try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
              const ctx = new AudioContext();
              sequencer.forEach((row, rowIdx) => {
                if (row[next]) {
                  const osc = ctx.createOscillator();
                  const gain = ctx.createGain();
                  osc.connect(gain);
                  gain.connect(ctx.destination);
                  
                  osc.type = 'triangle';
                  osc.frequency.setValueAtTime(scaleFrequencies[rowIdx], ctx.currentTime);
                  gain.gain.setValueAtTime(0.04, ctx.currentTime);
                  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
                  osc.start();
                  osc.stop(ctx.currentTime + 0.22);
                }
              });
            }
          } catch (e) {
            // Context play block
          }
        }
        return next;
      });
    };

    sequencerTimerRef.current = setInterval(triggerStep, 220); // 136 BPM

    return () => {
      if (sequencerTimerRef.current) clearInterval(sequencerTimerRef.current);
    };
  }, [isSequencing, sequencer, isMuted]);

  // 4. Digital Signature Canvas drawing pad
  const getSigMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const pos = getSigMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    playSynthSound('beep');
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getSigMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'var(--accent-gold)';
    ctx.shadowBlur = 3;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignaturePad = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureSubmitted(false);
    playSynthSound('beep');
  };

  const submitSignature = () => {
    setSignatureSubmitted(true);
    playSynthSound('success');
    
    // Confetti particles locally on background canvas
    if (bgCanvasRef.current) {
      const rect = bgCanvasRef.current.getBoundingClientRect();
      spawnBackgroundParticles(rect.width / 2, rect.height / 2, 25);
    }
  };

  // 5. System Mainframe Diagnostics & Confetti
  const triggerSystemDefrag = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    setSystemState('OPTIMIZING');
    setProgress(0);
    setConsoleLogs([]);
    playSynthSound('beep');

    const logs = [
      '[CMD] INITIATING COMPLETE MAIN_FRAME PORT RE-BOOT...',
      '[OK] RE-SYNCHRONIZING PENTATONIC AUDIO OSCILLATORS...',
      '[OK] RESOLVING 2D GRAPHICS CONSTELLATION NODES...',
      '[OK] PURGING TEMPORARY CANVAS BUFFERS...',
      '[OK] MINIFYING STATIC CSS DESIGN VARIABLE ARRAYS...',
      '[SUCCESS] SYSTEM SPEED AT FULL PEAK TELEMETRY!'
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        const currentLog = logs[logIndex];
        setConsoleLogs(prev => [...prev, currentLog]);
        playSynthSound('beep');
        logIndex++;
      }
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(() => {
            setIsOptimizing(false);
            setSystemState('OPTIMIZED (100% SPEED)');
            playSynthSound('success');
            
            // Screen-wide confetti
            setConfettiActive(true);
            setTimeout(() => setConfettiActive(false), 5000);
            
            // Burst particles on the background constellation canvas
            if (bgCanvasRef.current) {
              const canvas = bgCanvasRef.current;
              for (let i = 0; i < 4; i++) {
                spawnBackgroundParticles(Math.random() * canvas.width, Math.random() * canvas.height, 12);
              }
            }
          }, 400);
          return 100;
        }
        return next;
      });
    }, 180);
  };

  // Helper to spawn stars on background canvas
  const spawnBackgroundParticles = (x: number, y: number, count = 10) => {
    const starColors = ['#C9A227', '#FAFAF8', '#A8ADB4', '#2563EB', '#F97316'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1.5;
      bgParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1.5,
        alpha: 1,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }
  };

  // 6. Constellation Background Loop & Actual FPS counter (Intersection Optimized)
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeBgCanvas = () => {
      const parent = footerContainerRef.current;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeBgCanvas();
    window.addEventListener('resize', resizeBgCanvas);

    // Spawn 45 nodes
    const nodeCount = 45;
    const nodes: ConstellationNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1
      });
    }
    bgNodesRef.current = nodes;

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      bgMouseRef.current.x = e.clientX - rect.left;
      bgMouseRef.current.y = e.clientY - rect.top;
    };

    const clearMousePos = () => {
      bgMouseRef.current.x = -1000;
      bgMouseRef.current.y = -1000;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnBackgroundParticles(x, y, 10);
      playSynthSound('beep');
    };

    const parent = footerContainerRef.current;
    if (parent) {
      parent.addEventListener('mousemove', getMousePos);
      parent.addEventListener('mouseleave', clearMousePos);
      parent.addEventListener('click', handleCanvasClick);
    }

    const isIntersectingRef = { current: false };

    // Animation frames loop
    const renderConstellation = () => {
      if (!isIntersectingRef.current) {
        bgRequestRef.current = null;
        return; // Pause rendering loop when offscreen
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Measure Actual Frame Latency & FPS
      const now = performance.now();
      metricsFrameRef.current.frameCount++;
      const timeDelta = now - metricsFrameRef.current.lastTime;
      if (timeDelta >= 500) { // update every 500ms
        const realFps = Math.round((metricsFrameRef.current.frameCount * 1000) / timeDelta);
        const latency = timeDelta / metricsFrameRef.current.frameCount;
        setMetrics({
          fps: Math.min(120, realFps),
          latency: parseFloat(latency.toFixed(1))
        });
        metricsFrameRef.current.lastTime = now;
        metricsFrameRef.current.frameCount = 0;
      }

      // Draw Grid lines subtle dark theme background CAD matrix
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Particles and Lattice
      const activeNodes = bgNodesRef.current;
      const mouse = bgMouseRef.current;

      for (let i = 0; i < activeNodes.length; i++) {
        const n = activeNodes[i];
        
        // update position
        n.x += n.vx;
        n.y += n.vy;

        // boundary collision
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // attraction field to mouse
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const mDist = Math.sqrt(dx * dx + dy * dy);
        if (mDist < 160) {
          const attraction = (160 - mDist) / 160 * 0.05;
          const mAngle = Math.atan2(dy, dx);
          n.x -= Math.cos(mAngle) * attraction;
          n.y -= Math.sin(mAngle) * attraction;
        }

        // draw particle
        ctx.fillStyle = `rgba(201, 162, 39, ${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // line connections to mouse
        if (mDist < 150) {
          const connectAlpha = (150 - mDist) / 150 * 0.15;
          ctx.strokeStyle = `rgba(255, 255, 255, ${connectAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // line connections between nodes
        for (let j = i + 1; j < activeNodes.length; j++) {
          const o = activeNodes[j];
          const ndx = o.x - n.x;
          const ndy = o.y - n.y;
          const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
          if (ndist < 80) {
            const lineAlpha = (80 - ndist) / 80 * 0.08;
            ctx.strokeStyle = `rgba(201, 162, 39, ${lineAlpha})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }
      }

      // Draw custom clicks stars particles
      const p = bgParticlesRef.current;
      for (let i = p.length - 1; i >= 0; i--) {
        const pt = p[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.06; // gravity
        pt.alpha -= 0.015;

        if (pt.alpha <= 0) {
          p.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = pt.alpha;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      bgRequestRef.current = requestAnimationFrame(renderConstellation);
    };

    // Initialize Intersection Observer to only run loop when footer is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersectingRef.current;
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasIntersecting) {
          // Restart loop
          if (bgRequestRef.current) cancelAnimationFrame(bgRequestRef.current);
          bgRequestRef.current = requestAnimationFrame(renderConstellation);
        }
      },
      { threshold: 0.01 }
    );

    if (footerContainerRef.current) {
      observer.observe(footerContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', resizeBgCanvas);
      if (parent) {
        parent.removeEventListener('mousemove', getMousePos);
        parent.removeEventListener('mouseleave', clearMousePos);
        parent.removeEventListener('click', handleCanvasClick);
      }
      observer.disconnect();
      if (bgRequestRef.current) cancelAnimationFrame(bgRequestRef.current);
    };
  }, []);

  // Letters splitter for bouncy kinetic typography logo
  const logoText = "ADVAIT A KHANGAR";
  const handleLetterHover = (idx: number) => {
    setHoveredLetterIdx(idx);
    playSynthSound('note', idx);
  };

  return (
    <footer 
      ref={footerContainerRef}
      style={{
        background: 'rgba(12, 13, 16, 0.96)',
        backdropFilter: 'blur(20px)',
        padding: '100px 5% 40px',
        position: 'relative',
        zIndex: 4,
        color: '#A8ADB4',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      
      {/* Full Background Interactive Constellation Canvas */}
      <canvas 
        ref={bgCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Decorative top ambient color highlight bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: `linear-gradient(90deg, transparent, var(--accent-gold), transparent)`,
        opacity: 0.85,
        zIndex: 2
      }} />

      {/* Main Container Layout */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px', position: 'relative', zIndex: 2 }}>
        
        {/* BLOCK 1: Screen-wide massive luxury kinetic typography heading */}
        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '48px', userSelect: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Code2 size={18} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#FFF', letterSpacing: '0.15em' }}>
                DIGITAL MAIN_FRAME
              </span>
            </div>
            
            {/* Playful Interactive sound controller bar */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.02)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Activity size={12} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#FFF' }}>AUDIO BLIPS:</span>
              <button 
                onClick={() => {
                  setIsMuted(!isMuted);
                  setTimeout(() => playSynthSound('beep'), 50);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: isMuted ? '#8E8E93' : 'var(--accent-gold)',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  transition: 'all 0.2s'
                }}
              >
                {isMuted ? (
                  <span style={{ color: '#FF453A' }}>[OFF]</span>
                ) : (
                  <span style={{ color: '#30D158' }}>[ACTIVE]</span>
                )}
              </button>
            </div>
          </div>

          {/* Majestic screen-spanning huge letters */}
          <h2 style={{ 
            fontFamily: 'var(--font-interface)', 
            fontWeight: 900, 
            fontSize: 'clamp(1.2rem, 5.4vw, 6rem)', 
            lineHeight: 0.95,
            color: '#FFFFFF', 
            letterSpacing: '0.02em',
            margin: '0',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap'
          }}>
            {logoText.split('').map((letter, idx) => {
              if (letter === ' ') return <span key={idx} style={{ width: 'clamp(8px, 2.5vw, 35px)' }}></span>;
              const isHovered = hoveredLetterIdx === idx;
              return (
                <span
                  key={idx}
                  onMouseEnter={() => handleLetterHover(idx)}
                  onMouseLeave={() => setHoveredLetterIdx(null)}
                  style={{
                    display: 'inline-block',
                    cursor: 'pointer',
                    color: isHovered ? 'var(--accent-gold)' : '#FFFFFF',
                    transform: isHovered ? 'translateY(-24px) scaleY(1.2) rotate(6deg)' : 'translateY(0) scale(1) rotate(0)',
                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.15s ease',
                    textShadow: isHovered ? '0 10px 30px rgba(201, 162, 39, 0.4)' : 'none'
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </h2>
        </div>

        {/* BLOCK 2: Modular Glassmorphic Interactive Dashboard Cockpit */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
          {/* Card A: Audio Step Sequencer / Synthesizer */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '12px',
            padding: '24px',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Music size={14} color="var(--accent-gold)" /> STEP MATRIX SYNTH
              </div>
              <button 
                onClick={() => setIsSequencing(!isSequencing)}
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  color: isSequencing ? '#30D158' : '#8E8E93',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}
              >
                {isSequencing ? 'LOOPING (136 BPM)' : 'STOPPED'}
              </button>
            </div>

            {/* Step matrix board: rows: 4, columns: 4 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sequencer.map((row, rowIdx) => (
                <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {row.map((isActive, colIdx) => {
                    const isCurrentTick = activeStep === colIdx;
                    return (
                      <button
                        key={colIdx}
                        onClick={() => toggleSequencerPad(rowIdx, colIdx)}
                        style={{
                          height: '38px',
                          borderRadius: '6px',
                          background: isActive 
                            ? (isCurrentTick ? 'var(--accent-gold)' : 'rgba(201, 162, 39, 0.35)') 
                            : (isCurrentTick ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)'),
                          border: isActive 
                            ? '1px solid var(--accent-gold)' 
                            : '1px solid rgba(255,255,255,0.05)',
                          cursor: 'pointer',
                          boxShadow: isActive ? '0 0 10px rgba(201, 162, 39, 0.2)' : 'none',
                          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                          transform: isCurrentTick ? 'scale(1.05)' : 'scale(1)'
                        }}
                        title={`Toggle row ${rowIdx} step ${colIdx}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Dynamic Sound Wave visualizer SVG */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#8e95a5' }}>
                WAVEFORM:
              </span>
              <svg width="100%" height="24" viewBox="0 0 200 24" style={{ flexGrow: 1 }}>
                <path
                  d={isSequencing 
                    ? `M 0,12 Q 25,${12 + Math.sin(activeStep * 3) * 10} 50,12 T 100,12 T 150,12 T 200,12` 
                    : "M 0,12 L 200,12"
                  }
                  fill="transparent"
                  stroke="var(--accent-gold)"
                  strokeWidth="1.5"
                  style={{ transition: 'd 0.15s' }}
                />
              </svg>
            </div>
          </div>

          {/* Card B: Canvas Drawing Signature Pad */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '12px',
            padding: '24px',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <PenTool size={14} color="var(--accent-gold)" /> MAINFRAME SIGNATURE
              </div>
              {signatureSubmitted && (
                <span style={{ fontSize: '0.7rem', color: '#30D158', fontFamily: 'monospace', fontWeight: 'bold' }}>
                  SIGNED ✓
                </span>
              )}
            </div>

            {/* signature canvas area */}
            <div style={{ 
              position: 'relative', 
              borderRadius: '8px', 
              background: '#090a0d', 
              border: '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden' 
            }}>
              <canvas
                ref={sigCanvasRef}
                width="340"
                height="150"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '152px',
                  cursor: 'crosshair',
                  background: 'transparent'
                }}
              />
              
              {!isDrawing && !signatureSubmitted && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.15)',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace'
                }}>
                  LEAVE YOUR MARK HERE...
                </div>
              )}
            </div>

            {/* Clear and Submit Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={clearSignaturePad}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '6px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                <Trash2 size={12} /> CLEAR PAD
              </button>
              <button
                onClick={submitSignature}
                style={{
                  flex: 1.2,
                  background: 'var(--accent-gold)',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '6px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                SUBMIT SIGNATURE
              </button>
            </div>
          </div>

          {/* Card C: Diagnostic Terminal & System Optimization */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '12px',
            padding: '24px',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Monitor size={14} color="var(--accent-gold)" /> SYSTEM TELEMETRY
              </div>
              <span style={{ 
                fontSize: '0.7rem', 
                color: systemState === 'OPTIMIZING' ? 'var(--accent-gold)' : '#30D158', 
                fontFamily: 'monospace' 
              }}>
                FPS: {metrics.fps} | {metrics.latency}ms | {systemState}
              </span>
            </div>

            {/* Interactive Terminal console output */}
            <div style={{
              background: '#090a0d',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              color: '#8e95a5',
              height: '152px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flexGrow: 1 }}>
                {consoleLogs.length === 0 ? (
                  <div style={{ color: '#555A64', fontStyle: 'italic' }}>
                    Mainframe fully operational. CPU: 24C / 4.8Ghz. GPU WebGL enabled. Press below to run diagnostic matrices...
                  </div>
                ) : (
                  consoleLogs.map((log, idx) => {
                    if (!log || typeof log !== 'string') return null;
                    let color = '#8e95a5';
                    if (log.startsWith('[SUCCESS]')) color = '#30D158';
                    else if (log.startsWith('[CMD]')) color = 'var(--accent-gold)';
                    return (
                      <div key={idx} style={{ color, lineBreak: 'anywhere' }}>
                        {log}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Real-time Defrag progress bar */}
              {isOptimizing && (
                <div style={{ 
                  marginTop: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  borderTop: '1px solid rgba(255,255,255,0.05)', 
                  paddingTop: '8px' 
                }}>
                  <div style={{ 
                    flexGrow: 1, 
                    height: '3px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    borderRadius: '2px', 
                    overflow: 'hidden' 
                  }}>
                    <div style={{ 
                      width: `${progress}%`, 
                      height: '100%', 
                      background: 'var(--accent-gold)', 
                      transition: 'width 0.15s' 
                    }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', color: '#FFFFFF', minWidth: '24px', textAlign: 'right' }}>
                    {progress}%
                  </span>
                </div>
              )}
            </div>

            {/* Run optimize button */}
            <button
              onClick={triggerSystemDefrag}
              disabled={isOptimizing}
              style={{
                background: isOptimizing ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.04)',
                border: isOptimizing ? '1px solid rgba(255,255,255,0.02)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: isOptimizing ? 'not-allowed' : 'pointer',
                color: isOptimizing ? '#555A64' : '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.78rem',
                fontFamily: 'var(--font-interface)',
                letterSpacing: '0.05em',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (!isOptimizing) {
                  e.currentTarget.style.background = 'var(--accent-gold)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.color = '#000000';
                }
              }}
              onMouseLeave={(e) => {
                if (!isOptimizing) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
            >
              {isOptimizing ? (
                <>
                  <RefreshCw size={12} className="spin-element" style={{ animation: 'spin 2s linear infinite' }} />
                  <span>OPTIMIZING SYSTEM...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={12} />
                  <span>RUN DEFRAG OPTIMIZER</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* BLOCK 3: Futuristic CAD Bottom Control Dock */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 0.8fr', 
          gap: '60px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
          paddingTop: '40px',
          fontSize: '0.9rem',
          alignItems: 'start'
        }}>
          
          {/* Sitemap links and System mood preset color panels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '30px' }}>
            
            {/* Sitemap index */}
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '20px', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Website sitemap</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontWeight: 300 }}>
                <button 
                  onClick={() => scrollToSection(heroRef)} 
                  style={{ 
                    textAlign: 'left', 
                    color: '#8e95a5', 
                    cursor: 'pointer', 
                    fontSize: '0.88rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    transition: 'color 0.2s' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#8e95a5'; }}
                >
                  <ChevronRight size={12} color="var(--accent-gold)" /> Home Moment
                </button>
                <button 
                  onClick={() => scrollToSection(websitesRef)} 
                  style={{ 
                    textAlign: 'left', 
                    color: '#8e95a5', 
                    cursor: 'pointer', 
                    fontSize: '0.88rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    transition: 'color 0.2s' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#8e95a5'; }}
                >
                  <ChevronRight size={12} color="var(--accent-gold)" /> Websites
                </button>
                <button 
                  onClick={() => scrollToSection(productsRef)} 
                  style={{ 
                    textAlign: 'left', 
                    color: '#8e95a5', 
                    cursor: 'pointer', 
                    fontSize: '0.88rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    transition: 'color 0.2s' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#8e95a5'; }}
                >
                  <ChevronRight size={12} color="var(--accent-gold)" /> Software Tools
                </button>
                <button 
                  onClick={() => scrollToSection(technicalRef)} 
                  style={{ 
                    textAlign: 'left', 
                    color: '#8e95a5', 
                    cursor: 'pointer', 
                    fontSize: '0.88rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    transition: 'color 0.2s' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#8e95a5'; }}
                >
                  <ChevronRight size={12} color="var(--accent-gold)" /> Case Studies
                </button>
                <button 
                  onClick={() => scrollToSection(founderRef)} 
                  style={{ 
                    textAlign: 'left', 
                    color: '#8e95a5', 
                    cursor: 'pointer', 
                    fontSize: '0.88rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    transition: 'color 0.2s' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#8e95a5'; }}
                >
                  <ChevronRight size={12} color="var(--accent-gold)" /> How I Work
                </button>
              </div>
            </div>
            
            {/* Global preset color swapper buttons */}
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '20px', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Flame size={12} color="var(--accent-gold)" /> Presets mood
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {THEMES.map((theme) => {
                  const isActive = activeTheme === theme.name;
                  return (
                    <button
                      key={theme.name}
                      onClick={() => selectThemeMood(theme)}
                      style={{
                        padding: '8px 12px',
                        background: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                        border: isActive ? `1px solid ${theme.colorHex}` : '1px solid rgba(255,255,255,0.03)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.3s'
                      }}
                    >
                      <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: theme.colorHex,
                        boxShadow: isActive ? `0 0 6px ${theme.colorHex}` : 'none'
                      }} />
                      <span style={{ 
                        fontSize: '0.74rem', 
                        fontFamily: 'monospace', 
                        fontWeight: 600, 
                        color: isActive ? '#FFFFFF' : '#8e95a5' 
                      }}>
                        {theme.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Operational Hub statistics */}
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '20px', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Mainframe Hub</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '20px', fontSize: '0.84rem', color: '#8e95a5', fontWeight: 300 }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#555A64' }}>MAIN HUB</div>
                <div style={{ color: '#FFF', fontWeight: 500, marginTop: '4px' }}>Mumbai, India</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#555A64' }}>GLOBAL NODES</div>
                <div style={{ color: '#FFF', fontWeight: 500, marginTop: '4px' }}>Global Remote Active</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#555A64' }}>COMMISSIONING</div>
                <div style={{ color: '#30D158', fontWeight: 'bold', marginTop: '4px' }}>OPEN MATRIX</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#555A64' }}>COPYRIGHTS</div>
                <div style={{ color: '#555A64', fontSize: '0.7rem', marginTop: '4px' }}>© 2026 ADVAIT. All rights.</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Confetti Animation Layer inside the entire redesigned footer */}
      {confettiActive && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
          overflow: 'hidden'
        }}>
          {Array.from({ length: 40 }).map((_, idx) => {
            const size = Math.random() * 8 + 4;
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 2.5 + 2;
            const colors = ['#C9A227', '#FAFAF8', '#A8ADB4', '#2563EB', '#F97316'];
            const color = colors[idx % colors.length];

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  background: color,
                  left: `${left}%`,
                  animation: `fall-confetti ${duration}s linear ${delay}s infinite`,
                  opacity: 0.8
                }}
              />
            );
          })}
        </div>
      )}

      {/* Embedded CSS Animations keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes fall-confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(1000px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

    </footer>
  );
};

export default InteractiveFooter;
