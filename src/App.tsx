import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Palette, Menu, X } from 'lucide-react';
import LogoIcon from './components/LogoIcon';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // States and refs for Scroll and Header elegance
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const selectedTheme = themes.find(t => t.id === theme) || themes[0];
    localStorage.setItem('advait-portfolio-theme', theme);
    document.documentElement.style.setProperty('--accent-gold', selectedTheme.primaryColor);
    document.documentElement.style.setProperty('--accent-gold-text', selectedTheme.textColor);
    document.documentElement.style.setProperty('--accent-glow', selectedTheme.glowColor);
  }, [theme]);

  // Handle Smart Scroll and Dynamic Header tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (currentScrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Skip header toggling if we are scrolling via nav links clicks
      if (isNavigatingRef.current) {
        lastScrollY.current = currentScrollY;
        return;
      }

      // Keep header visible when mobile drawer is open
      if (isMobileMenuOpen) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 50) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        // Scroll down: Hide header
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        // Scroll up: Reveal header
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run to set state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const lenisRef = useRef<Lenis | null>(null);

  // Custom Cursor Positions
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Moment Section Refs for Smooth Anchoring
  const heroRef = useRef<HTMLDivElement>(null);
  const websitesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // 1. Lenis Smooth Scroll Initialization with RAF cancel fix to prevent memory leaks
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      // Lock scroll natively during preload
      document.body.style.overflow = 'hidden';
      return;
    }

    const lenis = new Lenis({
      duration: 1.6, // Buttery soft slow-out
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium slow out
      infinite: false,
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.90 // Dampen mechanical scroll clicks
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
    } else {
      // Native scroll lock coordinate for touch/mobile
      if (isPreloaded) {
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = 'hidden';
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
      ease: 'power3.out',
      clearProps: 'transform,opacity'
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
  // 2. Custom Spring Cursor Implementation (GPU-Accelerated)
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Disable custom cursor on touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!hasMoved) {
        hasMoved = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      // Damped spring following
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
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
          { opacity: 0, y: 40 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.4, 
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

      // D. Cybernetic Block Reveal animations (Dual-Layer Sweep)
      const blockRevealElements = gsap.utils.toArray('.gsap-reveal-block') as HTMLElement[];
      blockRevealElements.forEach((el) => {
        let barBack = el.querySelector('.reveal-block-bar.bar-back') as HTMLElement;
        let barFront = el.querySelector('.reveal-block-bar.bar-front') as HTMLElement;
        
        if (!barBack || !barFront) {
          el.querySelectorAll('.reveal-block-bar').forEach(c => c.remove());
          
          barBack = document.createElement('span');
          barBack.className = 'reveal-block-bar bar-back';
          
          barFront = document.createElement('span');
          barFront.className = 'reveal-block-bar bar-front';
          
          el.appendChild(barBack);
          el.appendChild(barFront);
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        });

        tl.to([barBack, barFront], {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.inOut',
          transformOrigin: 'left'
        })
        .set(el, { color: 'inherit' }) // reveal original text
        .to([barBack, barFront], {
          scaleX: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.inOut',
          transformOrigin: 'right'
        });
      });

      // E. Decrypt/Scramble Text Reveal & Typewriter effects (With Glitch Initializer & Glow Locks)
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
            const decryptMode = el.classList.contains('gsap-reveal-scramble');
            
            if (decryptMode) {
              let glitchCount = 0;
              const glitchInterval = setInterval(() => {
                el.innerHTML = glitchCount % 2 === 0 
                  ? `<span style="color: var(--accent-gold-text); text-shadow: 0 0 10px var(--accent-gold);">[DECRYPTING...]</span>`
                  : `<span style="color: var(--text-secondary);">[DECRYPTING...]</span>`;
                glitchCount++;
                
                if (glitchCount > 5) {
                  clearInterval(glitchInterval);
                  runReveal();
                }
              }, 70);
            } else {
              runReveal();
            }

            function runReveal() {
              el.textContent = '';
              let progress = 0;
              const speed = Number(el.dataset.typeSpeed) || 30; // ms per char
              const chars = '01#$/\\_-+=%*@[]{}&?!';

              const interval = setInterval(() => {
                progress++;
                if (progress > originalText.length) {
                  el.innerHTML = originalText;
                  el.classList.remove('typewriter-cursor'); // remove cursor
                  clearInterval(interval);
                  
                  gsap.fromTo(el,
                    { textShadow: '0 0 16px var(--accent-gold)', color: 'var(--accent-gold-text)' },
                    { textShadow: 'none', color: 'inherit', duration: 0.7, ease: 'power2.out' }
                  );
                  return;
                }

                let completedText = originalText.substring(0, progress - 1);
                if (decryptMode && progress <= originalText.length) {
                  const randomChar = chars[Math.floor(Math.random() * chars.length)];
                  const activeSpan = `<span class="scramble-active-char">${randomChar}</span>`;
                  el.innerHTML = completedText + activeSpan;
                } else {
                  el.textContent = completedText + originalText.charAt(progress - 1);
                }
              }, speed);
            }
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
    if (ref.current) {
      isNavigatingRef.current = true;
      setIsHeaderVisible(true); // Ensure header stays visible during animated travel

      const scrollOptions = {
        offset: -80,
        duration: 1.6,
        onComplete: () => {
          setTimeout(() => {
            isNavigatingRef.current = false;
          }, 50);
        }
      };

      if (lenisRef.current) {
        lenisRef.current.scrollTo(ref.current, scrollOptions);
      } else if (ref.current) {
        const yOffset = -80;
        const element = ref.current;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 800);
      }
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

      {/* Sleek Theme-aware Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Redesigned Tech HUD Floating Header Navigation */}
      <header className={`header-cyber ${!isHeaderVisible ? 'header-hidden' : ''}`} style={{
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
            <LogoIcon size={20} className="logo-svg" />
            <span className="cyber-dot-pulsator" />
          </div>
          <div className="logo-title-cyber">
            <span>ADVAIT A KHANGAR</span>
            <span className="logo-subtitle-cyber">// CUSTOM SOFTWARE & AI DEVELOPER</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="cyber-nav-container">
          <button onClick={() => scrollToSection(websitesRef)} className="nav-item-cyber">
            <span className="nav-item-idx">01 //</span>
            Websites
          </button>
          <button onClick={() => scrollToSection(productsRef)} className="nav-item-cyber">
            <span className="nav-item-idx">02 //</span>
            Software Tools
          </button>
          <button onClick={() => scrollToSection(technicalRef)} className="nav-item-cyber">
            <span className="nav-item-idx">03 //</span>
            Case Studies
          </button>
          <button onClick={() => scrollToSection(founderRef)} className="nav-item-cyber">
            <span className="nav-item-idx">04 //</span>
            How I Work
          </button>
          <button onClick={() => scrollToSection(aiRef)} className="nav-item-cyber">
            <span className="nav-item-idx">05 //</span>
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

        {/* Mobile Hamburger Toggle */}
        <button 
          className="cyber-hamburger" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          style={{ zIndex: 1001 }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`cyber-mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <div style={{ position: 'absolute', top: '12px', left: '12px', width: '6px', height: '6px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)', opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: '12px', right: '12px', width: '6px', height: '6px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)', opacity: 0.6 }} />
        
        <nav className="cyber-mobile-nav">
          <button onClick={() => { scrollToSection(websitesRef); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            <span className="nav-item-idx">01 //</span> Websites
          </button>
          <button onClick={() => { scrollToSection(productsRef); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            <span className="nav-item-idx">02 //</span> Software Tools
          </button>
          <button onClick={() => { scrollToSection(technicalRef); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            <span className="nav-item-idx">03 //</span> Case Studies
          </button>
          <button onClick={() => { scrollToSection(founderRef); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            <span className="nav-item-idx">04 //</span> How I Work
          </button>
          <button onClick={() => { scrollToSection(aiRef); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            <span className="nav-item-idx">05 //</span> Ask AI
          </button>
          
          <button 
            onClick={() => { scrollToSection(contactRef); setIsMobileMenuOpen(false); }} 
            className="btn-quote-cyber"
            style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
          >
            <span>Get a Free Quote</span>
            <ArrowUpRight size={14} />
          </button>
        </nav>
      </div>

      {/* Main Structural Layout Stack */}
      <main className="layout-moments-container">
        
        <div ref={heroRef}>
          <HeroMoment 
            onExplore={() => scrollToSection(websitesRef)} 
            onContact={() => scrollToSection(contactRef)} 
          />
        </div>

        <StoryMoment />

        <div ref={websitesRef}>
          <ProductMoment type="websites" />
        </div>

        <div ref={productsRef}>
          <ProductMoment type="software" />
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
        references={{ heroRef, websitesRef, productsRef, technicalRef, founderRef }} 
      />
    </>
  );
};

export default App;
