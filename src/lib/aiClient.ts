import { AIConfig, PitchRoastInput, PitchRoastOutput } from '../types';
import { VC_PERSONAS, calculateBuzzwordFluff } from './roastEngine';

const STORAGE_KEY = 'roasthub_ai_config';

export function getAIConfig(): AIConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // ignore
  }
  return {
    provider: 'gemini',
    apiKey: '',
    enabled: false,
  };
}

export function saveAIConfig(config: AIConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    // ignore
  }
}

interface AIRoastResponse {
  stamp: string;
  brutalTruths: [string, string, string];
  honestParody: string;
  vcQuote: string;
}

export async function generateAIPitchRoast(
  input: PitchRoastInput,
  config: AIConfig
): Promise<PitchRoastOutput> {
  const persona = VC_PERSONAS[input.persona];
  const fluff = calculateBuzzwordFluff(`${input.pitch} ${input.targetAudience}`);

  const prompt = `You are ${persona.name} (${persona.title}). Your personality: ${persona.focus}.
The user is pitching their startup:
Pitch/Idea: "${input.pitch}"
Target Audience: "${input.targetAudience}"

Deliver an unapologetic, hilarious, razor-sharp technical and business roast of this startup.
You MUST output ONLY a valid JSON object matching this exact schema:
{
  "stamp": "[A SHORT 2-4 WORD ALL-CAPS BRUTAL VERDICT STAMP]",
  "vcQuote": "A 1-2 sentence savage one-liner quote directly in your persona voice insulting the pitch",
  "honestParody": "A 1-sentence translation of what this startup actually does in reality (e.g. 'Uber for dogs' -> 'You walk strangers labradors for $8/hr')",
  "brutalTruths": [
    "Brutal truth 1 explaining why their TAM or product is delusional",
    "Brutal truth 2 attacking unit economics, churn, or execution",
    "Brutal truth 3 attacking technical over-simplification or lack of moats"
  ]
}
Do NOT include markdown formatting or backticks around the JSON.`;

  let responseData: AIRoastResponse | null = null;

  if (config.provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.apiKey.trim()}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.85,
        },
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Gemini API error (${res.status}): ${errBody.substring(0, 150)}`);
    }

    const json = await res.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawText) {
      responseData = JSON.parse(rawText);
    }
  } else if (config.provider === 'groq') {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.85,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Groq API error (${res.status}): ${errBody.substring(0, 150)}`);
    }

    const json = await res.json();
    const rawContent = json.choices?.[0]?.message?.content;
    if (rawContent) {
      responseData = JSON.parse(rawContent);
    }
  } else if (config.provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.85,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`OpenAI API error (${res.status}): ${errBody.substring(0, 150)}`);
    }

    const json = await res.json();
    const rawContent = json.choices?.[0]?.message?.content;
    if (rawContent) {
      responseData = JSON.parse(rawContent);
    }
  }

  if (!responseData || !responseData.brutalTruths || responseData.brutalTruths.length < 3) {
    throw new Error('AI returned an invalid response structure');
  }

  const receiptId = `AI-PITCH-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return {
    mode: 'pitch',
    pitch: input.pitch,
    targetAudience: input.targetAudience,
    persona: input.persona,
    personaName: `${persona.name} (AI Turbo)`,
    fluffScore: fluff.score,
    fluffWordsDetected: fluff.detectedWords,
    verdict: fluff.verdictTitle,
    stamp: responseData.stamp.startsWith('[') ? responseData.stamp : `[${responseData.stamp}]`,
    brutalTruths: [
      responseData.brutalTruths[0],
      responseData.brutalTruths[1],
      responseData.brutalTruths[2],
    ],
    honestParody: responseData.honestParody,
    vcQuote: responseData.vcQuote,
    timestamp,
    receiptId,
  };
}
