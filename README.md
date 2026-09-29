# Manorma Sharma — Portfolio

Personal portfolio of **Manorma Sharma**, Full Stack Engineer (React.js / Node.js).

**Live:** https://manormasharma.github.io/Portfolio/

## Features

- **WebGL plasma background:** a hand-written shader (no animation library) that follows the cursor, adapts to the theme, pauses in background tabs and respects `prefers-reduced-motion`
- **Glassmorphism UI** with dark (default) and light themes, applied before first paint so there is no flash
- **⌘K / Ctrl+K command menu** to jump to sections, open the résumé page, copy the email address, switch the theme or open the AI assistant
- **Interactive sections:** animated impact metrics, an experience tab panel (keyboard accessible), a searchable skills explorer, and project and credential cards
- **Résumé page** (`/resume`) rendered from the same data as the homepage
- **AI recruiter assistant:** a chat widget backed by a Cloudflare Worker that calls Gemini. The API key stays in the Worker, and the system prompt is generated from the same data the site shows.
- **Data-driven content:** everything shown on the site lives in `src/data/*.json`

## Tech stack

React 18 · React Router · Framer Motion · SCSS · WebGL · Create React App · Cloudflare Workers · Gemini API · GitHub Actions · GitHub Pages · Sanity (optional CMS)

## Architecture

```
Browser (React SPA on GitHub Pages)
   │  POST /api/chat  { messages: [{ role, content }] }
   ▼
Cloudflare Worker (worker.js)
   ├─ validates input (≤ 20 turns, ≤ 1000 chars per message)
   ├─ system prompt = recruiter-agent-system-prompt.md
   │     (generated from src/data/*.json by scripts/build-chat-prompt.js)
   └─ calls Gemini (CHAT_PROVIDER / GEMINI_MODEL in wrangler.toml) → { reply }
```

## Getting started

```bash
npm install
npm start        # http://localhost:3000/Portfolio
npm run build    # production build in build/
```

### Chatbot in local development

The production Worker only accepts requests from `https://manormasharma.github.io`, so locally the widget talks to a small Express server that mirrors it (`server.js` → `api/chat.js`).

1. Create `.env.local` (gitignored):
   ```env
   CHAT_PROVIDER=gemini
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-3.5-flash-lite
   ```
2. Create `.env.development.local`:
   ```env
   REACT_APP_CHAT_API_URL=http://localhost:8787/api/chat
   ```
3. Run both:
   ```bash
   npm run dev:api   # chat API on http://localhost:8787
   npm start         # site
   ```

Without `REACT_APP_CHAT_API_URL`, the widget still opens and points visitors to the contact email.

## Updating content

Edit the JSON in `src/data/`. No component changes are needed.

| File | Drives |
| --- | --- |
| `profile.json` | Hero, impact metrics, About, "What I bring" cards, core competencies, contact and social links |
| `experience.json` | Experience tabs and the résumé work history (`**bold**` is supported in bullets) |
| `skills.json` | Skills explorer and the logo marquee (`icon` → `src/lib/skillIcons.js`; `marquee: true` adds a skill without a logo to the marquee) |
| `projects.json` | Selected work cards (`image` → `src/lib/projectImages.js`) |
| `technicalProjects.json` | Engineering lab cards |
| `certifications.json` | Credentials (`type`: `certification` or `achievement`) |
| `education.json` | Education card and résumé |

To add a project screenshot, put a 1600×1000 image in `src/images/projects/`, register it in `src/lib/projectImages.js`, and reference its key from `projects.json`.

**After changing content, redeploy the Worker** (`npm run deploy:worker`) so the chatbot's knowledge matches the site. `recruiter-agent-system-prompt.md` is regenerated automatically by `npm start`, `npm run build` and `npm run deploy:worker`. Don't edit it by hand.

> **Note:** if `SANITY_PROJECT_ID` is set, `npm start` and `npm run build` overwrite `src/data/*.json` with CMS content (see [`cms/`](cms/README.md)). It is currently unset, so the checked-in JSON is used.

## Project structure

```
src/
  Pages/Homepage/sections/   Hero, Impact, About, Experience, Skills, Work, Credentials, Contact
  Pages/Resume/              résumé page
  components/                Header, Footer, Plasma, CommandPalette, ChatbotSlot, Icon, SectionHeading
  context/ThemeContext.js    dark / light theme
  data/                      site content (JSON)
  lib/                       hooks and helpers (active section, spotlight, dates, image maps)
  styles/_tokens.scss        design tokens for both themes
worker.js, wrangler.toml     Cloudflare Worker (production chat backend)
server.js, api/chat.js       local dev chat server
scripts/                     build-chat-prompt.js, fetch-cms-content.js
cms/                         Sanity schema (optional)
```

## Deployment

### Site (automatic)

Every push to `main` builds the app and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). The chat URL comes from `.env.production`. `public/404.html` handles client-side routes such as `/resume` on GitHub Pages.

### Chat Worker (manual)

```bash
npx wrangler login                        # once
npx wrangler secret put GEMINI_API_KEY    # once; the key lives only in Cloudflare
npm run deploy:worker                     # regenerates the prompt, then deploys
```

Worker URL: `https://portfolio-chatbot-worker.manorma.workers.dev/api/chat`
