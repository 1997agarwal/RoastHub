import React, { useState } from 'react';
import { Skull, Search, AlertCircle, Wand2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { parseGitHubUrl } from '../lib/githubAnalyzer';
import { audioEngine } from '../lib/audioEngine';

interface RepoRoastProps {
  onRoast: (owner: string, repo: string) => void;
  isLoading: boolean;
}

const REPO_PRESETS = [
  { name: 'facebook/react', label: 'React.js' },
  { name: 'torvalds/linux', label: 'Linux Kernel' },
  { name: 'shadcn/ui', label: 'shadcn/ui' },
  { name: 'vercel/next.js', label: 'Next.js' },
  { name: '1997agarwal/ContextPrism', label: 'ContextPrism' },
];

export const RepoRoast: React.FC<RepoRoastProps> = ({ onRoast, isLoading }) => {
  const [repoInput, setRepoInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = parseGitHubUrl(repoInput);
    if (!parsed) {
      setError('Please enter a valid GitHub repository (e.g. facebook/react or https://github.com/owner/repo)');
      return;
    }

    audioEngine.playFlameWhoosh();
    onRoast(parsed.owner, parsed.repo);
  };

  const handleSelectPreset = (repoName: string) => {
    setRepoInput(repoName);
    setError(null);
    audioEngine.playTypewriterClick();
    const parsed = parseGitHubUrl(repoName);
    if (parsed) {
      onRoast(parsed.owner, parsed.repo);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Quick-Fill Presets */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400">
          <Wand2 className="w-3.5 h-3.5 text-flame-400" />
          <span>Inspect Flagship Repos:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {REPO_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => handleSelectPreset(p.name)}
              className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700/80 text-xs text-slate-300 hover:text-white transition-all active:scale-95 flex items-center gap-1.5 font-mono"
            >
              <GithubIcon className="w-3 h-3 text-slate-400" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
            Public GitHub Repository URL or owner/repo:
          </label>
          <div className="relative">
            <input
              type="text"
              value={repoInput}
              onChange={(e) => {
                setRepoInput(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. facebook/react or https://github.com/torvalds/linux"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-charcoal-800 border border-charcoal-700 focus:border-flame-500 focus:ring-1 focus:ring-flame-500 text-bone placeholder-slate-500 text-sm font-mono focus:outline-none transition-all"
              required
            />
            <GithubIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5 font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Forensics Scope Note */}
        <div className="p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-700/70 text-xs text-slate-400 space-y-1">
          <p className="font-mono text-slate-300 font-bold flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-flame-400" />
            <span>Forensics Engine Automated Checks:</span>
          </p>
          <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px] font-sans">
            <li>Commit message hygiene (scanning for lazy commits like <code className="text-flame-400">"wip"</code>, <code className="text-flame-400">"asdf"</code>, <code className="text-flame-400">"pls work"</code>)</li>
            <li>Zombie issues ratio and PR abandonment rate</li>
            <li>Automated test presence vs production risk factor</li>
            <li>Bus Factor estimation (lone midnight hacker vs immortal committee)</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading || !repoInput.trim()}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-flame-500 hover:from-red-700 hover:to-flame-600 text-white font-display font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Skull className="w-5 h-5 animate-pulse" />
              <span>Analyzing Git Forensics...</span>
            </>
          ) : (
            <>
              <Skull className="w-5 h-5" />
              <span>Conduct Repo Autopsy 💀</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
