import { RepoMetrics } from '../types';

export function parseGitHubUrl(input: string): { owner: string; repo: string } | null {
  if (!input) return null;
  const trimmed = input.trim();

  // Pattern 1: https://github.com/owner/repo or http://...
  const urlMatch = trimmed.match(/github\.com\/([a-zA-Z0-9_\-\.]+)\/([a-zA-Z0-9_\-\.]+)/);
  if (urlMatch) {
    return {
      owner: urlMatch[1],
      repo: urlMatch[2].replace(/\.git$/, ''),
    };
  }

  // Pattern 2: owner/repo
  const slashMatch = trimmed.match(/^([a-zA-Z0-9_\-\.]+)\/([a-zA-Z0-9_\-\.]+)$/);
  if (slashMatch) {
    return {
      owner: slashMatch[1],
      repo: slashMatch[2].replace(/\.git$/, ''),
    };
  }

  return null;
}

const LAZY_COMMIT_PATTERNS = [
  /\bwip\b/i,
  /\bfix\b/i,
  /\bfixes\b/i,
  /\bpls work\b/i,
  /\basdf\b/i,
  /\bfinal\b/i,
  /\bfinal v2\b/i,
  /\bquick fix\b/i,
  /\boops\b/i,
  /\btest\b/i,
  /\bcleanup\b/i,
  /\btypo\b/i,
  /\brevert\b/i,
  /\bshit\b/i,
  /\btemp\b/i,
  /\blol\b/i,
  /\bupdate\b/i,
];

export async function fetchRepoMetrics(owner: string, repo: string): Promise<RepoMetrics> {
  try {
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (repoRes.ok) {
      const repoData = await repoRes.json();

      // Fetch recent commits for forensic inspection
      let lazyCommitsFound: string[] = [];
      let lazyCommitCount = 0;
      let totalCommitsSampled = 0;

      try {
        const commitsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=30`, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });

        if (commitsRes.ok) {
          const commitsData = await commitsRes.json();
          if (Array.isArray(commitsData)) {
            totalCommitsSampled = commitsData.length;
            for (const c of commitsData) {
              const msg = c.commit?.message || '';
              const isLazy = LAZY_COMMIT_PATTERNS.some((p) => p.test(msg));
              if (isLazy) {
                lazyCommitCount++;
                const shortMsg = msg.split('\n')[0].trim().substring(0, 40);
                if (!lazyCommitsFound.includes(shortMsg)) {
                  lazyCommitsFound.push(shortMsg);
                }
              }
            }
          }
        }
      } catch (err) {
        // Silently continue if commit fetch fails (rate limit)
      }

      const stars = repoData.stargazers_count ?? 12;
      const forks = repoData.forks_count ?? 2;
      const openIssues = repoData.open_issues_count ?? 5;
      const watchers = repoData.subscribers_count ?? stars;
      const language = repoData.language || 'JavaScript';
      const description = repoData.description || 'No description provided (developer was too exhausted)';

      const lazyCommitRatio = totalCommitsSampled > 0
        ? Math.round((lazyCommitCount / totalCommitsSampled) * 100)
        : 35;

      const zombieIssueRatio = stars > 0 ? Math.min(100, Math.round((openIssues / (stars * 0.1 + 1)) * 100)) : 45;

      // Detect tests by inspecting topics or description or repo flags
      const topics = (repoData.topics || []).map((t: string) => t.toLowerCase());
      const hasTests = topics.some((t: string) => t.includes('test') || t.includes('ci')) || stars > 500;

      // Debt calculation: formula based on issues, lazy commits, and stars
      let debtScore = Math.min(98, Math.max(15, Math.round(lazyCommitRatio * 0.5 + (hasTests ? 10 : 35) + (openIssues > 50 ? 25 : 10))));

      let busFactor = 'Fragile Duo (1-2 developers holding the fort)';
      if (stars > 5000) busFactor = 'Enterprise Committee (High bus resilience, slow movement)';
      else if (lazyCommitRatio > 50) busFactor = 'Dave at 3 AM (1 sole developer)';

      return {
        stars,
        forks,
        openIssues,
        watchers,
        language,
        description,
        owner,
        repo,
        busFactor,
        lazyCommitRatio,
        lazyCommitsFound: lazyCommitsFound.length > 0 ? lazyCommitsFound.slice(0, 5) : ['wip: fixes', 'asdf', 'one last try'],
        zombieIssueRatio,
        hasTests,
        debtScore,
      };
    }
  } catch (error) {
    // Fall through to mock generator
  }

  // Fallback procedural mock generator for rate limits / offline / private repos
  return generateProceduralMockMetrics(owner, repo);
}

export function generateProceduralMockMetrics(owner: string, repo: string): RepoMetrics {
  // Deterministic seed based on string hash
  const hash = (owner + repo).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const stars = (hash * 37) % 850 + 15;
  const forks = Math.round(stars * 0.18);
  const openIssues = (hash * 13) % 45 + 3;
  const watchers = Math.round(stars * 0.4);
  const languages = ['TypeScript', 'Python', 'Rust', 'JavaScript', 'Go', 'PHP'];
  const language = languages[hash % languages.length];

  const sampleLazyCommits = [
    'fix: pls work now',
    'wip: breaking changes for testing',
    'asdf remove console log',
    'quick fix typo in previous hotfix',
    'final commit v2 (hopefully)',
    'revert previous commit because production died',
  ];

  const lazyCommitsFound = [
    sampleLazyCommits[hash % sampleLazyCommits.length],
    sampleLazyCommits[(hash + 2) % sampleLazyCommits.length],
    sampleLazyCommits[(hash + 4) % sampleLazyCommits.length],
  ];

  const lazyCommitRatio = 25 + (hash % 45);
  const hasTests = hash % 3 !== 0;
  const debtScore = 35 + (hash % 55);

  return {
    stars,
    forks,
    openIssues,
    watchers,
    language,
    description: `A ${language}-based repository by ${owner} engineered with ambitious intentions and mysterious test coverage.`,
    owner,
    repo,
    busFactor: hash % 2 === 0 ? 'Lone Midnight Hacker' : 'Fragile Duo (1-2 maintainers)',
    lazyCommitRatio,
    lazyCommitsFound,
    zombieIssueRatio: 30 + (hash % 50),
    hasTests,
    debtScore,
  };
}
