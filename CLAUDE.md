# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Famicom/NES-style personal portfolio site (Next.js 15 App Router + React 19). The whole site is a small RPG: a title screen, a "castle" home with a DQ-style menu and message window, and a "shop" that sells the author's works. Content is Japanese; the tone is deliberately in-character (旅人よ／宝／封印の書物).

Deployed at https://portfolio-ogison.vercel.app/ (Vercel).

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build (Turbopack)
npm run start    # serve the production build
npm run lint     # eslint (flat config, next/core-web-vitals + next/typescript)
npm run format   # prettier --write .
npx tsc --noEmit # typecheck — there is no npm script for this
```

There is **no test infrastructure** in this repo (no test runner, no test files). Do not invent a `npm test` invocation; verify changes with `npm run build` and by running the dev server.

Husky `pre-commit` runs `npm run format` then `npm run lint` **across the whole repo**. The `lint-staged` block in `package.json` exists but is _not_ wired into the hook — editing it changes nothing until the hook is updated.

## Naming and Folder Structure (Must Follow)

The canonical rules live in `docs/naming-and-folder-structure.md`. `AGENTS.md` carries the same summary for other agents — **keep the three files in sync** when conventions change.

- Components in `src/components` and `src/features`: `PascalCase.tsx`
- Styles: `PascalCase.module.scss`, same base name as its component, same folder
- Hooks/utilities: `camelCase.ts` / `camelCase.tsx`
- `src/app` keeps Next.js reserved names (`page.tsx`, `layout.tsx`, `sitemap.ts`, `globals.css`)
- Cross-folder imports use the `@/` alias; relative imports only within the same feature folder

Layer responsibility: `app/` = routes + metadata only · `components/` = cross-feature UI · `features/` = domain UI and logic grouped by feature.

## Architecture

### Route flow

```
/         src/app/page.tsx      → StartScreen; Enter or click fades out and router.push("/home")
/home     src/app/home/page.tsx → features/home/Home.tsx   (battle screen: BattleStage + command list + message window)
/shop     src/app/shop/page.tsx → features/shop/WorksPageContent.tsx (shop screen: ShopStage + goods list + message window)
```

`app/*/page.tsx` files are intentionally thin — they set `metadata` and render one feature component. All real UI is a Client Component (`"use client"`); there is no server-side data fetching, no API routes, and no Server Actions.

Menu selection in `Home.tsx` is split: `works` navigates to `/shop`, everything else just swaps the message shown in place.

### Where the content lives

All site content is **hardcoded as module-level data**, not fetched from a CMS or data layer. Everything user-visible is bilingual — see the i18n section below:

- `src/features/message/messages.ts` — `messages: Record<Locale, MessageContent>`: welcome / about (an array, one picked at random per mount) / skills / works / contact text
- `src/features/shop/works.ts` — the `workSources` array (title and description per locale; id, price in G, link, icon path shared) and `resolveWorks(locale)`. `WorksShowcase.tsx` renders it as the しなもの command window
- `src/features/message/contactUtils.tsx` — `contactLinks` (GitHub / X / Qiita) and `worksLinks`, plus the linkifiers that turn keywords and `【title】` spans into anchors after typing finishes

Work icons are SVGs under `public/images/works/`.

### Cross-cutting patterns

**Typewriter + remount-by-key.** `MessageWindow` types text out character by character (`calculateTypingPlan` scales the per-character speed so any message finishes within 4s — long messages advance several characters per tick). It has no imperative replay API — callers force a replay by changing its `key`: `Home.tsx` bumps a `menuSelectKey` counter so re-selecting the same menu item replays, and `WorksPageContent` keys on `selectedWork?.id`. Preserve this when refactoring.

**Sound.** `src/features/message/useSound.ts` exports `useSound` (per-audio-element playback) and `useSoundSettings` (the global on/off flag). State is persisted in `localStorage` under `portfolio-sound-enabled` and synced two ways: the native `storage` event for other tabs, and a custom `window` event named `soundToggle` for other components in the same tab. Any new component reading or writing the flag must dispatch `soundToggle` after writing, or the settings panel and the message window fall out of sync. **Sound defaults to ON.** Note that `useSoundSettings` only exposes a `toggleSound()` — `SettingsMenu` gets explicit ON/OFF buttons by toggling only when the requested state differs from the current one.

**Settings menu.** `src/components/SettingsMenu.tsx` is the header's single gear button; it owns both user-facing preferences (language and sound). The dropdown is **only mounted while open** — that is deliberate, not incidental: `soundEnabled` comes from `localStorage` during the first render, so rendering it on page load would produce a hydration mismatch. Keep new `localStorage`-derived UI inside the panel, or apply the `mounted`-flag pattern below. Closing is handled by a `mousedown` listener outside the container and by Escape (which restores focus to the gear).

**Hydration guards.** Anything nondeterministic or `localStorage`-dependent should stay out of the first render:

- `MenuGrid` renders a non-interactive variant until a `mounted` flag flips in `useEffect`
- `useHeaderStats` (`src/features/header/useHeaderStats.ts`) returns fixed default stats on the first render, then in `useEffect` reads/creates random LV/HP/MP cached in `localStorage` under `portfolio.header.stats` with a 10-minute TTL. `BattleStage` (`/home`) uses it. `GameHeader` also uses it but is no longer rendered anywhere — `/shop` now shows a GOLD window instead — so it is dead code kept only in case the old header is wanted back

The sound hooks are the exception: `useSound`/`useSoundSettings` read `localStorage` inside their `useState` initializers. Nothing renders that state on page load today (the settings panel is unmounted while closed), so no mismatch surfaces — but any component that shows sound state outside the panel will resurrect it. Follow the `MenuGrid`/`useHeaderStats` pattern in new code rather than copying the hooks.

**Keyboard navigation.** `MenuGrid` (single-column command list: ↑↓ move by 1 and wrap, ←→ do nothing, Enter/Space select) and `WorksShowcase`'s goods list (↑↓ cycle through the works **and** the trailing 「みせを でる」 row, Enter/Space select) handle their own `onKeyDown` on a `tabIndex={0}` container. The title screen listens for Enter on `document`.

## Internationalization (ja / en)

The site is bilingual with **no locale in the URL** — `/`, `/home`, `/shop` serve both languages and the header's settings menu swaps content in place.

- `src/features/i18n/LocaleProvider.tsx` — `LocaleProvider` (mounted in `app/layout.tsx` around `children`), the `useLocale()` hook, and the `Locale` / `LocalizedText` types. Choice persists in `localStorage` under `portfolio-locale`, and an effect keeps `document.documentElement.lang` in sync.
- `src/components/SettingsMenu.tsx` — the language picker lives in the gear dropdown (see Settings menu above).
- Components read `const { locale } = useLocale()` and index their own `Record<Locale, …>` table. There is no `t()` function and no translation-key indirection; the text lives next to the component that renders it.

Rules when adding or editing content:

- **SSR and the first client render are always `ja`** (`DEFAULT_LOCALE`). Never read `localStorage` in a `useState` initializer — that is exactly the bug the sound hooks have.
- **`MessageWindow` must re-type on locale change** — `locale` is in its typing-effect dependency array. Its random `about` pick is held in a `useRef` so switching languages keeps the same episode instead of rerolling.
- **The contact message must literally contain `GitHub`, `X/Twitter`, and `Qiita`** in both locales — `formatContactText` linkifies by substring match, so rewording those parentheticals silently kills the links.
- **`welcome`'s bullet list must match the menu labels** in `Home.tsx` for that locale.
- **`about` should have the same number of entries in both locales** (the index is reused across a language switch).
- Locale-independent chrome (`NAME` / `JOB` / `LV` / `HP` / `MP`, `OPEN PROJECT`, `PRESS ENTER KEY`, prices in `G`) is intentionally left in English as retro-game styling — don't translate it. The settings panel is the exception: its section labels read `げんご` / `サウンド` in Japanese, matching the in-world tone of the menu items.

Not covered by the toggle: `app/layout.tsx` metadata, OG tags, `sitemap.ts`, and `public/manifest.json` are still Japanese-only, since a client-side toggle cannot vary server-rendered `<head>`. Moving to `/ja` + `/en` route segments is what that would require.

## Styling

Three layers coexist — know which one you are touching:

1. **SCSS Modules** (`*.module.scss`) — where nearly all component styling actually lives
2. **NES.css 2.3.0 via CDN** — loaded by a `<link>` in `app/layout.tsx`; barely used now that the header buttons are custom-styled, but still loaded and still affecting inherited `font-family` on `button` elements
3. **Tailwind v4** — `@import "tailwindcss"` in `globals.css`; used only in a few places (e.g. `PixelAvatar`'s sizing utilities)

Palette (`globals.css`): background `#000` (forced with `!important` on `html`/`body`), accent `#e60012`, success `#33ff33`, info `#3333ff`.

Two global rules in `globals.css` will fight you if you don't know about them:

- `*, *::before, *::after { color: #ffffff !important; }` overrides NES.css text colors — **any colored text needs its own `!important`**. Because that selector's specificity is 0,0,0, a class in a `*.module.scss` beats it (`MessageWindow`'s `.link`, `SettingsMenu`'s `.trigger`). Watch for this on any `nes-btn` with a text label: the default variant is white-on-white and the label goes invisible.
- Custom Famicom cursors (`public/cursors/*.svg`) are applied with `!important` under `@media (hover: hover) and (pointer: fine)`

Fonts: `Press Start 2P` via `next/font` (exposed as `--font-press-start-2p`, applied through the `.font-press-start` class); body defaults to `DotGothic16`. `image-rendering: pixelated` is set globally on `body`.

## Config notes

- `next.config.ts` sets security headers, one-year immutable caching for `/fonts`, `/images`, `/sounds`, AVIF/WebP image formats, `experimental.optimizeCss` (needs the `critters` dep), and strips `console.*` in production builds — so `console.log` debugging only works in dev.
- `NEXT_PUBLIC_APP_URL` overrides the canonical base URL used by `layout.tsx` metadata and `sitemap.ts`; it falls back to the Vercel URL.
- `app/sitemap.ts` currently advertises `/about`, `/projects`, `/skills`, `/demos`, `/writing`, `/resume`, `/contact` — **none of these routes exist**. The only real routes are `/`, `/home`, `/shop`.
- `.github/workflows/claude.yml` runs claude-code-action on `@claude` mentions in issues/PR comments, with a Japanese-response system prompt.

## Planned direction

`docs/portfolio-content-ja.md` holds the author's intended content plan (About / Skills / Works / Demos / Writing / Resume / Contact sections, project card fields, metrics). Treat it as a backlog of intent, not as a description of what is built. `docs/design_screen.md` holds screen design notes.
