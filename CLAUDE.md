# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

\`\`\`bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Type checking (no dedicated script, use TypeScript compiler directly)
npx tsc --noEmit
\`\`\`

## Project Architecture

This is a Next.js 15 application for Wine Country Root Canal, a dental practice website. Key architectural decisions:

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom brand colors + Shadcn/ui components
- **Forms**: react-hook-form with zod validation
- **Package Manager**: pnpm

### Directory Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - React components including 40+ Shadcn/ui components in `/components/ui`
- `/lib` - Utility functions and shared logic
- `/hooks` - Custom React hooks
- `/public/images` - Static assets (practice photos)

### Key Design Patterns
1. **Component Library**: Uses Shadcn/ui components (Radix UI primitives) with consistent styling
2. **Theme System**: CSS variables-based theming with next-themes (light mode default)
3. **Typography**: Playfair Display for headings, Source Sans 3 for body text
4. **Path Aliases**: Use `@/*` to import from root directory

### Brand Colors (defined in tailwind.config.ts)
- `brand-cream`: #FDF9F5 (primary background)
- `brand-merlot`: #762336 (primary accent)
- `brand-rose-beige`: #BF8D7C (secondary accent)
- `brand-dark-text`: #3D3D3D (softened black for text)

### Important Configuration Notes
- ESLint and TypeScript errors are ignored during builds (see next.config.mjs)
- Images are unoptimized for performance reasons
- Server Components are enabled (RSC: true)

### Form Integration
The site integrates with JotForm for patient forms. The `/forms` page contains embedded forms for:
- New patient registration
- Referring doctor forms
- Patient testimonials

### Deployment
Automatically deployed to Vercel from v0.dev platform. Live at: https://vercel.com/enzo-design-prisms-projects/v0-wine-country-website-dz
