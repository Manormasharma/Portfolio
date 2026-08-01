import { Env, GenerateArgs, ProviderAdapter } from '../types';

// AnythingLLM (fronting a local Gemma model here) is typically self-hosted,
// same constraint as Ollama: ANYTHINGLLM_BASE_URL must be publicly reachable
// for a Cloudflare Worker to call it.
const anythingLLMAdapter: ProviderAdapter = {
  isConfigured(env: Env) {
    return Boolean(env.ANYTHINGLLM_BASE_URL);
  },

  async generate({ systemPrompt, history, message }: GenerateArgs, env: Env) {
    const response = await fetch(`${env.ANYTHINGLLM_BASE_URL}/api/v1/workspace/portfolio-chatbot/chat`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(env.ANYTHINGLLM_API_KEY ? { authorization: `Bearer ${env.ANYTHINGLLM_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        message: `${systemPrompt}\n\n${history.map((m) => `${m.role}: ${m.text}`).join('\n')}\nuser: ${message}`,
        mode: 'chat',
      }),
    });

    if (!response.ok) {
      throw new Error(`AnythingLLM API error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json() as { textResponse: string };
    return data.textResponse ?? '';
  },
};

export default anythingLLMAdapter;
