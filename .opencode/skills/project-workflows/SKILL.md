---
name: Project workflows
description: Use when changing this project's UI, translations, tests, or bilingual blog posts.
---

## Changing the UI

1. Reuse existing components from `src/components/common/`.
2. Place component styles in a neighboring CSS Module.
3. Use the central color tokens; keep dimensions relative and responsive.
4. Check light and dark themes, narrow viewports, keyboard access, and visible focus.

## Adding or changing translations

1. Update matching keys in `src/utils/lang-objects/dutch-lang.tsx` and `english-lang.tsx`.
2. Use the `useLangTranslation` hook instead of hardcoded visible copy.
3. Check the language selector, URL query parameter, and `document.documentElement.lang`.

## Writing blog tutorials

1. Check relevant project configuration, scripts, and history before describing how the project works. Distinguish current behavior from historical attempts or GitHub settings that cannot be confirmed from the repository.
2. Keep the introduction conceptual and put actionable steps afterward, in the order readers will perform them. Explain what commands and configuration do.
3. Include gotchas only when supported by the project or a verified source, and explain both the symptom and the fix.
4. Use generic placeholders by default; use the repository's real values when requested and label them as this project's example.
5. Keep Dutch and English posts aligned and natural in each language.
6. Blog titles are localized in both language files; post files and dates are registered in `src/utils/blog/blog-utils.ts`.
7. Keep measured results distinct from general claims. Provider models, prices, and limits can change; do not infer a fixed quota from one test. For the current Codespaces model test, describe the free limit as arriving sooner than expected.

## Validation

- Tests: `npm test -- --run`
- Production build: `npm run build`
- After adding or editing external documentation links, run `npm run test:doc-links`.
- For styling changes, check for `px` units and standalone color literals.
- Publish with `npm run deploy` only after explicit user approval.
