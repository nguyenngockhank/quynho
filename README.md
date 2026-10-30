# ❤️ Happy Anniversary, My Love — A Cinematic Anniversary Website

An ultra-premium, interactive digital love story you can gift to your partner.
Warm cream & gold, elegant typography, a 3D particle heart, a galaxy of your
memories, and a lantern-lit finale that signs off *"Forever Yours."*

Built with **TypeScript · React · Three.js (R3F) · GSAP (ScrollTrigger) · Framer Motion · Lenis smooth scroll**.

---

## ✨ Quick Start

```bash
npm install
npm run dev      # open the printed http://localhost:5173 URL
```

Build for production / deploy:

```bash
npm run build    # type-checks, then outputs a static site to /dist
npm run preview  # preview the production build (fast, deploy-identical)
npm run typecheck # TypeScript check without emitting files
```

Deploy the `/dist` folder to any static host (Netlify, Vercel, GitHub Pages).
Configs for Netlify (`netlify.toml`) and Vercel (`vercel.json`) are included.

---

## 💛 Make It Yours (no coding needed)

Everything personal lives in **`/src/data/`**:

| File | What it controls |
|------|------------------|
| `config.ts`   | **Names** (`name`, `heroName`, `signature`) + **anniversary date** (drives the counter) |
| `memories.ts` | Page 2 galaxy stars + Page 3 memory-book — your story, moment by moment |
| `quotes.ts`   | Floating love quotes in the Memory Universe |
| `messages.ts` | Page 3 — your love notes |
| `book.ts`     | The 6 photos inside the opened anniversary book |

### Add your photos
1. Put image files in **`/source-photos/`** (e.g. `first.jpg`, `second.jpg` …).
2. Run **`npm run photos`** — it converts them to optimized WebP in `/public/photos`.
3. In `memories.ts` / `book.ts`, set each `image` to e.g. `'/photos/first.webp'`.

Until you add photos, the site shows tasteful gold placeholder cards — so it
looks intentional out of the box and stays private-safe to share.

---

## 🎬 The Three Chapters

**I — The Beginning** · a glowing 3D particle heart + *"Happy Anniversary, My Love."*

**II — Memory Universe** · a draggable, zoomable galaxy of your photo-memories
connected by golden constellation lines, floating love quotes, and a live
anniversary counter (years · months · days).

**III — Celebration** · golden doors part to reveal your memory book, a wall of
love notes, a particle finale that morphs ❤ → **YOU & ME**, and a release of
glowing lanterns signed *"With All My Love, Forever Yours."*

---

Made with love. 🥂  *See `DEPLOY.md` for step-by-step hosting.*
