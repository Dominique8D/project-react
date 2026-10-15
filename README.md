# GitHub Codespaces ♥️ React

Welcome to your shiny new Codespace running React! We've got everything fired up and running for you to explore React.

You've got a blank canvas to work on from a git perspective as well. There's a single initial commit with the what you're seeing right now - where you go from here is up to you!

Everything you do here is contained within this one codespace. There is no repository on GitHub yet. If and when you’re ready you can click "Publish Branch" and we’ll create your repository and push up your project. If you were just exploring then and have no further need for this code then you can simply delete your codespace and it's gone forever.

This project was bootstrapped for you with [Vite](https://vitejs.dev/).

## Available Scripts

In the project directory, you can run:

# Project React

A bilingual React app with a portfolio homepage, blog, and about page. It uses Vite, React Router with hash-based routes, react-i18next, and CSS Modules.

## Development

```sh
npm install
npm start
```

Vite runs at `http://localhost:3000/project-react/`.

## Checks

```sh
npm test -- --run
npm run build
```

## Styling

- Component styles live in CSS Modules beside their components.
- Use `rem`, relative units, and responsive CSS; do not add `px` values.
- Use CSS variables for component colors. Central blue and green light/dark tokens are in `src/providers/theme-provider.module.css`.
- Maintain readable contrast in both color modes and respect `prefers-reduced-motion`.
- Prefer semantic HTML and small shared components from `src/components/common/`.
- Custom SVG icons live in `src/icons/` and are imported individually.

## Languages

Supported languages are Dutch (`nl`) and English (`gb`). Translations live in `src/utils/lang-objects/`. Keep both language files aligned and test visible copy and the document language when changing language behavior.

## Deployment

`npm run deploy` builds the site and publishes `dist/` to GitHub Pages. Run it only after explicit approval of the changes.
