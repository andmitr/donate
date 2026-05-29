# donate

Personal donation landing page for Andrew Dmitriev. A single static page that lists crypto wallet addresses and lets visitors copy them with one click.

Live: https://andmitr.github.io/donate/

## Stack

- Plain HTML, CSS, and vanilla JavaScript (no framework, no build step)
- Self-hosted `sf` and `JetBrains Mono` web fonts (woff2)
- Deployed to GitHub Pages

## Project layout

```
.
├── index.html               # Page markup
├── styles.css               # All styles (reset, tokens, layout, components)
├── scripts.js               # Copy-to-clipboard + toast
├── avatar.png               # Hero avatar
├── fonts/                   # Self-hosted woff2 fonts
└── .github/workflows/       # Pages deploy and release workflows
```

## Local preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## CI

- `.github/workflows/pages.yml` — deploys the repo root to GitHub Pages on every push to `main`.
- `.github/workflows/release.yml` — publishes a GitHub Release with auto-generated notes on every `v*` tag push.

## Release

```sh
git tag v1.2.3
git push origin v1.2.3
```

The release workflow picks up the tag and creates a GitHub Release.

## License

All rights reserved.
