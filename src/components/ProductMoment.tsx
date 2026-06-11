import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Layout, 
  Users, 
  Globe, 
  Layers,
  MapPin,
  Clock,
  Database,
  Terminal,
  Printer,
  Activity,
  Mail,
  Send,
  Sparkles,
  Sliders
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  liveUrl: string;
  metrics: { value: string; label: string }[];
  problem: string;
  chaos: string;
  transformation: string;
  result: string;
  techStack: string[];
  architecture: string;
  mockupData: {
    title: string;
    status: string;
    logs: string[];
    chartValues: number[];
  };
}

// ==========================================================================
// SIMULATED WEB APP DASHBOARD COMPONENTS (LIVE PREVIEWS)
// ==========================================================================

const SunriseFarmsPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Activity size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Sunrise Farms Venue Manager</div>
            <div className="mock-subtitle">Luxury Event Spaces &amp; Villa Booking Telemetry</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>SYSTEM ACTIVE</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flexGrow: 1 }}>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Villa Availability</span>
            <div style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>92% Booked</div>
            <span style={{ fontSize: '0.6rem', color: '#27c93f' }}>Weekend slots locked</span>
          </div>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Media Delivery Speed</span>
            <div style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>0.42s LCP</div>
            <span style={{ fontSize: '0.6rem', color: 'var(--accent-gold)' }}>Fully optimized assets</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '110px' }}>
          <div>[1] ASSET: Lazy loading high-resolution gallery images ... SUCCESS</div>
          <div>[2] BOOK: Form ingestion validated for booking inquiries</div>
          <div>[3] LEAD: Dispatching notification alert to admin WhatsApp channel</div>
        </div>
      </div>
    </div>
  );
};

const QyvorinPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Sliders size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Qyvorin Core Console</div>
            <div className="mock-subtitle">AI Assistant &amp; Glassmorphic Rendering State</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>ONLINE // MONITORING</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flexGrow: 1 }}>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Lighthouse Speed</span>
            <div style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>98/100</div>
            <span style={{ fontSize: '0.6rem', color: '#27c93f' }}>Google Core Web Vitals OK</span>
          </div>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>AI Agent Queries</span>
            <div style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>99.9% Uptime</div>
            <span style={{ fontSize: '0.6rem', color: 'var(--accent-gold)' }}>Serverless agent running</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '110px' }}>
          <div>[1] THEME: Rendered glassmorphic gradient layout layers</div>
          <div>[2] AGENT: Active user session connected ... payload ingested</div>
          <div>[3] SYSTEM: CSS animations initialized successfully at 120 FPS</div>
        </div>
      </div>
    </div>
  );
};

const W4YOpsPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><MapPin size={18} /></div>
        <div className="mock-sidebar-icon"><Clock size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">W4Y ERP Ops Control</div>
            <div className="mock-subtitle">Geofenced GPS Attendance &amp; Inbound Invoicing</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>65+ PROJECTS LIVE</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="mock-gateway-card" style={{ padding: '12px', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>GPS Validation</span>
            <div className="mock-status-glow green" style={{ margin: '6px 0' }}></div>
            <span style={{ fontSize: '0.65rem', color: '#27c93f' }}>IST TIMEZONE SECURE</span>
          </div>
          <div className="mock-gateway-card" style={{ padding: '12px', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Invoicing Engine</span>
            <span style={{ fontSize: '0.9rem', color: '#fff', display: 'block', fontWeight: 'bold', marginTop: '4px' }}>GST Calculations</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>Period-close Locked</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '100px' }}>
          <div>[1] GPS: Geofence validation (lat: 21.145, lon: 79.088) ... VALID</div>
          <div>[2] TIME: IST zone checks ... employee marked Present</div>
          <div>[3] CRON: Auto-checkout daemon running (22:00 IST) ... processed 14 checks</div>
        </div>
      </div>
    </div>
  );
};

const ReachXOSPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Layers size={18} /></div>
        <div className="mock-sidebar-icon"><Database size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">ReachX OS Multi-Tenant Platform</div>
            <div className="mock-subtitle">Tenant Isolation Middleware &amp; Schema Integrity</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>SUB-100MS QUEUE</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div className="mock-gateway-card" style={{ padding: '10px' }}>
            <span style={{ fontSize: '0.65rem', color: '#8e95a5', fontWeight: 'bold' }}>client1.reachx.world</span>
            <div className="mock-status-glow green"></div>
            <span style={{ fontSize: '0.6rem', color: '#27c93f' }}>DB isolated</span>
          </div>
          <div className="mock-gateway-card" style={{ padding: '10px' }}>
            <span style={{ fontSize: '0.65rem', color: '#8e95a5', fontWeight: 'bold' }}>client2.reachx.world</span>
            <div className="mock-status-glow green"></div>
            <span style={{ fontSize: '0.6rem', color: '#27c93f' }}>DB isolated</span>
          </div>
          <div className="mock-gateway-card" style={{ padding: '10px' }}>
            <span style={{ fontSize: '0.65rem', color: '#8e95a5', fontWeight: 'bold' }}>NSO Handover</span>
            <div className="mock-status-glow green"></div>
            <span style={{ fontSize: '0.6rem', color: '#27c93f' }}>Partner Sync</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '95px' }}>
          <div>[1] ROUTER: Subdomain header 'client1' matched to DB-Host</div>
          <div>[2] TENANT: Loading isolation cache ... loaded in 12ms</div>
          <div>[3] STATS: 32 relational tables synced with cascade triggers</div>
        </div>
      </div>
    </div>
  );
};

const DS16CRMPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Layout size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">DS16 Architecture ERP Console</div>
            <div className="mock-subtitle">Project Kanban &amp; Double-Entry Ledgers</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>UTC-IST RESOLVED</span>
        </div>
        <div className="mock-kanban-board">
          <div className="mock-kanban-column">
            <div className="mock-kanban-title">Site Survey <span>2</span></div>
            <div className="mock-kanban-card">
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#fff' }}>Nagpur Residential</div>
              <div style={{ fontSize: '0.65rem', color: '#8e95a5' }}>Blueprints Ingested</div>
            </div>
          </div>
          <div className="mock-kanban-column">
            <div className="mock-kanban-title">Drafting <span>1</span></div>
            <div className="mock-kanban-card" style={{ borderColor: 'var(--accent-gold)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#fff' }}>Sadar Complex</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>Active Layout Draft</div>
            </div>
          </div>
          <div className="mock-kanban-column">
            <div className="mock-kanban-title">Ledger Close <span>✓</span></div>
            <div className="mock-kanban-card" style={{ opacity: 0.6 }}>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#fff' }}>Vendor Receipts</div>
              <div style={{ fontSize: '0.65rem', color: '#27C93F' }}>Balanced 🟢</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BillBookPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Printer size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">BillBook Offline Terminal</div>
            <div className="mock-subtitle">sql.js WASM SQLite Database Engine</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', background: 'rgba(201, 162, 39, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>OFFLINE ACTIVE</span>
        </div>
        <div className="mock-transcode-container">
          <div className="mock-transcode-row" style={{ padding: '8px 12px' }}>
            <div className="mock-transcode-meta">
              <span style={{ fontWeight: 600, color: '#fff' }}>WASM Buffer Allocation</span>
              <span style={{ color: '#27c93f', fontWeight: 'bold' }}>✓ ACTIVE</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8e95a5' }}>Database Path: local://sql.js/database.db</div>
          </div>
          <div className="mock-transcode-row" style={{ padding: '8px 12px' }}>
            <div className="mock-transcode-meta">
              <span style={{ fontWeight: 600, color: '#fff' }}>Atomic Backup File Sync</span>
              <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>✓ SYNCED</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8e95a5' }}>Strategy: Temp-Write then Rename (.bak active)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DS16WebPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Layout size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">DS16 Architecture Showcase</div>
            <div className="mock-subtitle">Portfolio Lazy Loader &amp; Layout Optimizer</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>ASSETS SYNCED</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flexGrow: 1 }}>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Blueprint Assets</span>
            <div style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>100% WebP</div>
            <span style={{ fontSize: '0.6rem', color: '#27c93f' }}>Asset optimization enabled</span>
          </div>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Client Lead Form</span>
            <div style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>SMTP Synced</div>
            <span style={{ fontSize: '0.6rem', color: 'var(--accent-gold)' }}>Form processing online</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '110px' }}>
          <div>[1] COMPRESS: {"Compressed architectural plans 12MB -> 450KB WebP"}</div>
          <div>[2] LAYOUT: CSS Grid rendering responsive blueprints portfolio</div>
          <div>[3] FORM: Client contact validation hook ... online</div>
        </div>
      </div>
    </div>
  );
};

const ConcordPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Terminal size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Concord Fintech Services</div>
            <div className="mock-subtitle">EMI Engine &amp; Corporate Intake Middleware</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>SECURE ACCESS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flexGrow: 1 }}>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>SSL Protection</span>
            <div style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>256-Bit SSL</div>
            <span style={{ fontSize: '0.6rem', color: '#27c93f' }}>Client data encrypted</span>
          </div>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>EMI Calculator Uptime</span>
            <div style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>100% stable</div>
            <span style={{ fontSize: '0.6rem', color: 'var(--accent-gold)' }}>React calculations instant</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '110px' }}>
          <div>[1] SSL: Secure socket connection verified (SSL/TLS active)</div>
          <div>[2] CALC: EMI mathematical formulas computed and loaded in browser</div>
          <div>[3] SMTP: Lead routing endpoint active for corporate applications</div>
        </div>
      </div>
    </div>
  );
};

const AuraBlakePreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Sparkles size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Aura Blake Media Kit System</div>
            <div className="mock-subtitle">GSAP Scroll pinning &amp; Media Delivery</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>AESTHETICS OK</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flexGrow: 1 }}>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', color: '#8e95a5', fontWeight: 'bold' }}>Scroll Animations</span>
            <div style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>GSAP Triggered</div>
          </div>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', color: '#8e95a5', fontWeight: 'bold' }}>Social API Cache</span>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>Verified // loaded</div>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '110px' }}>
          <div>[1] GSAP: Pinning sections for luxury scroll slide transition</div>
          <div>[2] VIDEO: Cinematic background loops streaming successfully</div>
          <div>[3] MEDIA: Loaded press assets and metrics chart widgets</div>
        </div>
      </div>
    </div>
  );
};

const GaeaRealtyPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Users size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Gaea Realty CRM Console</div>
            <div className="mock-subtitle">RBAC Agent Roles &amp; Sales Pipelines</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>SECURE ACCESS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="mock-gateway-card" style={{ padding: '12px', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>RBAC Auth Verification</span>
            <div className="mock-status-glow green" style={{ margin: '6px 0' }}></div>
            <span style={{ fontSize: '0.65rem', color: '#27c93f' }}>Role: Sales Agent</span>
          </div>
          <div className="mock-gateway-card" style={{ padding: '12px', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Active Listing Matches</span>
            <span style={{ fontSize: '0.9rem', color: '#fff', display: 'block', fontWeight: 'bold', marginTop: '4px' }}>14 Active Leads</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>Property Filter Enabled</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '90px' }}>
          <div>[1] RBAC: Auth token verified (Role: Sales Agent)</div>
          <div>[2] LEADS: Dynamic filter updated ... 14 properties matched</div>
          <div>[3] VPS: Linux server uptime 99.98%</div>
        </div>
      </div>
    </div>
  );
};

const JagmartGroceryPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Layers size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Jagmart Grocery Bulk Pipeline</div>
            <div className="mock-subtitle">GPS Location Tagging &amp; XLSX Bulk Ingestion</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>LEAD SYNCED</span>
        </div>
        <div className="mock-invoice-container">
          <div className="mock-invoice-paper">
            <div className="mock-invoice-scanner"></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #111', paddingBottom: '6px', fontWeight: 'bold', fontSize: '0.8rem' }}>
              <span>INVENTORY XLSX</span>
              <span style={{ color: 'var(--accent-gold)' }}>BULK_INGEST</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <div className="mock-invoice-row">
                <span>Total Items</span>
                <strong>842 products</strong>
              </div>
              <div className="mock-invoice-row">
                <span>Errors Ingested</span>
                <strong>0 failures</strong>
              </div>
            </div>
          </div>
          <div className="mock-invoice-status">
            <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', color: '#a8adb4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#27c93f' }}>✓</span> GPS range validation OK
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#27c93f' }}>✓</span> Inventory matching active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BulkEmailPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Mail size={18} /></div>
        <div className="mock-sidebar-icon"><Send size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Bulk Email Campaign Manager</div>
            <div className="mock-subtitle">Google OAuth Ingestion &amp; Batch Sender</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>PACING OK</span>
        </div>
        <div className="mock-transcode-container">
          <div className="mock-transcode-row" style={{ padding: '8px 12px' }}>
            <div className="mock-transcode-meta">
              <span style={{ fontWeight: 600, color: '#fff' }}>Recipient Ingestion Queue</span>
              <span style={{ color: '#27c93f', fontWeight: 'bold' }}>✓ 14k EMAILS LOADED</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8e95a5' }}>File: list.csv (OAuth Token validation verified)</div>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '90px' }}>
          <div>[1] OAuth: Token validated (Google API scope: gmail.send)</div>
          <div>[2] QUEUE: Ingested list.csv (14,000 recipients)</div>
          <div>[3] WORKER: Pacing delivery at 1 email / 4.2 seconds to prevent spam filter</div>
        </div>
      </div>
    </div>
  );
};

const AquasaverPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Activity size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Aquasaver Core Validator</div>
            <div className="mock-subtitle">Water Saving &amp; Purification Optimization Metrics</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>SYSTEM ACTIVE</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flexGrow: 1 }}>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Flow Optimization</span>
            <div style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>14.2 L/sec</div>
            <span style={{ fontSize: '0.65rem', color: '#27c93f' }}>Pressure valve within bounds</span>
          </div>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Filter Efficiency</span>
            <div style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>99.8% TDS</div>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>Purification active</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '110px' }}>
          <div>[1] SENSOR: Flow rate sensor online (14.2 L/sec)</div>
          <div>[2] PURITY: Filter efficiency at 99.8% (TDS: 42)</div>
          <div>[3] VALVE: Automated pressure regulation ... stable</div>
        </div>
      </div>
    </div>
  );
};

const W4YMarketingPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Sliders size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">W4Y Interactive Sandbox</div>
            <div className="mock-subtitle">Three.js WebGL &amp; GSAP Scroll Pinner</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>GPU SHADER ACCELERATED</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', color: '#8e95a5', fontWeight: 'bold' }}>WebGL Frame Rate</span>
            <div style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>144 FPS</div>
          </div>
          <div className="mock-gateway-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', color: '#8e95a5', fontWeight: 'bold' }}>GSAP Pinning State</span>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>Locked // active</div>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '90px' }}>
          <div>[1] ThreeJS: Initializing WebGL canvas layer</div>
          <div>[2] GSAP: Pinned timeline bound to Lenis scroll controller</div>
          <div>[3] SHIELD: Audit tracker active (15-day secure loop)</div>
        </div>
      </div>
    </div>
  );
};

const ReachXMarketingPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Sparkles size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">ReachX Marketing SPA Simulator</div>
            <div className="mock-subtitle">Next.js &amp; Framer Motion 12 Scroll States</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>ZOD VALIDATED</span>
        </div>
        <div className="mock-receptionist-grid">
          <div className="mock-voice-visualizer" style={{ padding: '10px' }}>
            <div className="mock-voice-pulse" style={{ height: '40px' }}>
              <span className="mock-voice-bar"></span>
              <span className="mock-voice-bar"></span>
              <span className="mock-voice-bar"></span>
              <span className="mock-voice-bar"></span>
              <span className="mock-voice-bar"></span>
              <span className="mock-voice-bar"></span>
            </div>
            <span style={{ fontSize: '0.65rem', color: '#8e95a5', fontWeight: 'bold' }}>Shader Pulses</span>
          </div>
          <div className="mock-ledger-log" style={{ maxHeight: '110px' }}>
            <div>[1] SHADER: Uniform variables compiled (u_time: 489.2)</div>
            <div>[2] ZOD: Form input verification passed (email, phone)</div>
            <div>[3] SVG: Rendering live telemetry chart nodes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoftCoworksPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Users size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">Loft Coworks Portal</div>
            <div className="mock-subtitle">Next.js App Router Workspace Booking</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#27C93F', background: 'rgba(39, 201, 63, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>SMTP CONNECTED</span>
        </div>
        <div className="mock-gateway-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div className="mock-gateway-card" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Hot Desk #42</span>
            <div className="mock-status-glow green"></div>
            <span style={{ fontSize: '0.65rem', color: '#27c93f' }}>OCCUPIED // LIVE</span>
          </div>
          <div className="mock-gateway-card" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>Booking Drawer</span>
            <div className="mock-status-glow green"></div>
            <span style={{ fontSize: '0.65rem', color: '#27c93f' }}>ACTIVE // OPENED</span>
          </div>
          <div className="mock-gateway-card" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.7rem', color: '#8e95a5', fontWeight: 'bold' }}>SSG Blog compiled</span>
            <div className="mock-status-glow green"></div>
            <span style={{ fontSize: '0.65rem', color: '#27c93f' }}>GENERATE OK</span>
          </div>
        </div>
        <div className="mock-ledger-log" style={{ maxHeight: '100px' }}>
          <div>[1] SMTP: Booking inquiry email queued ... sent via Nodemailer</div>
          <div>[2] SSG: Blog route compile (Static Site Generation)</div>
          <div>[3] ACCESS: Member space check-in completed</div>
        </div>
      </div>
    </div>
  );
};

const SDPAssociatesPreview: React.FC = () => {
  return (
    <div className="mock-dashboard-wrapper">
      <div className="mock-sidebar">
        <div className="mock-sidebar-icon active"><Terminal size={18} /></div>
      </div>
      <div className="mock-main-content">
        <div className="mock-content-header">
          <div>
            <div className="mock-title">SDP Component Injector</div>
            <div className="mock-subtitle">Static Site Injection Script &amp; SEO Checks</div>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', background: 'rgba(201, 162, 39, 0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>31 PAGES STATIC</span>
        </div>
        <div className="mock-transcode-container">
          <div className="mock-transcode-row" style={{ padding: '8px 12px' }}>
            <div className="mock-transcode-meta">
              <span style={{ fontWeight: 600, color: '#fff' }}>Component Injection</span>
              <span style={{ color: '#27c93f', fontWeight: 'bold' }}>✓ SUCCESS</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8e95a5' }}>Headers/footers propagated into static HTML templates</div>
          </div>
          <div className="mock-transcode-row" style={{ padding: '8px 12px' }}>
            <div className="mock-transcode-meta">
              <span style={{ fontWeight: 600, color: '#fff' }}>SEO Audit validation</span>
              <span style={{ color: '#27c93f', fontWeight: 'bold' }}>✓ 100% SEO READY</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8e95a5' }}>Meta descriptions, titles and Google Maps key integrated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DesktopFrameProps {
  project: Project;
}

const DesktopFrame: React.FC<DesktopFrameProps> = ({ project }) => {
  const [viewMode, setViewMode] = useState<'live' | 'console'>('live');
  const [iframeLoading, setIframeLoading] = useState(true);

  // Reset iframe loading state when tab or viewMode changes
  useEffect(() => {
    setIframeLoading(true);
  }, [project.id, viewMode]);

  const renderConsoleContent = () => {
    switch (project.id) {
      case 'aquasaver':
        return <AquasaverPreview />;
      case 'w4y-ops':
        return <W4YOpsPreview />;
      case 'reachx-os':
        return <ReachXOSPreview />;
      case 'ds16-crm':
        return <DS16CRMPreview />;
      case 'billbook':
        return <BillBookPreview />;
      case 'w4y-web':
        return <W4YMarketingPreview />;
      case 'reachx-web':
        return <ReachXMarketingPreview />;
      case 'loftcoworks':
        return <LoftCoworksPreview />;
      case 'sdp-associates':
        return <SDPAssociatesPreview />;
      case 'sunrisefarms':
        return <SunriseFarmsPreview />;
      case 'qyvorin':
        return <QyvorinPreview />;
      case 'ds16-web':
        return <DS16WebPreview />;
      case 'concord':
        return <ConcordPreview />;
      case 'aura-blake':
        return <AuraBlakePreview />;
      case 'gaearealty':
        return <GaeaRealtyPreview />;
      case 'jagmart-grocery':
        return <JagmartGroceryPreview />;
      case 'bulk-email':
        return <BulkEmailPreview />;
      default:
        return null;
    }
  };

  const currentUrl = project.liveUrl;

  return (
    <div className="desktop-frame-container">
      {/* Header Bar */}
      <div className="mock-browser-header">
        <div className="mock-window-dots">
          <span className="mock-dot close"></span>
          <span className="mock-dot minimize"></span>
          <span className="mock-dot expand"></span>
        </div>
        <div className="mock-address-bar">
          <Globe size={12} />
          <a 
            href={currentUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
            title="Open Live Website in New Tab"
          >
            <span>{currentUrl}</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>↗</span>
          </a>
        </div>

        {/* Dual Mode View Switcher segment */}
        <div className="mock-view-switcher">
          <button 
            onClick={() => setViewMode('live')} 
            className={`mock-switch-btn ${viewMode === 'live' ? 'active' : ''}`}
          >
            Live Site
          </button>
          <button 
            onClick={() => setViewMode('console')} 
            className={`mock-switch-btn ${viewMode === 'console' ? 'active' : ''}`}
          >
            Systems Console
          </button>
        </div>
      </div>

      {/* Browser Main Content Canvas */}
      <div className="mock-browser-content">
        {viewMode === 'live' ? (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {project.id === 'w4y-ops' || project.id === 'reachx-os' || project.id === 'ds16-crm' ? (
              <img 
                src={
                  project.id === 'w4y-ops' ? '/w4y-dashboard.png' :
                  project.id === 'reachx-os' ? '/reachx-dashboard.png' :
                  '/ds16-dashboard.png'
                }
                alt={`Dashboard preview of ${currentUrl}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
            ) : (
              <>
                {iframeLoading && (
                  <div className="iframe-loader-container">
                    <div className="iframe-loader-spinner"></div>
                    <div style={{ color: '#8e95a5', fontSize: '0.75rem', fontWeight: 600 }}>
                      Loading Live Website...
                    </div>
                  </div>
                )}
                <iframe 
                  src={currentUrl}
                  title={`Live Preview of ${currentUrl}`}
                  className="iframe-container"
                  onLoad={() => setIframeLoading(false)}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  loading="lazy"
                />
              </>
            )}
            {/* Elegant redirect fallback overlay overlaying the iframe in case of CORS framing blocks */}
            <div style={{ 
              position: 'absolute', 
              bottom: '12px', 
              right: '12px', 
              zIndex: 6,
              background: '#14161d',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '6px',
              padding: '6px 12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <a 
                href={currentUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: 'var(--accent-gold)', 
                  fontSize: '0.7rem', 
                  fontWeight: 'bold', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  textDecoration: 'none'
                }}
              >
                Open Site Fullscreen ↗
              </a>
            </div>
          </div>
        ) : (
          renderConsoleContent()
        )}
      </div>
    </div>
  );
};

interface ProductMomentProps {
  type: 'websites' | 'software';
}

export const ProductMoment: React.FC<ProductMomentProps> = ({ type }) => {
  const projects: Project[] = [
    {
      id: 'aquasaver',
      name: 'Aquasaver Solutions',
      category: 'Clean Energy & Water Solutions Site',
      liveUrl: 'https://aquasaversolutions.com/',
      metrics: [
        { value: 'SEO Opt', label: 'Search Indexing Ready' },
        { value: 'Responsive', label: 'Cross-Device Styling' },
        { value: 'Modern UI', label: 'Clean Energy Branding' }
      ],
      problem: 'Eco-friendly water engineering systems need a simple, fast website to convert municipal leads.',
      chaos: 'Slow loading times on mobile devices caused high bounce rates during active municipal tenders.',
      transformation: 'Delivered a clean, highly optimized marketing website focusing on water saving metrics and lead generation.',
      result: 'Improved lead response times and provided a solid, fast digital presence for water purification systems.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Vite', 'SEO Optimization'],
      architecture: 'Lightweight static delivery layers maximizing Google Lighthouse speed scores.',
      mockupData: {
        title: 'AQUASAVER-CORE-VALIDATOR',
        status: 'ACTIVE // SYNCED',
        logs: [
          'SYS_INIT: Aquasaver optimizer database active',
          'TDS: Check completed ... index safe',
          'VALVE: Auto pressure regulator status stable'
        ],
        chartValues: [35, 52, 60, 48, 85, 70, 95]
      }
    },
    {
      id: 'w4y-web',
      name: 'W4Y B2B SaaS Website',
      category: 'Premium Interactive SaaS Marketing Site',
      liveUrl: 'https://w4y.online',
      metrics: [
        { value: '3D WebGL', label: 'Hero Experience' },
        { value: 'GSAP Pinned', label: 'Split-Screen Console' },
        { value: 'Interactive', label: 'ROI & Geofencing Demos' }
      ],
      problem: 'B2B software tools look dry on standard layouts, failing to show the advanced power of geofencing and automation.',
      chaos: 'Prospective clients struggled to visualize GPS geofencing, leading to longer sales loops and higher bounce rates.',
      transformation: 'Designed a premium marketing site with WebGL hero animations, scroll-pinned case studies, and live geofencing sandbox simulations.',
      result: 'Allowed prospects to test geofencing boundaries live in-browser, boosting demo conversion rates.',
      techStack: ['HTML5', 'Vanilla CSS', 'Three.js', 'GSAP', 'ScrollTrigger', 'Lenis', 'Vite', 'Vercel'],
      architecture: 'Highly optimized Canvas renders running smooth GPU shaders alongside GSAP scroll-pinned layouts.',
      mockupData: {
        title: 'W4Y-MARKETING-SANDBOX',
        status: 'ACTIVE // SECURE',
        logs: [
          'ThreeJS: WebGL Canvas initialization complete',
          'GSAP: Timeline bound to Lenis scroll',
          'SHIELD: 15-day audit simulator validated'
        ],
        chartValues: [45, 68, 54, 89, 75, 95, 98]
      }
    },
    {
      id: 'reachx-web',
      name: 'ReachX Marketing Platform',
      category: 'Ultra-Premium SPA & Shaders',
      liveUrl: 'https://reachx.world',
      metrics: [
        { value: 'WebGL', label: 'Fragment Shaders' },
        { value: 'Framer 12', label: 'Scroll Animations' },
        { value: 'SPA', label: 'Zero-Lag Page Swapping' }
      ],
      problem: 'A standard corporate landing page failed to reflect the tech-forward, high-speed capabilities of the ReachX operations suite.',
      chaos: 'A slow landing page with high page-load latency diminished marketing conversions during social media campaigns.',
      transformation: 'Engineered an ultra-premium SPA with custom WebGL fragment shaders, Framer Motion scroll states, and SVG dashboards.',
      result: 'Delivered an extremely fast, modern landing page with average load times under 0.6 seconds.',
      techStack: ['Next.js 16', 'TypeScript', 'Framer Motion 12', 'Three.js (WebGL)', 'Lenis', 'Zod'],
      architecture: 'Declarative animation nodes bound to high-performance smooth-scroll frames.',
      mockupData: {
        title: 'REACHX-WEBGL-SHADERS',
        status: 'MONITORING // ACTIVE',
        logs: [
          'SHADER: Fragment uniforms compiled (u_time)',
          'ZOD: Auth registration validations passed',
          'SVG: Live telemetry dashboard charts active'
        ],
        chartValues: [99, 99, 100, 99, 100, 99, 100]
      }
    },
    {
      id: 'loftcoworks',
      name: 'Loft Coworks Website',
      category: 'Coworking Space Portal',
      liveUrl: 'https://loftcoworks.com',
      metrics: [
        { value: 'Next.js App', label: 'App Router Framework' },
        { value: 'Tailwind v4', label: 'Modern CSS Compiling' },
        { value: 'SMTP Mail', label: 'Nodemailer Integrations' }
      ],
      problem: 'The workspace booking process required phone confirmation, causing dropouts during off-hours.',
      chaos: 'Admin staff spent hours weekly replying to availability queries and manually booking meeting rooms.',
      transformation: 'Built a Next.js App Router website featuring SSG blog routes, animated booking drawers, and automated SMTP notifications.',
      result: 'Increased off-hour booking requests by 40% and automated the client lead notification process.',
      techStack: ['Next.js 16.2', 'TypeScript 5', 'Tailwind CSS v4', 'Framer Motion 12', 'Nodemailer'],
      architecture: 'Statically generated pages (SSG) connected to API routing endpoints for lead ingestion.',
      mockupData: {
        title: 'LOFTCOWORKS-SMTP-SYNC',
        status: 'ACTIVE // SYNCED',
        logs: [
          'SMTP: Nodemailer lead auto-dispatch completed',
          'SSG: Meeting room blog generated static page',
          'ACCESS: Cowork check-in validation check completed'
        ],
        chartValues: [50, 65, 88, 72, 90, 80, 95]
      }
    },
    {
      id: 'sdp-associates',
      name: 'SDP Associates Website',
      category: 'Static Corporate Portal',
      liveUrl: 'https://sdpassociates.co.in',
      metrics: [
        { value: '31 Pages', label: 'Static Site Architecture' },
        { value: '~80% Less', label: 'Code Maintenance Effort' },
        { value: 'No Framework', label: 'Zero Package Lock' }
      ],
      problem: 'A 20-year-old construction firm needed a large 31-page website, but updating headers and footers across static files was tedious.',
      chaos: 'Traditional CMS sites loading slow scripts decreased SEO rankings, and manual code updates across 31 HTML files led to syntax bugs.',
      transformation: 'Engineered a static site with zero external UI framework dependencies, using a custom Node.js script to inject shared HTML components.',
      result: 'Reduced maintenance effort by 80% while preserving ultra-fast page load times and maximum SEO search rankings.',
      techStack: ['HTML5', 'Vanilla CSS3', 'Vanilla JavaScript (ES6+)', 'Node.js scripting', 'Google Maps API'],
      architecture: 'A static HTML compile script injecting shared headers/footers into the build folder prior to distribution.',
      mockupData: {
        title: 'SDP-INJECTOR-SCRIPT',
        status: 'ONLINE // PARSING',
        logs: [
          'NODE: Propagated layout scripts into templates',
          'SEO: Canonical search headers verified complete',
          'MAPS: Maps API auth signature verified status ok'
        ],
        chartValues: [30, 48, 65, 78, 85, 90, 99]
      }
    },
    {
      id: 'sunrisefarms',
      name: 'Sunrise Farms Nagpur',
      category: 'Luxury Countryside Farmhouse & Event Venue',
      liveUrl: 'https://sunrisefarmsnagpur.com',
      metrics: [
        { value: 'High Speed', label: '99% mobile performance' },
        { value: 'Lead Gen', label: 'Direct Booking Integration' },
        { value: 'Immersive', label: 'High-Res Media Galleries' }
      ],
      problem: 'A premium 9-acre countryside retreat struggled to convert high-end private bookings and event inquiries due to a slow, outdated web presence.',
      chaos: 'Potential guests looking for premium event venues dropped off during image loading, resulting in lost weekend villa rentals.',
      transformation: 'Designed and launched a blazing-fast, visually stunning marketing website with integrated WhatsApp bookings and high-resolution photo galleries.',
      result: 'Significantly increased venue rental inquiries and created a premium online presence matching the physical luxury of the property.',
      techStack: ['React', 'Vite', 'Vanilla CSS', 'Framer Motion', 'SEO Optimization'],
      architecture: 'Component-driven static site generation (SSG) with optimized image assets and smooth routing.',
      mockupData: {
        title: 'SUNRISE-FARMS-TELEMETRY',
        status: 'SYSTEM RUNNING',
        logs: [
          'MEDIA: Optimizing image rendering pipes',
          'API: Booking integration online',
          'SEO: Google Search Console indexed'
        ],
        chartValues: [85, 90, 88, 92, 95, 93, 98]
      }
    },
    {
      id: 'w4y-ops',
      name: 'W4Y Operational Platform',
      category: 'Enterprise ERP & GPS Attendance Ledger',
      liveUrl: 'https://work.w4y.online',
      metrics: [
        { value: '65+', label: 'Active Projects Managed' },
        { value: '16 Modules', label: 'REST API Suite' },
        { value: '71', label: 'Live Clients Served' }
      ],
      problem: 'Field staff attendance and timesheet billing were vulnerable to manual fraud, with overlapping logs across projects.',
      chaos: 'Timesheet discrepancies cost over 15% in billing leakages. Delayed invoice periods stalled vendor payments by weeks.',
      transformation: 'Designed a geofenced GPS attendance platform with browser-based coordinate boundaries, IST-aware late detection, and auto-checkout.',
      result: 'Eliminated timesheet fraud completely, locked monthly ledgers with raw transactions (no ORM), and saved 25+ hours weekly.',
      techStack: ['React 19', 'Node.js', 'Express 5', 'PostgreSQL', 'JWT', 'Nginx', 'PM2', 'Recharts', 'jsPDF', 'XLSX'],
      architecture: 'Geofenced GPS tracking coupled with transactional database locks for secure, tamper-proof audit trails.',
      mockupData: {
        title: 'W4Y-OPS-CONTROL',
        status: 'ACTIVE // SECURE',
        logs: [
          'GPS: Geofence validation checked',
          'TIME: IST zone checks active',
          'CRON: Auto-checkout daemon running'
        ],
        chartValues: [78, 80, 85, 94, 91, 98, 99]
      }
    },
    {
      id: 'reachx-os',
      name: 'ReachX OS Platform',
      category: 'Multi-Tenant SaaS Operations Manager',
      liveUrl: 'https://os.reachx.world',
      metrics: [
        { value: '~60% Less', label: 'Infrastructure Overhead' },
        { value: '<100ms', label: 'Query Response Speed' },
        { value: '32 Tables', label: 'Relational Schema' }
      ],
      problem: 'Managing isolated single-tenant server deployments for each client raised server hosting bills and created high maintenance overhead.',
      chaos: 'Provisioning new servers for corporate partners took days, and database updates had to be run manually across multiple staging systems.',
      transformation: 'Built a multi-tenant business operations platform from scratch using subdomain-based tenant isolation and composite database indexes.',
      result: 'Reduced hosting expenses by 60% and automated new client onboarding down to a 10-second subdomain registration.',
      techStack: ['React 19', 'Vite', 'Node.js', 'Express 5', 'PostgreSQL', 'Nginx', 'PM2', 'Tailwind CSS', 'Recharts', 'jsPDF'],
      architecture: 'Subdomain tenant isolation middleware coupled with cascading database referential integrity checks.',
      mockupData: {
        title: 'REACHX-OS-TENANTS',
        status: 'MONITORING // STABLE',
        logs: [
          'ROUTER: Subdomain matched to DB host',
          'TENANT: Tenant isolation cache active',
          'STATS: 32 tables integrity validated'
        ],
        chartValues: [42, 60, 55, 78, 88, 85, 96]
      }
    },
    {
      id: 'ds16-crm',
      name: 'DS16 Architecture CRM & ERP',
      category: 'Enterprise CRM & Double-Entry Ledger',
      liveUrl: 'https://crm.designstudio16.co.in',
      metrics: [
        { value: '65 Projects', label: 'Lifecycle Tracked' },
        { value: '71 Clients', label: 'Accounting Synced' },
        { value: '113', label: 'Attendance Records Migrated' }
      ],
      problem: 'Managing architecture blueprints, client invoicing, employee payroll, and field attendance caused billing errors.',
      chaos: 'Timezone calculation issues on UTC servers created false late-attendance entries, and SQL JOIN failures caused server 500 crashes.',
      transformation: 'Engineered an enterprise CRM with project lifecycle Kanban boards, IST-aware geofenced attendance, and salary deduction tools.',
      result: 'Migrated all records with zero data loss, resolved multi-table JOIN crashes, and stabilized corporate accounting workflows.',
      techStack: ['React 19', 'Vite', 'Tailwind CSS', 'Node.js', 'Express 5', 'PostgreSQL', 'PM2', 'Nginx', 'Recharts', 'jsPDF'],
      architecture: 'IST-aware timezone converters feeding high-fidelity salary deduction and project timeline calculations.',
      mockupData: {
        title: 'DS16-ERP-LEDGER',
        status: 'ACTIVE // SECURE',
        logs: [
          'TIME: Server timezone converted UTC -> IST',
          'LEDGER: Double-entry audit check complete',
          'PDF: digital signature overlay validated'
        ],
        chartValues: [92, 95, 91, 94, 96, 95, 99]
      }
    },
    {
      id: 'billbook',
      name: 'BillBook Offline Register',
      category: 'Offline Retail Billing App',
      liveUrl: 'https://github.com/advaitkhangar01/Thermal-Bill-Generator-Local-and-Online-',
      metrics: [
        { value: '100% Offline', label: 'Local SQLite Operations' },
        { value: '0 Data Loss', label: 'Backup Strategy' },
        { value: 'GST Split', label: 'Tax Compliance Ready' }
      ],
      problem: 'Small Indian retailers struggle with complex, expensive cloud billing tools that break when the internet connection goes down.',
      chaos: 'Cashiers lost current checkout sheets during power cuts, and manual GST calculations slowed store queues by minutes.',
      transformation: 'Built a desktop & mobile billing app with WASM SQLite (sql.js) and an atomic write-then-rename database strategy.',
      result: 'Enabled offline operation with auto-backup, local receipt printing, and instant CGST/SGST splitting.',
      techStack: ['React 18', 'Vite', 'Electron', 'Capacitor', 'sql.js (WASM)', 'Zustand', 'React Hook Form'],
      architecture: 'Atomic file-rename recovery strategies ensuring zero data loss across local OS filesystems.',
      mockupData: {
        title: 'BILLBOOK-WASM-SQLITE',
        status: 'MONITORING // ACTIVE',
        logs: [
          'SQLite: WASM buffer allocated in browser',
          'ATOMIC: Write temp-file completed successfully',
          'PRINT: ESC/POS receipt generation active'
        ],
        chartValues: [60, 75, 80, 88, 92, 95, 99]
      }
    },
    {
      id: 'qyvorin',
      name: 'Qyvorin',
      category: 'Next-Gen Web, AI & CRM Agency',
      liveUrl: 'https://www.qyvorin.online/',
      metrics: [
        { value: 'Modern UI', label: 'Glassmorphic Aesthetics' },
        { value: 'AI Showcase', label: 'Interactive Telemetry' },
        { value: 'Lighthouse', label: '98+ Performance Score' }
      ],
      problem: 'A growing digital agency needed a high-fidelity web platform that demonstrates their advanced expertise in custom software, AI assistants, and CRM integrations.',
      chaos: 'Standard template sites failed to showcase the agency\'s high-tech capability, leading to generic client inquiries.',
      transformation: 'Engineered an ultra-premium, dark-themed agency landing page with custom CSS micro-animations, glassmorphic design systems, and responsive layouts.',
      result: 'Created a highly professional digital hub that successfully captures corporate enterprise leads and showcases technical superiority.',
      techStack: ['TypeScript', 'React', 'GSAP', 'Vanilla CSS', 'Vercel'],
      architecture: 'Highly optimized rendering loop running fluid CSS transitions and dynamic viewport scaling.',
      mockupData: {
        title: 'QYVORIN-AGENCY-CONSOLE',
        status: 'MONITORING // ACTIVE',
        logs: [
          'UI: Initializing glassmorphic theme layers',
          'AI: Custom agent integration active',
          'STATS: User session telemetry recording'
        ],
        chartValues: [90, 92, 95, 91, 96, 94, 99]
      }
    },
    {
      id: 'ds16-web',
      name: 'Design Studio 16',
      category: 'Premium Architecture & Interior Design Site',
      liveUrl: 'https://designstudio16.co.in/',
      metrics: [
        { value: 'Immersive', label: 'High-Fidelity Portfolio Grid' },
        { value: 'Speed', label: 'Sub-Second Asset Loading' },
        { value: 'Responsive', label: 'Cross-Device CSS Flexbox' }
      ],
      problem: 'A top architecture firm wanted to showcase their extensive portfolio of residential and commercial blueprints without slow page loads.',
      chaos: 'Heavy architectural rendering files caused page delays, causing corporate clients to exit before viewing full portfolios.',
      transformation: 'Developed a fast, component-driven portfolio site with lazy-loading image pipelines, clean grid layouts, and direct lead capture.',
      result: 'Reduced portfolio page load times by over 70%, boosting client conversion rates and showcasing architectural elegance.',
      techStack: ['HTML5', 'Vanilla CSS', 'JavaScript', 'Image Optimizer Script'],
      architecture: 'Static layout distribution with modular, framework-free web components.',
      mockupData: {
        title: 'DS16-PORTFOLIO-VALIDATOR',
        status: 'ACTIVE // SYNCED',
        logs: [
          'IMAGE: WebP compression checks complete',
          'GRID: Responsive layout rules active',
          'MAPS: Location API loading success'
        ],
        chartValues: [75, 80, 85, 82, 89, 92, 96]
      }
    },
    {
      id: 'concord',
      name: 'Concord Fintech',
      category: 'Corporate Financial Advising & Loan Portal',
      liveUrl: 'https://concordfintech.com/',
      metrics: [
        { value: 'Fintech Core', label: 'Secure Client Ingestion' },
        { value: 'Calculators', label: 'Interactive EMI Engines' },
        { value: 'SEO Rank', label: 'Indexed Business Keywords' }
      ],
      problem: 'A financial advisory firm needed a secure, professional landing page to process corporate loan applications and attract startup founders.',
      chaos: 'Clunky intake forms and lack of transparent EMI metrics caused potential loan leads to seek help elsewhere.',
      transformation: 'Engineered a secure corporate portal with custom financial calculators, secure contact modules, and structured service showcases.',
      result: 'Improved startup lead acquisition and automated first-stage business loan inquiries.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'SMTP Mailer'],
      architecture: 'Serverless form submission pipeline connected to structured client email notifications.',
      mockupData: {
        title: 'CONCORD-FINTECH-METRICS',
        status: 'SECURE ACTIVE',
        logs: [
          'SSL: 256-bit encryption verified',
          'CALC: EMI calculation module tested',
          'LEAD: Form verification triggers online'
        ],
        chartValues: [65, 75, 82, 88, 85, 90, 95]
      }
    },
    {
      id: 'aura-blake',
      name: 'Aura Blake Portfolio',
      category: 'Cinematic Influencer Portfolio & Media Kit',
      liveUrl: 'https://influencer-zeta-six.vercel.app/',
      metrics: [
        { value: 'Aesthetics', label: 'Editorial Fashion Design' },
        { value: 'Media Kit', label: 'Live Social Stat Syncing' },
        { value: 'Cinematic', label: 'GSAP Smooth Pinned Slides' }
      ],
      problem: 'A fashion and lifestyle influencer needed a premium digital media kit to pitch high-converting campaigns to luxury brands.',
      chaos: 'Standard PDF media kits became outdated quickly and failed to showcase dynamic video content and design aesthetics.',
      transformation: 'Built a cinematic web portfolio with GSAP animations, editorial typography, and high-impact brand collaboration galleries.',
      result: 'Delivered a jaw-dropping web portfolio that replaces static PDFs and converts brand deals automatically.',
      techStack: ['React', 'Vite', 'GSAP', 'Framer Motion', 'Vanilla CSS'],
      architecture: 'Declarative animation trees running smooth parallax scrolls and media overlays.',
      mockupData: {
        title: 'AURA-BLAKE-PORTFOLIO-CORE',
        status: 'MONITORING // ACTIVE',
        logs: [
          'GSAP: ScrollTrigger layout active',
          'MEDIA: Cinematic video loop active',
          'SOCIAL: Live stats cache verified'
        ],
        chartValues: [80, 85, 90, 88, 92, 96, 99]
      }
    },
    {
      id: 'gaearealty',
      name: 'Gaea Realty CRM',
      category: 'Real Estate Lead CRM',
      liveUrl: 'https://gaearealty.in',
      metrics: [
        { value: 'RBAC Access', label: 'Secure Login Security' },
        { value: 'Lead Pipeline', label: 'Advanced Filtering' },
        { value: 'Linux VPS', label: 'Dedicated Server Hosting' }
      ],
      problem: 'Real estate agents lost track of high-value client leads across scattered spreadsheets and sticky notes.',
      chaos: 'Dual bookings and missed follow-up calls cost the agency several property transactions monthly.',
      transformation: 'Built a secure, multi-role Lead CRM with custom filters, activity logging, and dedicated Linux VPS hosting.',
      result: 'Centralized all customer notes, boosting lead follow-up rates by 50% and securing property data.',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'RBAC', 'Linux VPS'],
      architecture: 'Multi-role route authorization middleware locking sensitive property listings and client details.',
      mockupData: {
        title: 'GAEAREALTY-RBAC-AUTH',
        status: 'ACTIVE // SECURE',
        logs: [
          'RBAC: Auth token checked (Role: Sales Agent)',
          'FILTER: Dynamic property query matched 14 items',
          'VPS: Server telemetry check completed successfully'
        ],
        chartValues: [55, 62, 70, 68, 75, 80, 85]
      }
    },
    {
      id: 'jagmart-grocery',
      name: 'Jagmart Grocery Platform',
      category: 'Location-Based E-Commerce',
      liveUrl: 'https://jagmart.co.in',
      metrics: [
        { value: 'GPS Tagging', label: 'Geofenced Locations' },
        { value: 'CSV Upload', label: 'Bulk Product Ingestion' },
        { value: 'PostgreSQL', label: 'Relational Database Core' }
      ],
      problem: 'A local grocery wholesale business needed to route customer orders based on geographic proximity to warehouse centers.',
      chaos: 'Manual inventory entry for thousands of products caused massive catalog delays, and out-of-boundary orders created logistics issues.',
      transformation: 'Designed a grocery e-commerce app with geofencing location tagging and bulk CSV upload pipelines for admin inventories.',
      result: 'Reduced catalog upload times from days to a single click, and automatically blocked out-of-boundary deliveries.',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Geofencing API', 'XLSX'],
      architecture: 'Bulk parsing streams processing inventory files and feeding a geofenced location validator.',
      mockupData: {
        title: 'JAGMART-BULK-INGEST',
        status: 'ACTIVE // SYNCED',
        logs: [
          'GEO: Geofence coordinate range matched',
          'CSV: Bulk ingest of 842 products success',
          'DB: Stock locked for transaction order checkout'
        ],
        chartValues: [62, 65, 78, 80, 85, 90, 92]
      }
    },
    {
      id: 'bulk-email',
      name: 'Bulk Email Automation',
      category: 'Email Campaign & OAuth System',
      liveUrl: 'https://github.com/advaitkhangar01/BULK-EMAIL',
      metrics: [
        { value: 'Google OAuth', label: 'Secure Mail Ingestion' },
        { value: 'CSV Parsing', label: 'Recipient List Import' },
        { value: 'Async Jobs', label: 'Automated Processing' }
      ],
      problem: 'Marketing teams spent hours sending personalized cold emails to large client lists manually.',
      chaos: 'Accounts were flagged for spam due to rapid, non-damped outgoing mail bursts, and email formatting was inconsistent.',
      transformation: 'Built a bulk email processing tool utilizing Google OAuth for mail accounts and asynchronous sending queues.',
      result: 'Automated bulk email delivery while pacing outgoing mail rates to prevent spam detection.',
      techStack: ['Node.js', 'Google OAuth', 'CSV Ingestion', 'Express'],
      architecture: 'Damped batch-sending worker loops reading from uploaded CSV arrays.',
      mockupData: {
        title: 'BULK-EMAIL-BATCHER',
        status: 'ONLINE // PARSING',
        logs: [
          'OAuth: Token authenticated (Google Mail API)',
          'QUEUE: Ingested 14,000 email addresses list',
          'WORKER: Send pacing interval active at 4.2s'
        ],
        chartValues: [30, 45, 60, 75, 80, 85, 90]
      }
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const filteredProjects = type === 'websites'
    ? [
        'loftcoworks',
        'sunrisefarms',
        'qyvorin',
        'w4y-web',
        'sdp-associates',
        'ds16-web',
        'reachx-web',
        'aquasaver',
        'concord',
        'aura-blake'
      ].map(id => projects.find(p => p.id === id)).filter(Boolean) as Project[]
    : projects.filter(p => ['w4y-ops', 'reachx-os', 'ds16-crm', 'billbook', 'gaearealty', 'jagmart-grocery', 'bulk-email'].includes(p.id));

  const current = filteredProjects[activeIdx] || filteredProjects[0];

  return (
    <section className="moment-section product-moment-section" style={{ position: 'relative', zIndex: 3, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ width: '90%', margin: '0 auto', maxWidth: '1440px' }}>
        
        {/* Editorial Heading */}
        <div style={{ marginBottom: 'var(--heading-to-content-gap)' }}>
          {type === 'websites' ? (
            <>
              <div className="editorial-label gsap-reveal-scramble" data-type-speed={30}>FEATURED PORTFOLIO PROJECTS</div>
              <h2 className="editorial-title-medium gsap-reveal-fade-up" style={{ fontWeight: 400 }}>
                Premium Websites &amp; <br />
                <span className="gsap-reveal-block" style={{ color: 'var(--accent-gold)' }}>Interactive SPAs.</span>
              </h2>
              <p className="editorial-text gsap-reveal-fade-up">
                These are fast, responsive, and beautifully interactive websites built using modern front-end technologies, WebGL, and elegant animations to make your brand stand out online.
              </p>
            </>
          ) : (
            <>
              <div className="editorial-label gsap-reveal-scramble" data-type-speed={30}>CUSTOM SOFTWARE SHOWCASE</div>
              <h2 className="editorial-title-medium gsap-reveal-fade-up" style={{ fontWeight: 400 }}>
                Custom Business Software <br />
                <span className="gsap-reveal-block" style={{ color: 'var(--accent-gold)' }}>Built to Automate &amp; Scale.</span>
              </h2>
              <p className="editorial-text gsap-reveal-fade-up">
                These are not simple static websites. These are highly secure, custom-built software systems designed to solve your operational bottlenecks, automate manual work, and grow your business capacity.
              </p>
            </>
          )}
        </div>

        {/* 12 Systems System Navigation */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--border-light)', 
          marginBottom: '56px',
          overflowX: 'auto',
          paddingBottom: '16px',
          gap: '16px'
        }} className="gsap-reveal-fade-up">
          {filteredProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                padding: '12px 24px',
                fontFamily: 'var(--font-interface)',
                fontSize: '1rem',
                fontWeight: activeIdx === idx ? 700 : 300,
                color: activeIdx === idx ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderBottom: activeIdx === idx ? '2px solid var(--accent-gold)' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Immersive Product Moment Layout Split */}
        <div className="featured-showcase-grid" style={{ alignItems: 'start' }}>
          
          {/* Left Details Panel */}
          <div className="gsap-reveal-fade-up">
            <div style={{ 
              fontFamily: 'var(--font-interface)', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              color: 'var(--accent-gold)', 
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px'
            }}>
              {current.category}
            </div>
            
            <h3 style={{ 
              fontFamily: 'var(--font-editorial)', 
              fontSize: '3rem', 
              color: 'var(--text-primary)',
              marginBottom: '32px',
              fontWeight: 400
            }}>
              {current.name}
            </h3>

            {/* Structured Chaos-to-Transformation Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }}>
              
              <div className="product-flow-grid" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  THE PROBLEM:
                </span>
                <p style={{ fontFamily: 'var(--font-interface)', color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 300 }}>
                  {current.chaos}
                </p>
              </div>

              <div className="product-flow-grid" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  THE SOLUTION:
                </span>
                <p style={{ fontFamily: 'var(--font-interface)', color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 300 }}>
                  {current.transformation}
                </p>
              </div>

              <div className="product-flow-grid" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-interface)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  THE RESULT:
                </span>
                <p style={{ fontFamily: 'var(--font-interface)', color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 500 }}>
                  {current.result}
                </p>
              </div>

            </div>

            {/* Architecture stack badges */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                SOFTWARE &amp; TECHNOLOGY USED
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {current.techStack.map((tech, idx) => (
                  <span key={idx} style={{ 
                    fontFamily: 'var(--font-interface)',
                    fontSize: '0.85rem', 
                    padding: '6px 14px', 
                    background: 'var(--bg-primary)', 
                    border: '1px solid var(--border-light)', 
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    fontWeight: 400
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right HTML Simulated Device & Stats Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }} className="gsap-reveal-fade-up">
            
            {/* Real-world Live Desktop Preview Container */}
            <DesktopFrame project={current} />

            {/* Performance Stats Panel */}
            <div className="product-performance-stats" style={{
              background: '#FAFAF8',
              borderRadius: '8px',
              border: '1px solid var(--border-light)'
            }}>
              {current.metrics.map((m, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontFamily: 'var(--font-interface)', 
                    fontSize: '2rem', 
                    fontWeight: 900, 
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2'
                  }}>
                    {m.value}
                  </div>
                  <div style={{ 
                    fontFamily: 'var(--font-interface)', 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginTop: '4px'
                  }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* High-fidelity vector connection schematic drawing */}
            <div className="premium-surface" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Cpu color="var(--accent-gold)" size={32} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Operational Routing Consensus
                </div>
                <div style={{ fontFamily: 'var(--font-interface)', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
                  {current.architecture}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductMoment;
