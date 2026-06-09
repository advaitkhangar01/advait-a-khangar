import React from 'react';

export const StoryMoment: React.FC = () => {
  const metrics = [
    { value: '450%', label: 'Workforce Speed Boost', desc: 'Average increase in daily task handling and transaction speed after custom software upgrades.' },
    { value: '12,000+', label: 'Man-Hours Automated', desc: 'Repetitive daily tasks migrated from manual labor into fully automatic AI workers.' },
    { value: '99.98%', label: 'System Reliability', desc: 'Uptime and continuous operational safety across all database and automation networks.' }
  ];

  return (
    <section className="moment-section story-moment-section" style={{ position: 'relative', zIndex: 3, background: 'rgba(250, 250, 248, 0.9)', paddingTop: '60px', paddingBottom: '60px' }}>
      <div style={{ width: '90%', margin: '0 auto', maxWidth: '1440px' }}>
        
        {/* Main Editorial Quote */}
        <div style={{ marginBottom: '24px' }}>
          <div className="editorial-label gsap-reveal-scramble" data-type-speed={40}>PHILOSOPHY STATEMENT</div>
          
          <h2 className="editorial-title-medium gsap-reveal-fade-up" style={{ 
            maxWidth: '900px', 
            fontFamily: 'var(--font-editorial)', 
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', 
            lineHeight: '1.2',
            fontWeight: 400,
            margin: '12px 0 0 0'
          }}>
            “I DON'T JUST BUILD WEBSITES. <br />
            <span className="gsap-reveal-block" style={{ color: 'var(--accent-gold)' }}>I BUILD AUTOMATED SYSTEMS.</span>”
          </h2>
        </div>

        {/* Narrative & Metrics block split */}
        <div className="grid-editorial-2col" style={{ marginTop: '24px', alignItems: 'center' }}>
          
          <div>
            <p className="editorial-text gsap-reveal-fade-up" style={{ fontSize: '1.15rem', marginBottom: '20px' }}>
              Most developers just build simple, static showcase websites that don't do much. I design custom, fully automated software backends.
            </p>
            <p className="editorial-text gsap-reveal-fade-up" style={{ fontSize: '1.05rem' }}>
              By automating your manual business workflows, building super-fast customer databases, and setting up smart AI assistants, I help you eliminate human errors and run your operations smoothly 24/7.
            </p>
          </div>
          
          {/* Slick technical metrics grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="gsap-reveal-stagger">
            {metrics.map((m, idx) => (
              <div key={idx} className="gsap-reveal-item" style={{ 
                borderBottom: '1px solid var(--border-light)', 
                paddingBottom: '16px' 
              }}>
                <div style={{ 
                  fontFamily: 'var(--font-interface)', 
                  fontSize: '2.8rem', 
                  fontWeight: 900, 
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.0'
                }}>
                  {m.value}
                </div>
                <div style={{ 
                  fontFamily: 'var(--font-interface)', 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  color: 'var(--accent-gold)', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  margin: '4px 0'
                }}>
                  {m.label}
                </div>
                <div style={{ 
                  fontFamily: 'var(--font-interface)', 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)',
                  fontWeight: 300
                }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default StoryMoment;
