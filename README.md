# Manorma Sharma — Portfolio

Personal portfolio of **Manorma Sharma**, Full Stack Engineer (React.js / Node.js).

**Live:** https://manormasharma.github.io/Portfolio/

## Features

- **WebGL plasma background:** a hand-written shader (no animation library) that follows the cursor, adapts to the theme, pauses in background tabs and respects `prefers-reduced-motion`
- **Glassmorphism UI** with dark (default) and light themes, applied before first paint so there is no flash
- **⌘K / Ctrl+K command menu** to jump to sections, open the résumé page, copy the email address, switch the theme or open the AI assistant
- **Interactive sections:** animated impact metrics, an experience tab panel (keyboard accessible), a searchable skills explorer, and project and credential cards
- **Résumé page** (`/resume`) rendered from the same data as the homepage
- **AI assistant** widget backed by a Cloudflare Worker with pluggable LLM providers (see [`worker/`](worker/README.md))
- **Data-driven content:** everything shown on the site lives in `src/data/*.json`

## Tech stack

React 18 · React Router · Framer Motion · SCSS · WebGL · Create React App · GitHub Actions · GitHub Pages · Cloudflare Workers · Sanity (optional CMS)

## Getting started

```bash
npm install
npm start        # http://localhost:3000/Portfolio
npm run build    # production build in build/
```

Optional environment variables go in `.env.local` (see [`.env.example`](.env.example)):

| Variable | Purpose |
| --- | --- |
| `REACT_APP_CHATBOT_API_URL` | URL of the deployed chatbot worker. If unset, the widget shows a "not configured" message. |
| `SANITY_PROJECT_ID` / `SANITY_DATASET` | Pull content from Sanity at build time (see [`cms/`](cms/README.md)). If unset, the checked-in JSON is used. |

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

> **Note:** if `SANITY_PROJECT_ID` is set, `npm start` and `npm run build` overwrite `src/data/*.json` with CMS content. Keep Sanity in sync, or leave the variable unset.

To add a project screenshot, put a 1600×1000 image in `src/images/projects/`, register it in `src/lib/projectImages.js`, and reference its key from `projects.json`.

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
worker/                      Cloudflare Worker for the AI assistant
cms/                         Sanity schema (optional)
```

## Deployment

- **Site:** every push to `main` builds the app and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). `public/404.html` handles client-side routes such as `/resume` on GitHub Pages.
- **Chatbot worker:** pushes to `main` that change files in `worker/` redeploy it via Wrangler (`.github/workflows/deploy-worker.yml`). See [`worker/README.md`](worker/README.md) for first-time setup.
