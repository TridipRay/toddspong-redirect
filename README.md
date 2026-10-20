# toddspong.com redirect

A single page that forwards `toddspong.com` to the Toddspong room, which is
served from a Mac over Tailscale Funnel and therefore answers only to its
`ts.net` name.

It exists because Funnel cannot present a valid certificate for a custom
domain, and because the alternative - moving the domain's nameservers to a
provider with free forwarding - would have carried the Resend DKIM and SPF
records with it and put invite email at risk for no gain.

GitHub Pages serves this over HTTPS on the custom domain for free, and the
domain's DNS stays exactly where it is.

`404.html` is a copy of `index.html` so that any path redirects, not only the
root.
