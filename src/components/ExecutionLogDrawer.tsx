'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Terminal,
  Activity,
  Trash2,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogEntry {
  id: string;
  timestamp: string;
  stage: 'Webhook Intake' | 'Dedupe & Security' | 'LLM Scoring' | 'CRM Sync' | 'Slack Approval';
  status: '200 OK' | 'Quarantined' | 'Dispatched' | 'Synced';
  details: string;
  durationMs: number;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'log_01',
    timestamp: '16:12:04.218',
    stage: 'Slack Approval',
    status: 'Dispatched',
    details: 'Interactive Block Kit card posted to #sales-lead-approvals for Lachlan Murdoch (Score: 94/100, Tier: HOT)',
    durationMs: 78,
  },
  {
    id: 'log_02',
    timestamp: '16:12:04.140',
    stage: 'CRM Sync',
    status: 'Synced',
    details: 'HubSpot CRM contact + Deal #8920 created. Google Sheets Row #1402 appended with custom properties.',
    durationMs: 94,
  },
  {
    id: 'log_03',
    timestamp: '16:12:04.046',
    stage: 'LLM Scoring',
    status: '200 OK',
    details: 'Claude 3.5 & GPT-4o-mini structured JSON: LeadScore: 94, Tier: HOT, personalized executive reply drafted.',
    durationMs: 142,
  },
  {
    id: 'log_04',
    timestamp: '16:12:03.904',
    stage: 'Dedupe & Security',
    status: '200 OK',
    details: 'NIST AI RMF LLM Firewall: Sanitized 2 PII tokens. Zero prompt injection markers detected.',
    durationMs: 4,
  },
  {
    id: 'log_05',
    timestamp: '16:12:03.900',
    stage: 'Webhook Intake',
    status: '200 OK',
    details: 'Website form webhook ingested from contact-form-v2. HTTP 200 returned in 12ms.',
    durationMs: 12,
  },
  {
    id: 'log_06',
    timestamp: '16:05:00.112',
    stage: 'Dedupe & Security',
    status: 'Quarantined',
    details: 'Malicious webhook attempt intercepted: OWASP LLM01 pattern quarantined to dead-letter queue.',
    durationMs: 2,
  },
];

interface ExecutionLogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExecutionLogDrawer({ open, onOpenChange }: ExecutionLogDrawerProps) {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<string>('All');

  const filteredLogs = logs.filter((l) => filter === 'All' || l.stage === filter);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 text-[var(--color-text-primary)]">
        <SheetHeader className="border-b border-[var(--color-border)] pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <Terminal className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                Live Execution Traces
              </span>
              <span className="text-xs text-emerald-600 font-mono font-bold">
                ● Connected
              </span>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setLogs([])}
              className="h-7 text-xs text-[var(--color-text-muted)] hover:text-red-600 px-2 cursor-pointer"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              <span>Clear</span>
            </Button>
          </div>
          <SheetTitle className="text-lg font-bold">
            Real-Time Pipeline Event Log
          </SheetTitle>
          <SheetDescription className="text-xs text-[var(--color-text-secondary)]">
            End-to-end execution logs capturing form webhook intake, LLM qualification latency, CRM sync, and Slack Block Kit dispatches.
          </SheetDescription>
        </SheetHeader>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mb-4 text-xs font-mono overflow-x-auto pb-1">
          {['All', 'Webhook Intake', 'Dedupe & Security', 'LLM Scoring', 'CRM Sync', 'Slack Approval'].map((stage) => (
            <button
              key={stage}
              onClick={() => setFilter(stage)}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === stage
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Log Entries List */}
        <div className="space-y-2.5 font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <p className="text-[var(--color-text-muted)] italic text-center py-8">
              No log entries match the selected filter.
            </p>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[var(--color-text-primary)]">
                      [{log.stage}]
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-xs font-semibold ${
                        log.status === 'Dispatched' || log.status === '200 OK' || log.status === 'Synced'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : log.status === 'Quarantined'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs">
                    <span>{log.durationMs}ms</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {log.details}
                </p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
