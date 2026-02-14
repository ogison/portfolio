# Naming and Folder Structure Guide

This document defines naming conventions and folder structure rules for this repository.

## 1. Naming Rules

### 1.1 React Components (`components/`, `features/`)

- Component file name: `PascalCase.tsx`
- Component style file name: `PascalCase.module.scss`
- Rule: keep the base name identical between component and style files.

Examples:

- `GameHeader.tsx` + `GameHeader.module.scss`
- `WorksShowcase.tsx` + `WorksShowcase.module.scss`
- `StartScreen.tsx` + `StartScreen.module.scss`

### 1.2 Hooks and Utility Files

- Hook and utility files: `camelCase.ts` or `camelCase.tsx`

Examples:

- `useSound.ts`
- `contactUtils.tsx`

### 1.3 Next.js App Router Files (`src/app`)

Follow Next.js reserved names:

- `page.tsx`
- `layout.tsx`
- `sitemap.ts`
- `globals.css`

Do not rename reserved routing files to PascalCase.

## 2. Folder Structure (Current)

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css
    sitemap.ts
    home/
      page.tsx
    shop/
      page.tsx

  components/
    StartScreen.tsx
    StartScreen.module.scss
    SoundToggle.tsx

  features/
    avatar/
      PixelAvatar.tsx
      PixelAvatar.module.scss
    header/
      GameHeader.tsx
      GameHeader.module.scss
    home/
      Home.tsx
      Home.module.scss
    menu/
      MenuGrid.tsx
      MenuGrid.module.scss
    message/
      MessageWindow.tsx
      MessageWindow.module.scss
      useSound.ts
      contactUtils.tsx
    shop/
      WorksPageContent.tsx
      WorksPageContent.module.scss
      WorksShowcase.tsx
      WorksShowcase.module.scss
```

## 3. Layer Responsibilities

- `app/`: route entry points and page metadata.
- `components/`: reusable cross-feature UI parts.
- `features/`: domain-level UI and logic grouped by feature.

## 4. Import Policy

- Use path alias imports (`@/`) for cross-folder imports.
- Keep relative imports only for files within the same feature folder when practical.

Examples:

- `import GameHeader from "@/features/header/GameHeader";`
- `import styles from "./WorksPageContent.module.scss";`

## 5. Rules for New Files

When adding a new feature component:

1. Create `FeatureName.tsx`
2. Create `FeatureName.module.scss` (if styling is needed)
3. Place both in the same feature folder
4. Keep naming consistent with the existing patterns above
