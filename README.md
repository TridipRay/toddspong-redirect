# toddspong.com shortcut

This public GitHub Pages site redirects visitors to the Toddspong app on
Tailscale Funnel. The address bar changes to the `ts.net` hostname; this does
not host the chat or give Funnel a custom-domain certificate.

JavaScript preserves the path, query and fragment with `location.replace`.
The visible button receives the same destination. Without JavaScript, a
`noscript` meta refresh and the button open the room root; deep-link state is
not preserved. The canonical link is search metadata, not a redirect.
`404.html` is identical so unknown paths receive the same behavior.

Use this as a memorable front door. The app should continue generating account
verification/recovery links directly on its own hostname, so those links do not
pass through GitHub Pages. The page has no analytics or external assets.

## Check a change

Run `node --test test-redirect.mjs` (Node 22 or newer). Keep both HTML files
identical. Test navigation in a browser too: HTTP clients do not execute this
HTML redirect. Do not mistake a successful Pages build for working public DNS.

## Deployment

Custom domain: `toddspong.com`; source: `main`, repository root. DNS remains at
Wix. Follow the private app repository's `docs/point-toddspong-com.md` runbook
for reviewed records, account-level domain verification, HTTPS and cellular
acceptance. DNS/certificate issuance is a separate step from publishing this code.

Before removing this repository or its custom domain, repoint DNS away from
GitHub Pages and verify propagation. Keep domain verification in place.
