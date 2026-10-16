import {
  VCPersona,
  VCPersonaInfo,
  AppType,
  AppTypeInfo,
  TechTag,
  PitchRoastInput,
  PitchRoastOutput,
  RepoMetrics,
  RepoRoastOutput,
  StackRoastInput,
  StackRoastOutput,
} from '../types';

// ==========================================
// 1. VC PERSONAS CATALOG
// ==========================================
export const VC_PERSONAS: Record<VCPersona, VCPersonaInfo> = {
  hype: {
    id: 'hype',
    name: 'The Hype-Beast Crypto/Agentic VC',
    avatar: '🧢',
    title: 'Managing Partner @ Web4 Capital',
    tagline: 'Obsessed with autonomous loops, tokens, and infinite imaginary TAMs.',
    focus: 'Demands autonomous agent swarms, decentralized state, and 1000x valuation multiples.',
  },
  yc: {
    id: 'yc',
    name: 'The Savage YC Partner',
    avatar: '👔',
    title: 'Group Partner @ Orange Incubator',
    tagline: 'Grills retention cohort curves, manual work, and zero revenue.',
    focus: 'Cuts through 10-slide decks in 3 seconds. Demands organic PMF and user obsession.',
  },
  ramen: {
    id: 'ramen',
    name: 'The Bootstrapped Ramen Dev',
    avatar: '🍜',
    title: 'Sole Founder @ $0 MRR Micro-Empire',
    tagline: 'Roasts spending money on wrappers, vanity metrics, and flashy landing pages.',
    focus: 'Uses SQLite, plain HTML, runs on a $5 Hetzner box, and despises VC burn rates.',
  },
  boomer: {
    id: 'boomer',
    name: 'The Corporate Boomer VP',
    avatar: '💼',
    title: 'EVP of Enterprise Transformation',
    tagline: 'Demands SOC2 Type II, SAP integration, and Oracle DB support for a todo app.',
    focus: 'Prints emails, runs 18-month procurement cycles, and loves 400-page RFP forms.',
  },
};

// ==========================================
// 2. APP TYPES CATALOG
// ==========================================
export const APP_TYPES: Record<AppType, AppTypeInfo> = {
  blog: {
    id: 'blog',
    name: 'Personal Blog / Portfolio',
    icon: '📝',
    description: 'Static text and images read by roughly 3 people (including your mom).',
    baseComplexity: 1,
  },
  todo: {
    id: 'todo',
    name: 'Todo List / Note-Taking App',
    icon: '✅',
    description: 'A list of strings stored in a database. Solved in 1974.',
    baseComplexity: 2,
  },
  admin: {
    id: 'admin',
    name: 'Internal Admin Dashboard',
    icon: '📊',
    description: 'CRUD tables and buttons used by 5 employees twice a week.',
    baseComplexity: 3,
  },
  saas: {
    id: 'saas',
    name: 'MVP B2B Micro-SaaS',
    icon: '🚀',
    description: 'A wrapper around Stripe + Auth + an LLM prompt charging $19/mo.',
    baseComplexity: 5,
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-Commerce Store',
    icon: '🛒',
    description: 'Product catalog, shopping cart, checkout, and inventory.',
    baseComplexity: 6,
  },
};

// ==========================================
// 3. TECH TAGS CATALOG
// ==========================================
export const TECH_TAGS: TechTag[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', complexityWeight: 2, monthlyCostUSD: 0, description: 'Standard component library' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', complexityWeight: 4, monthlyCostUSD: 20, description: 'Server components and hydration nightmares' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', complexityWeight: 2, monthlyCostUSD: 0, description: 'Clean reactive frontend' },
  { id: 'svelte', name: 'Svelte / SvelteKit', category: 'frontend', complexityWeight: 2, monthlyCostUSD: 0, description: 'Zero-runtime compiler' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', complexityWeight: 1, monthlyCostUSD: 0, description: 'Utility classes for CSS allergy sufferers' },
  { id: 'htmx', name: 'HTMX', category: 'frontend', complexityWeight: 1, monthlyCostUSD: 0, description: 'Simplicity savior or retro purist flex' },

  // Backend
  { id: 'nodejs', name: 'Node.js / Express', category: 'backend', complexityWeight: 2, monthlyCostUSD: 10, description: 'Event-loop async JavaScript' },
  { id: 'fastapi', name: 'Python (FastAPI)', category: 'backend', complexityWeight: 3, monthlyCostUSD: 15, description: 'Async Python with Pydantic types' },
  { id: 'go', name: 'Go (Golang)', category: 'backend', complexityWeight: 3, monthlyCostUSD: 10, description: 'Fast compilation and goroutines' },
  { id: 'rust', name: 'Rust', category: 'backend', complexityWeight: 6, monthlyCostUSD: 15, description: 'Fighting the borrow checker for 6 hours to return a string' },
  { id: 'rails', name: 'Ruby on Rails', category: 'backend', complexityWeight: 3, monthlyCostUSD: 20, description: 'DHH convention over configuration' },
  { id: 'spring', name: 'Java / Spring Boot', category: 'backend', complexityWeight: 7, monthlyCostUSD: 60, description: 'AbstractSingletonProxyFactoryBean enterprise pain' },

  // Database
  { id: 'sqlite', name: 'SQLite', category: 'database', complexityWeight: 1, monthlyCostUSD: 0, description: 'Zero-config single file database' },
  { id: 'postgres', name: 'PostgreSQL', category: 'database', complexityWeight: 3, monthlyCostUSD: 25, description: 'Reliable relational workhorse' },
  { id: 'mysql', name: 'MySQL / MariaDB', category: 'database', complexityWeight: 3, monthlyCostUSD: 20, description: 'Classic relational database' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', complexityWeight: 4, monthlyCostUSD: 30, description: 'Schema-free document chaos' },
  { id: 'redis', name: 'Redis', category: 'database', complexityWeight: 3, monthlyCostUSD: 25, description: 'In-memory caching and message broker' },
  { id: 'cassandra', name: 'Apache Cassandra', category: 'database', complexityWeight: 9, monthlyCostUSD: 350, description: 'Petabyte-scale distributed database for 5 users' },
  { id: 'dynamodb', name: 'AWS DynamoDB', category: 'database', complexityWeight: 5, monthlyCostUSD: 40, description: 'NoSQL with single-table design anxiety' },

  // Cloud & Infra
  { id: 'docker', name: 'Docker Containers', category: 'infra', complexityWeight: 2, monthlyCostUSD: 10, description: 'Containerized reproducible images' },
  { id: 'kubernetes', name: 'Kubernetes (K8s)', category: 'infra', complexityWeight: 9, monthlyCostUSD: 250, description: 'Managing pods, ingresses, and node pools to host a landing page' },
  { id: 'aws_lambda', name: 'AWS Lambda (Serverless)', category: 'infra', complexityWeight: 5, monthlyCostUSD: 35, description: 'Cold starts, timeout limits, and IAM role labyrinth' },
  { id: 'terraform', name: 'Terraform / IaC', category: 'infra', complexityWeight: 6, monthlyCostUSD: 15, description: 'Declarative state files locking production' },

  // Architecture & Messaging
  { id: 'kafka', name: 'Apache Kafka', category: 'architecture', complexityWeight: 9, monthlyCostUSD: 400, description: 'Event streaming cluster requiring 3 dedicated DevOps priests' },
  { id: 'rabbitmq', name: 'RabbitMQ', category: 'architecture', complexityWeight: 5, monthlyCostUSD: 50, description: 'AMQP queue with dead-letter exchange spirals' },
  { id: 'microservices', name: 'Microservices Architecture', category: 'architecture', complexityWeight: 8, monthlyCostUSD: 200, description: 'Distributed network failure disguised as modern design' },
  { id: 'graphql', name: 'GraphQL (Apollo / Federation)', category: 'architecture', complexityWeight: 5, monthlyCostUSD: 30, description: 'N+1 query problem generator and schema bloat' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'architecture', complexityWeight: 7, monthlyCostUSD: 180, description: 'JVM heap exhaustion machine for searching 40 rows' },
];

// ==========================================
// 4. BUZZWORD FLUFF DICTIONARY
// ==========================================
export const BUZZWORD_WEIGHTS: Record<string, number> = {
  // Heavy fluff (weight 4-5)
  'disrupt': 5,
  'revolutionize': 5,
  'revolutionary': 5,
  'seamless': 4,
  'flywheel': 5,
  'synergy': 5,
  'paradigm': 5,
  'ai-native': 5,
  'autonomous': 5,
  'quantum': 5,
  'decentralized': 5,
  'blockchain': 5,
  'game-changer': 5,
  'hyper-scale': 4,
  'next-generation': 4,
  'supercharged': 4,
  'supercharge': 4,
  'ecosystem': 4,
  'deep-tech': 4,
  'exponential': 4,
  'unprecedented': 4,
  'omnichannel': 5,
  'metaverse': 5,
  'web3': 5,
  'zero-trust': 4,
  'holistic': 4,
  'unhinged': 3,
  '10x': 4,
  '100x': 5,

  // Moderate buzzwords (weight 2-3)
  'frictionless': 3,
  'monetize': 3,
  'leverage': 3,
  'robust': 2,
  'scalable': 3,
  'transformative': 3,
  'empower': 3,
  'cutting-edge': 3,
  'bespoke': 3,
  'mission-critical': 3,
  'best-of-breed': 4,
  'turnkey': 3,
  'intelligent': 2,
  'smart': 2,
  'dynamic': 2,
  'innovative': 2,
  'reinvent': 3,
  'unlock': 3,
  'orchestrate': 3,
  'agentic': 4,
  'wrapper': 3,
  'tam': 4,
  'viral': 3,
  'uber for': 4,
  'tinder for': 4,
};

// ==========================================
// 5. HELPER: Calculate Buzzword Fluff
// ==========================================
export function calculateBuzzwordFluff(text: string): {
  score: number;
  detectedWords: string[];
  verdictTitle: string;
} {
  const normalized = text.toLowerCase();
  const words = normalized.split(/[^a-z0-9\-_]+/);
  const detectedWords: string[] = [];
  let totalWeight = 0;

  for (const [buzzword, weight] of Object.entries(BUZZWORD_WEIGHTS)) {
    if (normalized.includes(buzzword)) {
      if (!detectedWords.includes(buzzword)) {
        detectedWords.push(buzzword);
        totalWeight += weight;
      }
    }
  }

  const wordCount = Math.max(5, words.length);
  // Base formula: ratio of fluff weight relative to total words
  let rawScore = Math.round((totalWeight / (wordCount * 0.22)) * 100);
  
  // Extra bump if 3 or more buzzwords detected
  if (detectedWords.length >= 4) {
    rawScore = Math.max(rawScore, 75);
  } else if (detectedWords.length === 0) {
    rawScore = Math.min(rawScore, 20);
  }

  const score = Math.min(100, Math.max(12, rawScore));

  let verdictTitle = 'Sane & Grounded';
  if (score > 85) verdictTitle = 'Certified Silicon Valley Hallucination';
  else if (score > 65) verdictTitle = 'High-Altitude Fluff & Vapourware';
  else if (score > 45) verdictTitle = 'Noticeable Pitch Deck Inflation';
  else if (score > 25) verdictTitle = 'Mild Corporate Dialect';

  return { score, detectedWords, verdictTitle };
}

// ==========================================
// 6. PROCEDURAL COMEDY MATRICES
// ==========================================

export const PROCEDURAL_PITCH_ROASTS = {
  hype: {
    stamps: [
      '[HARD PASS: WHERE ARE THE AGENTS?]',
      '[NO TOKENOMICS = NO DEAL]',
      '[CALL US IN THE NEXT METAVERSE]',
      '[VALUATION = PURE VAPOUR]',
      '[ZERO RECURSIVE FLYWHEEL]',
    ],
    quotes: [
      '"If this doesnt have an autonomous agentic swarm liquidating tokens on a Solana L3 while I sleep, what are we even doing here bro?"',
      '"Bro, your deck has zero mention of decentralized compute arbitrage. This is so 2023 web2 it hurts."',
      '"I asked my Claude 3.7 agent to evaluate your TAM and it literally threw an out-of-memory exception from laughing."',
      '"You are pitching human-in-the-loop workflows in 2026? What is this, the Industrial Revolution?"',
      '"Nice idea, but can you fractionalize it onto an ERC-721 bonding curve with unhinged meme potential?"',
    ],
    truths: [
      'Your TAM is an extrapolation based on every carbon-based organism on Earth paying you $20/month.',
      'Your proprietary AI secret sauce is an 800-token system prompt pasted into an OpenAI Playground tab.',
      'The moment Groq or Meta drops another open-weights model, your entire business model becomes a 1-line pip package.',
      'You are building a wrapper around a wrapper that wraps another wrapper created by three teenagers in Bucharest.',
      'Your viral user growth loop relies on people retweeting a product hunt link they have never actually opened.',
      'You have spent more on your .ai domain name and cursor subscriptions than you have received in actual customer revenue.',
    ],
  },
  yc: {
    stamps: [
      '[HARD PASS: TALK TO USERS]',
      '[CHURN RATE: 99.8%]',
      '[UNSCALABLE MANUAL WORK]',
      '[ZERO ORGANIC RETENTION]',
      '[REJECTED BY COMMITTEE]',
    ],
    quotes: [
      '"Have you actually spoken to a human customer, or have you just been admiring your own Figma mockups for 6 months?"',
      '"Your cohort retention curve looks like an Olympic ski jump straight into an abyss."',
      '"You are doing concierge manual consulting disguised as a multi-tenant B2B SaaS platform."',
      '"Every customer who signs up uses your tool once, goes \'huh\', and closes the tab forever."',
      '"You are trying to solve a lukewarm inconvenience instead of a hair-on-fire burning problem."',
    ],
    truths: [
      'Your net revenue retention is negative because your users cancel the moment the free trial card authorization hits.',
      'You are building a solution for a problem that can be solved with a free Google Sheet and a 5-minute calendar reminder.',
      'Your sales pipeline is exclusively composed of your university roommates and 2 LinkedIn connections who felt bad for you.',
      'Your pricing page has an Enterprise button labeled Contact Sales because you literally have no idea what to charge.',
      'You have spent 40 hours tweaking your dark mode gradient background and 0 hours asking why nobody will pay $5 for it.',
      'Your customer acquisition cost is $420 to acquire a user with a lifetime value of $14.50.',
    ],
  },
  ramen: {
    stamps: [
      '[OVER-SPENT & UNDER-EARNED]',
      '[THIN OPENAI WRAPPER]',
      '[AWS BILL > REVENUE]',
      '[STOP BUYING .AI DOMAINS]',
      '[CERTIFIED INDIE DELUSION]',
    ],
    quotes: [
      '"You are paying $400/month for Datadog and Supabase Pro while your monthly Stripe payout is $14.20 before fees."',
      '"Bro, this could run on a $4 Hetzner VPS with SQLite and static HTML. Why do you have 18 microservices?"',
      '"You bought a mechanical keyboard, a standing desk, and 4 premium fonts before getting your first paying customer."',
      '"Your tech stack costs more per minute than your entire annual target revenue from your 2 beta testers."',
      '"Quit optimizing your vector embeddings and go collect twenty bucks in cash from somebody who actually needs this."',
    ],
    truths: [
      'Your hosting bills are the only recurring revenue that is growing exponentially right now.',
      'You are running an OpenAI API reseller arbitrage business that will be eliminated by the next ChatGPT iOS update.',
      'You call yourself a Serial Founder on X, which is Latin for I have abandoned 11 side projects on page 2 of Hacker News.',
      'Your landing page features 5 customer testimonials written by your alt accounts with Unsplash profile photos.',
      'You built a complex multi-tenant billing architecture before validating whether anyone even wanted the single-tenant version.',
      'You are one credit card decline away from your entire AWS infrastructure turning into a 404 page.',
    ],
  },
  boomer: {
    stamps: [
      '[HARD PASS: NOT SOC2 COMPLIANT]',
      '[SAP INTEGRATION FAILED]',
      '[WHERE IS THE ON-PREM ORACLE?]',
      '[PROCUREMENT CYCLE: 24 MONTHS]',
      '[LEGAL INDEMNIFICATION DENIED]',
    ],
    quotes: [
      '"Does this integrate with our legacy AS/400 mainframe and SAP R/3 inventory system from 1998? No? Then we cannot proceed."',
      '"I printed out your pitch deck and sent it via inter-office mail to our compliance committee. They will respond in Q3 next year."',
      '"Where is your 400-page ISO-27001 disaster recovery manual and dedicated account manager based in Omaha?"',
      '"Our legal department requires a $50 million indemnification bond before we can install your browser extension."',
      '"We don\'t use the cloud here. Can you deliver this software on 14 encrypted DVD-ROMs with a physical dongle?"',
    ],
    truths: [
      'Your SaaS startup will burn through all its seed capital waiting for a single Fortune 500 procurement committee meeting.',
      'Your user interface looks too modern for enterprise IT directors who still prefer beige Windows 95 dialog boxes.',
      'The moment an enterprise security officer asks for your FedRAMP certification, your entire deal pipeline vanishes into thin air.',
      'You have no audit logs, no LDAP support, and no single-sign-on: you are completely invisible to enterprise buyers.',
      'Their enterprise procurement onboarding paperwork alone has more pages than your entire application source code.',
      'They will spend $200,000 hiring an external consulting firm to analyze whether they should spend $1,200 on your tool.',
    ],
  },
};

export const PARODY_TRANSLATIONS: Record<string, string> = {
  ai: 'You pasted an API key from OpenAI into a Next.js template and called yourself a DeepTech pioneer.',
  crypto: 'A slow, expensive SQL database where every INSERT query costs $14 in gas fees.',
  uber: 'You do manual gig work for below minimum wage with an iPhone app between you and bankruptcy.',
  tinder: 'A swipe interface where lonely developers match with bot accounts trying to sell them crypto tokens.',
  productivity: 'A 14th todo list app that users download to procrastinate on doing their actual work.',
  automation: 'A fragile Zapier webhook chain that breaks every time Slack updates their API headers.',
  social: 'An empty feed where your 3 college friends reluctantly post once a month to support you.',
  saas: 'A fancy form with Stripe checkout that exists primarily to justify having a Founders Slack channel.',
};

// ==========================================
// 7. PITCH ROASTER ENGINE
// ==========================================
export function generatePitchRoast(input: PitchRoastInput): PitchRoastOutput {
  const personaData = PROCEDURAL_PITCH_ROASTS[input.persona];
  const personaInfo = VC_PERSONAS[input.persona];
  const fluffAnalysis = calculateBuzzwordFluff(`${input.pitch} ${input.targetAudience}`);

  // Select 3 distinct brutal truths randomly or deterministically
  const shuffledTruths = [...personaData.truths].sort(() => 0.5 - Math.random());
  const selectedTruths: [string, string, string] = [
    shuffledTruths[0],
    shuffledTruths[1],
    shuffledTruths[2],
  ];

  // Pick random quote & stamp
  const vcQuote = personaData.quotes[Math.floor(Math.random() * personaData.quotes.length)];
  const stamp = personaData.stamps[Math.floor(Math.random() * personaData.stamps.length)];

  // Generate honest parody translation based on keywords
  const pitchLower = `${input.pitch} ${input.targetAudience}`.toLowerCase();
  let honestParody = 'You built an elaborate digital mouse trap to catch imaginary mice in an empty room.';
  
  for (const [key, parody] of Object.entries(PARODY_TRANSLATIONS)) {
    if (pitchLower.includes(key)) {
      honestParody = parody;
      break;
    }
  }

  const receiptId = `PITCH-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return {
    mode: 'pitch',
    pitch: input.pitch,
    targetAudience: input.targetAudience,
    persona: input.persona,
    personaName: personaInfo.name,
    fluffScore: fluffAnalysis.score,
    fluffWordsDetected: fluffAnalysis.detectedWords,
    verdict: fluffAnalysis.verdictTitle,
    stamp,
    brutalTruths: selectedTruths,
    honestParody,
    vcQuote,
    timestamp,
    receiptId,
  };
}

// ==========================================
// 8. STACK ROASTER ENGINE
// ==========================================
export function generateStackRoast(input: StackRoastInput): StackRoastOutput {
  const appInfo = APP_TYPES[input.appType];
  const selectedTechTags = TECH_TAGS.filter((t) => input.selectedTech.includes(t.id));

  // Compute total complexity weight
  const totalComplexity = selectedTechTags.reduce((sum, t) => sum + t.complexityWeight, 0);
  const totalMonthlyCost = selectedTechTags.reduce((sum, t) => sum + t.monthlyCostUSD, 0);

  // Mismatch calculation: ratio of tech complexity to app need
  const appBase = Math.max(1, appInfo.baseComplexity);
  const baselineAllowed = appBase * 3.5;
  let overEngineeringScore: number;
  if (totalComplexity <= baselineAllowed) {
    overEngineeringScore = Math.round(10 + (totalComplexity / baselineAllowed) * 25);
  } else {
    const excess = totalComplexity - baselineAllowed;
    overEngineeringScore = Math.min(100, Math.round(35 + (excess / 12) * 65));
  }

  // Calculate monthly waste: If score is high, almost all cost is pure waste!
  const wasteMultiplier = Math.max(0.15, (overEngineeringScore - 20) / 80);
  const estimatedMonthlyCloudWasteUSD = Math.round(totalMonthlyCost * wasteMultiplier);

  // Senior Architect Diagnoses
  const diagnoses = [
    `You built an intergalactic lunar lander just to fetch a carton of milk from the corner store.`,
    `Your architecture diagram has more distributed failure points than the entire global air traffic control network.`,
    `You are paying cloud providers $${estimatedMonthlyCloudWasteUSD}/mo to serve static text to 12 monthly active visitors.`,
    `Resume-Driven Development in its purest form: You are solving high-frequency trading problems for an internal todo list.`,
    `A single SQLite file on a $4 VPS could out-perform this entire distributed monstrosity by a factor of 40x.`,
    `You spend 80% of your engineering sprint debugging network timeouts between microservices that should have been a single function call.`,
  ];
  const seniorArchitectDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];

  // Stamps
  let stamp = '[OVER-ENGINEERED: CERTIFIED RDD]';
  if (overEngineeringScore >= 80) stamp = '[LUNAR LANDER FOR A TODO LIST]';
  else if (overEngineeringScore >= 60) stamp = '[AWS BILL ACCELERATOR]';
  else if (overEngineeringScore >= 40) stamp = '[RESUME-DRIVEN ARCHITECTURE]';
  else stamp = '[SUSPICIOUSLY SANE STACK]';

  // Specific Sins
  const sinsPool: string[] = [];
  if (input.selectedTech.includes('kubernetes')) {
    sinsPool.push('Deploying a Kubernetes cluster and configuring Helm charts for an app with 3 daily users.');
  }
  if (input.selectedTech.includes('kafka')) {
    sinsPool.push('Using Apache Kafka event streaming to deliver messages that could have been handled with an in-memory array.');
  }
  if (input.selectedTech.includes('microservices')) {
    sinsPool.push('Splitting a 500-line codebase into 7 distinct microservices with their own CI/CD pipelines.');
  }
  if (input.selectedTech.includes('rust') && (input.appType === 'blog' || input.appType === 'todo')) {
    sinsPool.push('Writing a personal blog in Rust so you can manually manage memory buffers for markdown strings.');
  }
  if (input.selectedTech.includes('cassandra')) {
    sinsPool.push('Using Cassandra because you anticipate having 800 petabytes of user data by Thursday.');
  }
  if (input.selectedTech.includes('graphql')) {
    sinsPool.push('Introducing GraphQL schema federation and Apollo Server to fetch 4 rows of static user data.');
  }
  if (input.selectedTech.includes('aws_lambda')) {
    sinsPool.push('Suffering from 2.8-second cold starts on AWS Lambda while your users stare at a blank spinner.');
  }
  if (sinsPool.length < 3) {
    sinsPool.push('Spending 6 days configuring Docker multi-stage builds instead of talking to a single customer.');
    sinsPool.push('Adding Redis caching layers before you have enough traffic to warm up a single cache key.');
    sinsPool.push('Creating 4 distinct environments (dev, test, staging, pre-prod) for an app nobody has ever seen.');
  }

  const architecturalSins: [string, string, string] = [
    sinsPool[0],
    sinsPool[1],
    sinsPool[2],
  ];

  // Sane stack recommendation based on app type
  let recommendedSaneStack: string[] = [];
  if (input.appType === 'blog') {
    recommendedSaneStack = ['Static HTML / Astro / Hugo', 'Tailwind CSS', 'GitHub Pages or Cloudflare ($0/mo)'];
  } else if (input.appType === 'todo') {
    recommendedSaneStack = ['React / Svelte', 'SQLite / LocalStorage', 'Single Node VPS ($4/mo)'];
  } else if (input.appType === 'admin') {
    recommendedSaneStack = ['Next.js / Vite', 'PostgreSQL', 'Tailwind', 'Single Container'];
  } else if (input.appType === 'saas') {
    recommendedSaneStack = ['Next.js or FastAPI', 'PostgreSQL', 'Redis', 'Stripe', 'Docker on Fly.io'];
  } else {
    recommendedSaneStack = ['Next.js', 'PostgreSQL', 'Redis', 'Stripe', 'Shopify / Medusa'];
  }

  const receiptId = `STACK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return {
    mode: 'stack',
    appType: input.appType,
    appTypeName: appInfo.name,
    selectedTech: selectedTechTags.map((t) => t.name),
    overEngineeringScore,
    estimatedMonthlyCloudWasteUSD,
    seniorArchitectDiagnosis,
    stamp,
    architecturalSins,
    recommendedSaneStack,
    timestamp,
    receiptId,
  };
}

// ==========================================
// 9. REPO ROASTER FORENSICS ENGINE
// ==========================================
export function generateRepoRoast(metrics: RepoMetrics): RepoRoastOutput {
  // Autopsy Causes of Death
  const causesOfDeath = [
    'Fatal overdose of console.log statements left in production code.',
    'Terminal asphyxiation by 4,200 unreviewed Dependabot security alerts.',
    'Sudden cardiac arrest following an emergency git push --force on main branch.',
    'Starvation caused by an 18-month-old open pull request titled "quick fix pls merge".',
    'Catastrophic merge conflict duel that destroyed the last living copy of the master branch.',
    'Comatose state induced by 450MB of node_modules checked directly into version control.',
    'Complete abandonment: Author left for a Buddhist monastery to escape Webpack configs.',
  ];

  // Bus Factor Judgments
  let busFactorDescription = 'Bus Factor: Fragile Duo. Two contributors on the verge of a merge conflict homicide.';
  if (metrics.stars > 10000) {
    busFactorDescription = 'Bus Factor: Bureaucratic Titan. 300 committee members arguing over PR title conventions.';
  } else if (metrics.openIssues > 200) {
    busFactorDescription = 'Bus Factor: Zombie Graveyard. 1 maintainer answering issues once every leap year.';
  } else if (metrics.lazyCommitRatio > 35) {
    busFactorDescription = 'Bus Factor: Lone Midnight Hacker. One guy named Dave who commits directly to main at 3:15 AM.';
  }

  // Stamp
  let stamp = '[ABANDONWARE: ENTER AT OWN RISK]';
  if (!metrics.hasTests) {
    stamp = '[ZERO TESTS: CERTIFIED HAZARD]';
  } else if (metrics.debtScore >= 75) {
    stamp = '[TECHNICAL BANKRUPTCY DECLARED]';
  } else if (metrics.lazyCommitRatio > 40) {
    stamp = '[FATAL COMMIT HYGIENE]';
  } else {
    stamp = '[CODE SMELL LEVEL 5]';
  }

  // Autopsy findings
  const findings: [string, string, string] = [
    metrics.hasTests
      ? 'Tests exist, but 40% are commented out with // TODO: fix later'
      : 'Zero automated tests detected: Users in production are your QA engineers.',
    metrics.openIssues > 20
      ? `${metrics.openIssues} open issues fermenting like fine vinegar in the GitHub repository.`
      : 'Low open issue count because nobody has discovered this repository yet.',
    metrics.lazyCommitsFound.length > 0
      ? `Commit history features forensic gems: "${metrics.lazyCommitsFound.slice(0, 3).join('", "')}".`
      : 'Commit messages written with extreme corporate neutrality to disguise broken features.',
  ];

  const diagnosis = `This codebase represents a delicate house of cards held together by prayers, npm lockfile illusions, and sheer developer stubbornness.`;

  const receiptId = `REPO-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return {
    mode: 'repo',
    repoName: `${metrics.owner}/${metrics.repo}`,
    repoUrl: `https://github.com/${metrics.owner}/${metrics.repo}`,
    metrics,
    causeOfDeath: causesOfDeath[Math.floor(Math.random() * causesOfDeath.length)],
    busFactorDescription,
    stamp,
    autopsyFindings: findings,
    commitForensics: metrics.lazyCommitsFound.length > 0 ? metrics.lazyCommitsFound : ['wip', 'fix pls', 'oops'],
    architectDiagnosis: diagnosis,
    timestamp,
    receiptId,
  };
}
