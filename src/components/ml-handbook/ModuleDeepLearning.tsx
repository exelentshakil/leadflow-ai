'use client';

import React, { useState } from 'react';
import {
  Brain,
  Network,
  Cpu,
  Sparkles,
  Eye,
  MessageSquare,
  ArrowRight,
  Activity,
  Layers,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ModuleDeepLearning({ mode }: { mode: 'wife' | 'architect' }) {
  // Interactive Perceptron State
  const [weight1, setWeight1] = useState(0.8); // 0.0 to 1.0
  const [weight2, setWeight2] = useState(0.5);
  const [input1, setInput1] = useState(1); // 1 or 0
  const [input2, setInput2] = useState(1);
  const [bias, setBias] = useState(-0.7);

  // Raw weighted sum = (x1 * w1) + (x2 * w2) + bias
  const weightedSum = (input1 * weight1 + input2 * weight2 + bias).toFixed(2);
  // Sigmoid activation: 1 / (1 + e^-z)
  const sigmoidOutput = (1 / (1 + Math.exp(-Number(weightedSum)))).toFixed(2);
  const isActivated = Number(sigmoidOutput) >= 0.5;

  return (
    <div className="space-y-8">
      {/* 1. The Biological & Artificial Neuron (Perceptron) */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#533AFD]/10 text-[#533AFD] border-[#533AFD]/30 text-xs font-mono">
              ডিপ লার্নিং কোর • নিউরাল নেটওয়ার্ক
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              Perceptron: মানুষের মস্তিষ্কের নিউরনের আদলে তৈরি একটি গাণিতিক সুইচ
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            একটি কৃত্রিম নিউরন কীভাবে সিদ্ধান্ত নেয়? Weights, Biases এবং অ্যাক্টিভেশন ফাংশন।
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Metaphor Box */}
          <div className="rounded-xl border border-teal-500/30 bg-teal-50/20 dark:bg-teal-950/20 p-4 sm:p-5 space-y-2">
            <h4 className="text-sm font-bold text-teal-800 dark:text-teal-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {mode === 'wife' ? 'গরম পাতিলে হাত লাগলে হাত ঝটকা মেরে সরিয়ে নেওয়া' : 'Biological vs Artificial Neuron'}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {mode === 'wife' ? (
                <span>
                  তোমার আঙুলে গরম ছ্যাঁকা লাগলে ত্বকের সেন্সরগুলো (ইনপুট) সাথে সাথে স্নায়ুর তার দিয়ে মস্তিষ্কে বার্তা পাঠায়। সিগন্যালটি যদি একটি নির্দিষ্ট সীমার চেয়ে বেশি গরম হয় (Threshold/Activation), ব্রেইন সাথে সাথে মাংসপেশিকে হুকুম দেয়: &quot;হাত সরিয়ে নাও!&quot; (Output Fire)। কম্পিউটার নিউরনও ঠিক এভাবেই একাধিক ইনপুট যোগ করে দেখে সীমা অতিক্রম করেছে কি না।
                </span>
              ) : (
                <span>
                  একটি সিঙ্গেল পারসেপট্রনের সমীকরণ: <code className="font-mono text-xs font-bold">y = σ(Σ(w_i * x_i) + b)</code>।
                  যেখানে $x$ হলো ইনপুট ভেক্টর, $w$ হলো প্রতিটা ইনপুটের গুরুত্ব (Weights), $b$ হলো থ্রেশহোল্ড শিফটার (Bias), এবং $\sigma$ হলো নন-লিনিয়ার অ্যাক্টিভেশন ফাংশন (Sigmoid / ReLU)।
                </span>
              )}
            </p>
          </div>

          {/* Interactive Single Neuron Simulator */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
            <div className="border-b border-[var(--color-border)] pb-3">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                লাইভ নিউরন সিমুলেটর: ওজন (Weight) ও বায়াস (Bias) পরিবর্তন করুন
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                স্লাইডার নাড়িয়ে দেখো কীভাবে নিউরন সক্রিয় (Fired) অথবা নিষ্ক্রিয় (Dormant) হয়।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="space-y-1.5 bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="flex justify-between font-semibold text-[var(--color-text-primary)]">
                  <span>ওয়েট ১ (Weight 1):</span>
                  <span className="text-[#533AFD]">{weight1}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={weight1}
                  onChange={(e) => setWeight1(Number(e.target.value))}
                  className="w-full accent-[#533AFD] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="flex justify-between font-semibold text-[var(--color-text-primary)]">
                  <span>ওয়েট ২ (Weight 2):</span>
                  <span className="text-teal-600 dark:text-teal-400">{weight2}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={weight2}
                  onChange={(e) => setWeight2(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="flex justify-between font-semibold text-[var(--color-text-primary)]">
                  <span>বায়াস (Bias Thresh):</span>
                  <span className="text-rose-500">{bias}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="1"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Neuron Activation Visual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] font-mono text-xs space-y-1">
                <div>• Weighted Sum ($z$): <span className="font-bold text-[#533AFD]">{weightedSum}</span></div>
                <div>• Sigmoid Output $\sigma(z)$: <span className="font-bold text-emerald-600">{sigmoidOutput}</span> (0 to 1)</div>
                <p className="text-[10px] text-[var(--color-text-muted)] font-sans pt-1">
                  সিগময়েড আউটপুট ০.৫০ এর বেশি হলে নিউরন সক্রিয় হবে।
                </p>
              </div>

              <div className={`p-4 rounded-lg border text-center flex flex-col justify-center items-center ${
                isActivated
                  ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 text-slate-500'
              }`}>
                <Activity className={`h-6 w-6 mb-1 ${isActivated ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
                <div className="text-sm font-bold">
                  {isActivated ? '⚡ নিউরন সক্রিয় হয়েছে (Neuron Fired!)' : '💤 নিউরন সুপ্ত অবস্থায় আছে (Not Activated)'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Forward Pass & Backpropagation */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 text-xs font-mono">
              লার্নিং মেকানিজম
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              Backpropagation: পিচ্চি বাচ্চার ভুল সংশোধন এবং চেইন রুল
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            ডিপ লার্নিং মডেল কীভাবে শেখে? শত কোটি প্যারামিটার কীভাবে একসাথে আপডেট হয়?
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-3">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
              বাস্তব উদাহরণ: ছোট বাচ্চার কুকুর ও বিড়াল চেনার গল্প
            </h4>
            <div className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed space-y-2">
              <p>
                ১. <strong>Forward Pass:</strong> একটা ছোট বাচ্চা রাস্তায় একটি বিড়াল দেখে বলল: <em>&quot;বাবা দেখো, কুকুর!&quot;</em> (ইনপুট ইমেজ দেখে মডেল একটি প্রেডিকশন ছুড়ে দিল)।
              </p>
              <p>
                ২. <strong>Loss Calculation:</strong> বাবা বললেন: <em>&quot;না বাবা, এটা কুকুর না, এটা বিড়াল! কারণ এটার লেজ চিকন আর চোখ গোলগোল।&quot;</em> (আসল উত্তরের সাথে বাচ্চার উত্তরের ভুলের ব্যবধান হিসাব করা হলো)।
              </p>
              <p>
                ৩. <strong>Backpropagation:</strong> বাচ্চার মাথায় বাবার এই সংশোধন পেছন দিকে ফিরে গেল। বাচ্চার ব্রেইনে &quot;গোল চোখ + মিউ মিউ = বিড়াল&quot; এর গুরুত্ব (Weight) বেড়ে গেল এবং কুকুরের সম্ভাবনা কমে গেল!
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
                <div className="font-bold text-[#533AFD]">ReLU Function</div>
                <div className="text-[11px] text-[var(--color-text-muted)] font-sans mt-1">
                  নেগেটিভ মান আসলে জিরো করে দেয়, পজিটিভ আসলে সরাসরি পাস করে। দ্রুত ক্যালকুলেশনের জন্য আধুনিক মডেলের প্রধান পছন্দ।
                </div>
              </div>
              <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
                <div className="font-bold text-emerald-600 dark:text-emerald-400">Softmax Function</div>
                <div className="text-[11px] text-[var(--color-text-muted)] font-sans mt-1">
                  আউটপুট লেয়ারের সব মানকে পারসেন্টেজে কনভার্ট করে যাতে সবগুলো প্রোবাবিলিটির যোগফল ঠিক ১০০% (১.০) হয়।
                </div>
              </div>
              <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
                <div className="font-bold text-amber-600 dark:text-amber-400">Adam Optimizer</div>
                <div className="text-[11px] text-[var(--color-text-muted)] font-sans mt-1">
                  গাড়ির স্মার্ট স্টিয়ারিংয়ের মতো—যেখানে ঢাল বেশি সেখানে ব্রেক ধরে, যেখানে মসৃণ সেখানে গতি বাড়িয়ে দ্রুত লক্ষ্যে পৌঁছায়।
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
