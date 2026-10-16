# CLAUDE.md — RoastHub Developer Guide 🔥

## Commands
- **Install dependencies:** `npm install`
- **Run dev server:** `npm run dev` (Port 5174)
- **Run test suite:** `npm test` (Vitest)
- **Run typecheck:** `npm run typecheck` (`tsc --noEmit`)
- **Build production bundle:** `npm run build`
- **Preview production build:** `npm run preview`

## Architecture & Code Structure
- **`src/lib/`**:
  - `roastEngine.ts`: Core procedural matrix (300+ roasts across pitch, repo, stack engines), buzzword dictionaries, heuristics.
  - `audioEngine.ts`: Procedural Web Audio API synthesizer (flame whoosh, typewriter clatter, receipt rip, stamp thud, mute toggle).
  - `aiClient.ts`: Direct client-side BYOK inference for Gemini / Groq / OpenAI with JSON schema fallback.
  - `githubAnalyzer.ts`: Public GitHub API parser with rate-limit resilient mock fallbacks.
  - `receiptExporter.ts`: High-res receipt card image generator & clipboard handlers.
- **`src/components/`**:
  - `PitchRoast.tsx`: Pitch & startup idea roaster with VC persona selector.
  - `RepoRoast.tsx`: GitHub repo forensics & technical debt autopsy.
  - `StackRoast.tsx`: Multi-select tech tag over-engineering calculator.
  - `ThermalReceipt.tsx`: Crumpled jagged-edge receipt with barcode, stamp, and export actions.
  - `AITurboModal.tsx`: BYOK API key configuration modal.
  - `Header.tsx` & `Footer.tsx`: Branding, sound toggle, GitHub star links.
  - `EmberParticles.tsx`: Ambient floating ember canvas animation.
- **`tests/`**:
  - Vitest test suite testing procedural engines, buzzword math, over-engineering metrics, and GitHub API heuristics.

## Code Style & Standards
- **Zero Backend**: All computation is 100% client-side for GitHub Pages \$0/mo hosting.
- **Type Safety**: Explicit TypeScript interfaces for all roast input/output schemas.
- **Aesthetic**: Deep charcoal palette (`#0a0a0c`), Neon Flame Orange (`#ff5500`), Electric Amber (`#ffaa00`), Bone White (`#f8fafc`).
- **Constitutional Parity**: Follow the guidelines established in `AGENTS.md`.
