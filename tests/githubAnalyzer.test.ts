import { describe, it, expect } from 'vitest';
import { parseGitHubUrl, generateProceduralMockMetrics } from '../src/lib/githubAnalyzer';

describe('githubAnalyzer - URL Parsing', () => {
  it('correctly parses full GitHub HTTPS URLs', () => {
    const result = parseGitHubUrl('https://github.com/facebook/react');
    expect(result).toEqual({ owner: 'facebook', repo: 'react' });
  });

  it('correctly parses URLs with trailing slashes and .git extensions', () => {
    const result = parseGitHubUrl('https://github.com/vercel/next.js.git/');
    expect(result).toEqual({ owner: 'vercel', repo: 'next.js' });
  });

  it('correctly parses short owner/repo format', () => {
    const result = parseGitHubUrl('torvalds/linux');
    expect(result).toEqual({ owner: 'torvalds', repo: 'linux' });
  });

  it('returns null for completely invalid inputs', () => {
    expect(parseGitHubUrl('')).toBeNull();
    expect(parseGitHubUrl('not-a-repo')).toBeNull();
    expect(parseGitHubUrl('https://google.com')).toBeNull();
  });
});

describe('githubAnalyzer - Procedural Mock Generator', () => {
  it('deterministically generates realistic metrics when offline or rate-limited', () => {
    const metrics1 = generateProceduralMockMetrics('facebook', 'react');
    const metrics2 = generateProceduralMockMetrics('facebook', 'react');

    expect(metrics1.owner).toBe('facebook');
    expect(metrics1.repo).toBe('react');
    expect(metrics1.stars).toBe(metrics2.stars);
    expect(metrics1.debtScore).toBe(metrics2.debtScore);
    expect(metrics1.lazyCommitsFound.length).toBeGreaterThan(0);
  });
});
