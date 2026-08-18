import { Env, ProviderAdapter } from '../types';
import anthropic from './anthropic';
import gemini from './gemini';
import ollama from './ollama';
import anythingllm from './anythingllm';

const providers: Record<string, ProviderAdapter> = {
  anthropic,
  gemini,
  ollama,
  anythingllm,
};

export function getProvider(env: Env): { adapter: ProviderAdapter; name: string } | null {
  const name = env.CHATBOT_PROVIDER;
  const adapter = providers[name];
  if (!adapter) return null;
  return { adapter, name };
}
