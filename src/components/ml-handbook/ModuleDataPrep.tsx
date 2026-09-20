'use client';

import React, { useState } from 'react';
import {
  Database,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Shuffle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ModuleDataPrep({ mode }: { mode: 'wife' | 'architect' }) {
  // Interactive Feature Scaling Demo State
  const [rawSalary, setRawSalary] = useState(85000); // 20k to 200k
  const [rawAge, setRawAge] = useState(32); // 18 to 65

  // Min-Max Normalization (0 to 1 scale)
  // Salary: min 20,000, max 200,000
  const normalizedSalary = ((rawSalary - 20000) / (200000 - 20000)).toFixed(2);
  // Age: min 18, max 65
  const normalizedAge = ((rawAge - 18) / (65 - 18)).toFixed(2);

  // Z-Score Standardization (Mean=0, StdDev=1)
  // Approx: Salary mean 90k, std 35k
  const standardizedSalary = ((rawSalary - 90000) / 35000).toFixed(2);
  // Approx: Age mean 38, std 12
  const standardizedAge = ((rawAge - 38) / 12).toFixed(2);

  // Active Tab for Encoding Demo
  const [encodingTab, setEncodingTab] = useState<'onehot' | 'label' | 'ordinal'>('onehot');

  return (
    <div className="space-y-8">
      {/* 1. Feature Engineering & Preparation */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#533AFD]/10 text-[#533AFD] border-[#533AFD]/30 text-xs font-mono">
              মডিউল ২ • ডেটা প্রিপারেশন (ভিডিও ১–৩৫)
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              ফিচার ইঞ্জিনিয়ারিং: ডেটা না ধুলে মডেল কখনো শিখবে না!
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            মেশিন লার্নিংয়ের ৮০% সময় কাটে ডেটা প্রিপারেশনে—পান্ডাস (Pandas), এনকোডিং এবং স্কেলিংয়ের সহজ জাদু।
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Household Story Box */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/20 p-4 sm:p-5 space-y-2">
            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {mode === 'wife' ? 'কাঁচাবাজারের সবজি ধোয়া ও সাইজ মতো কাটা' : 'Pandas & Garbage-In, Garbage-Out'}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {mode === 'wife' ? (
                <span>
                  বাজার থেকে আনা শাকসবজির গায়ে মাটি, ময়লা লেগে থাকে। নোংরা সবজি কি সরাসরি পাতিলে ঢেলে রান্না করা যায়? কখনোই না! প্রথমে মাটি ধুয়ে ফেলতে হয় (Missing Data Clean), পচা অংশ ফেলে দিতে হয় (Outliers Removal), আর আলু-পটলের খোসা ছাড়িয়ে সমান টুকরো করতে হয় (Feature Scaling)। তবেই না সুস্বাদু রান্না হবে!
                </span>
              ) : (
                <span>
                  রিয়েল-ওয়ার্ল্ড ডেটাসেট (CSV, SQL) থাকে ভাঙাচোরা—কোথাও <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">NULL</code> ভ্যালু, কোথাও স্ট্রিং টেক্সট। মেশিন লার্নিং অ্যালগরিদম শুধু বিশুদ্ধ সংখ্যা (Floating point numbers) চেনে। তাই Pandas দিয়ে ডেটা পরিষ্কার করা এবং ক্যাটাগরিকে সংখ্যায় কনভার্ট করা ছাড়া কোনো মডেল কাজ করতে পারে না।
                </span>
              )}
            </p>
          </div>

          {/* Categorical Encoding Interactive Showcase */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                  ক্যাটাগরি এনকোডিং: টেক্সটকে কীভাবে সংখ্যা বানাব?
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  মেশিন &quot;লাল&quot;, &quot;নীল&quot; বা &quot;ঢাকা&quot; বোঝে না। সে শুধু ০ আর ১ বোঝে!
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex items-center gap-1 bg-[var(--color-surface)] p-1 rounded-lg border border-[var(--color-border)] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setEncodingTab('onehot')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    encodingTab === 'onehot'
                      ? 'bg-[#533AFD] text-white font-bold'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  One-Hot Encoding
                </button>
                <button
                  type="button"
                  onClick={() => setEncodingTab('label')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    encodingTab === 'label'
                      ? 'bg-[#533AFD] text-white font-bold'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  Label Encoding
                </button>
                <button
                  type="button"
                  onClick={() => setEncodingTab('ordinal')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    encodingTab === 'ordinal'
                      ? 'bg-[#533AFD] text-white font-bold'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  Ordinal Encoding
                </button>
              </div>
            </div>

            {/* Encoding Results Display */}
            {encodingTab === 'onehot' && (
              <div className="space-y-2">
                <div className="text-xs text-[var(--color-text-secondary)]">
                  <strong>One-Hot Encoding:</strong> প্রতিটি অপশনের জন্য আলাদা আলাদা কলাম (বক্স) তৈরি করা হয়। যেটাতে টিক পড়বে সেটা ১, বাকি সব ০!
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono text-left border border-[var(--color-border)] bg-[var(--color-surface)] rounded-lg">
                    <thead className="bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
                      <tr>
                        <th className="p-2.5">রঙ (আসল টেক্সট)</th>
                        <th className="p-2.5">Color_Red</th>
                        <th className="p-2.5">Color_Green</th>
                        <th className="p-2.5">Color_Blue</th>
                        <th className="p-2.5 font-sans">কখন ব্যবহার করবেন?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      <tr>
                        <td className="p-2.5 font-bold text-rose-500">Red</td>
                        <td className="p-2.5 text-emerald-600 font-bold">1</td>
                        <td className="p-2.5 text-slate-400">0</td>
                        <td className="p-2.5 text-slate-400">0</td>
                        <td className="p-2.5 font-sans text-[11px] text-[var(--color-text-secondary)]" rowSpan={3}>
                          যখন অপশনগুলোর ভেতর কোনো ছোট-বড় বা ক্রম নেই (যেমন: লাল, সবুজ, নীল বা শহরের নাম)।
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-emerald-600">Green</td>
                        <td className="p-2.5 text-slate-400">0</td>
                        <td className="p-2.5 text-emerald-600 font-bold">1</td>
                        <td className="p-2.5 text-slate-400">0</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-blue-500">Blue</td>
                        <td className="p-2.5 text-slate-400">0</td>
                        <td className="p-2.5 text-slate-400">0</td>
                        <td className="p-2.5 text-emerald-600 font-bold">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {encodingTab === 'label' && (
              <div className="space-y-2">
                <div className="text-xs text-[var(--color-text-secondary)]">
                  <strong>Label Encoding:</strong> প্রতিটি টেক্সটকে একটি করে সিরিয়াল নম্বর (০, ১, ২, ৩...) দেওয়া হয়।
                </div>
                <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] font-mono text-xs space-y-1">
                  <div>• &quot;Dhaka&quot; $\rightarrow$ <span className="font-bold text-[#533AFD]">0</span></div>
                  <div>• &quot;Chittagong&quot; $\rightarrow$ <span className="font-bold text-[#533AFD]">1</span></div>
                  <div>• &quot;Sylhet&quot; $\rightarrow$ <span className="font-bold text-[#533AFD]">2</span></div>
                  <div className="pt-2 text-[11px] font-sans text-amber-700 dark:text-amber-400">
                    ⚠️ সতর্কতা: এটি সাধারণত শুধু টার্গেট আউটপুটের (Y value) ক্ষেত্রে ব্যবহার করা ভালো। ফিচারের ক্ষেত্রে ব্যবহার করলে মডেল ভাবতে পারে ২ নম্বর শহর ১ নম্বরের চেয়ে ডাবল ভালো!
                  </div>
                </div>
              </div>
            )}

            {encodingTab === 'ordinal' && (
              <div className="space-y-2">
                <div className="text-xs text-[var(--color-text-secondary)]">
                  <strong>Ordinal Encoding:</strong> যখন অপশনগুলোর মধ্যে প্রাকৃতিক ছোট-বড় ক্রম (Rank/Order) থাকে!
                </div>
                <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] font-mono text-xs space-y-1">
                  <div>• &quot;Low&quot; / &quot;Small&quot; $\rightarrow$ <span className="font-bold text-emerald-600">0</span></div>
                  <div>• &quot;Medium&quot; $\rightarrow$ <span className="font-bold text-[#533AFD]">1</span></div>
                  <div>• &quot;High&quot; / &quot;Large&quot; $\rightarrow$ <span className="font-bold text-rose-500">2</span></div>
                  <div className="pt-2 text-[11px] font-sans text-[var(--color-text-secondary)]">
                    এখানে ২ সত্যিই ১ এর চেয়ে বড়, তাই মডেল গাণিতিক অর্থ নিখুঁতভাবে বুঝতে পারে।
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feature Scaling Live Simulator */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 space-y-4">
            <div className="border-b border-[var(--color-border)] pb-3">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                ফিচার স্কেলিং সিমুলেটর (Feature Scaling / Normalization)
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                বেতন (২০,০০০ - ২,০০,০০০) আর বয়স (১৮ - ৬০)—এদের স্কেল আলাদা হলে মডেল ভেবে বসে বেতনই বেশি গুরুত্বপূর্ণ!
              </p>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5 bg-[var(--color-panel-subtle)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="flex justify-between font-semibold text-[var(--color-text-primary)]">
                  <span>মাসিক বেতন (Salary):</span>
                  <span className="text-[#533AFD]">${rawSalary.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="200000"
                  step="5000"
                  value={rawSalary}
                  onChange={(e) => setRawSalary(Number(e.target.value))}
                  className="w-full accent-[#533AFD] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--color-text-muted)]">
                  <span>$20k</span>
                  <span>$200k</span>
                </div>
              </div>

              <div className="space-y-1.5 bg-[var(--color-panel-subtle)] p-3 rounded-lg border border-[var(--color-border)]">
                <div className="flex justify-between font-semibold text-[var(--color-text-primary)]">
                  <span>বয়স (Age):</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{rawAge} বছর</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={rawAge}
                  onChange={(e) => setRawAge(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--color-text-muted)]">
                  <span>১৮ বছর</span>
                  <span>৬৫ বছর</span>
                </div>
              </div>
            </div>

            {/* Scale Comparison Output */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-1">
              <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-1">
                <div className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                  Min-Max Normalization (০ থেকে ১ স্কেল)
                </div>
                <div>• বেতন স্কেল: <span className="font-bold text-emerald-600">{normalizedSalary}</span> (0.00 - 1.00)</div>
                <div>• বয়স স্কেল: <span className="font-bold text-emerald-600">{normalizedAge}</span> (0.00 - 1.00)</div>
                <p className="text-[10px] text-[var(--color-text-muted)] font-sans pt-1">
                  এখন দুটি ভিন্ন মাপের ভেরিয়েবলই সমান ওজনে অ্যালগরিদমে ঢুকবে!
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#533AFD]/30 bg-[#533AFD]/5 space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#533AFD]">
                  StandardScaler / Z-Score (গড় ০, ভ্যারিয়েন্স ১)
                </div>
                <div>• বেতন Z-Score: <span className="font-bold text-[#533AFD]">{standardizedSalary}</span></div>
                <div>• বয়স Z-Score: <span className="font-bold text-[#533AFD]">{standardizedAge}</span></div>
                <p className="text-[10px] text-[var(--color-text-muted)] font-sans pt-1">
                  গড় মান থেকে কত স্ট্যান্ডার্ড ডেভিয়েশন দূরে তা হিসাব করে।
                </p>
              </div>
            </div>
          </div>

          {/* 3. The 3 Deadly Traps: Overfitting, Underfitting & Data Leakage */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-50/20 dark:bg-rose-950/20 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                <AlertTriangle className="h-4 w-4" />
                <span>Overfitting (মুখস্থবিদ্যা)</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                যে ছাত্র পরীক্ষার আগের রাতে পুরো গাইড বই দাড়ি-কমা মুখস্থ করে এসেছে। ক্লাসের টেস্টে সে ১০০ পায়, কিন্তু আসল পরীক্ষায় প্রশ্ন একটু ঘুরিয়ে দিলেই সে ফেল মারে!
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/20 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <span>Underfitting (পড়াই করেনি)</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                মডেলকে এত কম ডেটা বা এত সহজ সমীকরণ দেওয়া হয়েছে যে সে ক্লাসের টেস্টেও ফেল করে, আসল পরীক্ষাতেও ফেল করে!
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-purple-500/30 bg-purple-50/20 dark:bg-purple-950/20 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-purple-600 dark:text-purple-400">
                <ShieldAlert className="h-4 w-4" />
                <span>Data Leakage (প্রশ্ন ফাঁস)</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                ট্রেনিং করার সময় অসাবধানতাবশত টেস্ট ডেটার অংশ মডেলে ঢুকে গেছে। ল্যাবে ৯৯% অ্যাকুরেসি দেখাবে, কিন্তু প্রোডাকশনে গেলেই সিস্টেম ক্র্যাশ করবে!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
