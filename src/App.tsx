import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, ArrowUpRight, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
import SystemCore from './components/SystemCore';
import HeroMoment from './components/HeroMoment';
import StoryMoment from './components/StoryMoment';
import ProductMoment from './components/ProductMoment';
import TechnicalMoment from './components/TechnicalMoment';
import FounderMoment from './components/FounderMoment';
import AskAdvaitAI from './components/AskAdvaitAI';
import ContactMoment from './components/ContactMoment';
import Preloader from './components/Preloader';
import InteractiveFooter from './components/InteractiveFooter';

interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  textColor: string;
  glowColor: string;
}

const themes: ThemeOption[] = [
  { id: 'gold', name: 'Imperial Gold', primaryColor: '#C9A227', textColor: '#8A6916', glowColor: 'rgba(201, 162, 39, 0.08)' },
  { id: 'indigo', name: 'Electric Indigo', primaryColor: '#4F46E5', textColor: '#3730A3', glowColor: 'rgba(79, 70, 229, 0.08)' },
  { id: 'emerald', name: 'Royal Emerald', primaryColor: '#059669', textColor: '#065F46', glowColor: 'rgba(5, 150, 105, 0.08)' },
  { id: 'coral', name: 'Sunset Coral', primaryColor: '#EA580C', textColor: '#9A3412', glowColor: 'rgba(234, 88, 12, 0.08)' },
  { id: 'amethyst', name: 'Ethereal Rose', primaryColor: '#BE185D', textColor: '#831843', glowColor: 'rgba(190, 24, 93, 0.08)' }
];

export const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('advait-portfolio-theme') || 'gold');
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    const selectedTheme = themes.find(t => t.id === theme) || themes[0];
    localStorage.setItem('advait-portfolio-theme', theme);
    document.documentElement.style.setProperty('--accent-gold', selectedTheme.primaryColor);
    document.documentElement.style.setProperty('--accent-gold-text', selectedTheme.textColor);
    document.documentElement.style.setProperty('--accent-glow', selectedTheme.glowColor);
  }, [theme]);
  const lenisRef = useRef<Lenis | null>(null);

  // Custom Cursor Positions
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Moment Section Refs for Smooth Anchoring
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // 1. Lenis Smooth Scroll Initialization with RAF cancel fix to prevent memory leaks
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium slow out
      infinite: false,
      gestureOrientation: 'vertical'
    });

    lenisRef.current = lenis;
    lenis.stop(); // Lock scrolling initially during preloading

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 2. Lenis Scroll lock coordination
  useEffect(() => {
    if (lenisRef.current) {
      if (isPreloaded) {
        lenisRef.current.start();
      } else {
        lenisRef.current.stop();
      }
    }
  }, [isPreloaded]);

  // 3. Typographic Mask Reveal & Stagger Animation Trigger
  const handlePreloaderComplete = () => {
    setIsPreloaded(true);
    
    const tl = gsap.timeline();
    
    // A. Header Navigation slides down from -40px
    tl.to('header', {
      duration: 1.2,
      y: 0,
      opacity: 1,
      ease: 'power3.out'
    });

    // B. Typographic Lines slide up stagger
    tl.to('.hero-moment-section .hidden-reveal-line', {
      duration: 1.3,
      y: 0,
      stagger: 0.14,
      ease: 'power4.out'
    }, '-=0.8');

    // C. Interactive button containers & stats fade in
    tl.to(['.hero-btn-container', '.hero-stats-container'], {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.6');
  };

  // 2. Custom Spring Cursor Implementation
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      // Damped spring following
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(animateRing);

    // Hover states for magnetic reactions on links and buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        dot.style.width = '24px';
        dot.style.height = '24px';
        dot.style.background = 'rgba(201, 162, 39, 0.4)'; // Gold tint
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.borderColor = 'var(--accent-gold)';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.background = 'var(--text-primary)';
        ring.style.width = '40px';
        ring.style.height = '40px';
        ring.style.borderColor = 'rgba(17, 17, 17, 0.15)';
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 4. Site-Wide GSAP Scroll Reveal Initialization
  useEffect(() => {
    if (!isPreloaded) return;

    const ctx = gsap.context(() => {
      // A. Fade Up animations
      const fadeUpElements = gsap.utils.toArray('.gsap-reveal-fade-up') as HTMLElement[];
      fadeUpElements.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 35 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: 'power3.out', 
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // B. Mask Up animations (reveal from container overflow hidden)
      const maskElements = gsap.utils.toArray('.gsap-reveal-mask-up') as HTMLElement[];
      maskElements.forEach((el) => {
        const child = el.firstElementChild;
        if (child) {
          gsap.fromTo(child,
            { y: '115%' },
            { 
              y: '0%', 
              duration: 1.4, 
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });

      // C. Staggered item animations
      const staggerContainers = gsap.utils.toArray('.gsap-reveal-stagger') as HTMLElement[];
      staggerContainers.forEach((container) => {
        const items = container.querySelectorAll('.gsap-reveal-item');
        if (items.length > 0) {
          gsap.fromTo(items,
            { opacity: 0, y: 25 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.9, 
              stagger: 0.12, 
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });

      // D. Cybernetic Block Reveal animations
      const blockRevealElements = gsap.utils.toArray('.gsap-reveal-block') as HTMLElement[];
      blockRevealElements.forEach((el) => {
        let bar = el.querySelector('.reveal-block-bar') as HTMLElement;
        if (!bar) {
          bar = document.createElement('span');
          bar.className = 'reveal-block-bar';
          el.appendChild(bar);
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        });

        tl.to(bar, {
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.inOut',
          transformOrigin: 'left'
        })
        .set(el, { color: 'inherit' }) // reveal original text
        .to(bar, {
          scaleX: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          transformOrigin: 'right'
        });
      });

      // E. Decrypt/Scramble Text Reveal & Typewriter effects
      const typewriterElements = gsap.utils.toArray('.gsap-reveal-typewriter, .gsap-reveal-scramble') as HTMLElement[];
      typewriterElements.forEach((el) => {
        const originalText = el.textContent || '';
        el.textContent = ''; // clear initially
        el.classList.add('typewriter-cursor');

        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
          onEnter: () => {
            let progress = 0;
            const speed = Number(el.dataset.typeSpeed) || 30; // ms per char
            const chars = '01#$/\\_-+=%*@[]{}&?!';
            const decryptMode = el.classList.contains('gsap-reveal-scramble');

            const interval = setInterval(() => {
              progress++;
              if (progress > originalText.length) {
                el.textContent = originalText;
                el.classList.remove('typewriter-cursor'); // remove cursor
                clearInterval(interval);
                return;
              }

              let text = originalText.substring(0, progress - 1);
              if (decryptMode) {
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                text += randomChar;
              } else {
                text += originalText.charAt(progress - 1);
              }
              el.textContent = text;
            }, speed);
          }
        });
      });
    });

    // Refresh triggers to ensure correct layout start position
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [isPreloaded]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (lenisRef.current && ref.current) {
      lenisRef.current.scrollTo(ref.current, { offset: -80, duration: 1.6 });
    }
  };

  return (
    <>
      {/* Premium Welcome Preloader */}
      <Preloader theme={theme} onComplete={handlePreloaderComplete} />

      {/* Dynamic Cursors */}
      <div ref={cursorDotRef} className="custom-cursor" />
      <div ref={cursorRingRef} className="custom-cursor-ring" />

      {/* Dynamic Floating Theme Selector */}
      <div className="theme-switcher-floating">
        <div className="theme-switcher-trigger">
          <Palette size={16} />
        </div>
        <div className="theme-options-container">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-option-btn ${theme === t.id ? 'active' : ''}`}
              style={{ backgroundColor: t.primaryColor }}
              onClick={() => setTheme(t.id)}
              data-tooltip={t.name}
              aria-label={`Switch to ${t.name} theme`}
            />
          ))}
        </div>
      </div>

      {/* Tactile Grain Overlay */}
      <div className="grain-overlay" />

      {/* Interactive 3D WebGL Canvas Layer */}
      <SystemCore theme={theme} isPreloaded={isPreloaded} />

      {/* Redesigned Tech HUD Floating Header Navigation */}
      <header className="header-cyber" style={{
        opacity: 0,
        transform: 'translateY(-40px)'
      }}>
        
        {/* Cyber corner brackets */}
        <div style={{ position: 'absolute', top: '6px', left: '6px', width: '6px', height: '6px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)', opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)', opacity: 0.6 }} />
        <div style={{ position: 'absolute', bottom: '6px', left: '6px', width: '6px', height: '6px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)', opacity: 0.6 }} />
        <div style={{ position: 'absolute', bottom: '6px', right: '6px', width: '6px', height: '6px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)', opacity: 0.6 }} />
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="cyber-logo-box">
            <Code2 size={16} color="var(--accent-gold)" />
            <span className="cyber-dot-pulsator" />
          </div>
          <div className="logo-title-cyber">
            <span>ADVAIT A KHANGAR</span>
            <span className="logo-subtitle-cyber">// CUSTOM SOFTWARE & AI DEVELOPER</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="cyber-nav-container">
          <button onClick={() => scrollToSection(productsRef)} className="nav-item-cyber">
            <span className="nav-item-idx">01 //</span>
            Software Tools
          </button>
          <button onClick={() => scrollToSection(technicalRef)} className="nav-item-cyber">
            <span className="nav-item-idx">02 //</span>
            Case Studies
          </button>
          <button onClick={() => scrollToSection(founderRef)} className="nav-item-cyber">
            <span className="nav-item-idx">03 //</span>
            How I Work
          </button>
          <button onClick={() => scrollToSection(aiRef)} className="nav-item-cyber">
            <span className="nav-item-idx">04 //</span>
            Ask AI
          </button>
        </nav>

        <button 
          onClick={() => scrollToSection(contactRef)} 
          className="btn-quote-cyber" 
        >
          <span>Get a Free Quote</span>
          <ArrowUpRight size={14} />
        </button>
      </header>

      {/* Main Structural Layout Stack */}
      <main className="layout-moments-container">
        
        <div ref={heroRef}>
          <HeroMoment 
            onExplore={() => scrollToSection(productsRef)} 
            onContact={() => scrollToSection(contactRef)} 
          />
        </div>

        <StoryMoment />

        <div ref={productsRef}>
          <ProductMoment />
        </div>

        <div ref={technicalRef}>
          <TechnicalMoment />
        </div>

        <div ref={founderRef}>
          <FounderMoment />
        </div>

        <div ref={aiRef}>
          <AskAdvaitAI />
        </div>

        <div ref={contactRef}>
          <ContactMoment />
        </div>

      </main>

      {/* Interactive, sensory-rich Dashboard Footer */}
      <InteractiveFooter 
        scrollToSection={scrollToSection} 
        references={{ heroRef, productsRef, technicalRef, founderRef }} 
      />
    </>
  );
};

export default App;
