'use client';

import React, { useState } from 'react';
import {
  FileText,
  Bookmark,
  Cpu,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Sparkles,
  Server,
  Calculator,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ModuleLLMFineTuning({ mode }: { mode: 'wife' | 'architect' }) {
  // GPU VRAM Memory Calculator State
  const [modelParams, setModelParams] = useState<number>(8); // 1, 3, 8, 14, 70 billion
  const [precision, setPrecision] = useState<'16' | '8' | '4'>('4'); // 16-bit, 8-bit, 4-bit

  // Approximate VRAM Calculation:
  // Model weights (GB) = Params (B) * (Bits / 8)
  const bytesPerParam = precision === '16' ? 2 : precision === '8' ? 1 : 0.5;
  const baseWeightGB = (modelParams * bytesPerParam).toFixed(1);

  // Overhead for KV cache & activations (~20-25%)
  const totalInferenceVRAM = (Number(baseWeightGB) * 1.25).toFixed(1);
  // Training VRAM with LoRA (~1.5x) vs Full (~4x)
  const loraTrainingVRAM = (Number(baseWeightGB) * 1.6).toFixed(1);

  // Recommended Hardware
  const getHardwareRecommendation = (vramNeeded: number) => {
    if (vramNeeded <= 6) {
      return {
        name: 'Mac M1 (16GB RAM) / RTX 3060 (8GB)',
        cost: 'Free Local Execution',
        badge: 'Local Laptop Ready',
        color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/30',
      };
    }
    if (vramNeeded <= 20) {
      return {
        name: 'RunPod / AWS A10G (24GB VRAM)',
        cost: '$0.75 - $1.00 / hour',
        badge: 'Cloud Production Tier',
        color: 'text-[#533AFD] border-[#533AFD]/30 bg-[#533AFD]/5',
      };
    }
    return {
      name: 'RunPod / Lambda A100 (80GB VRAM)',
      cost: '$1.80 - $2.20 / hour',
      badge: 'Enterprise Heavyweight',
      color: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/30',
    };
  };

  const hardware = getHardwareRecommendation(Number(totalInferenceVRAM));

  return (
    <div className="space-y-8">
      {/* 1. The Real-World Upwork Requirements Decoded */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 text-xs font-mono">
              সেই ভয়ংকর জব পোস্ট ডিকোড!
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              LoRA, Catastrophic Forgetting, EWC ও KL Divergence: মুখস্থবিদ্যা বনাম আসল মেকানিজম
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            জব পোস্টে যেসব রিসার্চ-লেভেল শব্দের ভয় দেখানো হয়েছে—বাস্তবে এর পেছনের সফটওয়্যার লজিক কত সহজ তা দেখে তুমি অবাক হবে!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Concept 1: LoRA & PEFT */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
                  <Bookmark className="h-4 w-4 text-[#533AFD]" />
                  LoRA / PEFT (Parameter-Efficient Fine-Tuning)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">
                  ১০,০০০x সাশ্রয়ী
                </span>
              </div>

              <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-xs leading-relaxed space-y-1">
                <p>
                  <strong>ঘরোয়া গল্প:</strong> তোমার বাসায় ১,০০০ পৃষ্ঠার একটি মোটা রান্নার এনসাইক্লোপিডিয়া আছে (Base Llama-3 Model)। তোমার স্ত্রী নতুন একটি বিশেষ বিরিয়ানির রেসিপি লিখে রাখতে চায়। পুরো ১,০০০ পৃষ্ঠার বই কি নতুন করে ছাপানো সম্ভব? না! সে বইয়ের শেষে মাত্র ৫ পৃষ্ঠার একটি <strong>স্টিকি-নোট (Sticky Note)</strong> আঠা দিয়ে লাগিয়ে দিল।
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono pt-1">
                  👉 <strong>ইঞ্জিনিয়ারিং সত্য:</strong> পুরো ৮ বিলিয়ন প্যারামিটার পরিবর্তন না করে মাত্র ০.১% প্যারামিটার ট্রেইন করা হয়। আউটপুট ফাইল সাইজ হয় মাত্র ৫০-১০০ মেগাবাইট!
                </p>
              </div>
            </div>

            {/* Concept 2: Catastrophic Forgetting */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Catastrophic Forgetting (সব ভুলে যাওয়া)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-semibold">
                  Common Trap
                </span>
              </div>

              <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-xs leading-relaxed space-y-1">
                <p>
                  <strong>ঘরোয়া গল্প:</strong> একটা ছোট বাচ্চাকে তুমি ১ মাস ধরে শুধু দাবা (Chess) খেলা শেখালে। সে দারুণ দাবাড়ু হলো। পরের মাসে তুমি তাকে শুধু ফুটবল খেলা শেখালে। ৩য় মাসে দাবার বোর্ডে বসালে সে বোকার মতো তাকিয়ে থাকে—দাবার আগের নিয়ম সে <strong>সম্পূর্ণ ভুলে গেছে!</strong>
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono pt-1">
                  👉 <strong>ইঞ্জিনিয়ারিং সত্য:</strong> নতুন কাজের ডেটা দিয়ে মডেলকে ওভার-ফাইনটিউন করলে সে তার পূর্বের প্রি-ট্রেইন্ড সাধারণ বুদ্ধি হারিয়ে ফেলে।
                </p>
              </div>
            </div>

            {/* Concept 3: EWC & Fisher Information */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
                  <Scale className="h-4 w-4 text-emerald-600" />
                  EWC (Elastic Weight Consolidation) &amp; Fisher
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-semibold">
                  Memory Protector
                </span>
              </div>

              <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-xs leading-relaxed space-y-1">
                <p>
                  <strong>ঘরোয়া গল্প:</strong> বাচ্চাটা যেন দাবার নিয়ম না ভুলে যায়, সেজন্য তুমি দাবার সবচেয়ে গুরুত্বপূর্ণ চালগুলোর ওপর একটা <strong>শক্ত রাবার ব্যান্ড</strong> বেঁধে দিলে। নতুন ফুটবল খেলার সময় ওই রাবার ব্যান্ড টানা লাগে এমন কিছুতে বাধা দেওয়া হলো!
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono pt-1">
                  👉 <strong>ইঞ্জিনিয়ারিং সত্য:</strong> <em>Fisher Information</em> মাপবে কোন প্যারামিটারগুলো সবচেয়ে বেশি জরুরি। <em>EWC</em> সেই প্যারামিটারগুলো পরিবর্তন করতে বড় পেনাল্টি (Loss Penalty) জুড়ে দেয়।
                </p>
              </div>
            </div>

            {/* Concept 4: KL Divergence */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  KL Divergence (চমকের পরিমাপ)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-semibold">
                  Distance Metric
                </span>
              </div>

              <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-xs leading-relaxed space-y-1">
                <p>
                  <strong>ঘরোয়া গল্প:</strong> তোমার স্ত্রী ভেবেছিল ইলিশ মাছের দাম হবে ১,০০০ টাকা। বাজারে গিয়ে দেখল দাম ৩,০০০ টাকা—সে প্রচণ্ড অবাক হলো (High Surprise / Divergence)! কিন্তু যদি দাম হতো ১,০৫০ টাকা, তার মনে কোনো ধাক্কা লাগত না (Zero Divergence)।
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono pt-1">
                  👉 <strong>ইঞ্জিনিয়ারিং সত্য:</strong> বেস মডেলের উত্তরের সম্ভাবনা আর নতুন ফাইন-টিউনড মডেলের উত্তরের সম্ভাবনার মধ্যে দূরত্বের পরিমাপক হলো <em>Kullback-Leibler (KL) Divergence</em>।
                </p>
              </div>
            </div>
          </div>

          {/* 2. Interactive GPU VRAM Memory Calculator */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-[#533AFD]" />
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                  ইন্টারেক্টিভ GPU VRAM মেমোরি ক্যালকুলেটর
                </h4>
              </div>
              <div className="text-xs font-mono text-[var(--color-text-muted)]">
                Formula: VRAM = Model Size × (Bits / 8) + Overhead
              </div>
            </div>

            {/* Selectors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {/* Model Size */}
              <div className="space-y-2 bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="font-semibold text-[var(--color-text-primary)]">
                  মডেলের সাইজ (Model Parameters):
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {[1, 3, 8, 14, 70].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setModelParams(b)}
                      className={`p-1.5 rounded text-center cursor-pointer transition-all ${
                        modelParams === b
                          ? 'bg-[#533AFD] text-white font-bold'
                          : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {b}B
                    </button>
                  ))}
                </div>
              </div>

              {/* Precision Quantization */}
              <div className="space-y-2 bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="font-semibold text-[var(--color-text-primary)]">
                  কোয়ান্টাইজেশন প্রিসিশন (Quantization):
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: '16', label: '16-bit (FP16)' },
                    { id: '8', label: '8-bit (INT8)' },
                    { id: '4', label: '4-bit (QLoRA)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPrecision(p.id as '16' | '8' | '4')}
                      className={`p-1.5 rounded text-center cursor-pointer transition-all ${
                        precision === p.id
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculation Results Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
              <div className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] space-y-0.5">
                <div className="text-[10px] uppercase text-[var(--color-text-muted)]">মডেল ওয়েটস সাইজ</div>
                <div className="text-xl font-bold text-[var(--color-text-primary)]">{baseWeightGB} GB</div>
                <div className="text-[10px] text-[var(--color-text-secondary)] font-sans">ডিস্কে ফাইলের সাইজ</div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] space-y-0.5">
                <div className="text-[10px] uppercase text-[var(--color-text-muted)]">ইনফারেন্স VRAM (রানিং)</div>
                <div className="text-xl font-bold text-[#533AFD]">{totalInferenceVRAM} GB</div>
                <div className="text-[10px] text-[var(--color-text-secondary)] font-sans">KV Cache সহ প্রয়োজনীয় র‍্যাম</div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] space-y-0.5">
                <div className="text-[10px] uppercase text-[var(--color-text-muted)]">LoRA ট্রেনিং VRAM</div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{loraTrainingVRAM} GB</div>
                <div className="text-[10px] text-[var(--color-text-secondary)] font-sans">গ্রেডিয়েন্ট মেমোরি সহ</div>
              </div>
            </div>

            {/* Hardware Recommendation Banner */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${hardware.color}`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  <span className="font-bold text-sm">সুপারিশকৃত হার্ডওয়্যার: {hardware.name}</span>
                </div>
                <p className="text-xs opacity-90 font-sans">
                  ক্লাউড খরচ: <strong>{hardware.cost}</strong> • ক্লায়েন্ট চার্জ: <strong>$৩,০০০ - $৫,০০০</strong>
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold border border-current shrink-0">
                {hardware.badge}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
