# Yeahzy

> **In this codebase:** colour, font and radius tokens live in `tailwind.config.js` (e.g. `bg-brand`, `bg-surface-100`, `text-on-brand`, `font-display`, `rounded-md`) and as CSS variables in `src/index.css`, which also defines the type styles (`type-logo`, `type-hero`, `type-title`, `type-card-title`, `type-sheet-title`, `type-label`). The full token list is in `design-system/tokens.json`; the components below are implemented in `src/components/ui.tsx`, `EventCard.tsx` and `ShareSheet.tsx`. Logo files are in `public/brand/`. Fonts are bundled via `@fontsource-variable`.

Yeahzy is a TikTok-style mobile web app for finding things to do in your city. You swipe up through full-screen event cards, save what you like and share it with friends. The design gets out of the way: a black canvas, white type and icons, one hit of yellow, and the event imagery doing the heavy lifting.

## Principles

- **Images first.** Event cards are full-bleed photos or video. UI sits on top, never beside. If a screen feels busy, remove chrome before shrinking the image.
- **Bold but stripped back.** Big, tight display type; almost nothing else. No borders, shadows or decoration unless they do a job.
- **One yellow thing.** `brand` marks the single most important action on a screen (Continue, Get tickets, Let's go), selection states and progress. Two big yellow buttons on one screen means one of them is wrong.
- **Dark by design.** The app is dark-only. `ink` is the canvas; menus, sheets and panels step up to `surface-100`.

## Content and voice

Short, warm and a bit cheeky, in British English. Talk like a friend who knows what's on.

- Headlines are questions or statements, never labels: "Where are you at?", "What are you into?", "Your city. Tonight."
- Buttons are verbs, two words max where possible: "Continue", "Let's go", "Get tickets", "Copy link".
- Event descriptions: one or two sentences on the vibe and one practical nudge ("Come early for a spot by the rail").
- Meta lines use a middle dot: "Tonight · 8pm–11pm", "Peckham · 1.2 mi".
- Prices: "£12", "Free". Dates: "Fri 3 Oct", "Tonight".
- No emoji in UI copy.

## Visual foundations

**Colour.** `ink` background, `text-primary` white for type and icons, `text-secondary` for meta, `text-tertiary` for section labels. Surfaces step up `surface-100` → `surface-200` → `surface-300`. `brand` yellow always carries `on-brand` text.

**Type.** Two families. Bricolage Grotesque 800 (`--font-display`) for anything headline-sized, set tight (negative tracking, leading under 1). DM Sans (`--font-sans`) for everything else. Both load from Google Fonts:
`https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap`

**Logo.** The Yeahzy logo is the wordmark "Yeahzy", capital Y, set in Bricolage Grotesque 800 with -0.055em tracking and outlined into a vector file. Always use the files in `public/brand/` rather than retyping it: black (`on-brand`) on the yellow splash, yellow (`brand`) or white on black everywhere else. Keep clear space of at least the height of the "e" around it, and never stretch, recolour outside those three inks, or add effects.

**Layout.** Designed at 390 × 844. Gutters are `space-16` on the feed and onboarding, `space-20` on detail, auth and sheets. Primary buttons pin `space-28` from the bottom. Every tap target is at least `touch-min`.

**Shape.** Buttons, chips and icon circles are pills (`radius-pill`). Inputs and tiles use `radius-md`, panels `radius-lg`, sheets `radius-xl` on the top corners. Tags are the one square-ish element (`radius-tag`).

**Imagery.** Full-bleed, edge to edge, behind a scrim that runs from clear at mid-height to `scrim` at the bottom (and a light darkening at the top), so white text passes contrast on any photo. Moody, real, people-in-the-moment photography over flat-lays or stock smiles.

## Iconography

Simple line icons: 24px grid, 1.8–2px stroke, round caps and joins, always `text-primary` white. A filled icon means an active state (a saved bookmark fills `brand`). Inline SVG with `currentColor`; no icon fonts, no emoji. Core set: compass (Discover), search, bookmark (Saved), person (You), share arrow, map pin, calendar, back chevron, close, more (three dots), mute, eye.

## Components

Button, IconButton, Tag, Chip, Input, ProgressBar, BottomNav, InfoPanel and EventCard. Each is documented in its own card with states and the tokens it uses. They are HTML/CSS patterns, not a code library yet.
