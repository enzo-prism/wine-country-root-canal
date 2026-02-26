# CLAUDE.md

This file provides operating guidance for agents working in this repository.

## Development Commands

```bash
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

# SEO/redirect verification
pnpm verify:seo
```

## Project Architecture

This is a Next.js 15 application for Wine Country Root Canal, a dental practice website. Key architectural decisions:

### Tech Stack
- **Framework**: Next.js 15.5.9 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom brand colors + Shadcn/ui components
- **Forms**: react-hook-form with zod validation
- **Package Manager**: pnpm
- **Deployment target**: Vercel (`main` branch)

### Directory Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable UI and page sections
- `/components/reviews` - Centralized testimonials data and rendering components
- `/components/ui` - Shadcn/Radix base components
- `/lib` - Utility functions and shared logic
- `/hooks` - Custom React hooks
- `/public/images` - Static assets
- `/ops` - operational documentation and checklists

### Key Features and Route Map
- `app/page.tsx` + `app/HomePageClient.tsx`: homepage and service sections
- `app/about/page.tsx`: practice and provider details (including Dr. Anderson profile image)
- `app/testimonials/page.tsx`: dedicated patient testimonials page
- `app/contact/page.tsx`: practice contact/NAP details
- `components/navbar.tsx`: top navigation including About-first ordering and `/testimonials`
- `components/footer.tsx`: footer patient links including `/testimonials`
- `components/reviews/google-review-data.ts`: source of truth for review data
- `components/reviews/google-review-highlights.tsx`: reusable review section component (compact/full)

### Key Design Patterns
1. **Component Composition**: pages compose shared primitives and custom sections
2. **Theme System**: CSS variables-based theming with light mode default
3. **Typography**: Playfair Display for headings, Source Sans 3 for body text
4. **Path Aliases**: use `@/*` for root-relative imports

### Brand Colors (defined in tailwind.config.ts)
- `brand-cream`: #FDF9F5
- `brand-merlot`: #762336
- `brand-rose-beige`: #BF8D7C
- `brand-dark-text`: #3D3D3D

### Important Configuration Notes
- `next.config.mjs` has:
  - `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` set to `true`
  - `images.remotePatterns` allowing `res.cloudinary.com`
  - canonical redirects for legacy URL mappings
- Server Components are used where possible
- Navigation, SEO metadata, and testimonials rendering should be kept in sync when routes or content changes.

### Operational Workflow for Content Updates
- When adding/updating pages or navigation, update `README.md`, route usage docs, and `app/page.tsx`/`components/navbar.tsx` as appropriate.
- When reviews change, update `components/reviews/google-review-data.ts` and verify three placements:
  1. homepage (`app/HomePageClient.tsx`)
  2. about page (`app/about/page.tsx`)
  3. testimonials page (`app/testimonials/page.tsx`)
- Keep footer and mobile/desktop nav links aligned for discoverability.

### Form Integration
The site integrates with third-party forms on `/forms` for:
- New patient registration
- Referring doctor forms
- Patient testimonials

### SEO/Local Operations
- Maintain `ops/local-seo-checklist.md` for NAP, hours, categories, reviews workflow, and citation consistency.

### Deployment Notes
- Automatically deployed to Vercel from this repo.
- Project URL: https://vercel.com/enzo-design-prisms-projects/v0-wine-country-website-dz
