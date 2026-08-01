import { Env, GenerateArgs, ProviderAdapter } from '../types';

// Ollama normally runs on localhost, which a Cloudflare Worker cannot reach.
// This only works if OLLAMA_BASE_URL points at a publicly reachable instance
// (your own server, or a tunnel such as ngrok / Cloudflare Tunnel).
const ollamaAdapter: ProviderAdapter = {
  isConfigured(env: Env) {
    return Boolean(env.OLLAMA_BASE_URL);
  },

  async generate({ systemPrompt, history, message }: GenerateArgs, env: Env) {
    const response = await fetch(`${env.OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(env.OLLAMA_API_KEY ? { authorization: `Bearer ${env.OLLAMA_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model: 'llama3.1',
        stream: false,
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.map((m) => ({ role: m.role, content: m.text })),
          { role: 'user', content: message },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json() as { message: { content: string } };
    return data.message?.content ?? '';
  },
};

export default ollamaAdapter;
