import React, { useRef, useState, useEffect } from 'react';
import {
  Download,
  Share2,
  Copy,
  Check,
  Flame,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { TwitterIcon } from './Icons';
import { RoastOutput } from '../types';
import {
  downloadReceiptImage,
  generateTwitterIntentUrl,
  generateLinkedInIntentUrl,
  generateRedditIntentUrl,
  formatPlainTextRoast,
  formatMarkdownRoast,
} from '../lib/receiptExporter';
import { audioEngine } from '../lib/audioEngine';

interface ThermalReceiptProps {
  roast: RoastOutput;
  onReset: () => void;
}

export const ThermalReceipt: React.FC<ThermalReceiptProps> = ({ roast, onReset }) => {
  const receiptRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<'plain' | 'md' | 'link' | null>(null);

  // Sound effect triggers on mount
  useEffect(() => {
    audioEngine.playReceiptRip();
    const timer = setTimeout(() => {
      audioEngine.playStampThud();
    }, 380);
    return () => clearTimeout(timer);
  }, [roast.receiptId]);

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    setDownloading(true);
    audioEngine.playTypewriterClick();
    await downloadReceiptImage(receiptRef.current, `roasthub-${roast.receiptId.toLowerCase()}.png`);
    setDownloading(false);
  };

  const handleCopyText = (type: 'plain' | 'md') => {
    const text = type === 'plain' ? formatPlainTextRoast(roast) : formatMarkdownRoast(roast);
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    audioEngine.playTypewriterClick();
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedType('link');
    audioEngine.playTypewriterClick();
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 flex flex-col items-center">
      {/* Action Buttons Toolbar */}
      <div
        data-exclude-from-export="true"
        className="w-full mb-4 flex flex-wrap items-center justify-between gap-2 bg-charcoal-800/90 p-2.5 rounded-xl border border-charcoal-700"
      >
        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-lg bg-charcoal-700 hover:bg-charcoal-600 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Roast</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Download PNG */}
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="px-3 py-1.5 rounded-lg bg-flame-500 hover:bg-flame-600 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-md shadow-flame-500/20 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Printing...' : 'Download Receipt (PNG)'}</span>
          </button>

          {/* 1-Click Tweet */}
          <a
            href={generateTwitterIntentUrl(roast)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playTypewriterClick()}
            className="px-3 py-1.5 rounded-lg bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
            <span>Tweet</span>
          </a>
        </div>
      </div>

      {/* The Thermal Receipt Artifact */}
      <div
        ref={receiptRef}
        className="relative w-full bg-[#f8fafc] text-slate-900 font-mono shadow-2xl rounded-sm p-6 sm:p-8 select-text overflow-hidden border-t-8 border-dashed border-slate-300"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 85, 0, 0.1)',
        }}
      >
        {/* Subtle thermal scanlines / paper texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Top Header */}
        <div className="text-center border-b-2 border-dashed border-slate-400 pb-4 mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-flame-600 fill-flame-600" />
            <h2 className="font-display font-black text-xl tracking-tight text-slate-900">
              ROASTHUB THERMAL AUDIT
            </h2>
          </div>
          <p className="text-[11px] text-slate-600 tracking-wider uppercase">
            Official Technical Autopsy & Rejection Memo
          </p>
          <div className="mt-2 text-[10px] text-slate-500 flex justify-between px-2">
            <span>ORDER: #{roast.receiptId}</span>
            <span>{roast.timestamp}</span>
          </div>
        </div>

        {/* MODE SPECIFIC CONTENT */}
        {roast.mode === 'pitch' && (
          <div className="space-y-4 text-xs">
            {/* Pitch & Persona Header */}
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Submitted Pitch:
              </span>
              <p className="text-sm font-semibold text-slate-800 italic mt-0.5">
                "{roast.pitch}"
              </p>
              <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                <span>Audience: <b>{roast.targetAudience}</b></span>
                <span>Evaluator: <b>{roast.personaName}</b></span>
              </div>
            </div>

            {/* Buzzword Fluff Meter */}
            <div className="bg-slate-100 p-2.5 rounded border border-slate-300">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[11px] uppercase tracking-wider text-slate-700">
                  Buzzword Fluff Meter:
                </span>
                <span className="font-bold text-flame-600 text-sm">
                  {roast.fluffScore}%
                </span>
              </div>
              <div className="w-full bg-slate-300 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-flame-600 transition-all duration-700"
                  style={{ width: `${roast.fluffScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Verdict: <b>{roast.verdict}</b></span>
                {roast.fluffWordsDetected.length > 0 && (
                  <span className="truncate max-w-[200px]">
                    Keywords: {roast.fluffWordsDetected.join(', ')}
                  </span>
                )}
              </div>
            </div>

            {/* Honest Parody */}
            <div className="border-l-2 border-flame-500 pl-3 py-1 bg-flame-50/50">
              <span className="text-[10px] font-bold text-flame-700 uppercase tracking-wider block">
                Honest English Translation:
              </span>
              <p className="text-xs text-slate-800 font-medium">
                {roast.honestParody}
              </p>
            </div>

            {/* 3 Brutal Truths */}
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
                3 Brutal Reality Checks:
              </span>
              <ul className="space-y-1.5 list-none pl-0">
                {roast.brutalTruths.map((truth, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-800">
                    <span className="text-flame-600 font-bold">[{idx + 1}]</span>
                    <span>{truth}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VC Quote */}
            <div className="bg-slate-100 p-3 rounded border-dashed border border-slate-300 italic text-slate-700 text-xs">
              {roast.vcQuote}
            </div>
          </div>
        )}

        {roast.mode === 'repo' && (
          <div className="space-y-4 text-xs">
            {/* Repo Info */}
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Repository Examined:
              </span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {roast.repoName}
              </p>
              <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                <span>Language: <b>{roast.metrics.language}</b></span>
                <span>Stars: <b>{roast.metrics.stars.toLocaleString()}</b></span>
                <span>Open Issues: <b>{roast.metrics.openIssues}</b></span>
              </div>
            </div>

            {/* Cause of Death */}
            <div className="bg-red-50 p-2.5 rounded border border-red-200">
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                Forensic Cause of Death:
              </span>
              <p className="text-xs text-red-900 font-bold mt-0.5">
                {roast.causeOfDeath}
              </p>
            </div>

            {/* Bus Factor & Debt */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-100 p-2 rounded border border-slate-300">
                <span className="text-[10px] text-slate-500 uppercase block font-bold">
                  Technical Debt Score:
                </span>
                <span className="text-base font-bold text-flame-600">
                  {roast.metrics.debtScore}/100
                </span>
              </div>
              <div className="bg-slate-100 p-2 rounded border border-slate-300">
                <span className="text-[10px] text-slate-500 uppercase block font-bold">
                  Test Coverage Status:
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {roast.metrics.hasTests ? 'Present (Flaky)' : 'Zero QA Detected'}
                </span>
              </div>
            </div>

            {/* Autopsy Findings */}
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
                Autopsy Findings:
              </span>
              <ul className="space-y-1.5 list-none pl-0">
                {roast.autopsyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-800">
                    <span className="text-flame-600 font-bold">[{idx + 1}]</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commit message forensics */}
            <div className="bg-slate-100 p-2 rounded border border-slate-300">
              <span className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                Sample Commit Forensics:
              </span>
              <div className="flex flex-wrap gap-1">
                {roast.commitForensics.map((c, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded bg-white border border-slate-300 text-[10px] text-slate-700"
                  >
                    "{c}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {roast.mode === 'stack' && (
          <div className="space-y-4 text-xs">
            {/* Stack Info */}
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                App & Stack Selected:
              </span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {roast.appTypeName}
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {roast.selectedTech.map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Over-Engineering Metric & Cloud Waste */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-2.5 rounded border border-slate-300">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                  Over-Engineering:
                </span>
                <span className="font-bold text-flame-600 text-lg">
                  {roast.overEngineeringScore}%
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                  Estimated Cloud Waste:
                </span>
                <span className="font-bold text-amber-700 text-lg">
                  ${roast.estimatedMonthlyCloudWasteUSD}
                  <span className="text-[10px] font-normal text-slate-500">/mo</span>
                </span>
              </div>
            </div>

            {/* Senior Architect Diagnosis */}
            <div className="border-l-2 border-amber-500 pl-3 py-1 bg-amber-50/50">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                Senior Architect Diagnosis:
              </span>
              <p className="text-xs text-slate-800 font-medium">
                {roast.seniorArchitectDiagnosis}
              </p>
            </div>

            {/* Architectural Sins */}
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
                Architectural Sins:
              </span>
              <ul className="space-y-1.5 list-none pl-0">
                {roast.architecturalSins.map((sin, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-800">
                    <span className="text-flame-600 font-bold">[{idx + 1}]</span>
                    <span>{sin}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Sane Stack */}
            <div className="bg-green-50 p-2 rounded border border-green-200">
              <span className="text-[10px] font-bold text-green-800 uppercase block mb-1">
                Recommended Sane Stack (Saves You ${roast.estimatedMonthlyCloudWasteUSD}/mo):
              </span>
              <p className="text-[11px] text-green-900 font-medium">
                {roast.recommendedSaneStack.join(' • ')}
              </p>
            </div>
          </div>
        )}

        {/* RED RUBBER STAMP */}
        <div className="my-6 flex justify-center">
          <div
            className="animate-stamp-down inline-block px-4 py-2 border-4 border-red-600 text-red-600 font-black text-sm sm:text-base tracking-wider uppercase rounded-sm shadow-md"
            style={{
              textShadow: '0 0 1px rgba(220, 38, 38, 0.4)',
              transform: 'rotate(-8deg)',
              backgroundColor: 'rgba(254, 242, 242, 0.85)',
            }}
          >
            {roast.stamp}
          </div>
        </div>

        {/* BARCODE FOOTER */}
        <div className="border-t-2 border-dashed border-slate-400 pt-4 mt-6 text-center">
          {/* Simulated Retro Barcode */}
          <div className="flex justify-center items-center gap-[2px] h-9 mb-1.5 opacity-85">
            {[4, 2, 6, 1, 3, 5, 2, 7, 1, 4, 2, 8, 3, 2, 5, 1, 6, 4, 2, 3, 7, 2, 4, 1, 5, 3, 2, 6].map(
              (w, i) => (
                <div
                  key={i}
                  className="bg-slate-900 h-full"
                  style={{ width: `${w}px` }}
                />
              )
            )}
          </div>
          <p className="text-[10px] text-slate-500 tracking-widest font-mono">
            * {roast.receiptId} *
          </p>
          <p className="text-[9px] text-slate-400 mt-1">
            ROASTHUB.COM • 100% CLIENT-SIDE • NO REFUNDS ON PRIDE
          </p>
        </div>
      </div>

      {/* Social & Sharing Links Footer */}
      <div
        data-exclude-from-export="true"
        className="w-full mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 px-2"
      >
        <div className="flex items-center gap-2">
          <span>Share:</span>
          <a
            href={generateTwitterIntentUrl(roast)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-flame-400 underline"
          >
            Twitter/X
          </a>
          <span>•</span>
          <a
            href={generateLinkedInIntentUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-flame-400 underline"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={generateRedditIntentUrl(roast)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-flame-400 underline"
          >
            Reddit
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCopyText('plain')}
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            {copiedType === 'plain' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'plain' ? 'Copied Text!' : 'Copy Text'}</span>
          </button>
          <button
            onClick={() => handleCopyText('md')}
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            {copiedType === 'md' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'md' ? 'Copied MD!' : 'Copy MD'}</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            {copiedType === 'link' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedType === 'link' ? 'Copied Link!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
