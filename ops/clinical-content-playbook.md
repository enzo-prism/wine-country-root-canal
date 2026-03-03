# Clinical Content Playbook — Wine Country Root Canal

This document defines how to publish medical/research content on the website while keeping claims accurate, patient-friendly, and legally safer.

## Purpose

- Keep clinical claims factual and non-exaggerated.
- Preserve trust with patients, referring dentists, and search engines.
- Standardize source quality and wording so updates stay consistent over time.

## Allowed Source Tiers

Use sources in this order of priority:

1. Peer-reviewed journals and DOI links.
2. Professional associations (AAE, ADA, etc.).
3. Major publication coverage (Washington Post, etc.) as supporting context.

For externally hosted articles that may have a paywall, always pair with at least one open-access clinical source.

## Claim Language Rules

### Use

- "associated with"
- "linked to"
- "suggests"
- "in this study"
- "may"

### Avoid

- "proves"
- "prevents"
- "guarantees"
- definitive disease risk reduction claims for every patient

When summarizing findings, include a one-line caveat:

- "This research is promising but does not replace individualized medical or dental advice."

## Required Components for Study-Based Content Blocks

Every research-driven section should include:

1. Publication/source date(s).
2. A concise findings summary in plain language.
3. A prominent patient-facing headline link (if requested for engagement).
4. At least one authoritative open-access source.
5. A direct journal/DOI link when available.
6. A brief caveat/disclaimer.

## Page Implementation Pattern

For maintainability in React/Next.js pages:

- Store findings in a typed array (for example, `healthFindings`).
- Store links/sources in a typed array (for example, `healthResources`) with metadata:
  - label
  - href
  - sourceType
  - primary/secondary role
  - optional paywall note

This pattern allows quick source refreshes without rewriting layout JSX.

## SEO and Structured Data Guardrails

- Ensure visible FAQ content and FAQ JSON-LD remain synchronized.
- Keep canonical URLs unchanged unless a route migration is intentional.
- Do not add broad disease-prevention claims to structured data unless directly supported and compliant.

## QA Checklist Before Publishing

1. `pnpm build` succeeds.
2. Updated page renders correctly on desktop and mobile.
3. All external links open and point to expected destinations.
4. Primary source/date statements are correct.
5. Disclaimer/caveat is visible.
6. If FAQ content changed, verify updated FAQ text appears in JSON-LD output.

## Current Reference Set (Root Canal & Overall Health)

- Study publication date: November 18, 2025
- Journal DOI: `https://doi.org/10.1186/s12967-025-06526-8`
- Washington Post publication date: November 20, 2025
- Washington Post link: `https://www.washingtonpost.com/wellness/2025/11/20/root-canal-heart-disease-diabetes/`
- AAE newsroom link: `https://newsroom.aae.org/press-releases/new-study-suggests-root-canal-treatment-linked-to-lower-risk-of-heart-disease-diabetes/`
- AAE patient link: `https://www.aae.org/patients/root-canal-treatment/saving-natural-tooth/`
