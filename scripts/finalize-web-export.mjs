#!/usr/bin/env node
/**
 * Runs after `expo export --platform web`:
 * - removes pages that should not be public: dynamic-route templates such as
 *   services/[slug].html and Expo Router's debug _sitemap.html
 * - writes sitemap.xml and robots.txt from the pages that remain
 *
 * Usage: node scripts/finalize-web-export.mjs <dist-dir>
 */
import { readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://dynamicroofingandconstruction.us';
const dist = process.argv[2];
if (!dist) {
  console.error('Usage: node scripts/finalize-web-export.mjs <dist-dir>');
  process.exit(1);
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return name.startsWith('_expo') || name === 'assets' ? [] : htmlFiles(path);
    }
    return name.endsWith('.html') ? [path] : [];
  });
}

const removed = [];
const urls = [];
for (const file of htmlFiles(dist)) {
  const route = relative(dist, file).split(sep).join('/').replace(/\.html$/, '');
  if (/\[.+\]/.test(route) || route === '_sitemap') {
    rmSync(file);
    removed.push(route);
    continue;
  }
  // The not-found page is served for 404s but is not a page to index.
  if (route.includes('+not-found')) continue;
  urls.push(route === 'index' ? '/' : `/${route.replace(/\/index$/, '')}`);
}

// Home first, then shallow pages before deeper ones.
urls.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.split('/').length - b.split('/').length || a.localeCompare(b)));

const priority = (url) => (url === '/' ? '1.0' : url.split('/').length === 2 ? '0.8' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc><priority>${priority(u)}</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Removed ${removed.length} template page(s): ${removed.join(', ') || 'none'}`);
console.log(`Wrote sitemap.xml with ${urls.length} URLs, and robots.txt`);
