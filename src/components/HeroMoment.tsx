import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

interface HeroMomentProps {
  onExplore: () => void;
  onContact: () => void;
}

export const HeroMoment: React.FC<HeroMomentProps> = ({ onExplore, onContact }) => {
  return (
    <section className="moment-section hero-moment-section">
      <div className="grid-editorial-2col" style={{ width: '90%', margin: '0 auto', maxWidth: '1440px', position: 'relative', zIndex: 3 }}>
        
        {/* Left Editorial Narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          
          <div className="line-mask-wrapper" style={{ marginBottom: '24px' }}>
            <div className="editorial-label hidden-reveal-line" style={{ marginBottom: 0 }}>
              CUSTOM SOFTWARE & AUTOMATION
            </div>
          </div>
          
          <h1 className="editorial-title-large" style={{ marginBottom: '20px', fontWeight: 400, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="line-mask-wrapper">
              <span className="hidden-reveal-line">I BUILD</span>
            </span>
            <span className="line-mask-wrapper">
              <span className="hidden-reveal-line" style={{ color: 'var(--accent-gold)' }}>CUSTOM SOFTWARE</span>
            </span>
            <span className="line-mask-wrapper">
              <span className="hidden-reveal-line"> &amp; AI ASSISTANTS</span>
            </span>
            <span className="line-mask-wrapper">
              <span className="hidden-reveal-line" style={{ fontSize: '0.85em', opacity: 0.9 }}>THAT AUTOMATE YOUR BUSINESS.</span>
            </span>
          </h1>
          
          <div className="line-mask-wrapper" style={{ marginBottom: '32px', display: 'block' }}>
            <p className="editorial-text hidden-reveal-line" style={{ fontSize: '1.25rem' }}>
              Full Stack Developer &amp; AI Automation Engineer building custom tools that handle your repetitive daily tasks, save hundreds of hours, and help your business grow smoothly without extra staff.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', opacity: 0, transform: 'translateY(15px)' }} className="hero-btn-container">
            <button className="btn-premium" onClick={onExplore}>
              <span>View Software</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={onContact}>
              <span>Book a Call</span>
              <Terminal size={18} />
            </button>
          </div>
          
          {/* Magazine footer stats */}
          <div style={{ 
            display: 'flex', 
            gap: '80px', 
            marginTop: '60px', 
            borderTop: '1px solid var(--border-light)', 
            paddingTop: '20px',
            maxWidth: '650px',
            opacity: 0,
            transform: 'translateY(15px)'
          }} className="hero-stats-container">
            <div>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Operational Focus
              </div>
              <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                Save Time &amp; Costs
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Expertise
              </div>
              <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                Custom Software &amp; AI
              </div>
            </div>
          </div>

        </div>
        
        {/* Right column serves as negative space to frame the 3D System Core */}
        <div style={{ height: '100%', minHeight: '400px' }} />
        
      </div>
    </section>
  );
};

export default HeroMoment;
