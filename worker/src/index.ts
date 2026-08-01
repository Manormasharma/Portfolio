import { Env, ChatMessage } from './types';
import { getProvider } from './providers';
import { buildSystemPrompt } from './context';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 10;
const RATE_LIMIT_MAX_REQUESTS = 20;
const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;

function corsHeaders(env: Env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(body: unknown, env: Env, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders(env) },
  });
}

async function checkRateLimit(env: Env, clientIp: string): Promise<boolean> {
  const key = `rate:${clientIp}`;
  const raw = await env.RATE_LIMIT_KV.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_LIMIT_MAX_REQUESTS) return false;
  await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_SECONDS });
  return true;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/chat' || request.method !== 'POST') {
      return jsonResponse({ error: 'Not found' }, env, 404);
    }

    const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
    const withinLimit = await checkRateLimit(env, clientIp);
    if (!withinLimit) {
      return jsonResponse({ error: 'Too many requests, please try again later.' }, env, 429);
    }

    let payload: { message?: string; history?: ChatMessage[] };
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, env, 400);
    }

    const message = (payload.message || '').slice(0, MAX_MESSAGE_LENGTH);
    if (!message.trim()) {
      return jsonResponse({ error: 'message is required' }, env, 400);
    }
    const history = (payload.history || []).slice(-MAX_HISTORY_MESSAGES);

    const provider = getProvider(env);
    if (!provider || !provider.adapter.isConfigured(env)) {
      return jsonResponse({
        reply: "The chatbot isn't configured yet — an API key/endpoint hasn't been set for the active provider. Please check back soon!",
      }, env);
    }

    try {
      const systemPrompt = await buildSystemPrompt(env);
      const reply = await provider.adapter.generate({ systemPrompt, history, message }, env);
      return jsonResponse({ reply }, env);
    } catch (err) {
      console.error('Chatbot generation failed:', err);
      return jsonResponse({ reply: "Sorry, I ran into an error answering that. Please try again." }, env, 502);
    }
  },
};
