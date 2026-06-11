import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Network, 
  Eye, 
  ChevronRight, 
  Activity, 
  Cpu, 
  Sparkles, 
  Terminal, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Code2 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  label: string;
  title: string;
  subtitle: string;
  body1: string;
  body2: string;
  badgeColor: string;
}

interface CaseStudy {
  id: string;
  name: string;
  tabLabel: string;
  description: string;
  slides: Slide[];
}

export const TechnicalMoment: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeCaseStudyIdx, setActiveCaseStudyIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'erp-scale',
      name: 'Manufacturing ERP Scalability',
      tabLabel: 'ERP Scale',
      description: 'Re-engineering backend query chokepoints and databases to support high wholesale demand.',
      slides: [
        {
          label: '01 / THE PROBLEM',
          title: 'Messy Manual Stock Tracking',
          subtitle: '₹1.1 Crore Lost Annually in Stock Errors',
          body1: 'A large manufacturing company with 14 scattered warehouses was using manual sheets and separate systems to track their products. This led to incorrect stock counts and massive double-bookings.',
          body2: 'Traditional software agencies proposed complex ERP upgrades that would take 18 months to integrate, threatening to disrupt their active factory production and supply lines.',
          badgeColor: 'var(--accent-orange)'
        },
        {
          label: '02 / THE CHAOS',
          title: 'System Freezes During High Sales',
          subtitle: 'Ordering System Freezes for Over 18 Seconds',
          body1: 'During busy wholesale ordering hours, their old database would freeze or crash due to too many parallel order requests. The old database choked, dropping customer queries.',
          body2: 'Sales managers resorted to manual Excel reconciliation sheets to track orders in real-time. This manual friction caused chaotic billing and logistics routing errors.',
          badgeColor: 'var(--accent-orange)'
        },
        {
          label: '03 / THE ANALYSIS',
          title: 'Finding the System Chokepoints',
          subtitle: 'Auditing the Exact Code Glitches',
          body1: 'Advait audited their entire ordering system, tracking every single database query and transaction to isolate the exact table lock that was freezing the system.',
          body2: 'The audit revealed that 84% of all system freezes were caused by a single poorly-indexed database table, which was query-locked over 200,000 times daily.',
          badgeColor: 'var(--accent-blue)'
        },
        {
          label: '04 / THE ARCHITECTURE',
          title: 'Building a Custom Speed Engine',
          subtitle: 'Lightning-Fast Custom Database Core',
          body1: 'Replaced the slow, outdated database with a modern, high-speed custom system using Go and Redis caching that easily processes thousands of orders concurrently without breaking.',
          body2: 'Utilized fast in-memory caching to separate read queries from write queries, backed by a cluster of self-healing, automated backend services.',
          badgeColor: 'var(--accent-blue)'
        },
        {
          label: '05 / THE IMPLEMENTATION',
          title: 'Smooth Zero-Downtime Migration',
          subtitle: 'Moving 42 Lakh Records Overnight',
          body1: 'Successfully migrated over 42 Lakh (4.2 million) old customer records to the new system overnight with zero downtime, ensuring the business kept running without missing a single order.',
          body2: 'Implemented automated deployment health checks, ensuring backup servers start instantly if any database node fails.',
          badgeColor: 'var(--accent-gold)'
        },
        {
          label: '06 / THE OUTCOME',
          title: 'Smooth Scale & Huge Savings',
          subtitle: 'Zero Crashes & ₹11 Crore Saved Annually',
          body1: 'The new custom software core processed peak holiday ordering spikes with zero drops and perfect accuracy, completely eliminating stock double-bookings.',
          body2: 'Average checkout time dropped from 18 seconds to just 12 milliseconds. Operational admin work was completely eliminated, saving the company ₹11 Crore ($1.4 million) annually.',
          badgeColor: 'var(--accent-gold)'
        }
      ]
    },
    {
      id: 'w4y-geofence',
      name: 'W4Y Geofenced Attendance System',
      tabLabel: 'GPS Geofencing',
      description: 'Designing coordinate boundaries and node-cron auto-checkout daemons to eliminate timesheet fraud.',
      slides: [
        {
          label: '01 / THE PROBLEM',
          title: 'Timesheet & Attendance Fraud',
          subtitle: '15% Leakage in Inbound Billing Records',
          body1: 'W4Y’s operations team was struggling to track site attendance for field employees across multiple projects. Manual attendance sheets led to time-card padding and timesheet fraud.',
          body2: 'Without location verification, there was no way to prove employees were actually on-site during their billed work hours, costing thousands in lost resource productivity.',
          badgeColor: 'var(--accent-orange)'
        },
        {
          label: '02 / THE CHAOS',
          title: 'Spoofed Coordinate Attendance',
          subtitle: 'Bypassing Simple Browser Geo-Checks',
          body1: 'Early geofencing attempts were easily spoofed by basic mock-location GPS apps, letting staff check in from home while appearing to be inside coordinate boundaries.',
          body2: 'Server clocks running on UTC timezone led to false late-attendance flags, creating accounting disputes and slowing down payroll close calculations.',
          badgeColor: 'var(--accent-orange)'
        },
        {
          label: '03 / THE ANALYSIS',
          title: 'Isolating Coordinate Discrepancies',
          subtitle: 'Auditing GPS Accuracy Boundaries',
          body1: 'Audited coordinates and accuracy ranges reported by mobile browsers, identifying that 20% of errors were caused by weak GPS signals and mock provider signals.',
          body2: 'Discovered that simple client-side checks were being bypassed by intercepting HTTP requests and overriding latitude/longitude parameters.',
          badgeColor: 'var(--accent-blue)'
        },
        {
          label: '04 / THE ARCHITECTURE',
          title: 'Haversine Geofence Validator',
          subtitle: 'Server-Side GPS Validation Logic',
          body1: 'Built a server-side geofencing validator using the Haversine formula, gating accuracy tolerances and introducing strict vs. buffer zones for onsite workers.',
          body2: 'Integrated IST timezone-aware calculations directly into Node.js middleware to correctly flag arrivals regardless of the hosting server’s location.',
          badgeColor: 'var(--accent-blue)'
        },
        {
          label: '05 / THE IMPLEMENTATION',
          title: 'Node-cron Auto-Checkout Daemon',
          subtitle: 'Automated 22:00 IST Timekeeper Loop',
          body1: 'Implemented an asynchronous node-cron checkout worker that sweeps the active sessions every night, automatically checking out users who forgot to clock out.',
          body2: 'Created raw SQL audit transaction logs to maintain a complete history of automatic actions, coordinate updates, and admin overrides.',
          badgeColor: 'var(--accent-gold)'
        },
        {
          label: '06 / THE OUTCOME',
          title: 'Timesheet Gaps Eliminated',
          subtitle: '0 Attendance Spoofs & 100% Payroll Accuracy',
          body1: 'The geofenced check-in system successfully validated coordinate boundaries for 65+ projects, blocking all mock-location check-in attempts.',
          body2: 'Auto-checkout daemon checks eliminated manual hours spent adjusting timesheets, ensuring audit compliance and securing client billing.',
          badgeColor: 'var(--accent-gold)'
        }
      ]
    },
    {
      id: 'reachx-saas',
      name: 'ReachX Multi-Tenant SaaS Platform',
      tabLabel: 'Multi-Tenant SaaS',
      description: 'Implementing subdomain-based tenant routing isolation and composite indexing on a single database.',
      slides: [
        {
          label: '01 / THE PROBLEM',
          title: 'Isolated Server Overhead',
          subtitle: '60% Hosting Cost Leakages on Single Tenant Setup',
          body1: 'The SaaS model required launching separate backend server clusters and isolated databases for every new onboarding partner.',
          body2: 'This siloed architecture resulted in high hosting costs and meant database schemas and updates had to be manually run across dozens of VPS instances.',
          badgeColor: 'var(--accent-orange)'
        },
        {
          label: '02 / THE CHAOS',
          title: 'System Delays on Ingestion',
          subtitle: 'Query Latencies Spiking Beyond 800ms',
          body1: 'As customer lead volumes grew, search queries across non-indexed database tables slowed down, causing the administrative panel to freeze.',
          body2: 'Without database connection pooling and schema isolation, high traffic from one client node choked resources for all other tenants.',
          badgeColor: 'var(--accent-orange)'
        },
        {
          label: '03 / THE ANALYSIS',
          title: 'Auditing Resource Inefficiencies',
          subtitle: 'Identifying Stagnant Staging Servers',
          body1: 'Conducted a system audit that revealed that single-tenant staging servers remained idle 65% of the time, consuming expensive server storage.',
          body2: 'Pinpointed that database query lag was caused by overlapping SQL joins and a lack of composite indices on tenant routing keys.',
          badgeColor: 'var(--accent-blue)'
        },
        {
          label: '04 / THE ARCHITECTURE',
          title: 'Subdomain Isolation Middleware',
          subtitle: 'Relational Database Router & Index Scheme',
          body1: 'Engineered custom Express middleware that extracts the tenant identifier from the subdomain header and routes requests to the correct schema.',
          body2: 'Designed a 32-table database schema with UUID supports, composite indexes, and cascading referential integrity to enforce data safety.',
          badgeColor: 'var(--accent-blue)'
        },
        {
          label: '05 / THE IMPLEMENTATION',
          title: 'Zero-Downtime PM2 Clusters',
          subtitle: 'Rolling Reloads on VPS Nodes',
          body1: 'Deployed the multi-tenant application core on a Linux VPS with Nginx reverse proxies and PM2 cluster mode scaling.',
          body2: 'Set up automatic database backup scripts to secure tenant data overnight, and integrated SSL certificates via Certbot.',
          badgeColor: 'var(--accent-gold)'
        },
        {
          label: '06 / THE OUTCOME',
          title: 'Slashed Infrastructure Overhead',
          subtitle: '60% Hosting Saved & Sub-100ms Queries',
          body1: 'Consolidating client accounts into the multi-tenant SaaS framework reduced hosting costs by 60% with zero tenant cross-talk.',
          body2: 'Composite index tuning brought queries down below 100ms, and onboarding scaled to a single subdomain click.',
          badgeColor: 'var(--accent-gold)'
        }
      ]
    }
  ];

  const currentStudy = caseStudies[activeCaseStudyIdx];
  const slides = currentStudy.slides;
  const current = slides[activeStep];

  // 1. Detect viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Initialize GSAP ScrollTrigger for desktop pinning
  useEffect(() => {
    // Kill existing ScrollTrigger if any
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    if (isMobile) {
      setActiveStep(0);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const step = Math.min(
          Math.floor(self.progress * slides.length),
          slides.length - 1
        );
        setActiveStep(step);
      }
    });

    scrollTriggerRef.current = trigger;

    return () => {
      if (trigger) {
        trigger.kill();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [activeCaseStudyIdx, isMobile]);

  // Handle case study selection tab change
  const handleCaseStudyChange = (idx: number) => {
    setActiveCaseStudyIdx(idx);
    setActiveStep(0);
    
    // Scroll window back to top of this section if on desktop to reset progress
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      window.scrollTo({
        top: absoluteTop,
        behavior: 'smooth'
      });
    }
  };

  // Render graphic panels dynamically
  const renderVisualPanel = () => {
    const caseId = currentStudy.id;

    if (caseId === 'erp-scale') {
      switch (activeStep) {
        case 0:
          return (
            <div style={{ textAlign: 'center' }}>
              <Shield size={40} color="var(--accent-orange)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Data Stock Errors
              </div>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '350px', margin: '0 auto', fontWeight: 300 }}>
                Stock counts were completely inaccurate due to manual errors, missing files, and double-bookings.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                <div style={{ padding: '6px 12px', border: '1px solid var(--accent-orange)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--accent-orange)', fontFamily: 'monospace' }}>STOCK-EAST // ERROR</div>
                <div style={{ padding: '6px 12px', border: '1px solid var(--accent-orange)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--accent-orange)', fontFamily: 'monospace' }}>STOCK-WEST // REJECTED</div>
              </div>
            </div>
          );
        case 1:
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>SYSTEM RESPONSE SPEEDS</span>
                <Activity color="var(--accent-orange)" size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span>Old System Lag/Freeze</span>
                    <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>18,400ms (18.4s)</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: 'var(--accent-orange)' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span>Target Speed Limit</span>
                    <span style={{ color: 'var(--accent-blue)' }}>250ms (0.25s)</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '12%', height: '100%', background: 'var(--accent-blue)' }}></div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '16px', padding: '10px 14px', background: 'rgba(249, 115, 22, 0.05)', borderRadius: '4px', border: '1px solid rgba(249, 115, 22, 0.1)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong>SYSTEM LAG:</strong> Database froze for 18.4 seconds due to high order volume. Tasks aborted to prevent incorrect stock double-entries.
              </div>
            </div>
          );
        case 2:
          return (
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px' }}>
                <Network color="var(--accent-blue)" size={18} />
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>FINDING THE SYSTEM CHOKEPOINTS</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ padding: '6px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace' }}>API Gateway</div>
                  <ChevronRight size={14} />
                  <div style={{ padding: '6px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace' }}>Order Router</div>
                  <ChevronRight size={14} />
                  <div style={{ padding: '6px 10px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid var(--accent-orange)', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--accent-orange)', fontWeight: 'bold' }}>Lock Point</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', borderLeft: '3px solid var(--accent-blue)', paddingLeft: '12px', margin: '12px 0', fontWeight: 300 }}>
                  "Our audit revealed that 84% of all system freezes were caused by a single poorly-indexed database table."
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>High-Speed Software Architecture</span>
                <Cpu color="var(--accent-blue)" size={18} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.75rem' }}>
                <div style={{ padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Message Broker</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '2px', fontSize: '0.7rem' }}>Decoupled pipeline handles 8,000 orders/sec</p>
                </div>
                <div style={{ padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Redis Cache</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '2px', fontSize: '0.7rem' }}>Loads catalog database instantly in milliseconds</p>
                </div>
                <div style={{ padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Go API Layer</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '2px', fontSize: '0.7rem' }}>Handles thousands of concurrent visitors stably</p>
                </div>
                <div style={{ padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>ACID DB Core</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '2px', fontSize: '0.7rem' }}>Ensures 100% exact warehouse stock counts</p>
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '10px' }}>
                <Terminal size={16} color="var(--accent-gold)" />
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>DEPLOYMENT PIPELINE</span>
              </div>
              <div style={{ background: '#111111', padding: '12px 16px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#A8ADB4', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>$ deploy --target=production --scale=8</div>
                <div style={{ color: 'var(--accent-gold)' }}>[SYS] Moving old database to new cluster ...</div>
                <div style={{ color: '#27C93F' }}>[SYS] Database replica #1 online (health: OK)</div>
                <div style={{ color: '#27C93F' }}>[SYS] Database migration successfully completed!</div>
              </div>
            </div>
          );
        case 5:
          return (
            <div style={{ textAlign: 'center' }}>
              <Sparkles size={36} color="var(--accent-gold)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                ₹1.1 Crore
              </div>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                ANNUAL LOSS SAVED
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>BEFORE SPEED</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-orange)', marginTop: '2px' }}>18,400ms (18.4s)</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>AFTER SPEED</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#27C93F', marginTop: '2px' }}>12ms (0.012s)</div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    } else if (caseId === 'w4y-geofence') {
      switch (activeStep) {
        case 0:
          return (
            <div style={{ textAlign: 'center' }}>
              <Shield size={40} color="var(--accent-orange)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Timesheet Fraud Issues
              </div>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '350px', margin: '0 auto', fontWeight: 300 }}>
                Employees submitting attendance logs manually with zero validation, causing high financial leakages.
              </div>
              <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.1)', color: 'var(--accent-orange)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                BILLING LEAKAGE STATUS: ~15% LOSS
              </div>
            </div>
          );
        case 1:
          return (
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px' }}>
                <MapPin size={18} color="var(--accent-orange)" />
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>Spoofing Detection Matrix</span>
              </div>
              <div style={{ background: '#111', padding: '12px 16px', borderRadius: '6px', color: '#A8ADB4', fontFamily: 'monospace', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>$ check-gps --user=emp_4829</div>
                <div style={{ color: 'var(--accent-orange)' }}>[ALERT] Mock Location Provider: DETECTED</div>
                <div>Browser Accuracy Tolerance: 84 meters [FAIL]</div>
                <div style={{ color: '#ef4444', fontWeight: 'bold' }}>ATTENDANCE CHECK-IN: BLOCKED</div>
              </div>
            </div>
          );
        case 2:
          return (
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '10px' }}>
                <Code2 size={18} color="var(--accent-blue)" />
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>Server-Side Haversine Logic</span>
              </div>
              <pre style={{ background: '#111', padding: '10px 12px', borderRadius: '4px', color: '#34d399', fontSize: '0.7rem', fontFamily: 'monospace', overflowX: 'auto', textAlign: 'left' }}>
{`// Calculate distance between coordinates
const dLat = (lat2 - lat1) * Math.PI / 180;
const dLon = (lon2 - lon1) * Math.PI / 180;
const a = 
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * 
  Math.cos(lat2 * Math.PI / 180) * 
  Math.sin(dLon/2) * Math.sin(dLon/2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
const distance = 6371000 * c; // In meters`}
              </pre>
            </div>
          );
        case 3:
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>Strict vs. Buffer Zones</span>
                <Clock color="var(--accent-blue)" size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'rgba(39, 201, 63, 0.05)', border: '1px solid rgba(39, 201, 63, 0.1)', borderRadius: '4px' }}>
                  <span style={{ color: '#27c93f', fontWeight: 'bold' }}>Strict Zone (&lt; 200m)</span>
                  <span>Present // Standard Hours</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'rgba(201, 162, 39, 0.05)', border: '1px solid rgba(201, 162, 39, 0.1)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>Buffer Zone (200m-500m)</span>
                  <span>Requires Manager Approval</span>
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '10px' }}>
                <Terminal size={16} color="var(--accent-gold)" />
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>AUTO-CHECKOUT DAEMON</span>
              </div>
              <div style={{ background: '#111111', padding: '12px 16px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.7rem', color: '#A8ADB4', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                <div style={{ color: 'var(--accent-gold)' }}>[CRON] Daemon starting run (22:00 IST)...</div>
                <div>[INFO] Ingesting active session keys...</div>
                <div>[INFO] Auto-checking out session #48291 (reason: End of Work Day)</div>
                <div style={{ color: '#27C93F' }}>[SUCCESS] Checkout daemon run completed.</div>
              </div>
            </div>
          );
        case 5:
          return (
            <div style={{ textAlign: 'center' }}>
              <CheckCircle2 size={40} color="#27C93F" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>
                100% Secure
              </div>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                FRAUD IN WORKPLACES PREVENTED
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>MANUAL OVERHEAD</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-orange)', marginTop: '2px' }}>25+ Hrs/Week</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>SYSTEM ACCURACY</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#27C93F', marginTop: '2px' }}>100% Reliable</div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    } else if (caseId === 'reachx-saas') {
      switch (activeStep) {
        case 0:
          return (
            <div style={{ textAlign: 'center' }}>
              <Cpu size={40} color="var(--accent-orange)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Server Hosting Silos
              </div>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '350px', margin: '0 auto', fontWeight: 300 }}>
                Hosting isolated VPS clusters and database instances for each separate client drained resources and budget.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                <div style={{ padding: '6px 10px', border: '1px solid var(--accent-orange)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--accent-orange)', fontFamily: 'monospace' }}>HOST-1 // $120/mo</div>
                <div style={{ padding: '6px 10px', border: '1px solid var(--accent-orange)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--accent-orange)', fontFamily: 'monospace' }}>HOST-2 // $120/mo</div>
              </div>
            </div>
          );
        case 1:
          return (
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px' }}>
                <Activity color="var(--accent-orange)" size={18} />
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>Query Latency Spikes</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span>Unindexed Join Query Latency</span>
                    <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>820ms</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '82%', height: '100%', background: 'var(--accent-orange)' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span>Indexed Tenant Query Latency</span>
                    <span style={{ color: '#27c93f', fontWeight: 'bold' }}>42ms</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '8%', height: '100%', background: '#27c93f' }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '10px' }}>
                <Code2 size={18} color="var(--accent-blue)" />
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>Subdomain Isolation Router</span>
              </div>
              <pre style={{ background: '#111', padding: '10px 12px', borderRadius: '4px', color: '#34d399', fontSize: '0.7rem', fontFamily: 'monospace', overflowX: 'auto', textAlign: 'left' }}>
{`// Dynamic subdomain routing middleware
const tenantRouter = (req, res, next) => {
  const host = req.headers.host; // e.g., client1.reachx.world
  const subdomain = host.split('.')[0];
  
  // Bind isolated tenant database connection
  req.db = getTenantDatabase(subdomain);
  req.tenantId = subdomain;
  next();
};`}
              </pre>
            </div>
          );
        case 3:
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem' }}>32-Table Relational Schema</span>
                <Layers color="var(--accent-blue)" size={18} />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                <div style={{ padding: '6px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <strong>Tenant Tables Isolation</strong>: Enforced via UUID scoping and foreign keys cascading constraints.
                </div>
                <div style={{ padding: '6px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <strong>Composite Index</strong>: Speeding searches by indexing `(tenant_id, created_at)` keys.
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '10px' }}>
                <Terminal size={16} color="var(--accent-gold)" />
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>ROLLING ZERO-DOWNTIME RELOAD</span>
              </div>
              <div style={{ background: '#111111', padding: '12px 16px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.7rem', color: '#A8ADB4', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                <div>$ pm2 reload reachx-os --cluster</div>
                <div style={{ color: 'var(--accent-gold)' }}>[PM2] Reloading reachx-os app cluster...</div>
                <div style={{ color: '#27C93F' }}>[PM2] Node 1 online (0 downtime)</div>
                <div style={{ color: '#27C93F' }}>[PM2] Node 2 online (0 downtime)</div>
                <div style={{ color: '#FFFFFF' }}>[SUCCESS] Zero-downtime rolling reload complete.</div>
              </div>
            </div>
          );
        case 5:
          return (
            <div style={{ textAlign: 'center' }}>
              <Sparkles size={36} color="var(--accent-gold)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                60% Saved
              </div>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                INFRASTRUCTURE SAVINGS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>BEFORE CONFIG</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-orange)', marginTop: '2px' }}>Isolated VPS/Client</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>AFTER CONFIG</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#27C93F', marginTop: '2px' }}>1 Shared Subdomain Core</div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div 
      ref={triggerRef} 
      className="moment-section technical-moment-section" 
      style={{ 
        minHeight: isMobile ? 'auto' : '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        background: 'rgba(250,250,248,0.95)',
        overflow: 'hidden',
        zIndex: 3,
        paddingTop: isMobile ? '80px' : '95px',
        paddingBottom: isMobile ? '40px' : '25px'
      }}
    >
      <div style={{ width: '90%', margin: '0 auto', maxWidth: '1440px' }}>
        
        {/* Case Studies Selectors Tab Bar */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--border-light)', 
          marginBottom: '20px',
          overflowX: 'auto',
          paddingBottom: '6px',
          gap: '12px'
        }} className="gsap-reveal-fade-up">
          {caseStudies.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => handleCaseStudyChange(idx)}
              style={{
                padding: '6px 12px',
                fontFamily: 'var(--font-interface)',
                fontSize: '0.85rem',
                fontWeight: activeCaseStudyIdx === idx ? 700 : 300,
                color: activeCaseStudyIdx === idx ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderBottom: activeCaseStudyIdx === idx ? '2px solid var(--accent-gold)' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {cs.tabLabel}
            </button>
          ))}
        </div>

        {/* Narrative & Visual Splitted Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.10fr 0.90fr', gap: 'var(--grid-gap)', alignItems: 'center' }}>
          
          {/* Left Narrative Panel */}
          <div>
            <div className="editorial-label gsap-reveal-fade-up" style={{ marginBottom: '12px' }}>REAL-WORLD SUCCESS STORY</div>
            
            <h2 className="editorial-title-medium gsap-reveal-fade-up" style={{ 
              marginBottom: '12px', 
              fontWeight: 400,
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)'
            }}>
              {currentStudy.name} <br />
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.75em' }}>{currentStudy.description}</span>
            </h2>
            
            {/* Step Counter Indicator */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => isMobile && setActiveStep(idx)}
                  className="technical-stepper-btn"
                  style={{ 
                    flex: 1, 
                    background: idx <= activeStep ? 'var(--accent-gold)' : 'var(--border-light)',
                    transition: 'background 0.3s',
                    border: 'none',
                    cursor: isMobile ? 'pointer' : 'default'
                  }} 
                />
              ))}
            </div>

            {/* Fading text container driven by dynamic active step state */}
            <div style={{ minHeight: isMobile ? 'auto' : '220px', transition: 'opacity 0.3s' }}>
              
              <span style={{ 
                fontFamily: 'var(--font-interface)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: current.badgeColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                background: 'rgba(17, 17, 17, 0.03)',
                padding: '4px 10px',
                borderRadius: '4px',
                display: 'inline-block',
                marginBottom: '8px'
              }}>
                {current.label}
              </span>
              
              <h3 style={{ 
                fontFamily: 'var(--font-editorial)', 
                fontSize: '1.8rem', 
                color: 'var(--text-primary)', 
                marginBottom: '6px',
                fontWeight: 400,
                lineHeight: 1.2
              }}>
                {current.title}
              </h3>
              
              <div style={{ 
                fontFamily: 'var(--font-interface)', 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                color: 'var(--text-primary)', 
                marginBottom: '12px' 
              }}>
                {current.subtitle}
              </div>
              
              <p className="editorial-text" style={{ marginBottom: '8px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {current.body1}
              </p>
              
              <p className="editorial-text" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                {current.body2}
              </p>

            </div>

            {/* Indicator / Mobile Steppers */}
            {isMobile ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                  style={{
                    padding: '8px 16px',
                    fontFamily: 'var(--font-interface)',
                    fontSize: '0.85rem',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    borderRadius: '4px',
                    border: 'none',
                    opacity: activeStep === 0 ? 0.3 : 1,
                    cursor: activeStep === 0 ? 'default' : 'pointer'
                  }}
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setActiveStep(prev => Math.min(slides.length - 1, prev + 1))}
                  disabled={activeStep === slides.length - 1}
                  style={{
                    padding: '8px 16px',
                    fontFamily: 'var(--font-interface)',
                    fontSize: '0.85rem',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    borderRadius: '4px',
                    border: 'none',
                    opacity: activeStep === slides.length - 1 ? 0.3 : 1,
                    cursor: activeStep === slides.length - 1 ? 'default' : 'pointer'
                  }}
                >
                  Next Step
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '16px' }}>
                <Eye size={14} />
                <span>SCROLL DOWN TO PROGRESS NARRATIVE SEQUENCE</span>
              </div>
            )}

          </div>

          {/* Right Graphical Core visualization based on active step */}
          <div style={{
            background: 'var(--surface-primary)',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: isMobile ? '24px' : '28px',
            boxShadow: 'var(--shadow-premium)',
            minHeight: isMobile ? '300px' : '360px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginTop: isMobile ? '32px' : 0
          }} className="gsap-reveal-fade-up">
            
            {/* Background geometric design texture */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(201, 162, 39, 0.05) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            {/* Render case study step-specific visual panel */}
            {renderVisualPanel()}

          </div>

        </div>
      </div>
    </div>
  );
};

export default TechnicalMoment;
