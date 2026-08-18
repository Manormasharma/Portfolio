# Portfolio

Personal portfolio site built with React.js, featuring a recruiter chat widget powered by a Cloudflare Worker + Gemini AI backend.

**Live site:** https://manormasharma.github.io/Portfolio/

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
GEMINI_MODEL=gemini-3.5-flash-lite
```

Create `.env.development.local` (also gitignored) to point the chat widget at the local API server:

```env
REACT_APP_CHAT_API_URL=http://localhost:3001/api/chat
```

### 3. Start the app

Run both the React dev server and the local API server in separate terminals:

```bash
# Terminal 1 — React frontend (http://localhost:3000)
npm start

# Terminal 2 — Chat API server (http://localhost:3001)
npm run dev:api
```

---

## Deployment

### Deploy the Cloudflare Worker (chat backend)

Install Wrangler if needed:

```bash
npm install -g wrangler
wrangler login
```

Set the Gemini API key as a secret (stored securely in Cloudflare, never in code):

```bash
npx wrangler secret put GEMINI_API_KEY
```

Deploy the worker:

```bash
npx wrangler deploy
```

Worker URL: `https://portfolio-chatbot-worker.manorma.workers.dev`

### Deploy the frontend (GitHub Pages)

```bash
npm run deploy
```

This builds the React app (using `.env.production` for the worker URL) and publishes it to the `gh-pages` branch.
