# Yeahzy

TikTok-style mobile web app for finding things to do in your city. Built from the Yeahzy designs and design system.

- **Stack:** Vite, React, TypeScript, Tailwind CSS, React Router.
- **Design tokens:** `tailwind.config.js` (colours, fonts, radii) and CSS variables plus type styles in `src/index.css`.
- **Screens:** `src/pages/` (splash, auth, onboarding, feed, event detail, saved, search, you).
- **Components:** `src/components/` (EventCard with image/carousel/video, ShareSheet, UI kit, icons).
- **Mock data:** `src/data/events.ts`. Event media uses drawn placeholder scenes; set `image` / `video` on an event to use real photos or video.
- **State:** saved events and onboarding choices persist in localStorage (`src/state/AppState.tsx`).

```sh
npm install
npm run dev
```

## Design system

The Yeahzy design system travels with the code in `design-system/`: the brand book (`README.md`), every token (`tokens.json`), logo rules (`logos.md`) and a guideline page per component (`components/`). The official logo files are in `public/brand/`.
