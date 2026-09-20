'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  RefreshCw,
  Send,
  Heart,
  Briefcase,
  Copy,
  Check,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function ModuleLiveMentor({ initialMode }: { initialMode: 'wife' | 'architect' }) {
  const [prompt, setPrompt] = useState('LoRA এবং PEFT কী? আমার স্ত্রীর জন্য কাঁচাবাজারের গল্প দিয়ে সহজ ভাষায় বুঝিয়ে দাও।');
  const [mode, setMode] = useState<'wife' | 'architect'>(initialMode);
  const [provider, setProvider] = useState<'openai' | 'gemini'>('openai');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [response, setResponse] = useState<string | null>(
    '🌸 LoRA হলো ১,০০০ পৃষ্ঠার একটি মোটা বইয়ের শেষে লাগানো ছোট ৫ পৃষ্ঠার একটি স্টিকি-নোট! পুরো বই নতুন করে লেখার দরকার নেই, শুধু নতুন রেসিপিটুকু স্টিকি-নোটে লিখে নিলেই কাজ হয়ে যায়। এতে খরচের ৯৯.৯% বেঁচে যায়!\n\nসহজ কথায়: পুরো বই না বদলে ছোট স্টিকি নোট জুড়ে দিয়ে স্মার্ট হওয়াই হলো LoRA!'
  );
  const [meta, setMeta] = useState<{ provider: string; latencyMs: number }>({
    provider: 'OpenAI (GPT-4o-mini)',
    latencyMs: 78,
  });

  const presetQueries = [
    { label: 'LoRA স্টিকি-নোট কী?', text: 'LoRA এবং PEFT কী? আমার স্ত্রীর জন্য কাঁচাবাজার বা রান্নার গল্প দিয়ে সহজ ভাষায় বুঝিয়ে দাও।' },
    { label: 'RAG বনাম Fine-Tuning', text: 'RAG বনাম Fine-Tuning—কখন কোনটা ব্যবহার করব এবং কেন ৯৮% বিজনেসে RAG লাগে?' },
    { label: 'Catastrophic Forgetting & EWC', text: 'Catastrophic Forgetting এবং EWC (Elastic Weight Consolidation) এর সহজ বাস্তব উদাহরণ কী?' },
    { label: 'Legiit AI AWS Deployment', text: 'vLLM এবং Docker ব্যবহার করে কীভাবে AWS EC2-তে একটি প্রাইভেট মডেল সার্ভ করতে হয়?' },
    { label: 'Gradient Descent মেটাফর', text: 'Gradient Descent এবং Learning Rate কীভাবে কাজ করে? পাহাড় থেকে নামার গল্পটা সুন্দর করে বলো।' },
  ];

  const handleAskMentor = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode, provider }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.reply);
        setMeta({
          provider: data.provider || provider,
          latencyMs: data.latencyMs || 100,
        });
      } else {
        setResponse('একটি অপ্রত্যাশিত সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch {
      setResponse('নেটওয়ার্ক সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 text-xs font-mono">
                মডিউল ৭ • লাইভ এআই টিউটর
              </Badge>
              <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
                বাংলা এআই মেন্টর ল্যাব (Live OpenAI + Gemini Flash)
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              মেশিন লার্নিংয়ের যেকোনো কঠিন কনসেপ্ট জিজ্ঞেস করো—মুহূর্তেই বাংলায় সহজ গল্প বা আর্কিটেকচার ব্লুপ্রিন্ট পেয়ে যাবে!
            </CardDescription>
          </div>

          {/* Mode and Provider Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Wife vs Architect Mode */}
            <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('wife')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  mode === 'wife' ? 'bg-rose-500 text-white shadow-xs' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                <Heart className="h-3 w-3" />
                Wife Mode
              </button>
              <button
                type="button"
                onClick={() => setMode('architect')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  mode === 'architect' ? 'bg-[#533AFD] text-white shadow-xs' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                <Briefcase className="h-3 w-3" />
                Architect
              </button>
            </div>

            {/* Provider Switcher */}
            <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setProvider('openai')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  provider === 'openai' ? 'bg-[#10A37F] text-white font-bold' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                OpenAI
              </button>
              <button
                type="button"
                onClick={() => setProvider('gemini')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  provider === 'gemini' ? 'bg-[#1A73E8] text-white font-bold' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                Gemini
              </button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Preset Query Chips */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-[var(--color-text-secondary)] font-mono uppercase">
            কুইক টপিক ক্লিক করুন:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {presetQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(q.text)}
                className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)]/50 text-[var(--color-text-primary)] whitespace-nowrap transition-colors cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="space-y-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="text-xs sm:text-sm resize-none border-[var(--color-border)] bg-[var(--color-panel-subtle)]"
            placeholder="আপনার প্রশ্নটি বাংলায় লিখুন..."
          />
          <div className="flex justify-between items-center pt-1">
            <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
              Lens: {mode === 'wife' ? 'ঘরোয়া রূপক ও বাস্তব জীবনের গল্প' : 'সিস্টেম আর্কিটেকচার ও কোড'}
            </span>
            <Button
              onClick={handleAskMentor}
              disabled={loading}
              className="h-9 px-4 text-xs font-semibold bg-[#533AFD] hover:bg-[#432DE0] text-white shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  এআই বিশ্লেষণ করছে...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  জিজ্ঞেস করুন
                </>
              )}
            </Button>
          </div>
        </div>

        {/* AI Answer Box */}
        {response && (
          <div className="space-y-2 pt-2 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#533AFD]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                  মেন্টরের জবাব ({meta.provider} • {meta.latencyMs}ms)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 text-xs font-mono text-[var(--color-text-secondary)]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                    কপি হয়েছে
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    কপি করুন
                  </>
                )}
              </Button>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line shadow-2xs font-sans">
              {response}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
