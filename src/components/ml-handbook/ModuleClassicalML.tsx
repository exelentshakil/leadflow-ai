'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  GitBranch,
  ShieldAlert,
  Users,
  Layers,
  Sparkles,
  Zap,
  Target,
  Mail,
  AlertCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ComposedChart,
  AreaChart,
  Area,
} from 'recharts';

export function ModuleClassicalML({ mode }: { mode: 'wife' | 'architect' }) {
  // Interactive Linear Regression: House Size to Price
  const [houseSqFt, setHouseSqFt] = useState(1400); // 500 to 3000 sq ft
  // Base formula: Price = 15000 + (SqFt * 145) + noise
  const estimatedPrice = Math.round(15000 + houseSqFt * 145);

  const regressionData = [
    { sqft: 600, price: 102000, trend: 15000 + 600 * 145 },
    { sqft: 900, price: 145000, trend: 15000 + 900 * 145 },
    { sqft: 1200, price: 190000, trend: 15000 + 1200 * 145 },
    { sqft: 1500, price: 232000, trend: 15000 + 1500 * 145 },
    { sqft: 1800, price: 275000, trend: 15000 + 1800 * 145 },
    { sqft: 2200, price: 334000, trend: 15000 + 2200 * 145 },
    { sqft: 2600, price: 395000, trend: 15000 + 2600 * 145 },
  ];

  // Interactive Gradient Descent Simulator State
  const [learningRate, setLearningRate] = useState<'low' | 'optimal' | 'high'>('optimal');

  // Interactive Decision Tree State
  const [weatherIsRainy, setWeatherIsRainy] = useState(false);
  const [temperatureWarm, setTemperatureWarm] = useState(true);

  // Decision result
  const decisionTreeVerdict = weatherIsRainy
    ? 'ঘরে থাকুন (বৃষ্টিতে ভিজে ঠান্ডা লাগবে)'
    : temperatureWarm
    ? 'বাইরে ঘুরতে যান (দারুণ রোদ আর আরামদায়ক আবহাওয়া!)'
    : 'হালকা জ্যাকেট পরে বের হোন (বাইরে বাতাস ও ঠান্ডা)';

  return (
    <div className="space-y-8">
      {/* 1. Linear Regression (Regression / Number Prediction) */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#533AFD]/10 text-[#533AFD] border-[#533AFD]/30 text-xs font-mono">
              অ্যালগরিদম ১ • রিগ্রেশন
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              Linear Regression: সংখ্যা অনুমান করার জাদুকরী লাইন ($y = mx + b$)
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            বাড়ি ভাড়া কত হবে? আগামী মাসে কোম্পানির সেলস কত বাড়বে? এই সব সংখ্যা অনুমানের রাজা হলো লিনিয়ার রিগ্রেশন।
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Metaphor Box */}
          <div className="rounded-xl border border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/20 p-4 sm:p-5 space-y-2">
            <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {mode === 'wife' ? 'ঘরের সাইজ দেখে বাড়ি ভাড়ার দরদাম' : 'Line of Best Fit & Ordinary Least Squares'}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {mode === 'wife' ? (
                <span>
                  তুমি ধানমন্ডি বা গুলশানে বাসা খুঁজতে গিয়ে দেখলে: ৫০০ স্কয়ার ফিটের বাসার ভাড়া ২৫,০০০ টাকা, ১০০০ স্কয়ার ফিটের ৫০,০০০ টাকা। তোমার ব্রেইনে অটোমেটিক একটা সোজা দাগ বা হিসাব বসে গেল—প্রতি ১০০ স্কয়ার ফিটে ৫,০০০ টাকা করে বাড়ে! এটাই লিনিয়ার রিগ্রেশন—অতীতের পয়েন্টগুলো দেখে ঠিক মাঝখান দিয়ে একটি সেরা আন্দাজের লাইন টেনে দেওয়া।
                </span>
              ) : (
                <span>
                  <code className="font-mono text-xs">y = mx + b</code>—যেখানে $y$ হলো প্রেডিক্টেড ভ্যালু (Price), $x$ হলো ইনপুট ফিচার (SqFt), $m$ হলো স্লোপ বা ওয়েট (Weight), এবং $b$ হলো বায়াস (Bias/Intercept)। স্কিট-লার্নে এটি মাত্র ২ লাইনের কোড: <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">LinearRegression().fit(X, y)</code>।
                </span>
              )}
            </p>
          </div>

          {/* Interactive House Price Graph */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                  ইন্টারেক্টিভ বাড়ি মূল্য প্রেডিকশন
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  স্লাইডার টেনে বাসার আয়তন বদলাও—লাইভ লাইনের ওপর পয়েন্ট মুভ করবে!
                </p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-mono">মডেল প্রেডিকশন</div>
                <div className="text-lg sm:text-xl font-bold text-[#533AFD]">
                  ${estimatedPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-1.5 max-w-md bg-[var(--color-surface)] p-3 rounded-lg border border-[var(--color-border)]">
              <div className="flex justify-between font-mono text-xs font-semibold text-[var(--color-text-primary)]">
                <span>বাসার আয়তন (Square Feet):</span>
                <span className="text-[#533AFD]">{houseSqFt} sq ft</span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="50"
                value={houseSqFt}
                onChange={(e) => setHouseSqFt(Number(e.target.value))}
                className="w-full accent-[#533AFD] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
                <span>৫০০ sq ft</span>
                <span>৩,০০০ sq ft</span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-56 sm:h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={regressionData} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <XAxis
                    dataKey="sqft"
                    type="number"
                    domain={[400, 3000]}
                    stroke="#727F96"
                    fontSize={11}
                    tickFormatter={(v) => `${v} sqft`}
                  />
                  <YAxis
                    stroke="#727F96"
                    fontSize={11}
                    domain={[50000, 450000]}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    formatter={(val: unknown) => {
                      const num = typeof val === 'number' ? val : Number(val) || 0;
                      return [`$${num.toLocaleString()}`, 'দাম'];
                    }}
                    labelFormatter={(label) => `${label} SqFt`}
                    contentStyle={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="trend"
                    stroke="#533AFD"
                    strokeWidth={3}
                    dot={false}
                    name="Line of Best Fit"
                  />
                  <Scatter
                    dataKey="price"
                    fill="#00D924"
                    stroke="#057A55"
                    strokeWidth={2}
                    name="বাস্তব ডেটা পয়েন্ট"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Classification Suite: Decision Tree, Random Forest & XGBoost */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 text-xs font-mono">
              অ্যালগরিদম ২ • ক্লাসিফিকেশন ও এনসেম্বল
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              Decision Tree, Random Forest ও XGBoost: কোটি টাকার বিজনেস অ্যালগরিদম
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            ব্যাংক ফ্রড ডিটেকশন, কাস্টমার চর্ন প্রেডিকশন এবং ক্যাটাগরি বাছাইয়ে কেন বিশ্বসেরা কোম্পানিগুলো এগুলো ব্যবহার করে?
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Interactive Decision Tree */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
            <div className="border-b border-[var(--color-border)] pb-3">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                ডিসিশন ট্রি সিমুলেটর: &quot;আজকে কি বাইরে ঘুরতে বের হব?&quot;
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                মানুষের ব্রেইন যেভাবে হ্যাঁ/না প্রশ্ন করে সিদ্ধান্তে পৌঁছায়, ডিসিশন ট্রি ঠিক সেভাবেই শাখা-প্রশাখা তৈরি করে।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3 bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
                <div className="text-xs font-bold text-[var(--color-text-primary)] uppercase font-mono">
                  ইনপুট কন্ডিশন পরিবর্তন করুন:
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                  <span className="text-xs font-medium text-[var(--color-text-primary)]">আকাশে কি বৃষ্টি হচ্ছে?</span>
                  <Button
                    size="sm"
                    variant={weatherIsRainy ? 'destructive' : 'outline'}
                    onClick={() => setWeatherIsRainy(!weatherIsRainy)}
                    className="h-7 text-xs"
                  >
                    {weatherIsRainy ? 'হ্যাঁ, বৃষ্টি হচ্ছে' : 'না, বৃষ্টি নেই'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                  <span className="text-xs font-medium text-[var(--color-text-primary)]">তাপমাত্রা কি গরম/আরামদায়ক?</span>
                  <Button
                    size="sm"
                    variant={temperatureWarm ? 'default' : 'outline'}
                    onClick={() => setTemperatureWarm(!temperatureWarm)}
                    className="h-7 text-xs"
                  >
                    {temperatureWarm ? 'হ্যাঁ, উষ্ণ' : 'না, ঠান্ডা'}
                  </Button>
                </div>
              </div>

              {/* Decision Tree Visual Output */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 flex flex-col justify-center items-center text-center space-y-2">
                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600">
                  <GitBranch className="h-6 w-6" />
                </div>
                <div className="text-[10px] font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400">
                  ডিসিশন ট্রির চূড়ান্ত রায় (Verdict)
                </div>
                <div className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                  {decisionTreeVerdict}
                </div>
              </div>
            </div>
          </div>

          {/* Random Forest & XGBoost Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--color-text-primary)]">
                <Users className="h-4 w-4 text-[#533AFD]" />
                <span>Random Forest (১০ জন ডাক্তারের মেডিকেল বোর্ড)</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                {mode === 'wife' ? (
                  <span>
                    ১ জন ডাক্তার একা ভুল রিপোর্ট দিতে পারে। কিন্তু তুমি যদি ১০ জন অভিজ্ঞ ডাক্তারকে একই এক্স-রে দেখাও এবং তাদের মধ্যে ৮ জনই বলে &quot;রোগ নেই&quot;—তাহলে ভুলের সম্ভাবনা থাকে না বললেই চলে। ১০০টি ডিসিশন ট্রি মিলে যখন একসাথে ভোট দেয়, তাকেই বলে <strong>Random Forest</strong>!
                  </span>
                ) : (
                  <span>
                    <strong>Bagging (Bootstrap Aggregation):</strong> ডেটাসেট থেকে র‍্যান্ডম সাবসেট নিয়ে শতাধিক আলাদা Decision Tree তৈরি করা হয়। ক্লাসিফিকেশনের ক্ষেত্রে Majority Voting এবং রিগ্রেশনের ক্ষেত্রে Average নেওয়া হয়। এটি Overfitting দারুণভাবে দূর করে।
                  </span>
                )}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/20 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-300">
                <Zap className="h-4 w-4 text-amber-600" />
                <span>XGBoost (পূর্বের ভুল থেকে নতুন গাছ শেখা)</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                {mode === 'wife' ? (
                  <span>
                    প্রথম রাঁধুনি রান্না করতে গিয়ে একটু লবণ বেশি দিয়ে ফেলল। ২য় রাঁধুনি এসে প্রথম রাঁধুনির সেই ভুলটা শুধরে নিল। ৩য় রাঁধুনি এসে আরেকটু পারফেক্ট করল। এভাবে একের পর এক গাছ পূর্বের গাছের ভুল ঠিক করতে করতে এগিয়ে চলাকে বলে <strong>Gradient Boosting</strong>!
                  </span>
                ) : (
                  <span>
                    <strong>Boosting &amp; Loss Optimization:</strong> প্রতিটি নতুন ট্রি আগের মডেলের অবশিষ্ট Residual Error কমানোর জন্য অপটিমাইজড হয়। Kaggle ডেটাসেট এবং ব্যাংক ফ্রড ডিটেকশনে এটি আজও ডিপ লার্নিংয়ের চেয়ে বেশি ফাস্ট ও অ্যাকুরেট!
                  </span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Gradient Descent & Loss Function (The Mountain Ball Metaphor) */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-300 text-xs font-mono">
              ক্যালকুলাস ও গণিত
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              Gradient Descent: কুয়াশার ভেতর পাহাড়ের নিচে নামার খেলা
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            মডেল কীভাবে ভুল কমায়? লস ফাংশন এবং লার্নিং রেটের আসল রহস্য।
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-3">
            <div className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              ভাবো তুমি চোখ বাঁধা অবস্থায় কুয়াশায় ঢাকা একটি পাহাড়ের চূড়ায় দাঁড়িয়ে আছো। তোমার লক্ষ্য হলো সবচেয়ে নিচে উপত্যকায় (Minimum Loss) নামা।
              তুমি কিন্তু পুরো পাহাড় দেখতে পাচ্ছ না! তুমি শুধু পায়ের নিচে ঢাল (Gradient/Slope) অনুভব করতে পারো—ঢাল যেদিকে নিচের দিকে নামছে, তুমি সেদিকে এক পা বাড়াও।
            </div>

            {/* Learning Rate Interactive Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLearningRate('low')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  learningRate === 'low'
                    ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/30 font-bold'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                }`}
              >
                <div className="text-[#533AFD]">১. Learning Rate Too Low (০.০০০০১)</div>
                <p className="text-[11px] text-[var(--color-text-muted)] font-sans mt-1">
                  পিপড়ার মতো প্রতি মিনিটে ১ ইঞ্চি করে পা ফেলছে। নিচে নামতে ১০০০ বছর লাগবে! (Very slow training)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLearningRate('optimal')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  learningRate === 'optimal'
                    ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30 font-bold'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                }`}
              >
                <div className="text-emerald-600 dark:text-emerald-400">২. Learning Rate Optimal (০.০১ - Adam)</div>
                <p className="text-[11px] text-[var(--color-text-muted)] font-sans mt-1">
                  নিখুঁত পদক্ষেপে দ্রুত এবং নিরাপদে সোজা নিচে উপত্যকায় পৌঁছে যাবে! (Perfect Convergence)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLearningRate('high')}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  learningRate === 'high'
                    ? 'border-rose-500 bg-rose-50/30 dark:bg-rose-950/30 font-bold'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                }`}
              >
                <div className="text-rose-600 dark:text-rose-400">৩. Learning Rate Too High (১০.০)</div>
                <p className="text-[11px] text-[var(--color-text-muted)] font-sans mt-1">
                  এত বড় লাফ মারল যে উপত্যকা পার হয়ে উল্টো পাশের পাহাড়ের চূড়ায় গিয়ে আছাড় খেল! (Overshooting / Explosion)
                </p>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
