// Runs after `vite build` and the SSR build of src/prerender.tsx.
// Writes each page's rendered markup into its HTML file so crawlers that don't run
// JavaScript (most AI assistants, link previews) can read the whole page.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const { render } = await import(pathToFileURL(resolve('.ssr/prerender.js')).href);

const pages = {
  'index.html': 'home',
  'salams-casestudy.html': 'salams',
  'zewards-casestudy.html': 'zewards',
  'unita-casestudy.html': 'unita',
  'vara-casestudy.html': 'vara',
};

// Animations render their starting frame (hidden, offset). Drop those inline styles
// so the static copy is readable on its own.
const settle = (html) =>
  html.replace(/ style="([^"]*)"/g, (_, css) => {
    const kept = css
      .split(';')
      .filter((d) => d.trim() && !/^\s*(opacity|transform|translate|scale|rotate|filter|clip-path)\s*:/.test(d))
      .join(';');
    return kept ? ` style="${kept}"` : '';
  });

for (const [file, route] of Object.entries(pages)) {
  const path = resolve('dist', file);
  const html = readFileSync(path, 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error(`No empty #root in ${file}`);
  const body = settle(render(route));
  writeFileSync(path, html.replace('<div id="root"></div>', `<div id="root"><div class="prerender">${body}</div></div>`));
  console.log(`prerendered ${file} (${(body.length / 1024).toFixed(0)} kB)`);
}

rmSync('.ssr', { recursive: true, force: true });
