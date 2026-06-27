# nova. — Digital Excellence Web Agency

A modern, performance-driven website for a digital agency specializing in custom web development and cutting-edge tech solutions. Rebuilt on **Astro + Tailwind CSS v4** for near-zero JS, fast builds, and first-class Netlify deployment.

## Stack

- [Astro](https://astro.build/) — static-first framework, component islands
- [Tailwind CSS v4](https://tailwindcss.com/) — via `@tailwindcss/vite`, theme tokens defined in `src/styles/global.css`
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — automatic sitemap generation
- Netlify Forms — real, working contact form (no client-side JS interception)

## Project structure

```
nova.web/
├── astro.config.mjs
├── package.json
├── netlify.toml
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/              logo, social icons, hero art
└── src/
    ├── layouts/Layout.astro     shared <head>, header/footer, SEO/OG tags
    ├── components/              Header, Footer, ServiceCard, ProjectCard, ContactForm, etc.
    ├── data/projects.ts         single source of truth for portfolio + case-study content
    ├── styles/global.css        Tailwind v4 theme tokens + custom utility classes
    └── pages/
        ├── index.astro          Homepage
        ├── services.astro
        ├── portfolio.astro
        ├── process.astro
        ├── blog.astro
        ├── careers.astro
        ├── faq.astro
        ├── privacy.astro
        ├── terms.astro
        ├── thank-you.astro      Netlify Forms success page
        └── work/[slug].astro    Dynamic case-study route (vortex-retail, quantify-data, ascend-wealth)
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to dist/
npm run preview   # preview the production build locally
```

## Deployment

Configured for Netlify via `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Contact form on the homepage (`/#contact`) is a real Netlify Forms submission — `data-netlify="true"`, a hidden `form-name` field, and a honeypot field. Successful submissions redirect to `/thank-you`.

## Notes on this rebuild

The previous static HTML/CSS/JS version of this site had several real bugs that are fixed here:

- The mobile hamburger menu didn't work (JS/CSS class name mismatch) — now a single `Header.astro` component drives consistent behavior on every page.
- The contact form never actually sent data anywhere (it faked success with a `setTimeout` + `alert()`) — it now submits a real Netlify Forms POST.
- Several pages referenced project screenshots that didn't exist, producing broken images — replaced with designed placeholder artwork (`ProjectArt.astro`).
- Branding and footer social icons were inconsistent across pages — now centralized in shared components.
