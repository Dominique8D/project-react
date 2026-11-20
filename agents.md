# Agent Guidelines

- Read the relevant component, CSS Module, translations, and tests before making changes.
- Do not use MUI or Emotion. Build UI with semantic HTML, CSS Modules, and existing shared components.
- Do not add `px` units or standalone color literals. Use relative units and the central color tokens in `src/providers/theme-provider.module.css`.
- Add visible copy to both Dutch and English translations.
- Keep custom icons as small, separate imports in `src/icons/`; use `currentColor`.
- Preserve keyboard access, visible focus, color contrast, and reduced-motion support.
- After UI changes, run `npm test -- --run` and `npm run build`.
- Never commit, push, or deploy without the user's explicit approval.
- Use neutral, matter-of-fact language in documentation and user-facing content.
- Keep documentation concise and actionable; remove repetition and unnecessary background.
- Do not write as though you are the user or imply that the user authored an explanation or experience. Avoid first-person claims unless the user explicitly requests first-person copy.
- If the user's intended meaning, terminology, or requirements are unclear, ask concise clarifying questions instead of guessing or inventing details.
- Run `npm run test:doc-links` after adding or editing documentation links and periodically to check links in existing guides.
- Use generic placeholders in tutorials by default; when the user asks for a concrete example, use the current repository's real values and label them as this project's example.
- Introduce scripts and commands before referring to them, and state when the reader must add configuration rather than implying it already exists.
- Order instructions in the sequence the reader will perform them; explain GitHub-managed workflows separately from command-line deployment tools.
- Use official documentation titles in their original language. Bold key terms where helpful, but do not color every bold phrase.