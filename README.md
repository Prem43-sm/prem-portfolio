# Premnarayan Chandra — Portfolio (React + Vite + Tailwind)

A single-page portfolio website built with **React (19)**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

## Features
- Animated landing/hero with parallax background and animated progress bar
- Interactive cursor glow effect
- Sections: About, GitHub profile, Skills, Progress milestones, Projects, Journey, Contact
- Project cards populated from local constants/images under `public/`
- Styling via Tailwind theme extensions (custom colors, shadows, animations)

## Tech Stack
- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

## Project Structure
- `src/App.jsx` — main UI and data for the portfolio page
- `src/main.jsx` — React entry point
- `src/index.css` — Tailwind directives + custom utility classes
- `src/config/animeImages.js` — paths to images used in the UI (from `public/`)
- `public/` — static images (profile, projects, Solo Leveling backgrounds, etc.)

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run development server
```bash
npm run dev
```

### 3) Build for production
```bash
npm run build
```

### 4) Preview production build
```bash
npm run preview
```

## Notes
- Image references like `/profile/pp1.png` and `/solo-leveling/...` expect files to exist under `public/`.
- The dev server uses `--host 0.0.0.0` to allow access from other devices on the network.

## License
MIT (add your preferred license text if needed)

