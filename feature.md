# Feature: Recruiter Q&A Chat Widget

## Summary
A floating chat widget on the portfolio site that lets recruiters ask questions about the candidate and get grounded, on-brand answers — powered by the Claude API through a secure serverless backend (the portfolio itself stays static).

## Goals
- Let a recruiter get quick answers (skills, experience, availability, etc.) without reading the whole site.
- Keep the API key off the client entirely.
- Keep answers grounded in the candidate's real background — no fabrication.

## Non-goals
- Not a general-purpose chatbot; stays scoped to candidate Q&A.
- Not collecting or storing recruiter PII beyond the current chat session.
- Not persisting conversation history across visits (v1).

## Architecture
- **Frontend:** `ChatWidget.jsx` — floating button (bottom-right) that expands into a chat panel.
- **Backend:** one serverless function, `/api/chat` (Vercel-style `/api` folder shown below — adjust the path/config if deploying to Netlify Functions, Cloudflare Pages Functions, etc.).
- **Provider:** Anthropic Claude API, model `claude-sonnet-4-6`, endpoint `https://api.anthropic.com/v1/messages`.
- **System prompt:** lives server-side only (in the serverless function or an env var), sourced from `recruiter-agent-system-prompt.md`. It is never shipped in the client bundle.

## Data flow
1. Recruiter opens the widget and types a question.
2. Frontend POSTs the full message history to `/api/chat`.
3. The serverless function prepends the system prompt, calls the Anthropic Messages API, and returns the reply.
4. Frontend appends the reply to the chat thread.

## API contract
`POST /api/chat`

Request:
```json
{ "messages": [{ "role": "user", "content": "What's your notice period?" }] }
```

Response (200):
```json
{ "reply": "..." }
```

Response (4xx/5xx):
```json
{ "error": "..." }
```

## Environment variables
- `ANTHROPIC_API_KEY` — set in the hosting platform's dashboard (Vercel/Netlify/Cloudflare env settings). Never committed to git, never referenced in client-side code.

## Frontend requirements (`ChatWidget.jsx`)
- Floating action button, bottom-right, toggles the panel open/closed.
- Message list with distinct user/assistant bubbles, auto-scrolls to the latest message.
- Text input + send button; Enter key sends; input disabled while a reply is in flight.
- Typing/loading indicator while awaiting a response.
- Friendly error state with a retry option if the API call fails.
- Responsive: full-width panel on mobile.
- Plain `useState`/`useRef` is enough — no extra state library needed.
- Visual style should match the existing portfolio's colors/fonts (inspect the current CSS/theme before picking new ones).

## Backend requirements (`api/chat.js`)
- Validate the request body: `messages` must be a non-empty array; cap length (e.g., max ~20 turns, max characters per message) to bound cost and abuse.
- Reject invalid/empty payloads with `400`.
- Call the Anthropic API with: `model: "claude-sonnet-4-6"`, a reasonable `max_tokens` (e.g. 500), the system prompt, and the message history. Required headers: `x-api-key`, `anthropic-version: 2023-06-01`, `content-type: application/json`.
- Catch errors and return a generic `500` to the client — never leak internal error details or the key.
- Restrict CORS to your own domain.
- Optional v1-acceptable gap: real rate-limiting needs external state (serverless functions are stateless between invocations); skip for personal-portfolio scale, revisit if traffic grows.

## Security / privacy requirements
- API key is read only from `process.env`, never logged, never returned to the client.
- The widget never asks the recruiter for personal contact info.
- System prompt stays server-side, even though the underlying resume content is already public on the site — this reduces easy prompt-injection/override probing.

## Edge cases
- Empty input submitted → ignore, no API call.
- API timeout or error → show "Something went wrong — try again, or email me directly at [your email]."
- Question outside the knowledge base → handled by the system prompt's own guardrails (see `recruiter-agent-system-prompt.md`).
- Rapid repeated submits → send button stays disabled until the in-flight request resolves.

## Acceptance criteria
- [x] Widget renders on every page without breaking existing layout or styles.
- [x] A typed question returns a relevant, on-brand answer within a few seconds.
- [x] The API key never appears in the browser network tab or the bundled JS.
- [x] Works at mobile viewport widths.
- [x] Failures show a visible, friendly error instead of breaking silently.

## Out of scope (v1)
- Cross-session chat history persistence.
- Multi-language support.
- Conversation logging/analytics (revisit later if wanted).