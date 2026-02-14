# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Famicom/NES-style portfolio website built with Next.js 15, featuring an 8-bit retro gaming aesthetic combined with modern web technologies. The design philosophy follows "PLAYFUL CODE, REAL IMPACT" - delivering professional content through a nostalgic gaming interface.

## Naming and Folder Structure (Must Follow)

The canonical rule set is documented in:

- `docs/naming-and-folder-structure.md`

When creating or editing files, follow these rules first:

- React component files in `src/components` and `src/features`: `PascalCase.tsx`
- Component style files: `PascalCase.module.scss` (same base name as component)
- Hooks/utilities: `camelCase.ts` or `camelCase.tsx`
- Next.js App Router reserved files in `src/app` remain reserved names (`page.tsx`, `layout.tsx`, `sitemap.ts`, `globals.css`)
- Use `@/` alias for cross-folder imports

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Install Husky hooks (runs automatically on npm install)
npm run prepare
```

## Architecture & Structure

### Tech Stack

- **Framework**: Next.js 15.5.2 with App Router + React 19
- **Language**: TypeScript 5.6+ (strict mode)
- **Build Tool**: Turbopack (dev & production)
- **Styling**: Tailwind CSS v4 + NES.css (CDN)
- **Font**: Press Start 2P (next/font optimized)
- **Code Quality**: ESLint 9, Prettier 3, Husky, lint-staged
- **Performance**: Partial Prerendering (PPR), Streaming

### Key Design Patterns

#### 1. Famicom/8-bit UI Components

All UI components follow retro gaming conventions:

- **Color Palette**:
  - Primary accent: `#e60012` (Nintendo red)
  - Background: `#1a1a1a`
  - Text: `#f5f5f5`
- **Pixel borders**: 2px solid borders with box shadows
- **Animations**: Pixel-perfect movements, blink effects, bounce animations
- **Typography**: Press Start 2P font for headings, maintaining readability

#### 2. Component Structure

```
src/components/
├── Hero.tsx           # Landing hero section with "PRESS START" CTA
├── Navigation.tsx     # Keyboard-navigable menu (↑↓←→ + Enter)
├── ProjectCard.tsx    # Project showcase cards with impact metrics
└── PixelButton.tsx    # A/B button-style interactive elements
```

#### 3. Keyboard Navigation

The site supports full keyboard navigation:

- Arrow keys for menu navigation
- Enter/Space for selection
- Escape to close menus
- Focus states with red outline (`#e60012`)

## Design Requirements (from docs/portfolio-content-ja.md)

### Content Sections to Implement

- **Home**: Hero, 3-line summary, project highlights, CTAs
- **About**: Personal introduction, timeline, work style
- **Skills**: Core competencies, tech stack, design principles
- **Works/Projects**: 6-8 featured projects with metrics
- **Demos/Labs**: Interactive experiments and mini-games
- **Writing/Notes**: Technical articles and learning logs
- **Resume**: 1-page PDF, ATS-friendly
- **Contact**: Form with spam protection, social links

### Project Card Data Structure

Projects should include:

- Title, summary, role, team composition
- Impact metrics (quantified improvements)
- Tech stack tags
- Links to demo/repository
- Architecture diagrams (pixel-art style)

## Styling Guidelines

### CSS Custom Properties

```css
--background: #1a1a1a --foreground: #f5f5f5 --accent: #e60012 --success: #92cc41 --warning: #f7d51d
  --error: #e76e55;
```

### Responsive Design

- Mobile-first approach
- Breakpoints: `md:768px`, `lg:1024px`
- Touch-friendly with keyboard fallbacks

## Implementation Notes

### NES.css Integration

The project uses NES.css via CDN for authentic 8-bit UI components. Use classes like:

- `nes-btn` for buttons
- `nes-container` for bordered boxes
- `is-primary`, `is-success` for variants

### Performance Considerations

- Image rendering set to `pixelated` for authentic 8-bit look
- Lazy loading for project images
- Minimal animation durations (< 500ms)

### Accessibility

- Maintain WCAG AA contrast ratios
- Provide keyboard alternatives for all interactions
- Sound effects default to OFF
- Clear focus indicators

## Future Development Areas

### Planned Features

1. **Data Layer**: Create `/src/data/` for projects, skills, experience
2. **Custom Hooks**: Implement `/src/hooks/useKeyboardNavigation.ts`
3. **Type Definitions**: Add `/src/types/` for project interfaces
4. **Utility Functions**: Build `/src/lib/` for common operations
5. **Interactive Elements**: KONAMI code easter egg, achievement system
6. **Internationalization**: Japanese/English language toggle

### Content Management

- Projects should be stored as structured data (JSON/YAML)
- Support for MDX for rich content in project details
- Automated OG image generation with 8-bit frames

## Next.js 15 Best Practices

### App Router Patterns

```typescript
// Server Component (default) - for static content
export default function ProjectsPage() {
  // Server-side data fetching
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}

// Client Component - for interactivity
"use client";
import { useState } from "react";
export function KeyboardNavigation() {
  const [selected, setSelected] = useState(0);
  // Interactive logic here
}
```

### Server vs Client Components

- **Server Components** (default): Static content, data fetching, SEO
- **Client Components** (`"use client"`): User interactions, browser APIs, React hooks
- **Boundary Pattern**: Keep client components as leaf nodes when possible

### Data Fetching & Streaming

```typescript
// Streaming with Suspense
import { Suspense } from "react";

export default function ProjectsLayout() {
  return (
    <Suspense fallback={<PixelSpinner />}>
      <ProjectGrid />
    </Suspense>
  );
}

// Server Actions for forms
export async function submitContact(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  // Validation and processing
}
```

### Performance Optimization

```typescript
// Dynamic imports for code splitting
const GameComponent = dynamic(() => import("@/components/Game"), {
  loading: () => <PixelLoader />,
});

// Image optimization
import Image from "next/image";
<Image
  src="/projects/screenshot.png"
  alt="Project screenshot"
  width={640}
  height={480}
  style={{ imageRendering: "pixelated" }}
  priority={false}
  placeholder="blur"
/>;
```

## TypeScript Best Practices

### Strict Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type-Safe Patterns

```typescript
// Utility types for project data
type ProjectBase = {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
};

type ProjectWithMetrics = ProjectBase & {
  impact: Record<string, number>;
  testimonial?: string;
};

// Template literal types for theme colors
type ThemeColor = `--${"background" | "foreground" | "accent" | "success" | "warning" | "error"}`;

// Generic constraints for components
interface PixelButtonProps<T extends string = "button"> {
  variant: "A" | "B" | "START" | "SELECT";
  as?: T;
  children: React.ReactNode;
}

// The satisfies operator for type safety
const projectConfig = {
  maxItems: 8,
  categories: ["web", "mobile", "game"] as const,
  filters: {
    tech: ["nextjs", "react", "typescript"],
    type: ["frontend", "fullstack", "backend"],
  },
} satisfies {
  maxItems: number;
  categories: readonly string[];
  filters: Record<string, string[]>;
};
```

### Component Type Patterns

```typescript
// Polymorphic component pattern
type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

function PixelContainer<T extends React.ElementType = "div">({
  as,
  children,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || "div";
  return <Component className="nes-container" {...props}>{children}</Component>;
}

// Forward ref with generics
const PixelInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    variant?: "primary" | "success" | "warning" | "error";
  }
>(({ variant = "primary", ...props }, ref) => {
  return <input ref={ref} className={`nes-input is-${variant}`} {...props} />;
});
```

## Code Organization & Architecture

### File Structure (Enhanced)

```
src/
├── app/                          # Next.js App Router
│   ├── (routes)/                # Route groups
│   │   ├── about/
│   │   ├── projects/
│   │   └── contact/
│   ├── api/                     # API routes
│   ├── globals.css
│   ├── layout.tsx              # Root layout
│   ├── loading.tsx             # Global loading UI
│   ├── error.tsx               # Global error UI
│   ├── not-found.tsx           # 404 page
│   └── page.tsx                # Home page
├── components/                  # Reusable UI components
│   ├── ui/                     # Base UI components
│   │   ├── PixelButton.tsx
│   │   ├── PixelContainer.tsx
│   │   └── PixelInput.tsx
│   ├── forms/                  # Form components
│   ├── navigation/             # Navigation components
│   └── layout/                 # Layout components
├── lib/                        # Utility functions
│   ├── utils.ts               # General utilities
│   ├── validations.ts         # Zod schemas
│   ├── constants.ts           # App constants
│   └── types.ts               # Shared types
├── hooks/                      # Custom React hooks
│   ├── useKeyboardNavigation.ts
│   ├── useLocalStorage.ts
│   └── usePixelAnimations.ts
├── data/                       # Static data & content
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
└── styles/                     # Global styles
    ├── globals.css
    └── components.css
```

### Component Composition

```typescript
// Compound component pattern
const ProjectCard = {
  Root: ({ children, ...props }: React.PropsWithChildren<{}>) => (
    <div className="nes-container with-title" {...props}>
      {children}
    </div>
  ),
  Title: ({ children }: { children: React.ReactNode }) => (
    <p className="title">{children}</p>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <div className="content">{children}</div>
  ),
  Actions: ({ children }: { children: React.ReactNode }) => (
    <div className="actions">{children}</div>
  ),
};

// Usage
<ProjectCard.Root>
  <ProjectCard.Title>Project Name</ProjectCard.Title>
  <ProjectCard.Content>Description</ProjectCard.Content>
  <ProjectCard.Actions>
    <PixelButton variant="A">View Demo</PixelButton>
  </ProjectCard.Actions>
</ProjectCard.Root>
```

## Security Best Practices

### Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // For NES.css
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "img-src 'self' data: blob:",
    ].join("; "),
  },
];
```

### Environment Variables

```typescript
// lib/env.ts - Type-safe environment variables
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URL: z.string().optional(),
  EMAIL_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

### Server Actions Security

```typescript
// Server action with validation
import { z } from "zod";
import { redirect } from "next/navigation";

const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export async function submitContactForm(formData: FormData) {
  "use server";

  const result = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!result.success) {
    throw new Error("Invalid form data");
  }

  // Process form submission
  await sendEmail(result.data);
  redirect("/contact/success");
}
```

## Code Conventions

### Component Guidelines

- Use Server Components by default, Client Components only when needed
- Implement proper TypeScript types for all props
- Use compound component patterns for complex UI
- Apply `image-rendering: pixelated` for retro graphics
- Leverage React 19's automatic batching and concurrent features

### State Management

```typescript
// URL state for navigation (recommended)
import { useSearchParams, useRouter } from "next/navigation";

function useProjectFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = {
    category: searchParams.get("category") || "all",
    tech: searchParams.getAll("tech"),
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams(searchParams);
    // Update logic
    router.push(`/projects?${params.toString()}`);
  };

  return { filters, updateFilters };
}
```

### Performance Guidelines

- Use `next/dynamic` for code splitting heavy components
- Implement proper loading states with Suspense
- Optimize images with `next/image` and appropriate sizing
- Use `next/font` for font optimization
- Leverage Partial Prerendering (PPR) for static/dynamic content mix

### Testing Approach

```typescript
// Recommended test setup (when implementing)
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// Focus areas:
// - Component rendering and props
// - Keyboard navigation functionality
// - Accessibility compliance
// - Server Actions integration
// - Type safety validation
```
