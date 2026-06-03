# Ezequiel Breiterman — Portfolio

A creative-technologist portfolio for **Ezequiel Breiterman** — motion designer, 3D animator, and creative developer based in Buenos Aires.

Built as an immersive, awwwards-leaning experience: real-time WebGL backgrounds, a scroll-driven 3D core, custom cursor, magnetic buttons, tilt cards, scramble text, a film-grain overlay, and Lenis smooth scrolling.

## Tech

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Three.js** / **@react-three/fiber** / **@react-three/drei** — WebGL scenes
- **GSAP** + **Framer Motion** — animation
- **Lenis** — smooth scroll
- **CSS Modules** + a token-based design system (`globals.css`)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
src/
  app/                 # layout, page, global styles, metadata
  components/
    sections/          # Hero, About, Works, Skills, Experience, Contact, FooterCTA
    three/             # HeroScene, AboutScene, ProjectThumbScene
    ui/                # Nav, Preloader, CustomCursor, MagneticButton, TiltCard, ...
    layout/            # GlobalBackground (global WebGL)
  data/                # projects, experience, skills
public/images/projects # project thumbnails
```

Project data lives in [`src/data/projects.ts`](src/data/projects.ts) — add an entry there to feature new work.

## Deploy

Deployed on **Vercel**. Pushing to `main` triggers an automatic production deployment once the repo is connected on the Vercel dashboard.
