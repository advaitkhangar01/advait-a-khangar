import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Bot, 
  Receipt, 
  Cpu, 
  Sparkles, 
  Check, 
  Clock, 
  Zap, 
  Workflow,
  ChevronDown
} from 'lucide-react';

interface SystemModule {
  id: string;
  name: string;
  description: string;
  scaleMetric: string;
  valMetric: string;
  hoursMetric: string;
  icon: React.ReactNode;
}

// Custom Counter Component for Smooth Numeric Transitions
const AnimatedNumber: React.FC<{ value: number; suffix?: string; prefix?: string }> = ({ value, suffix = '', prefix = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const endValue = value;
    const duration = 750; // smooth 750ms duration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.round(startValue + (endValue - startValue) * easeProgress);
      
      setDisplayValue(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

export const ContactMoment: React.FC = () => {
  const modules: SystemModule[] = [
    { 
      id: 'ai-agents', 
      name: 'Smart AI Assistant (Voice & Chat)', 
      description: 'Saves your team hundreds of hours by answering customer questions instantly, 24/7.',
      scaleMetric: '50k+ daily capacity', 
      valMetric: '<0.4s response time', 
      hoursMetric: '600 hrs saved/mo',
      icon: <Bot size={22} className="card-icon-svg" />
    },
    { 
      id: 'erp-core', 
      name: 'Smart Invoicing & Billing Core', 
      description: 'Streamlines your financial operations, handles invoices, and keeps records perfectly accurate.',
      scaleMetric: '+10M txn volume', 
      valMetric: '100% manual error-free', 
      hoursMetric: '1,200 hrs saved/mo',
      icon: <Receipt size={22} className="card-icon-svg" />
    },
    { 
      id: 'api-workers', 
      name: 'Automated File & Video Processor', 
      description: 'Processes, crops, and formats heavy files and videos automatically with high-speed workers.',
      scaleMetric: '3.2GB/s speed', 
      valMetric: 'Zero-touch automation', 
      hoursMetric: '320 hrs saved/mo',
      icon: <Cpu size={22} className="card-icon-svg" />
    },
    { 
      id: 'custom-crm', 
      name: 'Super-Fast Customer CRM & Sales', 
      description: 'Captures, organizes, and auto-routes customer inquiries so no lead ever slips through.',
      scaleMetric: '1.2M auto-routed leads', 
      valMetric: 'Loads instantly (<30ms)', 
      hoursMetric: '480 hrs saved/mo',
      icon: <Sparkles size={22} className="card-icon-svg" />
    }
  ];

  const [selectedModules, setSelectedModules] = useState<string[]>(['ai-agents']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [referral, setReferral] = useState('');
  const [website, setWebsite] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter(m => m !== id));
      }
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const getAggregatedMetrics = () => {
    let throughput = 0;
    let automatedHours = 0;
    let avgLatency = 100;
    let nodeCount = selectedModules.length;

    if (selectedModules.includes('ai-agents')) {
      throughput += 50000;
      automatedHours += 600;
      avgLatency = Math.min(avgLatency, 400);
    }
    if (selectedModules.includes('erp-core')) {
      throughput += 1000000;
      automatedHours += 1200;
      avgLatency = Math.min(avgLatency, 50);
    }
    if (selectedModules.includes('api-workers')) {
      throughput += 200000;
      automatedHours += 320;
      avgLatency = Math.min(avgLatency, 25);
    }
    if (selectedModules.includes('custom-crm')) {
      throughput += 1200000;
      automatedHours += 480;
      avgLatency = Math.min(avgLatency, 30);
    }

    return {
      throughput,
      automatedHours,
      avgLatency,
      nodeCount
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !businessName || !requirements || !budget || !timeline || !referral) {
      setSubmitError('Please fill in all the required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name,
      email,
      phone,
      office_brand_name: businessName,
      project_budget: budget,
      desired_timeline: timeline,
      referral_source: referral,
      existing_website: website || 'None provided',
      requirements_how_may_i_help: requirements,
      selected_modules: selectedModules.map(id => {
        const mod = modules.find(m => m.id === id);
        return mod ? mod.name : id;
      }).join(', '),
      estimated_tasks_handled: `${stats.throughput.toLocaleString()} / day`,
      estimated_hours_saved: `${stats.automatedHours.toLocaleString()} hrs/month`,
      estimated_avg_load_speed: `Instant (<${stats.avgLatency}ms)`,
      total_modules_configured: stats.nodeCount,
      // FormSubmit special fields
      _subject: `New Project Inquiry from ${name} (${businessName})`,
      _honey: "", // Honeypot field for spam prevention
      _captcha: "false" // Disable captcha for smooth AJAX redirect/handling
    };

    console.log("Submitting contact form payload:", payload);

    try {
      const response = await fetch('https://formsubmit.co/ajax/advaitkhangar01@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log("FormSubmit API response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("FormSubmit API success result:", result);
        setFormSubmitted(true);
      } else {
        const data = await response.json();
        console.error("FormSubmit API error data:", data);
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error("Network or CORS error submitting contact form:", err);
      setSubmitError('Failed to send message. Please check your internet connection or developer console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = getAggregatedMetrics();

  return (
    <section className="moment-section contact-moment-section" style={{ position: 'relative', zIndex: 3, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border-light)', paddingBottom: '80px' }}>
      
      {/* Component Specific Style Injector */}
      <style>{`
        /* Card Selection styles */
        .module-card {
          padding: 24px;
          background: var(--surface-primary);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(17, 17, 17, 0.01);
          position: relative;
          overflow: hidden;
        }

        .module-card:hover {
          transform: translateY(-3px) scale(1.008);
          border-color: var(--border-medium);
          box-shadow: 0 16px 32px -10px rgba(17, 17, 17, 0.05);
        }

        .module-card.active {
          background: #FFFFFF;
          border-color: var(--accent-gold);
          box-shadow: 0 20px 40px -15px var(--accent-glow), 0 0 0 1px var(--accent-gold);
          transform: scale(1.008) translateY(-2px);
        }

        .module-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          background: var(--accent-gold);
          transition: width 0.3s var(--transition-smooth);
        }

        .module-card.active::before {
          width: 4px;
        }

        .card-icon-container {
          width: 46px;
          height: 46px;
          border-radius: 8px;
          background: rgba(17, 17, 17, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.3s;
          flex-shrink: 0;
          margin-right: 18px;
        }

        .module-card:hover .card-icon-container {
          background: rgba(17, 17, 17, 0.04);
          color: var(--text-primary);
        }

        .module-card.active .card-icon-container {
          background: var(--accent-glow);
          color: var(--accent-gold-text);
        }

        /* Custom Circle Checkbox */
        .custom-checkbox {
          width: 24px;
          height: 24px;
          border: 1px solid var(--border-medium);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: transparent;
          background: transparent;
          flex-shrink: 0;
          margin-left: 12px;
        }

        .module-card:hover .custom-checkbox {
          border-color: var(--text-primary);
        }

        .module-card.active .custom-checkbox {
          border-color: var(--accent-gold);
          background: var(--accent-gold);
          color: #FFFFFF;
          transform: rotate(360deg);
        }

        /* Status Light pulse */
        .status-pulse-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #22C55E;
          border-radius: 50%;
          margin-right: 8px;
          position: relative;
        }

        .status-pulse-dot::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #22C55E;
          opacity: 0;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.3);
            opacity: 0.8;
          }
          80%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Live savings block */
        .stats-dashboard {
          background: var(--surface-primary);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 32px;
          box-shadow: var(--shadow-premium);
          position: relative;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 20px;
        }

        .stat-item {
          padding: 20px;
          background: rgba(17, 17, 17, 0.01);
          border: 1px solid rgba(17, 17, 17, 0.03);
          border-radius: 10px;
          transition: all 0.3s;
        }

        .stat-item:hover {
          background: rgba(17, 17, 17, 0.02);
          border-color: rgba(17, 17, 17, 0.06);
          transform: translateY(-2px);
        }

        /* Stationery Luxury Form styling */
        .luxury-form-card {
          background: var(--surface-primary);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 32px;
          box-shadow: var(--shadow-premium);
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .luxury-form-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        .luxury-input-group {
          position: relative;
          margin-bottom: 24px;
        }

        .luxury-input-group input,
        .luxury-input-group textarea {
          width: 100%;
          padding: 14px 0 10px;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--border-medium);
          font-family: var(--font-interface);
          font-size: 1.05rem;
          color: var(--text-primary);
          outline: none;
          transition: all 0.4s ease;
        }

        .luxury-input-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .luxury-input-group label {
          position: absolute;
          left: 0;
          top: 14px;
          font-family: var(--font-interface);
          font-size: 1rem;
          color: var(--text-secondary);
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-weight: 300;
        }

        /* Floating Input Label Effect */
        .luxury-input-group input:focus ~ label,
        .luxury-input-group input:not(:placeholder-shown) ~ label,
        .luxury-input-group textarea:focus ~ label,
        .luxury-input-group textarea:not(:placeholder-shown) ~ label {
          top: -14px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--accent-gold-text);
          text-transform: uppercase;
        }

        .luxury-input-group input:focus,
        .luxury-input-group textarea:focus {
          border-bottom-color: var(--accent-gold);
        }

        .luxury-input-focus-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--accent-gold);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .luxury-input-group input:focus ~ .luxury-input-focus-line,
        .luxury-input-group textarea:focus ~ .luxury-input-focus-line {
          width: 100%;
          left: 0;
        }

        .form-error-message {
          color: #EF4444;
          font-family: var(--font-interface);
          font-size: 0.85rem;
          margin-top: 16px;
          padding: 12px;
          background: rgba(239, 68, 68, 0.06);
          border-left: 3px solid #EF4444;
          border-radius: 4px;
          line-height: 1.4;
        }

        /* Responsive intake grid */
        .luxury-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 8px;
        }

        .luxury-form-grid-full {
          grid-column: span 2;
        }

        @media (max-width: 600px) {
          .luxury-form-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .luxury-form-grid-full {
            grid-column: span 1;
          }
        }

        /* Select elements custom luxury styles */
        .luxury-input-group select {
          width: 100%;
          padding: 14px 24px 10px 0;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--border-medium);
          font-family: var(--font-interface);
          font-size: 1.05rem;
          color: var(--text-primary);
          outline: none;
          transition: all 0.4s ease;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
        }

        /* Float select label when focused or has value */
        .luxury-input-group select:focus ~ label,
        .luxury-input-group select.has-value ~ label {
          top: -14px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--accent-gold-text);
          text-transform: uppercase;
        }

        .luxury-input-group select:focus {
          border-bottom-color: var(--accent-gold);
        }

        .luxury-input-group select:focus ~ .luxury-input-focus-line {
          width: 100%;
          left: 0;
        }

        .luxury-select-chevron {
          position: absolute;
          right: 0;
          top: 16px;
          color: var(--text-secondary);
          pointer-events: none;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
        }

        .luxury-input-group select:focus ~ .luxury-select-chevron {
          transform: rotate(180deg);
          color: var(--accent-gold);
        }

        /* Drawing success animations */
        .success-card {
          text-align: center;
          padding: 40px 0;
        }

        @keyframes draw-circle {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes draw-check {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes flow-dash {
          to {
            stroke-dashoffset: -28;
          }
        }
      `}</style>

      <div style={{ width: '90%', margin: '0 auto', maxWidth: '1440px' }}>
        
        {/* Simple Title */}
        <div style={{ marginBottom: 'var(--heading-to-content-gap)' }}>
          <div className="editorial-label gsap-reveal-fade-up">GET A CUSTOM QUOTE</div>
          <h2 className="editorial-title-medium gsap-reveal-fade-up" style={{ fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Let’s build your custom system. <br />
            <span style={{ color: 'var(--accent-gold)' }}>It’s simpler than you think.</span>
          </h2>
          <p className="editorial-text gsap-reveal-fade-up">
            Choose the modules you need below. You'll see a live estimate of how much time they'll save you, how fast they'll run, and the volume of work they can handle for you.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid-editorial-2col" style={{ alignItems: 'start' }}>
          
          {/* Left panel: interactive architecture configurator */}
          <div>
            <span className="gsap-reveal-fade-up" style={{ fontFamily: 'var(--font-interface)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '20px' }}>
              1. Choose the features you need:
            </span>

            {/* Checklist stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }} className="gsap-reveal-stagger">
              {modules.map((m) => {
                const isActive = selectedModules.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleModule(m.id)}
                    className={`module-card gsap-reveal-item ${isActive ? 'active' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="card-icon-container">
                        {m.icon}
                      </div>
                      <div>
                        <div style={{ 
                          fontFamily: 'var(--font-interface)', 
                          fontSize: '1.05rem', 
                          fontWeight: 700, 
                          color: 'var(--text-primary)',
                          marginBottom: '4px'
                        }}>
                          {m.name}
                        </div>
                        <div style={{ 
                          fontFamily: 'var(--font-interface)', 
                          fontSize: '0.85rem', 
                          color: 'var(--text-secondary)',
                          marginBottom: '8px',
                          lineHeight: 1.4,
                          fontWeight: 300
                        }}>
                          {m.description}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'var(--accent-gold-text)', background: 'var(--accent-glow)', padding: '2px 8px', borderRadius: '4px' }}>
                            {m.scaleMetric}
                          </span>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'var(--accent-blue)', background: 'rgba(37, 99, 235, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                            {m.valMetric}
                          </span>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'var(--text-secondary)', background: 'rgba(17, 17, 17, 0.04)', padding: '2px 8px', borderRadius: '4px' }}>
                            {m.hoursMetric}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Circle checkbox */}
                    <div className="custom-checkbox">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Glowing Flow Connector Pipeline */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0', height: '40px', position: 'relative' }}>
              <svg width="100%" height="40" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity={selectedModules.length > 0 ? 0.9 : 0.2} />
                    <stop offset="50%" stopColor="var(--accent-blue)" stopOpacity={selectedModules.length > 0 ? 0.9 : 0.2} />
                    <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity={selectedModules.length > 0 ? 0.9 : 0.2} />
                  </linearGradient>
                </defs>
                <line 
                  x1="10%" y1="20" x2="90%" y2="20" 
                  stroke="url(#cableGrad)" 
                  strokeWidth={selectedModules.length > 0 ? "2.5" : "1"} 
                  strokeDasharray={selectedModules.length > 0 ? "8, 6" : "none"} 
                  style={{
                    transition: 'all 0.5s',
                    animation: selectedModules.length > 0 ? 'flow-dash 1.5s linear infinite' : 'none'
                  }}
                />
                {selectedModules.length > 0 && (
                  <circle r="4.5" fill="var(--accent-gold)">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 10,20 L 90,20" />
                  </circle>
                )}
              </svg>
            </div>

            {/* Configured Telemetry Summary */}
            <div className="stats-dashboard gsap-reveal-fade-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  2. Live Estimate (What this does for you):
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  <span className="status-pulse-dot" /> Live Calculating
                </span>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Cpu size={14} color="var(--text-secondary)" />
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>Tasks Handled Automatically</div>
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    <AnimatedNumber value={stats.throughput} /> <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ day</span>
                  </div>
                </div>

                <div className="stat-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Clock size={14} color="var(--accent-gold-text)" />
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>Free Time Gained Every Month</div>
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--accent-gold)', letterSpacing: '-0.02em' }}>
                    <AnimatedNumber value={stats.automatedHours} /> <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent-gold-text)' }}>hrs</span>
                  </div>
                </div>

                <div className="stat-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Zap size={14} color="var(--accent-blue)" />
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>Avg. Application Load Speed</div>
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--accent-blue)', letterSpacing: '-0.02em' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Instant </span>(&lt;<AnimatedNumber value={stats.avgLatency} suffix="ms" />)
                  </div>
                </div>

                <div className="stat-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Workflow size={14} color="var(--text-secondary)" />
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>Integrated Systems Working</div>
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    <AnimatedNumber value={stats.nodeCount} /> <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>modules together</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right panel: Scheduling inquiry form */}
          <div className="luxury-form-card gsap-reveal-fade-up">
            
            {formSubmitted ? (
              <div className="success-card">
                <svg width="64" height="64" viewBox="0 0 64 64" style={{ margin: '0 auto 24px', display: 'block' }}>
                  <circle cx="32" cy="32" r="30" fill="none" stroke="var(--accent-gold)" strokeWidth="2"
                    strokeDasharray="188.4" strokeDashoffset="188.4"
                    style={{
                      animation: 'draw-circle 0.8s ease-out forwards'
                    }}
                  />
                  <path d="M20 32 l8 8 l16 -16" fill="none" stroke="var(--accent-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="40" strokeDashoffset="40"
                    style={{
                      animation: 'draw-check 0.5s 0.6s ease-out forwards'
                    }}
                  />
                </svg>
                <h4 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 400 }}>
                  You're all set! I've received your request.
                </h4>
                <p style={{ fontFamily: 'var(--font-interface)', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6 }}>
                  Thanks for reaching out! I've got your project details. I am reviewing your chosen features and will email a custom plan and meeting link straight to your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '28px' }}>
                  3. Project Intake Form
                </span>

                {/* Honeypot field for spam prevention */}
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="luxury-form-grid">
                  
                  {/* Name */}
                  <div className="luxury-input-group">
                    <input
                      type="text"
                      required
                      id="userName"
                      placeholder=" "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="userName">Your Full Name</label>
                  </div>

                  {/* Email */}
                  <div className="luxury-input-group">
                    <input
                      type="email"
                      required
                      id="userEmail"
                      placeholder=" "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="userEmail">Your Email Address</label>
                  </div>

                  {/* Phone */}
                  <div className="luxury-input-group">
                    <input
                      type="tel"
                      required
                      id="userPhone"
                      placeholder=" "
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="userPhone">Your Phone Number</label>
                  </div>

                  {/* Brand/Office Name */}
                  <div className="luxury-input-group">
                    <input
                      type="text"
                      required
                      id="companyName"
                      placeholder=" "
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="companyName">Office / Brand Name</label>
                  </div>

                  {/* Budget Dropdown */}
                  <div className="luxury-input-group">
                    <select
                      id="projectBudget"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={budget ? 'has-value' : ''}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled hidden></option>
                      <option value="Under $5k">Under $5,000</option>
                      <option value="$5k - $15k">$5,000 - $15,000</option>
                      <option value="$15k - $30k">$15,000 - $30,000</option>
                      <option value="$30k+">$30,000+</option>
                    </select>
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="projectBudget">Project Budget</label>
                    <ChevronDown size={15} className="luxury-select-chevron" />
                  </div>

                  {/* Timeline Dropdown */}
                  <div className="luxury-input-group">
                    <select
                      id="projectTimeline"
                      required
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className={timeline ? 'has-value' : ''}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled hidden></option>
                      <option value="Urgent (Immediate)">Urgent (Immediate)</option>
                      <option value="1-2 Months">1 - 2 Months</option>
                      <option value="Flexible / Exploring">Flexible / Exploring</option>
                    </select>
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="projectTimeline">Desired Timeline</label>
                    <ChevronDown size={15} className="luxury-select-chevron" />
                  </div>

                  {/* How did you find me Dropdown */}
                  <div className="luxury-input-group">
                    <select
                      id="referralSource"
                      required
                      value={referral}
                      onChange={(e) => setReferral(e.target.value)}
                      className={referral ? 'has-value' : ''}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled hidden></option>
                      <option value="Google Search">Google Search</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Word of Mouth / Referral">Word of Mouth / Referral</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="referralSource">How did you find me?</label>
                    <ChevronDown size={15} className="luxury-select-chevron" />
                  </div>

                  {/* Existing Website / Ref (Optional) */}
                  <div className="luxury-input-group">
                    <input
                      type="text"
                      id="existingWebsite"
                      placeholder=" "
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="existingWebsite">Existing Website Link (Optional)</label>
                  </div>

                  {/* Requirements / How may I help? */}
                  <div className="luxury-input-group luxury-form-grid-full">
                    <textarea
                      required
                      id="userRequirements"
                      placeholder=" "
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="luxury-input-focus-line" />
                    <label htmlFor="userRequirements">Requirements / How may I help?</label>
                  </div>

                </div>

                {submitError && (
                  <div className="form-error-message" style={{ marginBottom: '20px' }}>
                    {submitError}
                  </div>
                )}

                <div style={{ marginTop: '12px' }}>
                  <button 
                    type="submit" 
                    className="btn-premium" 
                    style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1, pointerEvents: isSubmitting ? 'none' : 'auto' }}
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending Request...' : 'Send Me My Custom Plan'}</span>
                    <ArrowRight size={18} style={{ transform: isSubmitting ? 'translateX(4px)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '20px', marginTop: '28px' }}>
                  <Calendar size={14} color="var(--accent-gold)" />
                  <span>We usually reply and set up a call within 48 hours!</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactMoment;
