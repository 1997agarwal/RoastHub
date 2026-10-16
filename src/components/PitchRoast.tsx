import React, { useState } from 'react';
import { Flame, Sparkles, Wand2 } from 'lucide-react';
import { VCPersona, PitchRoastInput, AIConfig } from '../types';
import { VC_PERSONAS } from '../lib/roastEngine';
import { audioEngine } from '../lib/audioEngine';

interface PitchRoastProps {
  onRoast: (input: PitchRoastInput) => void;
  isLoading: boolean;
  aiConfig: AIConfig;
}

const PRESETS = [
  {
    title: 'Uber for AI Agents',
    pitch: 'An autonomous peer-to-peer compute ride-sharing network where AI agents hire other AI agents using micro-tokens to write code and trade memecoins.',
    audience: 'Crypto Degens & Autonomous Agent Fanatics',
    persona: 'hype' as VCPersona,
  },
  {
    title: 'Tinder for Remote Devs',
    pitch: 'A dating app for software engineers that matches pairs based on their GitHub commit graphs, neovim keybindings, and mutual hatred of Jira.',
    audience: 'Burned-Out Tech Leads & Lonely Indie Hackers',
    persona: 'yc' as VCPersona,
  },
  {
    title: 'Blockchain Pomodoro Timer',
    pitch: 'A Web3 productivity timer where every 25-minute focus session mints an ERC-20 token and slashes your staked Ethereum if you open Twitter.',
    audience: 'Productivity Junkies with Gambling Addictions',
    persona: 'ramen' as VCPersona,
  },
  {
    title: 'AI Wrapper for PDF Invoices',
    pitch: 'A revolutionary AI-native enterprise invoice processing engine that uses GPT-4 to extract dates from standard PDF files for $499/month.',
    audience: 'Fortune 500 Accounts Payable Departments',
    persona: 'boomer' as VCPersona,
  },
];

export const PitchRoast: React.FC<PitchRoastProps> = ({ onRoast, isLoading, aiConfig }) => {
  const [pitch, setPitch] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('Developers & Early Adopters');
  const [persona, setPersona] = useState<VCPersona>('yc');

  const handleApplyPreset = (p: typeof PRESETS[0]) => {
    setPitch(p.pitch);
    setTargetAudience(p.audience);
    setPersona(p.persona);
    audioEngine.playTypewriterClick();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch.trim()) return;
    audioEngine.playFlameWhoosh();
    onRoast({
      pitch: pitch.trim(),
      targetAudience: targetAudience.trim() || 'General Tech Users',
      persona,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Quick-Fill Presets */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400">
          <Wand2 className="w-3.5 h-3.5 text-flame-400" />
          <span>Quick-Fill Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700/80 text-xs text-slate-300 hover:text-white transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Pitch Input */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
            1. Startup Tagline or Elevator Pitch:
          </label>
          <textarea
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            placeholder="e.g. A revolutionary AI-powered flywheel that synergizes seamless customer workflows with autonomous deep-tech agents..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-charcoal-800 border border-charcoal-700 focus:border-flame-500 focus:ring-1 focus:ring-flame-500 text-bone placeholder-slate-500 text-sm font-sans focus:outline-none transition-all"
            required
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
            2. Target Customer / Audience:
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g. Enterprise HR Directors, Solo Founders, Gen-Z Gamers"
            className="w-full px-4 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 focus:border-flame-500 focus:ring-1 focus:ring-flame-500 text-bone placeholder-slate-500 text-sm font-sans focus:outline-none transition-all"
          />
        </div>

        {/* VC Persona Selector */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
            3. Choose Your Executioner (VC Persona):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(VC_PERSONAS) as VCPersona[]).map((pId) => {
              const p = VC_PERSONAS[pId];
              const isSelected = persona === pId;
              return (
                <div
                  key={pId}
                  onClick={() => {
                    setPersona(pId);
                    audioEngine.playTypewriterClick();
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-charcoal-800 border-flame-500 ring-1 ring-flame-500 shadow-md shadow-flame-500/10'
                      : 'bg-charcoal-850 border-charcoal-700/80 hover:bg-charcoal-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-2xl">{p.avatar}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono">{p.name}</h4>
                      <p className="text-[10px] text-flame-400 font-mono">{p.title}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug font-sans">
                    {p.tagline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Roast Button */}
        <button
          type="submit"
          disabled={isLoading || !pitch.trim()}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-flame-500 to-amber-neon hover:from-flame-600 hover:to-amber-bright text-white font-display font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-flame-500/25 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Flame className="w-5 h-5 animate-spin" />
              <span>Incinerating Your Pitch...</span>
            </>
          ) : (
            <>
              <Flame className="w-5 h-5 fill-current" />
              <span>Roast My Pitch 🔥</span>
              {aiConfig.enabled && aiConfig.apiKey && (
                <Sparkles className="w-4 h-4 text-amber-glow ml-1" />
              )}
            </>
          )}
        </button>
      </form>
    </div>
  );
};
