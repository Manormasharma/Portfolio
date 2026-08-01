import { Env, GenerateArgs, ProviderAdapter } from '../types';

const geminiAdapter: ProviderAdapter = {
  isConfigured(env: Env) {
    return Boolean(env.GEMINI_API_KEY);
  },

  async generate({ systemPrompt, history, message }: GenerateArgs, env: Env) {
    const model = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [
          ...history.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.text }],
          })),
          { role: 'user', parts: [{ text: message }] },
        ],
        generationConfig: { maxOutputTokens: 512 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json() as {
      candidates: { content: { parts: { text: string }[] } }[];
    };
    return data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
  },
};

export default geminiAdapter;
