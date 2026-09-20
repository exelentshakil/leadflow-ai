'use client';

import React, { useState } from 'react';
import {
  Globe,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  RefreshCw,
  Sliders,
  DollarSign,
  Radio,
  Lock,
  Pause,
  Play,
  Share2,
  Database,
  Send,
  MessageSquare,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export function StripeInteractiveShowcase() {
  // Interactive State for Card 1: Webhook Intake Simulator
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'processing' | 'received'>('received');
  const [leadCounter, setLeadCounter] = useState(1402);

  // Interactive State for Card 2: AI Lead Scoring Slider
  const [leadScore, setLeadScore] = useState(94);

  // Interactive State for Card 3: CRM Destination Switcher
  const [crmTarget, setCrmTarget] = useState<'sheets' | 'hubspot' | 'airtable'>('hubspot');

  // Interactive State for Card 4: 3D Tilt Card
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [isCardFrozen, setIsCardFrozen] = useState(false);

  // Interactive State for Card 5: Dual-Provider Failover Simulator
  const [activeProvider, setActiveProvider] = useState<'openai' | 'gemini'>('openai');
  const [outageRunning, setOutageRunning] = useState(false);

  // Interactive State for Card 6: Slack Approval Action Simulator
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCardFrozen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({ x: -(y / rect.height) * 16, y: (x / rect.width) * 16 });
  };

  const handleCardMouseLeave = () => {
    if (!isCardFrozen) {
      setCardTilt({ x: 0, y: 0 });
    }
  };

  const handleSimulateWebhook = () => {
    setWebhookStatus('processing');
    setTimeout(() => {
      setLeadCounter((prev) => prev + 1);
      setWebhookStatus('received');
    }, 450);
  };

  const handleTriggerFailover = () => {
    setOutageRunning(true);
    setTimeout(() => {
      setActiveProvider((prev) => (prev === 'openai' ? 'gemini' : 'openai'));
      setOutageRunning(false);
    }, 600);
  };

  // Helper for Card 2 Tier
  const getTierInfo = (score: number) => {
    if (score >= 80) {
      return {
        label: 'HOT • Enterprise Priority',
        style: 'bg-[#533AFD]/10 text-[#533AFD] dark:bg-[#7A68FF]/20 dark:text-[#7A68FF] border-[#533AFD]/20',
        route: 'Route to Senior Partner & Slack P1',
        budget: '$10k - $50k+ Allocated',
      };
    }
    if (score >= 60) {
      return {
        label: 'WARM • Mid-Market Lead',
        style: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200',
        route: 'Sync to CRM & Send Calendly Link',
        budget: '$3k - $10k Budget',
      };
    }
    if (score >= 40) {
      return {
        label: 'NURTURE • Self-Serve Trial',
        style: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200',
        route: 'Add to 4-Week Email Drip Sequence',
        budget: 'Under $3,000 Budget',
      };
    }
    return {
      label: 'UNQUALIFIED • Low Fit / Spam',
      style: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200',
      route: 'Quarantine & No Auto-Dispatch',
      budget: 'Zero Budget Stated',
    };
  };

  const tier = getTierInfo(leadScore);

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--color-border)] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Stripe Two-Tone Category Eyebrow & Master Title */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#533AFD]/20 bg-[#533AFD]/8 px-3 py-1 text-xs font-mono text-[#533AFD] dark:text-[#7A68FF] mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Modular Automation Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-[var(--color-text-primary)] leading-tight">
            End-to-end lead workflow architecture.{' '}
            <span className="text-[var(--color-text-secondary)] opacity-75 font-normal">
              Every stage runs in your own accounts with full credential ownership.
            </span>
          </h2>
        </div>

        {/* 6-Card Interactive Moving Elements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Webhook Intake & Form Parser */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#533AFD]/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Stage 1 • Webhook Intake
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <Radio className="w-4 h-4 text-[#533AFD]" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Sub-second website form capture
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Accepts webhooks from Webflow, WordPress, Typeform, or custom HTML forms with zero dropped submissions.
              </p>
            </div>

            {/* Interactive Webhook Simulator Box */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#00D924] animate-pulse" />
                    Webhook URL Active
                  </span>
                  <span>Payload #{leadCounter}</span>
                </div>
                
                <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-[var(--color-text-secondary)]">
                    <span>source:</span>
                    <strong className="text-[var(--color-text-primary)]">contact-form-v2</strong>
                  </div>
                  <div className="flex justify-between text-[var(--color-text-secondary)]">
                    <span>prospect:</span>
                    <strong className="text-[#533AFD] dark:text-[#7A68FF]">Lachlan Murdoch</strong>
                  </div>
                  <div className="flex justify-between text-[var(--color-text-secondary)]">
                    <span>inquiry_length:</span>
                    <span>342 chars</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-[10px] font-mono text-[#057A55] dark:text-emerald-400 font-semibold">
                    {webhookStatus === 'processing' ? 'Ingesting...' : 'Parsed in 14ms'}
                  </span>
                  <button
                    type="button"
                    disabled={webhookStatus === 'processing'}
                    onClick={handleSimulateWebhook}
                    className="text-xs font-mono text-[#533AFD] hover:text-[#432DE0] font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    Simulate Webhook
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Lead Scoring & Classifier */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Stage 2 • AI Qualification
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <Sliders className="w-4 h-4 text-[#057A55]" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Dynamic lead scoring (0–100)
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Claude 3.5 &amp; GPT-4o-mini evaluate budget, decision-maker authority, and timeline urgency into structured JSON.
              </p>
            </div>

            {/* Interactive Lead Score Slider Control */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[var(--color-text-muted)]">Simulate Prospect Score:</span>
                  <strong className="text-base font-bold text-[var(--color-text-primary)]">{leadScore} / 100</strong>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  value={leadScore}
                  onChange={(e) => setLeadScore(Number(e.target.value))}
                  className="w-full h-1.5 bg-[var(--color-panel-subtle)] rounded-lg appearance-none cursor-pointer accent-[#533AFD]"
                />
              </div>

              {/* Dynamic Tier Pill Display */}
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">Tier Classification</span>
                  <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold border ${tier.style}`}>
                    {tier.label}
                  </span>
                </div>
                <div className="text-xs font-medium text-[var(--color-text-primary)]">
                  {tier.route}
                </div>
                <div className="text-[11px] font-mono text-[var(--color-text-muted)]">
                  Budget Est: {tier.budget}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Multi-Destination CRM Sync */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Stage 3 • CRM &amp; Database Sync
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <Database className="w-4 h-4 text-[#D97706]" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Universal CRM synchronization
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Connects directly to Google Sheets, Airtable, or HubSpot with deduplication and custom properties.
              </p>
            </div>

            {/* Interactive CRM Switcher */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-3">
              <div className="grid grid-cols-3 gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-[6px] border border-[var(--color-border)]">
                {(['sheets', 'hubspot', 'airtable'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setCrmTarget(t)}
                    className={`text-[10px] font-mono py-1 rounded-[4px] capitalize font-medium transition-all cursor-pointer ${
                      crmTarget === t
                        ? 'bg-[var(--color-surface)] text-[#533AFD] dark:text-[#7A68FF] shadow-xs font-bold'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {t === 'sheets' ? 'Sheets' : t === 'hubspot' ? 'HubSpot' : 'Airtable'}
                  </button>
                ))}
              </div>

              {/* CRM Preview Details */}
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1 text-xs font-mono">
                <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
                  <span>Target:</span>
                  <strong className="text-[var(--color-text-primary)] font-bold">
                    {crmTarget === 'sheets' ? 'Google Sheets (Tab: Inbound Leads)' : crmTarget === 'hubspot' ? 'HubSpot CRM (Deals)' : 'Airtable (Base: CRM)'}
                  </strong>
                </div>
                <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
                  <span>Sync Mode:</span>
                  <span className="text-[#057A55] dark:text-emerald-400">Idempotent Upsert (0 dupes)</span>
                </div>
                <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
                  <span>Custom Fields:</span>
                  <span>ai_score, draft_reply, tier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: 3D Tilt Vault Card (Client Credential Ownership) */}
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group perspective-1000 overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Security &amp; Credentials
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <Lock className="w-4 h-4 text-[#533AFD]" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                100% Client credential ownership
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Workflows run inside your own n8n instance or Make account. You own all API keys, data, and workflows.
              </p>
            </div>

            {/* 3D Visual Vault Mockup */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70">
              <div
                style={{
                  transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                  transition: isCardFrozen ? 'none' : 'transform 0.15s ease-out',
                }}
                className="w-full rounded-xl bg-gradient-to-tr from-[#0D1738] via-[#1E293B] to-[#533AFD] p-4 text-white shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-300">Client-Owned Workflow</span>
                  <ShieldCheck className="w-4 h-4 text-[#00D924]" />
                </div>

                <div className="space-y-1 font-mono">
                  <div className="text-[10px] text-slate-400">HOSTED INSTANCE</div>
                  <div className="text-sm font-bold tracking-tight text-white">Client n8n / Make Cloud</div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300 pt-1 border-t border-white/15">
                  <span>API Keys: Client Owned</span>
                  <span className="text-[#00D4FF]">Zero 3rd-Party Retention</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Dual-Provider Failover & Error Handling */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  High Availability
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <RefreshCw className="w-4 h-4 text-[#0d9488]" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Zero-downtime model failover
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Automatic circuit breaker trips from Claude/OpenAI to Google Gemini with dead-letter failure alerts.
              </p>
            </div>

            {/* Interactive Failover Control */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-3">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text-muted)]">Active Model:</span>
                  <span className="font-bold text-[#533AFD] dark:text-[#7A68FF]">
                    {activeProvider === 'openai' ? 'OpenAI GPT-4o-mini' : 'Google Gemini 2.0 Flash'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text-muted)]">Circuit Breaker:</span>
                  <span className="text-[#057A55] dark:text-emerald-400 font-semibold">Armed (&lt;1500ms trip)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text-muted)]">Failure Alerts:</span>
                  <span className="text-[var(--color-text-primary)]">Slack Webhook + Email</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={outageRunning}
                  onClick={handleTriggerFailover}
                  className="text-xs font-mono text-[#533AFD] hover:underline font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {outageRunning ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Tripping Fallback...
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-amber-500" />
                      Simulate Model Outage
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Card 6: Slack & Email Approval Gateway */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Stage 4 • Slack Approval Card
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <MessageSquare className="w-4 h-4 text-[#533AFD]" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                1-Click human review in Slack
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Summary and draft response arrive directly in your Slack channel or inbox with instant interactive action buttons.
              </p>
            </div>

            {/* Interactive Slack Message Mockup */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70">
              <div className="rounded-xl border border-slate-700 bg-[#1A1D21] text-white p-3.5 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between text-[11px] text-slate-300 pb-1.5 border-b border-slate-700">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="h-2 w-2 rounded-full bg-[#00D924]" />
                    #sales-lead-approvals
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">APP BOT</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>🔥 New Lead: Lachlan Murdoch</span>
                    <span className="bg-[#635BFF] text-[10px] px-1.5 py-0.2 rounded font-mono">Score 94</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    Scaling 50 to 500 accounts/wk. Budget allocated for n8n/Make automation + CRM sync.
                  </p>
                </div>

                {/* Interactive Slack Action Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {approvalStatus === 'approved' ? (
                    <div className="w-full text-center py-1 bg-emerald-950/80 border border-emerald-600 rounded text-emerald-300 text-[11px] font-mono font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approved &amp; Dispatched via Email
                    </div>
                  ) : approvalStatus === 'rejected' ? (
                    <div className="w-full text-center py-1 bg-rose-950/80 border border-rose-600 rounded text-rose-300 text-[11px] font-mono font-bold">
                      Lead Rejected &amp; Archived
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setApprovalStatus('approved')}
                        className="px-2.5 py-1 rounded bg-[#007A5A] hover:bg-[#148567] text-white text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Approve &amp; Send
                      </button>
                      <button
                        type="button"
                        onClick={() => setApprovalStatus('approved')}
                        className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px] font-medium transition-all cursor-pointer"
                      >
                        Edit Draft
                      </button>
                      <button
                        type="button"
                        onClick={() => setApprovalStatus('rejected')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-200 text-[10px] transition-all cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
