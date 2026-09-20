'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Heart, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HandbookHero } from '@/components/ml-handbook/HandbookHero';
import { ModuleFundamentals } from '@/components/ml-handbook/ModuleFundamentals';
import { ModuleDataPrep } from '@/components/ml-handbook/ModuleDataPrep';
import { ModuleClassicalML } from '@/components/ml-handbook/ModuleClassicalML';
import { ModuleDeepLearning } from '@/components/ml-handbook/ModuleDeepLearning';
import { ModuleLLMFineTuning } from '@/components/ml-handbook/ModuleLLMFineTuning';
import { ModuleProductionMLOps } from '@/components/ml-handbook/ModuleProductionMLOps';
import { ModuleLiveMentor } from '@/components/ml-handbook/ModuleLiveMentor';

export default function MachineLearningHandbookPage() {
  const [mode, setMode] = useState<'wife' | 'architect'>('wife');
  const [activeTab, setActiveTab] = useState<string>('fundamentals');

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Cockpit</span>
            </Link>
            <span className="text-[var(--color-border)] select-none">•</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-xs sm:text-sm text-[var(--color-text-primary)]">
                বাংলায় ML ও এআই হ্যান্ডবুক
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('wife')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  mode === 'wife'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <Heart className="h-3 w-3" />
                <span className="hidden sm:inline">Wife Mode</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('architect')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  mode === 'architect'
                    ? 'bg-[#533AFD] text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <Briefcase className="h-3 w-3" />
                <span className="hidden sm:inline">Architect Mode</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Handbook Hero */}
        <HandbookHero
          mode={mode}
          setMode={setMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Content Renderer */}
        <div className="transition-all duration-300">
          {activeTab === 'fundamentals' && <ModuleFundamentals mode={mode} />}
          {activeTab === 'dataprep' && <ModuleDataPrep mode={mode} />}
          {activeTab === 'classical' && <ModuleClassicalML mode={mode} />}
          {activeTab === 'deeplearning' && <ModuleDeepLearning mode={mode} />}
          {activeTab === 'finetuning' && <ModuleLLMFineTuning mode={mode} />}
          {activeTab === 'production' && <ModuleProductionMLOps mode={mode} />}
          {activeTab === 'mentor' && <ModuleLiveMentor initialMode={mode} />}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
