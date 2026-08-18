# Manorma Sharma — Portfolio

Personal portfolio site for a Full Stack Software Engineer with 5+ years of experience — built with React 18, backed by a Cloudflare Worker + Gemini AI chat backend, and driven by Sanity CMS.

**Live site:** https://manormasharma.github.io/Portfolio/
**Full technical overview:** https://manormasharma.github.io/Portfolio/PORTFOLIO-OVERVIEW.html

---

## What's Inside

| Layer | Tech | Detail |
|-------|------|--------|
| Frontend | React 18, React Router v6, SCSS | SPA with Homepage + Resume page |
| Animations | Framer Motion, Lottie React | Hero and section entrance animations |
| AI Chat | Gemini `gemini-1.5-flash` | Floating recruiter Q&A widget, site-wide |
| Backend | Cloudflare Workers (TypeScript) | Serverless `/chat` endpoint with rate limiting |
| Rate Limiting | Cloudflare KV | 20 req / IP / 10 min, stateful across Worker restarts |
| CMS | Sanity | Profile, experience, skills, projects, certifications |
| Deployment | GitHub Pages + Wrangler | Frontend via `gh-pages`, Worker via Wrangler |

---

## Achievements

- **AI recruiter assistant** — Gemini-powered chat widget lets recruiters ask about skills, experience, and availability; grounded in real profile data, never fabricated
- **Zero API key exposure** — key lives in the Cloudflare Worker environment only, never in the client bundle
- **Prompt injection hardened** — system prompt is server-side only; Sanity context injected as inert data with explicit model instructions
- **Multi-provider AI adapter** — Gemini, Anthropic, OpenAI, Ollama all pluggable via a single `CHATBOT_PROVIDER` env var
- **CMS-driven content** — Sanity data fetched at build time and at runtime (1-hr edge cache); JSON files as fallback
- **Live resume page** — `/resume` rendered from structured JSON, bold-marker parsing, no PDF-only fallback
- **13+ real-world projects** showcased with tech tags and live URLs

---

## Architecture

```
Browser (React 18 SPA — GitHub Pages)
        │
        │ POST /chat
        ▼
Cloudflare Worker (TypeScript)
  ├── Rate limit check  (Cloudflare KV)
  ├── Fetch Sanity context (1-hr edge cache)
  ├── Build system prompt (server-side only)
  └── Call Gemini API → { reply }
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local` in the project root (already gitignored):

```env
CHAT_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
```

Create `.env.development.local` to point the chat widget at the local API server:

```env
REACT_APP_CHAT_API_URL=http://localhost:3001/api/chat
```

### 3. Start the app

```bash
# Terminal 1 — React frontend (http://localhost:3000)
npm start

# Terminal 2 — Chat API server (http://localhost:3001)
npm run dev:api
```

---

## Deployment

### Deploy the Cloudflare Worker (chat backend)

```bash
npm install -g wrangler
wrangler login

# Store the Gemini API key securely in Cloudflare (never in code)
npx wrangler secret put GEMINI_API_KEY

npx wrangler deploy
```

Worker URL: `https://portfolio-chatbot-worker.manorma.workers.dev`

### Deploy the frontend (GitHub Pages)

```bash
npm run deploy
```

Builds the React app and publishes to the `gh-pages` branch. `.env.production` is used for the Worker URL.

---

## Project Structure

```
├── src/
│   ├── Pages/          # Homepage, Resume
│   ├── components/     # Header, Footer, ChatWidget, Timeline, SectionHeading
│   ├── data/           # JSON content (profile, experience, skills, projects, …)
│   ├── images/         # Project screenshots, skill icons
│   └── styles/         # _tokens.scss design system
├── worker/             # Cloudflare Worker (TypeScript) — chat backend
│   └── src/
│       ├── providers/  # Gemini, Anthropic, OpenAI, Ollama adapters
│       ├── context.ts  # Sanity fetch + system prompt builder
│       └── index.ts    # Worker entry — rate limit, validate, generate
├── cms/                # Sanity schema definitions
├── public/             # Static assets + PORTFOLIO-OVERVIEW.html
└── api/                # Local dev Express server (mirrors Worker behaviour)
```

---

> **Full technical overview (architecture, AI decisions, skills demonstrated):**
> https://manormasharma.github.io/Portfolio/PORTFOLIO-OVERVIEW.html
