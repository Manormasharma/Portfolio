const fs = require('fs');
const path = require('path');

const SYSTEM_PROMPT = fs.readFileSync(
  path.join(__dirname, '..', 'recruiter-agent-system-prompt.md'),
  'utf8'
);

const MAX_TURNS = 20;
const MAX_CHARS_PER_MESSAGE = 1000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://manormasharma.github.io';

// Set CHAT_PROVIDER=gemini to use Gemini; defaults to Anthropic.
const PROVIDER = (process.env.CHAT_PROVIDER || 'anthropic').toLowerCase();

async function callAnthropic(messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
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

async function callGemini(messages) {
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  // Gemini uses "model" role instead of "assistant"
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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' });
  }

  if (messages.length > MAX_TURNS) {
    return res.status(400).json({ error: `Conversation exceeds maximum of ${MAX_TURNS} turns` });
  }

  for (const msg of messages) {
    if (!msg.role || !msg.content || typeof msg.content !== 'string') {
      return res.status(400).json({ error: 'Each message must have role and content string' });
    }
    if (msg.content.length > MAX_CHARS_PER_MESSAGE) {
      return res.status(400).json({ error: `Message exceeds ${MAX_CHARS_PER_MESSAGE} character limit` });
    }
    if (!['user', 'assistant'].includes(msg.role)) {
      return res.status(400).json({ error: 'Message role must be user or assistant' });
    }
  }

  try {
    const reply = PROVIDER === 'gemini'
      ? await callGemini(messages)
      : await callAnthropic(messages);

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Internal error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
