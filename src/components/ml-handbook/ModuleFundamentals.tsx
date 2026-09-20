'use client';

import React, { useState } from 'react';
import {
  Code,
  Brain,
  Sparkles,
  ArrowRight,
  Coffee,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare,
  Play,
  RotateCcw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ModuleFundamentals({ mode }: { mode: 'wife' | 'architect' }) {
  // Interactive Simulator State: Discount Decision
  const [cartTotal, setCartTotal] = useState(650);
  const [customerVisits, setCustomerVisits] = useState(4);
  const [isFestivalSeason, setIsFestivalSeason] = useState(true);

  // Traditional Coding Logic (Fixed hardcoded if/else rules)
  const traditionalDiscount =
    cartTotal > 500 && customerVisits >= 3
      ? 15
      : cartTotal > 300
      ? 10
      : 0;

  // ML Model Logic (Learned non-linear boundary with weights)
  // ML learned that festival season + frequent visits multiplies loyalty even if cart is slightly lower
  const mlScore = (cartTotal / 100) * 1.8 + customerVisits * 4.2 + (isFestivalSeason ? 25 : 0);
  const mlDiscount = mlScore > 50 ? 20 : mlScore > 35 ? 12 : mlScore > 20 ? 5 : 0;

  return (
    <div className="space-y-8">
      {/* 1. The Core Paradigm Shift */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#533AFD]/10 text-[#533AFD] border-[#533AFD]/30 text-xs font-mono">
              মডিউল ১ • ফান্ডামেন্টাল শিফট
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              Traditional Programming (PHP/JS) বনাম Machine Learning (ML)
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            সফটওয়্যার ইঞ্জিনিয়ারিংয়ের সবচেয়ে বড় রূপান্তর—হাত দিয়ে নিয়ম লেখার দিন শেষ, এখন মেশিন নিজে নিয়ম আবিষ্কার করে!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Traditional Card */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
                  <Code className="h-4 w-4 text-[#533AFD]" />
                  ট্রেডিশনাল সফটওয়্যার (PHP / JS)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--color-border)]/50 text-[var(--color-text-secondary)]">
                  Deterministic
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-xs text-[#533AFD] font-bold text-center">
                Data + Rules (if/else) = Output
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {mode === 'wife' ? (
                  <span>
                    🍳 <strong>রান্নার রেসিপি বই:</strong> বইয়ে যেভাবে লেখা আছে—২ চামচ লবণ, আধ চামচ হলুদ, ১০ মিনিট সেদ্ধ—তুমি ঠিক হুবহু তাই করো। যদি মরিচ বেশি ঝাল হয় বা চাল শক্ত হয়, রেসিপি বই নিজে নিজে বদলাতে পারে না। মানুষ যা লিখে দিয়েছে, সেটাই শেষ কথা।
                  </span>
                ) : (
                  <span>
                    💻 <strong>ম্যানুয়াল বিজনেস লজিক:</strong> একজন পিএইচপি বা লারাভেল ডেভেলপার হিসেবে তুমি হাতে কোড লেখো: <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">if ($cart &gt; 500) return 10;</code>। এখানে প্রতিটা সম্ভাব্য কেস তোমাকে আগে থেকেই ভেবে লিখে রাখতে হয়। ডাটা লাখ লাখ হলে এই if/else মেইনটেইন করা অসম্ভব হয়ে পড়ে।
                  </span>
                )}
              </p>
            </div>

            {/* ML Card */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-sm text-emerald-700 dark:text-emerald-400">
                  <Brain className="h-4 w-4 text-emerald-600" />
                  মেশিন লার্নিং (Machine Learning)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  Probabilistic
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-surface)] border border-emerald-500/30 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center">
                Data + Output = Rules (The Model!)
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {mode === 'wife' ? (
                  <span>
                    👩‍🍳 <strong>অভিজ্ঞ পাকা রাঁধুনি:</strong> রাঁধুনি কোনো বই পড়ে না। সে গত ১০ বছরে শত শত বার রান্না করে দেখেছে কোন মসলা কতটুকু দিলে কেমন স্বাদ হয়। সে শুধু কাঁচামাল (ডাটা) আর শেষ স্বাদ (আউটপুট) দেখে নিজের মাথায় নিজেই রেসিপি (নিয়ম) তৈরি করে নিয়েছে!
                  </span>
                ) : (
                  <span>
                    🧠 <strong>মডেল ট্রেইনিং (Mathematical Fitting):</strong> তুমি মেশিনকে ১ লক্ষ কাস্টমারের হিস্টোরিক্যাল কেনাকাটার ডাটা এবং তারা ডিসকাউন্ট পেয়েছিল কি পায়নি তা দিয়ে দিলে। অ্যালগরিদম নিজে ডেটা পয়েন্টগুলোর ভেতর থেকে ম্যাথমেটিক্যাল ফর্মুলা বা ডিসিশন বাউন্ডারি বের করে নিল। সেই তৈরি হওয়া ফাংশনটার নামই হলো <strong>Model</strong>!
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Real-time Interactive Simulator */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                  ইন্টারেক্টিভ সিমুলেটর: কাস্টমার ডিসকাউন্ট ডিসিশন
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  স্লাইডার টেনে ইনপুট পরিবর্তন করে দেখো কীভাবে সাধারণ if/else আটকে যায় আর ML ফ্লুয়িড ডিসিশন নেয়!
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCartTotal(650);
                  setCustomerVisits(4);
                  setIsFestivalSeason(true);
                }}
                className="h-7 text-xs font-mono text-[var(--color-text-secondary)]"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                রিসেট
              </Button>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="space-y-1.5 bg-[var(--color-panel-subtle)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="flex justify-between font-semibold text-[var(--color-text-primary)]">
                  <span>কার্ট ভ্যালু (Cart):</span>
                  <span className="text-[#533AFD]">${cartTotal}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="50"
                  value={cartTotal}
                  onChange={(e) => setCartTotal(Number(e.target.value))}
                  className="w-full accent-[#533AFD] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--color-text-muted)]">
                  <span>$100</span>
                  <span>$1,200</span>
                </div>
              </div>

              <div className="space-y-1.5 bg-[var(--color-panel-subtle)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="flex justify-between font-semibold text-[var(--color-text-primary)]">
                  <span>ভিজিট সংখ্যা (Visits):</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{customerVisits} বার</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={customerVisits}
                  onChange={(e) => setCustomerVisits(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--color-text-muted)]">
                  <span>১ বার</span>
                  <span>১২ বার</span>
                </div>
              </div>

              <div className="space-y-1.5 bg-[var(--color-panel-subtle)] p-3 rounded-lg border border-[var(--color-border)] flex flex-col justify-between">
                <div className="flex justify-between font-semibold text-[var(--color-text-primary)]">
                  <span>উৎসবের সিজন (Festival):</span>
                  <span className={isFestivalSeason ? 'text-amber-600 font-bold' : 'text-slate-400'}>
                    {isFestivalSeason ? 'হ্যাঁ (Eid/Puja)' : 'না (অফ-সিজন)'}
                  </span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant={isFestivalSeason ? 'default' : 'outline'}
                  onClick={() => setIsFestivalSeason(!isFestivalSeason)}
                  className="h-8 text-xs font-semibold"
                >
                  {isFestivalSeason ? 'উৎসব চলছে (Toggle Off)' : 'সাধারণ দিন (Toggle On)'}
                </Button>
              </div>
            </div>

            {/* Results Comparison Output */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                <div className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase">
                  Traditional if/else রেজাল্ট
                </div>
                <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">
                  {traditionalDiscount}% ডিসকাউন্ট
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                  নিয়মে উৎসবের সিজন লেখা ছিল না, তাই সে উৎসবের সুযোগ কাজে লাগাতে পারছে না!
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/30">
                <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                  Machine Learning Model রেজাল্ট
                </div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {mlDiscount}% ডায়নামিক ডিসকাউন্ট
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-1">
                  মডেল সব ভেরিয়েবল এক সাথে মিলিয়ে লয়ালটি প্রেডিক্ট করে সর্বোচ্চ রেভিনিউ নিশ্চিত করছে!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Everyday Claude, ChatGPT & Gemini Connection */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 text-xs font-mono">
              দৈনন্দিন AI এর রহস্য
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              Claude, ChatGPT ও Gemini আসলে পেছনের ব্যাকগ্রাউন্ডে কী করে?
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            এআই কোনো ম্যাজিক না—এটি পৃথিবীর ইতিহাসের সবচেয়ে নিখুঁত "Next Word Predictor"!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Visual Metaphor */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-600">
                <Coffee className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--color-text-primary)]">
                  সকালের এক কাপ চা: মানুষের ব্রেইন বনাম লার্জ ল্যাঙ্গুয়েজ মডেল (LLM)
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  দৈনন্দিন জীবনের সবচেয়ে সহজ উদাহরণ
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                প্রতিদিন সকালে তুমি তোমার স্ত্রীকে বল: <strong className="text-[var(--color-text-primary)]">"আমাকে এক কাপ..."</strong>
              </p>
              <p>
                তোমার স্ত্রী কি পুরো বাক্য শোনার অপেক্ষা করে? <strong>কখনোই না!</strong> সে স্বয়ংক্রিয়ভাবে জানে পরের শব্দটা হবে: <span className="text-emerald-600 dark:text-emerald-400 font-bold">"চা দাও" (Probability 98%)</span>। 
                সে কখনোই ভাববে না তুমি বলবে: <span className="text-rose-500 font-bold">"পেট্রোল দাও" (Probability 0.0001%)</span>।
              </p>
              <div className="pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-primary)] font-mono">
                👉 <strong>Claude / GPT ঠিক এই কাজটিই করে:</strong> ইন্টারনেটের কোটি কোটি বই আর কোড পড়ে সে শিখেছে কোন শব্দের পর কোন শব্দ আসার সম্ভাবনা সবচেয়ে বেশি। একেই বলা হয় <strong>Token-by-Token Autoregressive Generation</strong>!
              </div>
            </div>
          </div>

          {/* Token Prediction Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-1">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase">১. ইনপুট (Tokenization)</div>
              <div className="font-bold text-[var(--color-text-primary)]">শব্দকে সংখ্যায় রূপান্তর</div>
              <p className="text-[11px] text-[var(--color-text-secondary)] font-sans mt-1">
                মডেল বাংলা বা ইংরেজি বোঝে না। সে শব্দকে ছোট ছোট টোকেনে কেটে সংখ্যায় (Vectors) পরিণত করে।
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-1">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase">২. প্রসেসিং (Neural Matrix)</div>
              <div className="font-bold text-[#533AFD]">বিলিয়ন প্যারামিটার মাল্টিপ্লাই</div>
              <p className="text-[11px] text-[var(--color-text-secondary)] font-sans mt-1">
                জিপিইউ-র কোরগুলো একসাথে কোটি কোটি ম্যাট্রিক্স গুণ করে প্রতিটি সম্ভাব্য শব্দের প্রোবাবিলিটি বের করে।
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-1">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase">৩. আউটপুট (Next Word)</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">সর্বোচ্চ সম্ভাবনার শব্দ ডেলিভারি</div>
              <p className="text-[11px] text-[var(--color-text-secondary)] font-sans mt-1">
                পরপর শব্দগুলো জোড়া লেগে পুরো একটি ফাংশন, ইমেইল বা মাস্টারপিস আর্কিটেকচার স্ক্রিনে ভেসে ওঠে!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
