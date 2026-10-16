import { describe, it, expect } from 'vitest';
import {
  generateTwitterIntentUrl,
  generateRedditIntentUrl,
  formatPlainTextRoast,
  formatMarkdownRoast,
} from '../src/lib/receiptExporter';
import { PitchRoastOutput } from '../src/types';

describe('receiptExporter - Social Intents & Formatting', () => {
  const samplePitchRoast: PitchRoastOutput = {
    mode: 'pitch',
    pitch: 'Uber for cats',
    targetAudience: 'Feline enthusiasts',
    persona: 'yc',
    personaName: 'The Savage YC Partner',
    fluffScore: 82,
    fluffWordsDetected: ['uber for', 'disrupt'],
    verdict: 'High-Altitude Fluff',
    stamp: '[HARD PASS: TALK TO USERS]',
    brutalTruths: [
      'Cats do not have disposable income.',
      'Your CAC is infinite.',
      'Your churn is 100%.',
    ],
    honestParody: 'You carry cats in a cardboard box for $3.',
    vcQuote: 'Have you spoken to a single cat or human?',
    timestamp: '2026-10-16 12:00:00 UTC',
    receiptId: 'PITCH-TEST-123',
  };

  it('generates a valid Twitter Web Intent URL with roast text', () => {
    const url = generateTwitterIntentUrl(samplePitchRoast);
    expect(url).toContain('https://twitter.com/intent/tweet?text=');
    expect(url).toContain('1997agarwal');
    expect(url).toContain('HARD%20PASS');
  });

  it('generates a valid Reddit Intent URL', () => {
    const url = generateRedditIntentUrl(samplePitchRoast);
    expect(url).toContain('https://reddit.com/submit?');
    expect(url).toContain('RoastHub');
  });

  it('formats clean plain text suitable for clipboard pasting', () => {
    const text = formatPlainTextRoast(samplePitchRoast);
    expect(text).toContain('ROASTHUB THERMAL REJECTION MEMO');
    expect(text).toContain('FLUFF SCORE: 82%');
    expect(text).toContain('PITCH-TEST-123');
  });

  it('formats valid Markdown with headers and blockquotes', () => {
    const md = formatMarkdownRoast(samplePitchRoast);
    expect(md).toContain('### 🔥 RoastHub Rejection Memo');
    expect(md).toContain('#### 3 Brutal Truths:');
  });
});
