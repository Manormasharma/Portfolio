# Portfolio Chatbot Worker

A Cloudflare Worker that proxies chat requests to an LLM provider, scoped
strictly to answering HR/recruiter questions about Manorma Sharma's
background (see `src/context.ts` for the system prompt + guardrails).

Supports 4 interchangeable providers (`src/providers/`): **Claude
(Anthropic)**, **Gemini**, **Ollama**, and **AnythingLLM** (fronting a Gemma
model). Pick the active one via `CHATBOT_PROVIDER` in `wrangler.toml`.

## First-time setup (not yet done — requires a free Cloudflare account)

```
npm install -g wrangler
cd worker
npm install
wrangler login
wrangler kv namespace create RATE_LIMIT_KV   # paste the returned id into wrangler.toml
```

Set secrets for whichever provider(s) you want to enable (only the active
`CHATBOT_PROVIDER`'s secret needs to exist for the bot to respond — others
can be added later without a redeploy of the code, just a var/secret change):

```
wrangler secret put ANTHROPIC_API_KEY      # if CHATBOT_PROVIDER = anthropic
wrangler secret put GEMINI_API_KEY         # if CHATBOT_PROVIDER = gemini
```

For Ollama/AnythingLLM, both are typically self-hosted — a Cloudflare Worker
cannot reach `localhost`, so `OLLAMA_BASE_URL` / `ANYTHINGLLM_BASE_URL` (set
as `wrangler secret put`, since they may be sensitive) must point at a
publicly reachable instance (your own server, or a tunnel like ngrok /
Cloudflare Tunnel).

```
wrangler dev      # local dev
wrangler deploy   # ships it; copy the resulting *.workers.dev URL into
                   # REACT_APP_CHATBOT_API_URL for the frontend build
```

Until a provider is configured, `/chat` responds with a graceful "not yet
configured" message instead of erroring — the frontend widget already
handles this.

## Grounding data

`src/context.ts` fetches the same Sanity CDN dataset the frontend build uses
(`SANITY_PROJECT_ID` / `SANITY_DATASET` vars), cached for 1 hour via the
Workers Cache API. Until Sanity is set up, it falls back to
`src/seed-context.json`.
