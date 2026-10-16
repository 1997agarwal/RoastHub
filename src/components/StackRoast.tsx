import React, { useState } from 'react';
import { Layers, DollarSign, AlertTriangle, Wand2, Check } from 'lucide-react';
import { AppType, StackRoastInput } from '../types';
import { APP_TYPES, TECH_TAGS } from '../lib/roastEngine';
import { audioEngine } from '../lib/audioEngine';

interface StackRoastProps {
  onRoast: (input: StackRoastInput) => void;
  isLoading: boolean;
}

const STACK_PRESETS = [
  {
    name: 'The Lunar Lander Blog',
    appType: 'blog' as AppType,
    tech: ['rust', 'kubernetes', 'kafka', 'cassandra', 'graphql'],
  },
  {
    name: 'The Overkill Todo App',
    appType: 'todo' as AppType,
    tech: ['nextjs', 'microservices', 'aws_lambda', 'redis', 'elasticsearch'],
  },
  {
    name: 'The Enterprise Admin Trap',
    appType: 'admin' as AppType,
    tech: ['spring', 'kubernetes', 'rabbitmq', 'terraform', 'mongodb'],
  },
  {
    name: 'The Sane Indie Minimalist',
    appType: 'blog' as AppType,
    tech: ['htmx', 'sqlite', 'tailwind'],
  },
];

export const StackRoast: React.FC<StackRoastProps> = ({ onRoast, isLoading }) => {
  const [appType, setAppType] = useState<AppType>('blog');
  const [selectedTech, setSelectedTech] = useState<string[]>([
    'nextjs',
    'kubernetes',
    'kafka',
    'redis',
  ]);

  const handleToggleTech = (techId: string) => {
    audioEngine.playTypewriterClick();
    setSelectedTech((prev) =>
      prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]
    );
  };

  const handleSelectPreset = (preset: typeof STACK_PRESETS[0]) => {
    setAppType(preset.appType);
    setSelectedTech(preset.tech);
    audioEngine.playTypewriterClick();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTech.length === 0) return;
    audioEngine.playFlameWhoosh();
    onRoast({
      appType,
      selectedTech,
    });
  };

  // Compute live stats preview
  const selectedTags = TECH_TAGS.filter((t) => selectedTech.includes(t.id));
  const totalCost = selectedTags.reduce((sum, t) => sum + t.monthlyCostUSD, 0);
  const totalComplexity = selectedTags.reduce((sum, t) => sum + t.complexityWeight, 0);

  const categories = [
    { key: 'frontend', title: 'Frontend & UI' },
    { key: 'backend', title: 'Backend & Language' },
    { key: 'database', title: 'Database & Storage' },
    { key: 'infra', title: 'Cloud & Infrastructure' },
    { key: 'architecture', title: 'Architecture & Messaging' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Presets */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400">
          <Wand2 className="w-3.5 h-3.5 text-amber-neon" />
          <span>Quick Architecture Archetypes:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {STACK_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700/80 text-xs text-slate-300 hover:text-white transition-all active:scale-95 flex items-center gap-1.5 font-mono"
            >
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* App Type Selector */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
            1. What kind of application are you actually building?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.keys(APP_TYPES) as AppType[]).map((typeId) => {
              const a = APP_TYPES[typeId];
              const isSelected = appType === typeId;
              return (
                <div
                  key={typeId}
                  onClick={() => {
                    setAppType(typeId);
                    audioEngine.playTypewriterClick();
                  }}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-charcoal-800 border-amber-neon ring-1 ring-amber-neon text-white'
                      : 'bg-charcoal-850 border-charcoal-700/80 hover:bg-charcoal-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{a.icon}</span>
                    <h4 className="text-xs font-bold font-mono">{a.name}</h4>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                    {a.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multi-Select Tech Tags */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
              2. Select Your Tech Stack Ingredients:
            </label>
            <span className="text-xs font-mono text-slate-400">
              {selectedTech.length} selected
            </span>
          </div>

          <div className="space-y-3">
            {categories.map((cat) => {
              const tagsInCat = TECH_TAGS.filter((t) => t.category === cat.key);
              return (
                <div key={cat.key} className="bg-charcoal-850 p-3 rounded-xl border border-charcoal-700/60">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block mb-2">
                    {cat.title}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tagsInCat.map((t) => {
                      const isSelected = selectedTech.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleToggleTech(t.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-500 to-flame-500 text-white font-bold shadow-md shadow-flame-500/20 ring-1 ring-white/20'
                              : 'bg-charcoal-800 hover:bg-charcoal-700 text-slate-300 border border-charcoal-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          <span>{t.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Cloud Waste Indicator */}
        <div className="p-3.5 rounded-xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <DollarSign className="w-4 h-4 text-amber-neon" />
            <span>Estimated Baseline Cloud Waste:</span>
          </div>
          <span className="text-amber-neon font-bold text-sm">
            ${Math.round(totalCost * 0.75)}/mo
          </span>
        </div>

        {/* Submit Roast Button */}
        <button
          type="submit"
          disabled={isLoading || selectedTech.length === 0}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-flame-500 hover:from-amber-600 hover:to-flame-600 text-white font-display font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Layers className="w-5 h-5 animate-spin" />
              <span>Diagnosing Architectural Hubris...</span>
            </>
          ) : (
            <>
              <Layers className="w-5 h-5" />
              <span>Diagnose My Architecture 🏗️</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
