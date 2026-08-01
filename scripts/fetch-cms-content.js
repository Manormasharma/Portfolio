/*
 * Pulls content from the Sanity CDN (GROQ) API and writes it to src/data/*.json,
 * which components import directly (static, zero client-runtime CMS cost).
 *
 * No-ops until SANITY_PROJECT_ID is set (see cms/README.md) — until then the
 * checked-in src/data/*.json (transcribed from the original hardcoded content)
 * is used as-is, so `npm start`/`npm run build` always work.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = '2024-01-01';

const QUERIES = {
  profile: '*[_type == "profile"][0]',
  skills: '*[_type == "skill"] | order(category asc, order asc)',
  experience: '*[_type == "experience"] | order(order asc)',
  projects: '*[_type == "project"] | order(order asc)',
  certifications: '*[_type == "certification"] | order(type asc, order asc)',
  education: '*[_type == "education"] | order(order asc)',
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`Sanity request failed (${res.statusCode}): ${body}`));
          return;
        }
        resolve(JSON.parse(body));
      });
    }).on('error', reject);
  });
}

async function main() {
  if (!PROJECT_ID) {
    console.log('[fetch-cms-content] SANITY_PROJECT_ID not set — skipping CMS fetch, using existing src/data/*.json as-is.');
    return;
  }

  const dataDir = path.join(__dirname, '..', 'src', 'data');
  const entries = Object.entries(QUERIES);

  for (const [name, query] of entries) {
    const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
    try {
      const { result } = await fetchJson(url);
      fs.writeFileSync(path.join(dataDir, `${name}.json`), JSON.stringify(result, null, 2));
      console.log(`[fetch-cms-content] wrote src/data/${name}.json`);
    } catch (err) {
      console.error(`[fetch-cms-content] failed to fetch "${name}", keeping existing src/data/${name}.json:`, err.message);
    }
  }
}

main();
