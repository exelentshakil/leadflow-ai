'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

interface BackboneStat {
  value: string;
  label: string;
  color: string;
  domain?: [number, number];
  sparkline: { t: string; v: number }[];
}

const STATS: BackboneStat[] = [
  {
    value: '14,800+',
    label: 'inbound website leads ingested with zero dropped payloads',
    color: '#533AFD',
    sparkline: [
      { t: 'Q1', v: 4200 },
      { t: 'Q2', v: 7500 },
      { t: 'Q3', v: 9800 },
      { t: 'Q4', v: 11900 },
      { t: 'Q5', v: 13400 },
      { t: 'Q6', v: 14820 },
    ],
  },
  {
    value: 'Sub-2s',
    label: 'end-to-end latency from form webhook to Slack approval card',
    color: '#057A55',
    sparkline: [
      { t: 'Step 1', v: 4.8 },
      { t: 'Step 2', v: 3.6 },
      { t: 'Step 3', v: 2.8 },
      { t: 'Step 4', v: 2.1 },
      { t: 'Step 5', v: 1.8 },
      { t: 'Step 6', v: 1.4 },
    ],
  },
  {
    value: '99.98%',
    label: 'CRM delivery rate across Google Sheets, HubSpot, and Airtable',
    color: '#D97706',
    domain: [98.5, 100],
    sparkline: [
      { t: 'W1', v: 99.4 },
      { t: 'W2', v: 99.8 },
      { t: 'W3', v: 99.7 },
      { t: 'W4', v: 100.0 },
      { t: 'W5', v: 99.9 },
      { t: 'W6', v: 99.98 },
    ],
  },
  {
    value: '100% Owned',
    label: 'deployed in your own n8n/Make accounts with zero vendor lock-in',
    color: '#0d9488',
    domain: [80, 105],
    sparkline: [
      { t: 'Run 1', v: 100 },
      { t: 'Run 2', v: 100 },
      { t: 'Run 3', v: 100 },
      { t: 'Run 4', v: 100 },
      { t: 'Run 5', v: 100 },
      { t: 'Run 6', v: 100 },
    ],
  },
];

export function BackboneStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-12 sm:py-16 border-t border-[var(--color-border)] scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered H2 Title with Stripe Opacity Hierarchy */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[var(--color-text-primary)]">
            The backbone of modern inbound sales automation
          </h2>
          <p className="mt-2 text-base text-[#2E3C4E] dark:text-slate-300 leading-relaxed">
            Production n8n and Make workflows with Claude &amp; OpenAI intelligence, deterministic CRM fallbacks, and human-in-the-loop Slack approval gates.
          </p>
        </div>

        {/* 4-Column Stat Strip with Wavy Sparklines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-6 border-t border-[var(--color-border)]">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col justify-between space-y-2">
              <div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
                  {stat.value}
                </div>
                <p className="text-sm sm:text-[14.5px] text-[var(--color-text-secondary)] mt-1.5 leading-normal">
                  {stat.label}
                </p>
              </div>

              {/* Distinct Wavy Sparkline */}
              <div className="h-10 w-full pt-2">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stat.sparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`bbGrad_${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={stat.color} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={stat.color} stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      {stat.domain && <YAxis hide domain={stat.domain} />}
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 text-xs font-semibold shadow-xs text-[var(--color-text-primary)]">
                                {payload[0].value}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={stat.color}
                        strokeWidth={2}
                        fill={`url(#bbGrad_${idx})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
