import { describe, it, expect } from 'vitest';
import {
  calculateBuzzwordFluff,
  generatePitchRoast,
  generateStackRoast,
  generateRepoRoast,
  VC_PERSONAS,
  APP_TYPES,
  TECH_TAGS,
} from '../src/lib/roastEngine';
import { VCPersona, RepoMetrics } from '../src/types';

describe('roastEngine - Buzzword Fluff Calculator', () => {
  it('calculates high fluff score for pitches laden with buzzwords', () => {
    const buzzwordPitch =
      'A revolutionary AI-native flywheel to disrupt and revolutionize seamless agentic blockchain ecosystems.';
    const result = calculateBuzzwordFluff(buzzwordPitch);
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.detectedWords.length).toBeGreaterThanOrEqual(3);
    expect(result.detectedWords).toContain('revolutionary');
    expect(result.detectedWords).toContain('ai-native');
    expect(result.detectedWords).toContain('flywheel');
    expect(result.verdictTitle).toBeDefined();
  });

  it('calculates low fluff score for simple grounded English text', () => {
    const simplePitch = 'A simple timer app that counts down from 25 minutes.';
    const result = calculateBuzzwordFluff(simplePitch);
    expect(result.score).toBeLessThanOrEqual(30);
    expect(result.detectedWords.length).toBe(0);
  });
});

describe('roastEngine - Mode A: Pitch Roasts', () => {
  const personas: VCPersona[] = ['hype', 'yc', 'ramen', 'boomer'];

  personas.forEach((persona) => {
    it(`generates a valid roast for persona: ${persona}`, () => {
      const output = generatePitchRoast({
        pitch: 'Uber for autonomous dog walking agents',
        targetAudience: 'Pet owners and crypto degens',
        persona,
      });

      expect(output.mode).toBe('pitch');
      expect(output.persona).toBe(persona);
      expect(output.personaName).toBe(VC_PERSONAS[persona].name);
      expect(output.fluffScore).toBeGreaterThanOrEqual(10);
      expect(output.fluffScore).toBeLessThanOrEqual(100);
      expect(output.stamp).toMatch(/^\[.+\]$/);
      expect(output.brutalTruths).toHaveLength(3);
      expect(output.honestParody).toBeDefined();
      expect(output.vcQuote).toBeDefined();
      expect(output.receiptId).toContain('PITCH-');
    });
  });
});

describe('roastEngine - Mode C: Stack Roasts', () => {
  it('identifies extreme over-engineering for a simple blog running complex cloud tech', () => {
    const output = generateStackRoast({
      appType: 'blog',
      selectedTech: ['rust', 'kubernetes', 'kafka', 'cassandra', 'microservices'],
    });

    expect(output.mode).toBe('stack');
    expect(output.appType).toBe('blog');
    expect(output.overEngineeringScore).toBeGreaterThanOrEqual(75);
    expect(output.estimatedMonthlyCloudWasteUSD).toBeGreaterThan(200);
    expect(output.stamp).toBeDefined();
    expect(output.architecturalSins).toHaveLength(3);
    expect(output.recommendedSaneStack.length).toBeGreaterThan(0);
  });

  it('recognizes a sane minimalistic stack with low waste score', () => {
    const output = generateStackRoast({
      appType: 'blog',
      selectedTech: ['htmx', 'sqlite', 'tailwind'],
    });

    expect(output.overEngineeringScore).toBeLessThanOrEqual(45);
    expect(output.estimatedMonthlyCloudWasteUSD).toBeLessThanOrEqual(50);
  });
});

describe('roastEngine - Mode B: Repo Autopsy', () => {
  it('generates an authentic repo autopsy from metrics', () => {
    const metrics: RepoMetrics = {
      stars: 45,
      forks: 3,
      openIssues: 82,
      watchers: 12,
      language: 'TypeScript',
      description: 'An experimental state machine',
      owner: 'testdev',
      repo: 'spaghetti-engine',
      busFactor: 'Lone Midnight Hacker',
      lazyCommitRatio: 60,
      lazyCommitsFound: ['wip', 'asdf', 'pls fix'],
      zombieIssueRatio: 75,
      hasTests: false,
      debtScore: 88,
    };

    const output = generateRepoRoast(metrics);
    expect(output.mode).toBe('repo');
    expect(output.repoName).toBe('testdev/spaghetti-engine');
    expect(output.causeOfDeath).toBeDefined();
    expect(output.stamp).toContain('ZERO TESTS');
    expect(output.autopsyFindings).toHaveLength(3);
    expect(output.receiptId).toContain('REPO-');
  });
});
