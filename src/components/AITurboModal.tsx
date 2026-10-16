import React, { useState } from 'react';
import { X, Sparkles, Key, Check, Shield, ExternalLink, Zap } from 'lucide-react';
import { AIConfig, AIProvider } from '../types';
import { saveAIConfig } from '../lib/aiClient';
import { audioEngine } from '../lib/audioEngine';

interface AITurboModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AIConfig;
  onSave: (config: AIConfig) => void;
}

export const AITurboModal: React.FC<AITurboModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [provider, setProvider] = useState<AIProvider>(config.provider);
  const [apiKey, setApiKey] = useState<string>(config.apiKey);
  const [enabled, setEnabled] = useState<boolean>(config.enabled);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AIConfig = {
      provider,
      apiKey: apiKey.trim(),
      enabled: enabled && !!apiKey.trim(),
    };
    saveAIConfig(updated);
    onSave(updated);
    audioEngine.playTypewriterClick();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setApiKey('');
    setEnabled(false);
    const updated: AIConfig = {
      provider,
      apiKey: '',
      enabled: false,
    };
    saveAIConfig(updated);
    onSave(updated);
    audioEngine.playTypewriterClick();
  };

  const providerLinks: Record<AIProvider, { url: string; label: string; note: string }> = {
    gemini: {
      url: 'https://aistudio.google.com/app/apikey',
      label: 'Get Free Gemini Key',
      note: 'Free tier available via Google AI Studio',
    },
    groq: {
      url: 'https://console.groq.com/keys',
      label: 'Get Free Groq Key',
      note: 'Lightning-fast Llama-3.3-70B inference',
    },
    openai: {
      url: 'https://platform.openai.com/api-keys',
      label: 'Get OpenAI Key',
      note: 'Uses gpt-4o-mini',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-charcoal-850 rounded-2xl border border-charcoal-700 shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-charcoal-800 hover:bg-charcoal-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-neon/10 border border-amber-neon/30 flex items-center justify-center text-amber-neon">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              AI Turbo Mode (BYOK)
            </h3>
            <p className="text-xs text-slate-400">
              Bring Your Own Key for live dynamic roasts
            </p>
          </div>
        </div>

        {/* Zero-Backend Privacy Notice */}
        <div className="p-3 rounded-xl bg-charcoal-800 border border-charcoal-700/80 text-[11px] text-slate-300 flex items-start gap-2.5 mb-5">
          <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-400 block font-mono">100% Client-Side Privacy:</span>
            Your API key is stored exclusively in your browser's local storage and used directly in browser fetch calls. Zero intermediary servers.
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Select Provider:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['gemini', 'groq', 'openai'] as AIProvider[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setProvider(p);
                    audioEngine.playTypewriterClick();
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-medium border capitalize transition-all ${
                    provider === p
                      ? 'bg-amber-neon/10 border-amber-neon text-amber-neon'
                      : 'bg-charcoal-800 border-charcoal-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-between items-center text-[11px]">
              <span className="text-slate-400">{providerLinks[provider].note}</span>
              <a
                href={providerLinks[provider].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-neon hover:underline flex items-center gap-1 font-mono"
              >
                <span>{providerLinks[provider].label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              API Key:
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Paste your ${provider.toUpperCase()} key...`}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 focus:border-amber-neon focus:ring-1 focus:ring-amber-neon text-bone placeholder-slate-500 text-xs font-mono focus:outline-none transition-all"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-800 border border-charcoal-700/80">
            <div>
              <span className="text-xs font-mono text-white block">Enable AI Turbo</span>
              <span className="text-[10px] text-slate-400">
                When disabled, runs 100% on procedural matrix
              </span>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 accent-amber-neon rounded cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-neon hover:bg-amber-bright text-charcoal-950 font-display font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
