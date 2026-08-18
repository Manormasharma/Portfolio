# Sanity Studio — Portfolio CMS

Content schema for Manorma Sharma's portfolio (`profile`, `skill`, `experience`,
`project`, `certification`, `education` — see `schemaTypes/`).

## First-time setup (not yet done — requires a free Sanity account)

```
npm install -g @sanity/cli
cd cms
sanity init   # creates project ID + dataset, wires schemaTypes/ in
sanity deploy # optional: hosts Studio at <project>.sanity.studio
```

Once a project exists, set these in the repo root `.env` (never commit it):

```
SANITY_PROJECT_ID=xxxx
SANITY_DATASET=production
```

`scripts/fetch-cms-content.js` (run automatically via `npm run prebuild` /
`npm run prestart`) reads those env vars. If they're unset, the script is a
no-op and the app falls back to the checked-in seed data in `src/data/*.json`
(the current hardcoded content, transcribed once) — so the site always builds
even before Sanity is wired up.

Manually enter the existing content from `src/data/*.json` into Studio once
Sanity is set up; that JSON is the source-of-truth seed for what to type in.
