import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  theme: string;
  onComplete: () => void;
}

interface ThemeColors {
  id: string;
  name: string;
  primary: string;
  text: string;
  glow: string;
}

const THEME_MAP: Record<string, ThemeColors> = {
  gold: { id: 'gold', name: 'Imperial Gold', primary: '#C9A227', text: '#8A6916', glow: 'rgba(201, 162, 39, 0.08)' },
  indigo: { id: 'indigo', name: 'Electric Indigo', primary: '#4F46E5', text: '#3730A3', glow: 'rgba(79, 70, 229, 0.08)' },
  emerald: { id: 'emerald', name: 'Royal Emerald', primary: '#059669', text: '#065F46', glow: 'rgba(5, 150, 105, 0.08)' },
  coral: { id: 'coral', name: 'Sunset Coral', primary: '#EA580C', text: '#9A3412', glow: 'rgba(234, 88, 12, 0.08)' },
  amethyst: { id: 'amethyst', name: 'Ethereal Rose', primary: '#BE185D', text: '#831843', glow: 'rgba(190, 24, 93, 0.08)' }
};

// ==========================================================================
// MAIN INTERACTIVE PRELOADER EXPORT
// ==========================================================================
export const Preloader: React.FC<PreloaderProps> = ({ theme, onComplete }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const activeColors = THEME_MAP[theme] || THEME_MAP.gold;
  const activeColor = activeColors.primary;

  // Curtain exit timeline
  const triggerExitTimeline = () => {
    if (!pathRef.current || !containerRef.current) return;

    const exitTimeline = gsap.timeline({
      onComplete: () => {
        setIsHidden(true);
        onComplete();
      }
    });

    // Fade out preloader system components
    exitTimeline.to(
      ['.preloader-welcome-overlay', '.preloader-grid-overlay', '.preloader-ambient-glow'],
      {
        duration: 0.6,
        y: -40,
        opacity: 0,
        stagger: 0.08,
        ease: 'power3.in'
      }
    );

    // Liquid Curtain upward morph wipe (elastic pull)
    exitTimeline.to(
      pathRef.current,
      {
        duration: 1.1,
        attr: { d: 'M 0 0 L 100 0 L 100 0 Q 50 100 0 0 Z' },
        ease: 'power4.inOut'
      },
      '-=0.45'
    );

    // Flatten vector wave past the boundary
    exitTimeline.to(pathRef.current, {
      duration: 0.4,
      attr: { d: 'M 0 0 L 100 0 L 100 0 L 0 0 Z' },
      ease: 'power2.out'
    });

    // Close down preloader container overlay
    exitTimeline.to(
      containerRef.current,
      {
        duration: 0.1,
        display: 'none'
      },
      '-=0.1'
    );
  };

  // Start booting automatically
  const triggerBootSequence = () => {
    if (isBooting) return;
    setIsBooting(true);

    const progressObj = { value: 0 };

    gsap.to(progressObj, {
      value: 100,
      duration: 2.2, // Smooth, editorial duration
      ease: 'power3.out',
      onUpdate: () => {
        const val = Math.floor(progressObj.value);
        setBootProgress(val);
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${progressObj.value}%`;
        }
      },
      onComplete: () => {
        setBootProgress(100);
        if (progressFillRef.current) {
          progressFillRef.current.style.width = '100%';
        }
        setTimeout(() => {
          triggerExitTimeline();
        }, 300);
      }
    });
  };

  useEffect(() => {
    triggerBootSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* SVG Liquid Curtain wipe (direct root sibling for absolute z-indexing control) */}
      <svg className="preloader-svg-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path ref={pathRef} d="M 0 0 L 100 0 L 100 100 L 0 100 Z" />
      </svg>

      {/* Grid, Glow, and centered welcome lockup */}
      <div ref={containerRef} className="premium-preloader">
        
        {/* Technical Blueprint Grid Overlay */}
        <div className="preloader-grid-overlay" />

        {/* Floating Radial Glow in Theme Color */}
        <div className="preloader-ambient-glow" style={{ 
          background: `radial-gradient(circle, ${activeColors.glow} 0%, transparent 65%)` 
        }} />

        {/* Centered Welcome HUD Overlay */}
        <div className="preloader-welcome-overlay">
          <div className="preloader-welcome-content">
            
            {/* Minimal Subtitle */}
            <span className="preloader-welcome-tagline" style={{ color: activeColors.text }}>
              SYSTEM DYNAMICS CORE // AK-v5.0
            </span>
            
            {/* Elegant Serif Welcome Title */}
            <h1 className="preloader-welcome-title">
              WELCOME GUEST
            </h1>
            
            {/* Divider Line */}
            <div className="preloader-welcome-line-track">
              <div 
                ref={progressFillRef}
                className="preloader-welcome-line-fill" 
                style={{ 
                  width: '0%',
                  backgroundColor: activeColor,
                  boxShadow: `0 0 8px ${activeColor}`
                }} 
              />
            </div>

            {/* Micro loading details */}
            <div className="preloader-welcome-status-row">
              <span className="status-text">INITIALIZING EXPERIENCE...</span>
              <span className="status-percent" style={{ color: activeColors.text }}>
                {String(bootProgress).padStart(3, '0')}%
              </span>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Preloader;
