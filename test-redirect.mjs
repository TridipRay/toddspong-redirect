import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const origin = "https://tridips-mac-mini.taildad1f1.ts.net";
for (const path of ["/", "/room?filter=unread#latest", "/a%20b?x=a%2Fb#hi%20there", "//other.example/path?next=https://evil.example"]) {
  test(`preserves ${path} on the fixed destination`, () => {
    const source = new URL("https://toddspong.com" + path);
    let replaced;
    const button = {};
    runInNewContext(script, { URL, location: {
      pathname: source.pathname, search: source.search, hash: source.hash,
      replace: value => { replaced = value; },
    }, document: { getElementById: () => button } });
    assert.equal(replaced, origin + source.pathname + source.search + source.hash);
    assert.equal(new URL(replaced).origin, origin);
    assert.equal(button.href, replaced);
  });
}
test("404 serves the identical redirect", () => {
  assert.equal(readFileSync(new URL("./404.html", import.meta.url), "utf8"), html);
});
test("refresh is only a no-JavaScript fallback, so it cannot race the full URL", () => {
  assert.match(html, /<noscript><meta http-equiv="refresh"[^>]+><\/noscript>/);
  assert.equal((html.match(/http-equiv="refresh"/g) || []).length, 1);
});
