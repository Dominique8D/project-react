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

## Validation

- Tests: `npm test -- --run`
- Production build: `npm run build`
- For styling changes, search for remaining `px` units and standalone color literals.
- Publish with `npm run deploy` only after explicit user approval.