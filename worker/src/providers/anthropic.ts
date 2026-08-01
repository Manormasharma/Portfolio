import { Env, GenerateArgs, ProviderAdapter } from '../types';

const anthropicAdapter: ProviderAdapter = {
  isConfigured(env: Env) {
    return Boolean(env.ANTHROPIC_API_KEY);
  },

  async generate({ systemPrompt, history, message }: GenerateArgs, env: Env) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY as string,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: systemPrompt,
        messages: [
          ...history.map((m) => ({ role: m.role, content: m.text })),
          { role: 'user', content: message },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json() as { content: { type: string; text: string }[] };
    return data.content.find((block) => block.type === 'text')?.text ?? '';
  },
};

export default anthropicAdapter;
