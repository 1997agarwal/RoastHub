import { toPng } from 'html-to-image';
import { RoastOutput } from '../types';

export const APP_URL = 'https://1997agarwal.github.io/RoastHub/';

// 1. Download Receipt Card as PNG
export async function downloadReceiptImage(
  element: HTMLElement,
  filename: string = 'roasthub-receipt.png'
): Promise<boolean> {
  try {
    // High DPI scaling (pixelRatio 2)
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#f8fafc', // Receipt bone paper background
      cacheBust: true,
      filter: (node) => {
        // Exclude buttons or action bars from the exported PNG
        if (node instanceof HTMLElement && node.dataset.excludeFromExport === 'true') {
          return false;
        }
        return true;
      },
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Failed to export receipt image via html-to-image:', error);
    return false;
  }
}

// 2. 1-Click "Tweet This Roast"
export function generateTwitterIntentUrl(roast: RoastOutput): string {
  let tweetText = '';

  if (roast.mode === 'pitch') {
    tweetText = `🔥 Just got my startup pitch roasted by ${roast.personaName} on RoastHub:\n\n"${roast.vcQuote.substring(0, 110)}..."\n\nVerdict: ${roast.stamp}\nFluff: ${roast.fluffScore}%\n\nGet roasted here:`;
  } else if (roast.mode === 'repo') {
    tweetText = `💀 My repo ${roast.repoName} just received an official autopsy on RoastHub:\n\nCause of Death: "${roast.causeOfDeath}"\nVerdict: ${roast.stamp}\n\nRoast your repo:`;
  } else if (roast.mode === 'stack') {
    tweetText = `🏗️ My tech stack for a ${roast.appTypeName} got diagnosed on RoastHub:\n\n"${roast.seniorArchitectDiagnosis.substring(0, 120)}..."\n\nOver-engineering: ${roast.overEngineeringScore}%\nEstimated Waste: $${roast.estimatedMonthlyCloudWasteUSD}/mo\n\nCheck yours:`;
  }

  const encodedText = encodeURIComponent(tweetText);
  const encodedUrl = encodeURIComponent(APP_URL);
  return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&via=1997agarwal`;
}

// 3. LinkedIn Share Intent
export function generateLinkedInIntentUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(APP_URL)}`;
}

// 4. Reddit Share Intent
export function generateRedditIntentUrl(roast: RoastOutput): string {
  let title = 'Just got roasted on RoastHub 🔥';
  if (roast.mode === 'pitch') {
    title = `VC Rejection Memo: ${roast.stamp} on my startup pitch`;
  } else if (roast.mode === 'repo') {
    title = `Repo Autopsy: ${roast.causeOfDeath} on ${roast.repoName}`;
  } else if (roast.mode === 'stack') {
    title = `Over-Engineering Diagnosis: ${roast.seniorArchitectDiagnosis}`;
  }
  return `https://reddit.com/submit?url=${encodeURIComponent(APP_URL)}&title=${encodeURIComponent(title)}`;
}

// 5. Copy Text Summaries
export function formatPlainTextRoast(roast: RoastOutput): string {
  const line = '==========================================';
  if (roast.mode === 'pitch') {
    return [
      line,
      '🔥 ROASTHUB THERMAL REJECTION MEMO',
      `ID: ${roast.receiptId} | ${roast.timestamp}`,
      line,
      `PITCH: "${roast.pitch}"`,
      `TARGET: ${roast.targetAudience}`,
      `EVALUATOR: ${roast.personaName}`,
      `FLUFF SCORE: ${roast.fluffScore}% (${roast.verdict})`,
      `STAMP: ${roast.stamp}`,
      '',
      '--- 3 BRUTAL TRUTHS ---',
      `1. ${roast.brutalTruths[0]}`,
      `2. ${roast.brutalTruths[1]}`,
      `3. ${roast.brutalTruths[2]}`,
      '',
      `HONEST TRANSLATION: ${roast.honestParody}`,
      `VC VERDICT: ${roast.vcQuote}`,
      line,
      `Roast yours at: ${APP_URL}`,
    ].join('\n');
  } else if (roast.mode === 'repo') {
    return [
      line,
      '💀 ROASTHUB REPO AUTOPSY CERTIFICATE',
      `ID: ${roast.receiptId} | ${roast.timestamp}`,
      line,
      `REPO: ${roast.repoName}`,
      `URL: ${roast.repoUrl}`,
      `CAUSE OF DEATH: ${roast.causeOfDeath}`,
      `STAMP: ${roast.stamp}`,
      `BUS FACTOR: ${roast.busFactorDescription}`,
      `TECHNICAL DEBT INDEX: ${roast.metrics.debtScore}/100`,
      '',
      '--- AUTOPSY FINDINGS ---',
      `1. ${roast.autopsyFindings[0]}`,
      `2. ${roast.autopsyFindings[1]}`,
      `3. ${roast.autopsyFindings[2]}`,
      '',
      `FORENSIC COMMIT EXAMPLES: ${roast.commitForensics.join(', ')}`,
      `DIAGNOSIS: ${roast.architectDiagnosis}`,
      line,
      `Roast yours at: ${APP_URL}`,
    ].join('\n');
  } else {
    return [
      line,
      '🏗️ ROASTHUB ARCHITECTURAL SINS RECEIPT',
      `ID: ${roast.receiptId} | ${roast.timestamp}`,
      line,
      `APP TYPE: ${roast.appTypeName}`,
      `TECH STACK: ${roast.selectedTech.join(', ')}`,
      `OVER-ENGINEERING SCORE: ${roast.overEngineeringScore}%`,
      `ESTIMATED CLOUD WASTE: $${roast.estimatedMonthlyCloudWasteUSD}/mo`,
      `STAMP: ${roast.stamp}`,
      '',
      '--- ARCHITECTURAL SINS ---',
      `1. ${roast.architecturalSins[0]}`,
      `2. ${roast.architecturalSins[1]}`,
      `3. ${roast.architecturalSins[2]}`,
      '',
      `DIAGNOSIS: ${roast.seniorArchitectDiagnosis}`,
      `SANE RECOMMENDED STACK: ${roast.recommendedSaneStack.join(' + ')}`,
      line,
      `Roast yours at: ${APP_URL}`,
    ].join('\n');
  }
}

export function formatMarkdownRoast(roast: RoastOutput): string {
  if (roast.mode === 'pitch') {
    return `### 🔥 RoastHub Rejection Memo: \`${roast.stamp}\`

> **"${roast.pitch}"**  
> *Target:* ${roast.targetAudience} | *Evaluated by:* ${roast.personaName}

- **Fluff Score:** ${roast.fluffScore}% (${roast.verdict})
- **Honest Translation:** ${roast.honestParody}

#### 3 Brutal Truths:
1. ${roast.brutalTruths[0]}
2. ${roast.brutalTruths[1]}
3. ${roast.brutalTruths[2]}

> 💬 *${roast.vcQuote}*

*Generated by [RoastHub](${APP_URL})*`;
  } else if (roast.mode === 'repo') {
    return `### 💀 RoastHub Repo Autopsy: [${roast.repoName}](${roast.repoUrl})

> **Stamp:** \`${roast.stamp}\`  
> **Cause of Death:** ${roast.causeOfDeath}

- **Technical Debt:** ${roast.metrics.debtScore}/100
- **Bus Factor:** ${roast.busFactorDescription}

#### Autopsy Findings:
1. ${roast.autopsyFindings[0]}
2. ${roast.autopsyFindings[1]}
3. ${roast.autopsyFindings[2]}

*Generated by [RoastHub](${APP_URL})*`;
  } else {
    return `### 🏗️ RoastHub Architectural Sins: ${roast.appTypeName}

> **Stamp:** \`${roast.stamp}\`  
> **Diagnosis:** ${roast.seniorArchitectDiagnosis}

- **Over-Engineering Score:** ${roast.overEngineeringScore}%
- **Estimated Cloud Waste:** \$${roast.estimatedMonthlyCloudWasteUSD}/mo
- **Stack:** \`${roast.selectedTech.join('`, `')}\`

#### Architectural Sins:
1. ${roast.architecturalSins[0]}
2. ${roast.architecturalSins[1]}
3. ${roast.architecturalSins[2]}

*Recommended Sane Alternative: ${roast.recommendedSaneStack.join(' + ')}*  
*Generated by [RoastHub](${APP_URL})*`;
  }
}
