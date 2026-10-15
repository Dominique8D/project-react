# Agent Guidelines

- Read the relevant component, CSS Module, translations, and tests before making changes.
- Do not use MUI or Emotion. Build UI with semantic HTML, CSS Modules, and existing shared components.
- Do not add `px` units or standalone color literals. Use relative units and the central color tokens in `src/providers/theme-provider.module.css`.
- Add visible copy to both Dutch and English translations.
- Keep custom icons as small, separate imports in `src/icons/`; use `currentColor`.
- Preserve keyboard access, visible focus, color contrast, and reduced-motion support.
- After UI changes, run `npm test -- --run` and `npm run build`.
- Never commit, push, or deploy without the user's explicit approval.