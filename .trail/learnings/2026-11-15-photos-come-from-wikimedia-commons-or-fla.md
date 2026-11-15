---
title: "Photos come from Wikimedia Commons or manual Unsplash downloads, never scripted Unsplash fetches"
author: Flávio
date: 2026-11-15
branch: main
cost: { minutes: 16, tokens: 178268 }
id: l-3e687212
scope: repo
status: active
src: agent
touches:
  - ".env.example"
  - README.md
  - index.html
  - package-lock.json
  - package.json
  - public/favicon.svg
  - public/og.svg
  - public/robots.txt
  - public/sitemap.xml
  - src/app/App.tsx
---

## Decided
In the code: site photos live in `public/images/` as 1600px-longest-side JPEGs (110-325 KB). Full-size originals dropped in by hand are moved to `assets-source/` so they do not ship in `dist/`. Every photo needs an entry in `src/data/credits.ts` (shown on `/creditos`); Commons CC BY / CC BY-SA licences require attribution.

## Tried and ruled out
Downloading Unsplash photos with curl: unsplash.com serves an Anubis anti-bot challenge page (HTML, ~9 KB) instead of the image, and we do not bypass it. Wikimedia Commons has a proper API (`action=query`, `prop=imageinfo`, `iiurlwidth`) and exposes licence and author metadata; it rate-limits fast (HTTP 429), so space requests a few seconds apart.

## Watch out
Photos added by hand from Unsplash have no automatic credit: add them to `src/data/credits.ts` yourself. The 3D vision board in `src/components/sections/VisionBoard.tsx` is lazy-loaded from `src/pages/Home.tsx` so three.js stays out of the main bundle; use `THREE.Timer`, not the deprecated `THREE.Clock`.
