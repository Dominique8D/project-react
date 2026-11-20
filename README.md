# Project React

A bilingual React app with a portfolio homepage, blog, and about page. It uses Vite, React Router with hash-based routes, react-i18next, and CSS Modules.

## Development

```sh
npm install
npm start
```

Vite runs at `http://localhost:3000/project-react/`.

## OpenCode in GitHub Codespaces

Start OpenCode from this project's Codespace terminal:

```sh
npm run opencode
```

On first use, connect a provider with `/connect` and choose a model with
`/models`. The built-in Plan and Build agents are available through `/agents`
or `Shift+Tab`.

OpenCode reads project instructions from [AGENTS.md](./AGENTS.md) and task
workflows from
[.opencode/skills/project-workflows/SKILL.md](./.opencode/skills/project-workflows/SKILL.md).

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
