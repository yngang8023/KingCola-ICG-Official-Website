# KingCola-ICG Official Website

This repository contains the frontend source code of the KingCola-ICG official website.  
It is built with React + Vite and includes homepage visuals, project showcase, Markdown-driven project detail pages, events, development timeline, and skills pages.

## 1. Overview

- Project name: `kingcola-icg-official-website`
- Type: Visual-first team official website
- Runtime model: Static frontend site (deployable on Nginx, Vercel, etc.)

## 2. Tech Stack

- `React 18`
- `Vite 6`
- `React Router DOM 6`
- `Tailwind CSS`
- `Framer Motion`
- `@react-three/fiber` + `@react-three/drei` + `three`
- `React Markdown` + `remark-gfm`

## 3. Routes

Current routes are defined in `src/App.jsx`:

- `/` Home
- `/projects` Project list
- `/projects/:id` Project detail
- `/envents` Events page (kept for backward compatibility)
- `/development` Development timeline
- `/skills` Skills page
- `*` 404 page

## 4. Project Structure

```text
.
├─ deploy/                    # Nginx config templates
├─ public/                    # Public static assets
├─ scripts/
│  └─ compress-dist.mjs       # Generate pre-compressed .gz/.br files after build
├─ src/
│  ├─ assets/                 # Images, 3D models, Markdown, styles
│  ├─ components/             # Shared and visual components
│  ├─ constants/              # Structured static data
│  ├─ hooks/                  # Business hooks
│  ├─ pages/                  # Route pages
│  ├─ App.jsx                 # Router and global layout
│  └─ main.jsx                # App entry
├─ index.html
├─ package.json
├─ vercel.json
└─ vite.config.js
```

## 5. Local Development

### 5.1 Requirements

- Node.js `>= 18` (LTS recommended)
- npm `>= 9`

### 5.2 Install Dependencies

```bash
npm install
```

### 5.3 Start Dev Server

```bash
npm run dev
```

Dev server options from `vite.config.js`:

- `PORT` or `VITE_DEV_PORT` (default: `8081`)
- `VITE_DEV_OPEN` (default: `true`)

### 5.4 Preview Production Build

```bash
npm run build
npm run serve
```

## 6. Build Notes

### 6.1 Build Commands

- `npm run build:raw`: Vite build only
- `npm run build`: Vite build + pre-compression step

### 6.2 Pre-compression

`scripts/compress-dist.mjs` scans `dist/` and generates:

- `*.gz`
- `*.br`

When Nginx is configured with `gzip_static on;` and `brotli_static on;`, these files can be served directly for better performance.

## 7. Content Maintenance

### 7.1 Project Content (Recommended)

Project list and details are driven by `src/assets/md/projects/*.md`.  
Parsing logic is in `src/constants/projectsData.js`.

Use template:

- `src/assets/md/projects/_template.md`

Main frontmatter fields:

- `id`: route id for `/projects/:id`
- `name`: project name
- `description`: one-line summary
- `techStack`: tech stack array
- `keywords`: keyword/member tags
- `html_url`: external link
- `order`: sort weight (smaller means earlier)

Markdown body is rendered automatically on the project detail page.

### 7.2 Events Content

Edit `src/constants/Events.js`:

- `EventsTop`: top carousel
- `programs`: timeline/main event list

### 7.3 Development Timeline

Edit `src/constants/developmentTimeline.js`.

### 7.4 Blog Data

Edit `src/constants/Blogs/Articles.js` (currently static sample-style data).

## 8. Deployment

### 8.1 Nginx

References:

- `deploy/nginx.conf` (generic)
- `deploy/nginx.www.kingcola-icg.cn.conf` (domain-specific example)

For SPA routing, keep:

- `try_files $uri $uri/ /index.html;`

Recommended caching strategy:

- Disable strong cache for `index.html`
- Long cache + `immutable` for hashed assets
- Enable `gzip_static` / `brotli_static` when available

### 8.2 Vercel

`vercel.json` is included and already configured for SPA rewrites.

## 9. UX Notes (Implemented)

- Loading page avoids long blocking under weak network
- No repeated full-screen loading overlay after first content render
- Footer does not flash during route transitions
- Homepage 3D section has mobile compatibility optimizations

## 10. Common Issues

### 10.1 404 on Refreshing a Sub-route

Cause: SPA fallback is missing on server.  
Fix: ensure `try_files $uri $uri/ /index.html;` is configured.

### 10.2 New Project Not Showing Up

Checklist:

- Markdown file is under `src/assets/md/projects/`
- `id` in frontmatter is valid
- `order` is set as expected
- Build cache/CDN cache is refreshed

### 10.3 Mismatch Between HTML and Hashed Assets

Ensure `index.html` is not strongly cached to avoid old entry files referencing new asset hashes.

## 11. Open-source Security Notes

- Never commit real secrets, certificate keys, or passwords
- Use placeholders in public Nginx samples
- Review `.env` before publishing

## 12. Contribution Notes

- Run `npm run dev` and `npm run build` before opening PR
- Suggested PR content: scope, impacted pages, verification steps, screenshots (for UI changes)
