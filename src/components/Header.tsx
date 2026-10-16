import React, { useState } from 'react';
import { Flame, Volume2, VolumeX, Sparkles, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { audioEngine } from '../lib/audioEngine';
import { AIConfig } from '../types';

interface HeaderProps {
  aiConfig: AIConfig;
  onOpenAIModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ aiConfig, onOpenAIModal }) => {
  const [muted, setMuted] = useState<boolean>(audioEngine.isMuted());

  const handleToggleAudio = () => {
    const isNowMuted = audioEngine.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      audioEngine.playFlameWhoosh();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-charcoal-900/95 backdrop-blur-md border-b border-charcoal-700/60 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-flame-500 to-amber-neon flex items-center justify-center shadow-lg shadow-flame-500/20 animate-flame-flicker">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white">
                Roast<span className="text-flame-500">Hub</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-flame-500/10 text-flame-400 border border-flame-500/30 font-mono font-medium">
                v1.0
              </span>
            </div>
            <p className="hidden sm:block text-xs text-slate-400 font-sans">
              The Savage Multi-Roast Machine for Tech & Startups
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleAudio}
            title={muted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono"
          >
            {muted ? (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-neon" />
                <span className="hidden sm:inline">Sound FX</span>
              </>
            )}
          </button>

          {/* AI Turbo Mode Toggle */}
          <button
            onClick={onOpenAIModal}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              aiConfig.enabled && aiConfig.apiKey
                ? 'bg-amber-neon/10 border-amber-neon text-amber-neon shadow-sm shadow-amber-neon/20'
                : 'bg-charcoal-800 hover:bg-charcoal-700 border-charcoal-700 text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-neon" />
            <span className="hidden sm:inline">AI Turbo:</span>
            <span>{aiConfig.enabled && aiConfig.apiKey ? 'ON' : 'OFF'}</span>
          </button>

          {/* GitHub Star Link */}
          <a
            href="https://github.com/1997agarwal/RoastHub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="hidden md:inline">Star</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
