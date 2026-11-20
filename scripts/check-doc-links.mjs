import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const guidePaths = [
  new URL('../public/blog/nl/codespaces_pages.md', import.meta.url),
  new URL('../public/blog/gb/codespaces_pages.md', import.meta.url),
];

const markdownLinkPattern = /\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g;
const guideContents = await Promise.all(guidePaths.map((path) => readFile(path, 'utf8')));
const urls = [
  ...new Set(
    guideContents.flatMap((content) =>
      [...content.matchAll(markdownLinkPattern)].map(([, url]) => url),
    ),
  ),
];

test('external links in the bilingual Codespaces and Pages guides respond successfully', async (context) => {
  assert.ok(urls.length > 0, 'No external Markdown links were found');

  for (const url of urls) {
    await context.test(url, async () => {
      const response = await fetch(url, {
        headers: { 'user-agent': 'project-react-doc-link-check' },
        signal: AbortSignal.timeout(15000),
      });
      await response.body?.cancel();
      assert.ok(response.ok, `${url} returned HTTP ${response.status}`);
    });
  }
});
