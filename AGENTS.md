# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Naming and Folder Structure (Must Follow)

The canonical rule set is documented in:

- `docs/naming-and-folder-structure.md`

Apply these conventions for all new and modified files:

- React component files in `src/components` and `src/features`: `PascalCase.tsx`
- Component style files: `PascalCase.module.scss` (same base name as component)
- Hooks/utilities: `camelCase.ts` or `camelCase.tsx`
- Next.js App Router reserved files in `src/app` remain reserved names (`page.tsx`, `layout.tsx`, `sitemap.ts`, `globals.css`)
- Use `@/` alias for cross-folder imports

## Folder Responsibility

- `src/app`: route entry points and metadata
- `src/components`: reusable cross-feature UI parts
- `src/features`: feature/domain grouped UI and logic
