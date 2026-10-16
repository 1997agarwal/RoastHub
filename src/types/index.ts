export type RoastMode = 'pitch' | 'repo' | 'stack';

export type VCPersona = 'hype' | 'yc' | 'ramen' | 'boomer';

export interface VCPersonaInfo {
  id: VCPersona;
  name: string;
  avatar: string;
  title: string;
  tagline: string;
  focus: string;
}

export type AppType = 'blog' | 'todo' | 'saas' | 'ecommerce' | 'admin';

export interface AppTypeInfo {
  id: AppType;
  name: string;
  icon: string;
  description: string;
  baseComplexity: number;
}

export interface TechTag {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'infra' | 'architecture';
  complexityWeight: number; // 1 to 10
  monthlyCostUSD: number;   // estimated monthly cost baseline
  icon?: string;
  description: string;
}

export interface PitchRoastInput {
  pitch: string;
  targetAudience: string;
  persona: VCPersona;
}

export interface PitchRoastOutput {
  mode: 'pitch';
  pitch: string;
  targetAudience: string;
  persona: VCPersona;
  personaName: string;
  fluffScore: number; // 0 - 100
  fluffWordsDetected: string[];
  verdict: string;
  stamp: string;
  brutalTruths: [string, string, string];
  honestParody: string;
  vcQuote: string;
  timestamp: string;
  receiptId: string;
}

export interface RepoRoastInput {
  repoUrl: string;
}

export interface RepoMetrics {
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  language: string;
  description: string;
  owner: string;
  repo: string;
  busFactor: string;
  lazyCommitRatio: number;
  lazyCommitsFound: string[];
  zombieIssueRatio: number;
  hasTests: boolean;
  debtScore: number; // 0 - 100
}

export interface RepoRoastOutput {
  mode: 'repo';
  repoName: string;
  repoUrl: string;
  metrics: RepoMetrics;
  causeOfDeath: string;
  busFactorDescription: string;
  stamp: string;
  autopsyFindings: [string, string, string];
  commitForensics: string[];
  architectDiagnosis: string;
  timestamp: string;
  receiptId: string;
}

export interface StackRoastInput {
  appType: AppType;
  selectedTech: string[]; // tag IDs
}

export interface StackRoastOutput {
  mode: 'stack';
  appType: AppType;
  appTypeName: string;
  selectedTech: string[];
  overEngineeringScore: number; // 0 - 100
  estimatedMonthlyCloudWasteUSD: number;
  seniorArchitectDiagnosis: string;
  stamp: string;
  architecturalSins: [string, string, string];
  recommendedSaneStack: string[];
  timestamp: string;
  receiptId: string;
}

export type RoastOutput = PitchRoastOutput | RepoRoastOutput | StackRoastOutput;

export type AIProvider = 'gemini' | 'groq' | 'openai';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  enabled: boolean;
  model?: string;
}
