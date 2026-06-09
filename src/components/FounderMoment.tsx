import React from 'react';
import { Target, Zap, Cpu } from 'lucide-react';

export const FounderMoment: React.FC = () => {
  const philosophies = [
    {
      icon: <Target size={24} color="var(--accent-gold)" />,
      title: 'Business-First Coding',
      desc: 'Every database and automation system I build has a single purpose: to solve a real bottleneck in your business, save your team time, or stop your operations from losing money.'
    },
    {
      icon: <Zap size={24} color="var(--accent-blue)" />,
      title: '100% Workforce Automation',
      desc: 'If your staff has to repeat a task manually more than three times, that task should be automated. I move manual work into secure, background software workers that run 24/7.'
    },
    {
      icon: <Cpu size={24} color="var(--accent-orange)" />,
      title: 'Unbreakable & Secure Software',
      desc: 'I build software that is modular and fail-safe. If a third-party service or API goes down, your main billing ledgers and database core will continue running with zero interruption.'
    }
  ];

  return (
    <section className="moment-section founder-moment-section" style={{ position: 'relative', zIndex: 3, background: 'rgba(250, 250, 248, 0.9)', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ width: '90%', margin: '0 auto', maxWidth: '1440px' }}>
        
        {/* Title */}
        <div style={{ marginBottom: 'var(--heading-to-content-gap)' }}>
          <div className="editorial-label gsap-reveal-scramble" data-type-speed={30}>ABOUT ME</div>
          <h2 className="editorial-title-medium gsap-reveal-fade-up" style={{ fontWeight: 400 }}>
            The Software Developer <br />
            <span className="gsap-reveal-block" style={{ color: 'var(--accent-gold)' }}>Behind the Platforms.</span>
          </h2>
        </div>

        {/* Story Grid */}
        <div className="grid-editorial-2col" style={{ alignItems: 'start' }}>
          
          {/* Narrative Text */}
          <div>
            <h3 className="gsap-reveal-fade-up" style={{ 
              fontFamily: 'var(--font-editorial)', 
              fontSize: '2rem', 
              color: 'var(--text-primary)', 
              marginBottom: '24px',
              fontWeight: 400,
              lineHeight: '1.3'
            }}>
              "Good software is not just a tool. It is the operational backbone that keeps your business running smoothly."
            </h3>
            
            <p className="editorial-text gsap-reveal-fade-up" style={{ marginBottom: '24px', fontSize: '1.15rem' }}>
              I specialize in building custom business portals, automated invoicing tools, fast database systems, and smart AI phone receptionists. I don't build standard generic websites—I build powerful software machines that solve real operational issues.
            </p>
            
            <p className="editorial-text gsap-reveal-fade-up" style={{ marginBottom: '32px' }}>
              Whether you are a scaling startup or an established manufacturer, I re-engineer your slow manual tasks into fast, highly secure digital platforms. My work helps your business run with mathematical speed, absolute data safety, and zero system crashes.
            </p>
 
            <blockquote className="gsap-reveal-fade-up" style={{ 
              borderLeft: '4px solid var(--accent-gold)', 
              paddingLeft: '24px', 
              margin: '40px 0', 
              fontFamily: 'var(--font-editorial)',
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
              fontStyle: 'italic'
            }}>
              "My goal is simple: to make your business run like a clock—fully automated, completely secure, and ready to handle massive new sales and customer growth."
            </blockquote>
          </div>

          {/* Philosophy list (Avoid repetitive grids: clean stack list) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="gsap-reveal-stagger">
            <div className="gsap-reveal-item" style={{ 
              fontFamily: 'var(--font-interface)', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              color: 'var(--text-secondary)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              marginBottom: '8px',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '16px'
            }}>
              SYSTEM ENGINE PHILSOPHIES
            </div>

            {philosophies.map((p, idx) => (
              <div key={idx} className="premium-surface gsap-reveal-item" style={{ 
                display: 'flex', 
                gap: '24px', 
                alignItems: 'start'
              }}>
                <div style={{ 
                  background: 'var(--bg-primary)', 
                  padding: '16px', 
                  borderRadius: '6px',
                  border: '1px solid var(--border-light)',
                  flexShrink: 0
                }}>
                  {p.icon}
                </div>
                <div>
                  <h4 style={{ 
                    fontFamily: 'var(--font-interface)', 
                    fontSize: '1.2rem', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)', 
                    marginBottom: '12px' 
                  }}>
                    {p.title}
                  </h4>
                  <p style={{ 
                    fontFamily: 'var(--font-interface)', 
                    fontSize: '0.95rem', 
                    color: 'var(--text-secondary)',
                    fontWeight: 300,
                    lineHeight: '1.6'
                  }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FounderMoment;
