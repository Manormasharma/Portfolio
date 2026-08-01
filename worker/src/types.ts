export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface GenerateArgs {
  systemPrompt: string;
  history: ChatMessage[];
  message: string;
}

export interface ProviderAdapter {
  isConfigured(env: Env): boolean;
  generate(args: GenerateArgs, env: Env): Promise<string>;
}

export interface Env {
  CHATBOT_PROVIDER: string;
  ALLOWED_ORIGIN: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  RATE_LIMIT_KV: KVNamespace;

  // Secrets — set via `wrangler secret put <NAME>`, never committed.
  ANTHROPIC_API_KEY?: string;
  GEMINI_API_KEY?: string;
  OLLAMA_BASE_URL?: string;
  OLLAMA_API_KEY?: string;
  ANYTHINGLLM_BASE_URL?: string;
  ANYTHINGLLM_API_KEY?: string;
}
