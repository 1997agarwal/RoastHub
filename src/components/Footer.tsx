import React from 'react';
import { Flame, Heart } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-charcoal-700/60 bg-charcoal-950/80 py-8 px-4 text-center text-xs text-slate-500 font-sans mt-16">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Brand & Mission */}
        <div className="flex items-center justify-center gap-2">
          <Flame className="w-4 h-4 text-flame-500" />
          <span className="font-display font-bold text-white text-sm">
            RoastHub 🔥
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">100% Client-Side Tech Roast Engine</span>
        </div>

        {/* Governance & Architecture Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-charcoal-800 border border-charcoal-700 text-slate-300">
            $0/mo Forever on GitHub Pages
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-charcoal-800 border border-charcoal-700 text-slate-300">
            300+ Procedural Roast Matrix
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-charcoal-800 border border-charcoal-700 text-slate-300">
            Zero Tracking • Zero Logins
          </span>
        </div>

        {/* Author & Socials */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-slate-400">
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-flame-500 fill-flame-500" /> by{' '}
            <a
              href="https://github.com/1997agarwal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-flame-400 font-medium underline transition-colors"
            >
              Harshit Agarwal (@1997agarwal)
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/1997agarwal/RoastHub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/1997agarwal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="Twitter / X"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/1997agarwal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-[10px] text-slate-600 font-mono pt-1">
          Licensed under MIT • For satire and software sanity improvement purposes only.
        </p>
      </div>
    </footer>
  );
};
