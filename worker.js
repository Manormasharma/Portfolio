// Generated from src/data/*.json by scripts/build-chat-prompt.js and bundled
// as text by Wrangler (see [[rules]] in wrangler.toml).
import SYSTEM_PROMPT from './recruiter-agent-system-prompt.md';

const MAX_TURNS = 20;
const MAX_CHARS_PER_MESSAGE = 1000;
const ALLOWED_ORIGIN = 'https://manormasharma.github.io';

async function callAnthropic(messages, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    console.error('Anthropic API error:', response.status);
    throw new Error('provider_error');
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? '';
}

async function callGemini(messages, apiKey, model) {
  const geminiModel = model || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 150 },
    }),
  });

  if (!response.ok) {
    console.error('Gemini API error:', response.status);
    throw new Error('provider_error');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

function corsHeaders(origin) {
  const allowed = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/api/chat') {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...headers, 'content-type': 'application/json' },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...headers, 'content-type': 'application/json' },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...headers, 'content-type': 'application/json' },
      });
    }

    const { messages } = body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages must be a non-empty array' }), {
        status: 400,
        headers: { ...headers, 'content-type': 'application/json' },
      });
    }

    if (messages.length > MAX_TURNS) {
      return new Response(JSON.stringify({ error: `Conversation exceeds maximum of ${MAX_TURNS} turns` }), {
        status: 400,
        headers: { ...headers, 'content-type': 'application/json' },
      });
    }

    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== 'string') {
        return new Response(JSON.stringify({ error: 'Each message must have role and content string' }), {
          status: 400,
          headers: { ...headers, 'content-type': 'application/json' },
        });
      }
      if (msg.content.length > MAX_CHARS_PER_MESSAGE) {
        return new Response(JSON.stringify({ error: `Message exceeds ${MAX_CHARS_PER_MESSAGE} character limit` }), {
          status: 400,
          headers: { ...headers, 'content-type': 'application/json' },
        });
      }
      if (!['user', 'assistant'].includes(msg.role)) {
        return new Response(JSON.stringify({ error: 'Message role must be user or assistant' }), {
          status: 400,
          headers: { ...headers, 'content-type': 'application/json' },
        });
      }
    }

    try {
      const provider = (env.CHAT_PROVIDER || 'anthropic').toLowerCase();
      const reply = provider === 'gemini'
        ? await callGemini(messages, env.GEMINI_API_KEY, env.GEMINI_MODEL)
        : await callAnthropic(messages, env.ANTHROPIC_API_KEY);

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { ...headers, 'content-type': 'application/json' },
      });
    } catch (err) {
      console.error('Internal error:', err.message);
      return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
        status: 500,
        headers: { ...headers, 'content-type': 'application/json' },
      });
    }
  },
};
