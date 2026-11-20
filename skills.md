# Project Skills

## Changing the UI

1. Reuse existing components from `src/components/common/`.
2. Place component styles in a neighboring CSS Module.
3. Use the central color tokens; keep dimensions relative and responsive.
4. Check light and dark themes, narrow viewports, and keyboard focus.

## Adding or changing translations

1. Update matching keys in `dutch-lang.tsx` and `english-lang.tsx`.
2. Use the `useLangTranslation` hook instead of hardcoded visible copy.
3. Check the language selector, URL query parameter, and `document.documentElement.lang`.

## Writing blog tutorials

1. Check the relevant project configuration, scripts, and history before describing how the project works. Distinguish current behavior from historical attempts or GitHub settings that cannot be confirmed from the repository.
2. Keep the introduction conceptual and put actionable steps afterward, in the order the reader will perform them. Explain what commands and configuration do.
3. Include gotchas only when supported by the project or a verified source, and explain both the symptom and the fix.
4. Use generic placeholders by default; use the repository's real values when the user requests a concrete example.
5. Keep Dutch and English blog posts aligned, add external links to `npm run test:doc-links`, and run that check after changing documentation links.
6. Blog titles are localized in the language files; post dates are defined in `getBlogPosts` and displayed both in the list and the open-post dialog.

## Validation

- Tests: `npm test -- --run`
- Production build: `npm run build`
- For styling changes, search for remaining `px` units and standalone color literals.
- Publish with `npm run deploy` only after explicit user approval.