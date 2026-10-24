# Changelog

All notable changes to this project will be documented in this file.

## [Stage 5 Enhancement] - 2026-10-24

### Added
- **Detailed Project Case Studies**:
  - Authored verified, comprehensive case study records for all five portfolio projects (`src/data/caseStudies.ts`).
  - Implemented `CaseStudyView.tsx` with overview, problem/task, approach, verified tech badges, code decisions, test evidence, challenge solutions, learning outcomes, and external link handling.
  - Added dedicated code decision comparisons for the Cursor AI debugging case study, analyzing assignment (`total = numbers[i]`) vs. accumulation (`total += numbers[i]`) across all iterations.
  - Added "View Case Study" action links to each project card in `ProjectCard.tsx`.
- **Zero-Dependency Accessible Routing**:
  - Implemented `useHashRoute.ts` providing URL hash routing (`#/project/:id`), back/forward browser history support, document title updates, and focus management.
  - Added `vercel.json` SPA rewrite configuration to guarantee direct navigation and page refresh support in Vercel deployments.
- **Project Search & Technology Filtering**:
  - Implemented real-time search across project name and description in `Projects.tsx`.
  - Added technology filter chips derived strictly from verified technologies (`Python`, `React`, `TypeScript`, `JavaScript`, `HTML`, `CSS`, `unittest`, `Jupyter Notebook`, `Vite`).
  - Added active results count with `aria-live="polite"`, "Clear filters" action, and an accessible empty state with reset capability.
- **Light/Dark Theme Switcher**:
  - Added an accessible theme toggle button to `Navbar.tsx` with SVG icons and ARIA attributes.
  - Defined cohesive light theme tokens in `src/index.css` using warm editorial parchment palette (`#f9f7f2`) and high-contrast typography.
  - Implemented `src/utils/theme.ts` for safe persistence in `localStorage` with error handling.
  - Added pre-hydration script in `index.html` to eliminate incorrect-theme flashes.
- **Prompt Engineering Workflow Section**:
  - Created `PromptWorkflow.tsx` and `PromptWorkflow.css` implementing the five learning cycle stages: `01 UNDERSTAND`, `02 DEFINE`, `03 PROMPT`, `04 INSPECT & TEST`, and `05 REFINE & DOCUMENT`.
  - Integrated into `App.tsx` as Section 05 with learning disclaimer.
  - Updated primary navigation links in `Navbar.tsx` to include `#workflow`.
