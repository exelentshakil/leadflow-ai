'use client';

import React, { useState } from 'react';
import {
  Server,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Cpu,
  Lock,
  DollarSign,
  FileCode,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ModuleProductionMLOps({ mode }: { mode: 'wife' | 'architect' }) {
  const [copiedCode, setCopiedCode] = useState(false);

  const dockerRunCode = `docker run --gpus all -d \\
  --name vllm-server \\
  -p 8000:8000 \\
  --ipc=host \\
  -v ~/.cache/huggingface:/root/.cache/huggingface \\
  vllm/vllm-openai:latest \\
  --model meta-llama/Meta-Llama-3-8B-Instruct \\
  --max-model-len 4096 \\
  --gpu-memory-utilization 0.90`;

  const handleCopy = () => {
    navigator.clipboard.writeText(dockerRunCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Legiit AI Chat Reverse-Engineered */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#533AFD]/10 text-[#533AFD] border-[#533AFD]/30 text-xs font-mono">
              প্রোডাকশন MLOps ব্লুপ্রিন্ট
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              Legiit AI Chat আর্কিটেকচার: তোমার কলিগ AWS-এ আসলে কী চালিয়েছে?
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            একটি ওপেন-সোর্স মডেলকে কীভাবে ডকারে ভরে AWS সার্ভারে আনলিমিটেড প্রাইভেট এআই এপিআই বানানো হয়।
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Visual Architecture Pipeline */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-6 space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              ৪-ধাপের প্রোডাকশন আর্কিটেকচার ফ্লো
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase">ধাপ ১ • মডেল</div>
                <div className="font-bold text-[#533AFD]">Hugging Face</div>
                <p className="text-[11px] text-[var(--color-text-secondary)] font-sans mt-1">
                  Meta Llama-3-8B-Instruct মডেলের ওয়েটস ডাউনলোড করা।
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase">ধাপ ২ • ইঞ্জিন</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400">vLLM Server</div>
                <p className="text-[11px] text-[var(--color-text-secondary)] font-sans mt-1">
                  PagedAttention দিয়ে আল্ট্রাফাস্ট কনকারেন্ট টোকেন সার্ভিং ইঞ্জিন।
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase">ধাপ ৩ • কন্টেইনার</div>
                <div className="font-bold text-teal-600 dark:text-teal-400">Docker Packaging</div>
                <p className="text-[11px] text-[var(--color-text-secondary)] font-sans mt-1">
                  NVIDIA CUDA ড্রাইভার সহ সেলফ-কন্টেইন্ড ডকার ইমেজ।
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase">ধাপ ৪ • ক্লাউড</div>
                <div className="font-bold text-purple-600 dark:text-purple-400">AWS EC2 (G5)</div>
                <p className="text-[11px] text-[var(--color-text-secondary)] font-sans mt-1">
                  g5.xlarge ইনস্ট্যান্স (NVIDIA A10G 24GB VRAM) VPC-র ভেতরে।
                </p>
              </div>
            </div>
          </div>

          {/* Docker Terminal Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-text-primary)]">
                <Terminal className="h-4 w-4 text-emerald-600" />
                <span>The 1-Line Production Docker Command (যেটি তোমার কলিগ চালিয়েছে)</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 text-xs font-mono text-[var(--color-text-secondary)]"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy Command
                  </>
                )}
              </Button>
            </div>
            <pre className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs font-mono text-[var(--color-text-primary)] overflow-x-auto leading-relaxed">
              {dockerRunCode}
            </pre>
            <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
              💡 এই কমান্ডটি রান হওয়ার পর সার্ভারটি স্বয়ংক্রিয়ভাবে OpenAI-এর কমপ্যাটেবল এপিআই (<code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">http://aws-ip:8000/v1/chat/completions</code>) তৈরি করে ফেলে!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Client Objection Handling ($5,000 Upwork Pitch) */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 text-xs font-mono">
              Upwork উইনিং প্লেবুক
            </Badge>
            <CardTitle className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              ক্লায়েন্টের ৩টি প্রশ্ন ও তোমার মোক্ষম টেকনিক্যাল জবাব
            </CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            এই ৩টি জবাব শুনলেই ক্লায়েন্ট বুঝবে তুমি কোনো সস্তা স্ক্রিপ্টার নও, একজন প্রকৃত এন্টারপ্রাইজ সিস্টেম আর্কিটেক্ট!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Objection 1 */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">
              ক্লায়েন্টের প্রশ্ন ১: &quot;আমাদের বিজনেসের ডেটা বাইরে যেতে পারবে না। আমরা কীভাবে আমাদের নিজস্ব মডেল চালাব?&quot;
            </div>
            <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] leading-relaxed">
              <strong>তোমার আর্কিটেক্ট জবাব:</strong><br />
              &quot;আমরা কোনো থার্ড-পার্টি ক্লাউড API (OpenAI/Claude) ব্যবহার করব না। আমরা আপনার নিজস্ব AWS VPC-র ভেতরে একটি কন্টেইনারাইজড vLLM সার্ভারে Meta Llama-3 মডেল ডেপ্লয় করব। আপনার ইন্টারনাল ভিপিএন ছাড়া কোনো ডেটা বাইরে যাবে না এবং আপনি ১০০% ক্রেডেনশিয়াল ও মডেলের মালিক থাকবেন।&quot;
            </div>
          </div>

          {/* Objection 2 */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
              ক্লায়েন্টের প্রশ্ন ২: &quot;আমরা কি মডেল ট্রেইন করব নাকি RAG ব্যবহার করব?&quot;
            </div>
            <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] leading-relaxed">
              <strong>তোমার আর্কিটেক্ট জবাব:</strong><br />
              &quot;যেহেতু আপনার বিজনেসের পলিসি এবং ডাটা প্রতিনিয়ত আপডেট হয়, আমরা হাইব্রিড আর্কিটেকচার ব্যবহার করব: RAG (PostgreSQL pgvector / Supabase) দিয়ে তাজা তথ্য হ্যান্ডেল করব যাতে রি-ট্রেনিংয়ের খরচ বাঁচে, আর LoRA দিয়ে মডেলকে আপনার নির্দিষ্ট আউটপুট ফরম্যাট ও ভয়েস টোনে কথা বলা শেখাব।&quot;
            </div>
          </div>

          {/* Objection 3 */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
            <div className="text-xs font-bold text-[#533AFD] font-mono">
              ক্লায়েন্টের প্রশ্ন ৩: &quot;ইউজাররা যদি প্রম্পট ইঞ্জেকশন দিয়ে অ্যাডমিন ডেটা চুরি করে নেয়?&quot;
            </div>
            <div className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] leading-relaxed">
              <strong>তোমার আর্কিটেক্ট জবাব:</strong><br />
              &quot;আমি Securiti সার্টিফাইড AI Security &amp; Governance আর্কিটেক্ট। মডেলের ইনপুটে আমরা ইনলাইন LLM Firewall (NIST AI RMF / OWASP LLM01) বসাব যা ০ মিলিসেকেন্ডে প্রম্পট ইঞ্জেকশন কোয়ারান্টিন করবে এবং সোশ্যাল সিকিউরিটি বা ক্রেডিট কার্ড নম্বর তৎক্ষণাৎ PII Redaction করে দেবে।&quot;
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
