import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, ShieldCheck, CornerDownLeft } from 'lucide-react';

interface QA {
  q: string;
  a: string;
}

export const AskAdvaitAI: React.FC = () => {
  const qaPairs: QA[] = [
    {
      q: 'What kind of software can you build for my business?',
      a: 'I build custom business software, all-in-one team dashboards, secure client database systems, automated PDF scanners, and smart AI phone receptionists that act like real humans. Every tool is built to save you time and staff costs.'
    },
    {
      q: 'Can you upgrade my old system without stopping my business?',
      a: 'Yes. I build custom connectors that safely run your old system and the new software side-by-side in real time. Once everything is verified, I switch you over instantly with zero downtime or business interruptions.'
    },
    {
      q: 'How do your AI tools connect with software I already use?',
      a: 'I build custom bridges that securely connect AI tools directly with your existing software—like Slack, Stripe, WhatsApp, Salesforce, or Trello—creating a seamless automated loop.'
    },
    {
      q: 'What programming languages and databases do you use?',
      a: 'I build in Go (for high-speed database software), Node.js/TypeScript (for reliable web portals), Python (for AI tools and algorithms), and PostgreSQL/Redis (for ultra-secure and fast databases).'
    }
  ];

  const [inputVal, setInputVal] = useState('');
  const [activeResponse, setActiveResponse] = useState(qaPairs[0].a);
  const [typedResponse, setTypedResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef<number | null>(null);

  // Typewriter effect trigger
  useEffect(() => {
    if (typingTimer.current) clearInterval(typingTimer.current);
    
    setIsTyping(true);
    setTypedResponse('');
    let idx = 0;
    
    typingTimer.current = window.setInterval(() => {
      if (idx < activeResponse.length) {
        setTypedResponse((prev) => prev + activeResponse.charAt(idx));
        idx++;
      } else {
        setIsTyping(false);
        if (typingTimer.current) clearInterval(typingTimer.current);
      }
    }, 12); // Fast modern terminal speed

    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, [activeResponse]);

  const handleSelectQuery = (a: string) => {
    if (isTyping) return;
    setActiveResponse(a);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    // Direct basic keyword search router
    const query = inputVal.toLowerCase();
    let match = qaPairs[0].a; // Default match

    if (query.includes('stack') || query.includes('language') || query.includes('tech') || query.includes('use')) {
      match = qaPairs[3].a;
    } else if (query.includes('migrate') || query.includes('database') || query.includes('legacy') || query.includes('old') || query.includes('upgrade')) {
      match = qaPairs[1].a;
    } else if (query.includes('ai') || query.includes('automation') || query.includes('connect') || query.includes('slack')) {
      match = qaPairs[2].a;
    } else if (query.includes('systems') || query.includes('build') || query.includes('create') || query.includes('software')) {
      match = qaPairs[0].a;
    } else {
      match = `Operational query received: "I build custom dashboards, automated billing software, and custom AI tools. Please scroll down to the contact section below to schedule a call and get a free quote."`;
    }

    setActiveResponse(match);
    setInputVal('');
  };

  return (
    <section className="moment-section ai-moment-section" style={{ position: 'relative', zIndex: 3, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ width: '90%', margin: '0 auto', maxWidth: '1440px' }}>
        
        {/* Editorial Title */}
        <div style={{ marginBottom: 'var(--heading-to-content-gap)' }}>
          <div className="editorial-label gsap-reveal-fade-up">TALK TO MY ASSISTANT</div>
          <h2 className="editorial-title-medium gsap-reveal-fade-up" style={{ fontWeight: 400 }}>
            Ask My AI Assistant. <br />
            <span style={{ color: 'var(--accent-gold)' }}>Explore Custom Solutions.</span>
          </h2>
          <p className="editorial-text gsap-reveal-fade-up">
            Bypass standard corporate brochures. Ask questions directly to my automated AI assistant below to explore how I can help you automate your tasks, upgrade your databases, and save massive monthly operational costs.
          </p>
        </div>

        {/* Command Center layout panel */}
        <div className="grid-editorial-2col" style={{ alignItems: 'stretch' }}>
          
          {/* Preset Queries list */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="gsap-reveal-stagger">
              <span className="gsap-reveal-item" style={{ fontFamily: 'var(--font-interface)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                CHOOSE A QUICK QUESTION
              </span>
              
              {qaPairs.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuery(pair.a)}
                  className="gsap-reveal-item"
                  style={{
                    padding: '24px',
                    textAlign: 'left',
                    background: activeResponse === pair.a ? 'rgba(201, 162, 39, 0.04)' : 'transparent',
                    border: activeResponse === pair.a ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-interface)',
                    fontSize: '1rem',
                    color: activeResponse === pair.a ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: activeResponse === pair.a ? 700 : 300,
                    transition: 'all 0.3s var(--transition-smooth)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Cpu size={16} color={activeResponse === pair.a ? 'var(--accent-gold)' : 'var(--text-secondary)'} />
                    <span>{pair.q}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Query Input bar */}
            <form onSubmit={handleCustomSubmit} className="gsap-reveal-fade-up" style={{
              display: 'flex',
              border: '1px solid var(--border-medium)',
              borderRadius: '4px',
              overflow: 'hidden',
              background: 'var(--bg-primary)',
              padding: '8px 16px',
              alignItems: 'center'
            }}>
              <Terminal size={18} color="var(--text-secondary)" style={{ marginRight: '12px' }} />
              <input
                type="text"
                placeholder="Type your question here (e.g. database, AI, or languages)..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontFamily: 'var(--font-interface)',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  padding: '12px 0'
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--text-primary)'
                }}
              >
                <CornerDownLeft size={18} />
              </button>
            </form>

          </div>

          {/* Simulated Terminal Screen Panel */}
          <div className="gsap-reveal-fade-up" style={{
            background: '#111111',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
            padding: '32px',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '450px'
          }}>
            
            {/* Header info */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Terminal color="var(--accent-gold)" size={16} />
                  <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.05em' }}>ADVAIT-AI-CORE // EXECUTE_LOG</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ width: '8px', height: '8px', background: '#27C93F', borderRadius: '50%', display: 'inline-block' }}></span>
                  <span style={{ color: '#27C93F', fontSize: '0.75rem', fontWeight: 'bold' }}>SYSTEM_ONLINE</span>
                </div>
              </div>

              {/* Terminal Text Screen with responsive flashing cursor */}
              <div style={{ color: '#A8ADB4', fontSize: '1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', minHeight: '220px' }}>
                {typedResponse}
                {isTyping && <span style={{ width: '8px', height: '18px', background: 'var(--accent-gold)', display: 'inline-block', marginLeft: '4px', animation: 'blink 0.8s infinite' }}></span>}
              </div>
            </div>

            {/* Footer metrics inside terminal */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', gap: '16px', fontSize: '0.75rem', color: '#5E5E5E' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <ShieldCheck size={14} color="#27C93F" />
                <span>Consensus Check: SECURE (100%)</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span>Execution Time: {isTyping ? 'BUSY...' : '0.02ms'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AskAdvaitAI;
