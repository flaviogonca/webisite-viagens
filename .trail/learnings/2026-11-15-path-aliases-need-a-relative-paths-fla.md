---
title: "Path aliases need a relative paths entry, because TypeScript 7 removed baseUrl"
author: Flávio
date: 2026-11-15
cost: { minutes: 1, tokens: 1005 }
id: l-b97654cc
scope: repo
status: active
src: agent
---

## Decided
In the code: `tsconfig.json` declares the `@/*` alias only through `paths` with a leading `./` (`"@/*": ["./src/*"]`), and `vite.config.ts` has a matching `resolve.alias`.

## Tried and ruled out
Keeping `baseUrl: "."` as in older setups. The installed TypeScript 7 rejects it (TS5102) and then rejects non-relative `paths` (TS5090), so `npm run build` failed twice before the fix.

## Watch out
The build failures were unrelated to `src/components/layout/Navbar.tsx`, which was edited in between for a different bug: the CTA showed on mobile because `hidden` lost to `inline-flex`, fixed with `max-lg:!hidden`.
