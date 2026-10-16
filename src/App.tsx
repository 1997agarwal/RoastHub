import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Skull, Layers, Sparkles, AlertCircle } from 'lucide-react';
import {
  RoastMode,
  RoastOutput,
  PitchRoastInput,
  StackRoastInput,
  AIConfig,
  VCPersona,
  AppType,
} from './types';
import {
  generatePitchRoast,
  generateStackRoast,
  generateRepoRoast,
} from './lib/roastEngine';
import { fetchRepoMetrics } from './lib/githubAnalyzer';
import { getAIConfig, generateAIPitchRoast } from './lib/aiClient';
import { audioEngine } from './lib/audioEngine';

import { Header } from './components/Header';
import { EmberParticles } from './components/EmberParticles';
import { PitchRoast } from './components/PitchRoast';
import { RepoRoast } from './components/RepoRoast';
import { StackRoast } from './components/StackRoast';
import { ThermalReceipt } from './components/ThermalReceipt';
import { AITurboModal } from './components/AITurboModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [mode, setMode] = useState<RoastMode>('pitch');
  const [roast, setRoast] = useState<RoastOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiConfig, setAIConfig] = useState<AIConfig>(getAIConfig());
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Re-hydrate state from URL query parameters on load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('mode') as RoastMode | null;
      if (urlMode && ['pitch', 'repo', 'stack'].includes(urlMode)) {
        setMode(urlMode);

        if (urlMode === 'pitch') {
          const idea = params.get('idea');
          const aud = params.get('aud') || 'Tech users';
          const persona = (params.get('persona') as VCPersona) || 'yc';
          if (idea) {
            handlePitchRoast({ pitch: idea, targetAudience: aud, persona });
          }
        } else if (urlMode === 'repo') {
          const repoParam = params.get('repo');
          if (repoParam && repoParam.includes('/')) {
            const [o, r] = repoParam.split('/');
            handleRepoRoast(o, r);
          }
        } else if (urlMode === 'stack') {
          const appParam = (params.get('app') as AppType) || 'blog';
          const techParam = params.get('tech')?.split(',') || ['nextjs', 'kubernetes'];
          handleStackRoast({ appType: appParam, selectedTech: techParam });
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#ffaa00', '#ff2200', '#f8fafc'],
      });
    } catch (e) {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Mode A: Pitch Roast Execution
  const handlePitchRoast = async (input: PitchRoastInput) => {
    setIsLoading(true);
    setRoast(null);

    // Update query params
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'pitch');
    url.searchParams.set('idea', input.pitch);
    url.searchParams.set('aud', input.targetAudience);
    url.searchParams.set('persona', input.persona);
    window.history.replaceState({}, '', url.toString());

    if (aiConfig.enabled && aiConfig.apiKey) {
      try {
        const aiResult = await generateAIPitchRoast(input, aiConfig);
        setRoast(aiResult);
        triggerConfetti();
        setIsLoading(false);
        return;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown AI error';
        showToast(`AI Turbo error (${message}). Switched to procedural comedy engine.`);
      }
    }

    // Default Procedural Matrix
    setTimeout(() => {
      const output = generatePitchRoast(input);
      setRoast(output);
      triggerConfetti();
      setIsLoading(false);
    }, 400);
  };

  // Mode B: Repo Roast Execution
  const handleRepoRoast = async (owner: string, repo: string) => {
    setIsLoading(true);
    setRoast(null);

    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'repo');
    url.searchParams.set('repo', `${owner}/${repo}`);
    window.history.replaceState({}, '', url.toString());

    const metrics = await fetchRepoMetrics(owner, repo);
    const output = generateRepoRoast(metrics);
    setRoast(output);
    triggerConfetti();
    setIsLoading(false);
  };

  // Mode C: Stack Roast Execution
  const handleStackRoast = (input: StackRoastInput) => {
    setIsLoading(true);
    setRoast(null);

    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'stack');
    url.searchParams.set('app', input.appType);
    url.searchParams.set('tech', input.selectedTech.join(','));
    window.history.replaceState({}, '', url.toString());

    setTimeout(() => {
      const output = generateStackRoast(input);
      setRoast(output);
      triggerConfetti();
      setIsLoading(false);
    }, 350);
  };

  const handleReset = () => {
    setRoast(null);
    audioEngine.playTypewriterClick();
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-charcoal-900 text-bone selection:bg-flame-500 selection:text-white">
      {/* Background Ambient Embers */}
      <EmberParticles />

      {/* Navigation Header */}
      <Header
        aiConfig={aiConfig}
        onOpenAIModal={() => setIsAIModalOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-charcoal-800 border border-amber-neon/50 text-bone p-3.5 rounded-xl shadow-2xl flex items-start gap-2.5 text-xs font-mono animate-slideUp">
          <AlertCircle className="w-4 h-4 text-amber-neon flex-shrink-0 mt-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero Section */}
        {!roast && (
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flame-500/10 border border-flame-500/30 text-flame-400 text-xs font-mono">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>300+ Procedural Roasts • Zero Signup • 100% Client-Side</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white">
              Get Your Tech <span className="bg-gradient-to-r from-flame-500 via-amber-bright to-flame-400 bg-clip-text text-transparent">Roasted to Ashes.</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-sans">
              Founders, developers, and architects: paste your pitch, GitHub repo, or cloud stack.
              Receive an official thermal rejection receipt in under 3 seconds.
            </p>
          </div>
        )}

        {/* Tab Switcher (Mode A / Mode B / Mode C) */}
        {!roast && (
          <div className="max-w-xl mx-auto mb-8 bg-charcoal-800 p-1 rounded-2xl border border-charcoal-700 grid grid-cols-3 gap-1 shadow-inner">
            <button
              onClick={() => {
                setMode('pitch');
                audioEngine.playTypewriterClick();
              }}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-mono font-medium flex items-center justify-center gap-1.5 transition-all ${
                mode === 'pitch'
                  ? 'bg-gradient-to-r from-flame-500 to-amber-neon text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-charcoal-700/50'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Pitch Roast</span>
            </button>

            <button
              onClick={() => {
                setMode('repo');
                audioEngine.playTypewriterClick();
              }}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-mono font-medium flex items-center justify-center gap-1.5 transition-all ${
                mode === 'repo'
                  ? 'bg-gradient-to-r from-red-600 to-flame-500 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-charcoal-700/50'
              }`}
            >
              <Skull className="w-4 h-4" />
              <span>Repo Roast</span>
            </button>

            <button
              onClick={() => {
                setMode('stack');
                audioEngine.playTypewriterClick();
              }}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-mono font-medium flex items-center justify-center gap-1.5 transition-all ${
                mode === 'stack'
                  ? 'bg-gradient-to-r from-amber-500 to-flame-500 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-charcoal-700/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Stack Roast</span>
            </button>
          </div>
        )}

        {/* Input Forms (when no roast is active) */}
        {!roast && (
          <div className="animate-fadeIn">
            {mode === 'pitch' && (
              <PitchRoast
                onRoast={handlePitchRoast}
                isLoading={isLoading}
                aiConfig={aiConfig}
              />
            )}
            {mode === 'repo' && (
              <RepoRoast
                onRoast={handleRepoRoast}
                isLoading={isLoading}
              />
            )}
            {mode === 'stack' && (
              <StackRoast
                onRoast={handleStackRoast}
                isLoading={isLoading}
              />
            )}
          </div>
        )}

        {/* Roast Result: Thermal Receipt */}
        {roast && (
          <div className="animate-fadeIn">
            <ThermalReceipt
              roast={roast}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      {/* AI Turbo Configuration Modal */}
      <AITurboModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        config={aiConfig}
        onSave={(updated) => setAIConfig(updated)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
