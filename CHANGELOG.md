# Changelog

All notable changes to this project will be documented in this file.

## [Stage 7: Portfolio Quality Assurance & Final Polish] - 2026-10-26

### Fixed
- **Resolved HTML ID Uniqueness Violation**: Removed duplicate `id="top"` on outer `<div className="page">` in `App.tsx`, preserving single source of truth on `<section id="top">` in `Hero.tsx`.
- **Restored Broken `aria-labelledby` References**:
  - Updated `Reveal.tsx` component to forward HTML attributes (`id`, `aria-label`, etc.) and merge `style` with polymorphic elements.
  - Added matching `id` attributes to section headings: `id="about-heading"` (`About.tsx`), `id="skills-heading"` (`Skills.tsx`), `id="projects-heading"` (`Projects.tsx`), `id="workflow-heading"` (`PromptWorkflow.tsx`), `id="journey-heading"` (`LearningJourney.tsx`), `id="assistant-heading"` (`Chatbot.tsx`), and `id="contact-heading"` (`Contact.tsx`).
- **Fixed Case-Study Navbar Navigation**:
  - Updated `Navbar.tsx` and `App.tsx` so clicking any section link in the navbar while viewing a case study correctly navigates to the target section (`#about`, `#skills`, `#contact`, etc.) instead of defaulting always to `#projects`.
  - Brand logo now navigates cleanly back to top (`#top`).

### Added & Improved
- **Modal & Drawer Keyboard Accessibility (WCAG 2.1)**:
  - Added `Escape` key event listener to both the mobile navigation drawer (`Navbar.tsx`) and the floating assistant drawer (`Chatbot.tsx`).
  - Added backdrop overlay click dismissal to the mobile navigation drawer.
  - Added `aria-modal="true"` to the floating assistant dialog container.
- **Input Character Constraint Synchronization**:
  - Synchronized in-page chat input and drawer chat textarea to `maxLength={600}` to prevent silent server truncation or rejection by backend `api/chat.ts`.
- **Responsive Ergonomics & Touch Target Sizing**:
  - Increased navbar button touch target dimensions to `min-width: 2.5rem; min-height: 2.5rem;` (40px+) in `Navbar.css`.
  - Added `overflow-x: hidden;` to `html` and `body` in `index.css` to prevent accidental horizontal scrollbar on narrow mobile devices.

### Verified
- Automated lint (`oxlint`): 0 warnings, 0 errors across 25 files.
- TypeScript compiler (`tsc -b`): Clean execution with 0 errors.
- Production build (`npm run build`): Completed in 5.21s with all assets bundled and minified.
- Live GroqCloud AI Chatbot endpoint: Verified with real HTTP requests returning 200 OK and grounded answers.



### Changed
- **Migrated Portfolio AI Assistant from Google Gemini to GroqCloud**:
  - Replaced Google Gemini API (`@google/genai`) with GroqCloud Chat Completions API (`https://api.groq.com/openai/v1/chat/completions`).
  - Selected official Groq active model `openai/gpt-oss-120b` as the default model (with `openai/gpt-oss-20b` as an ultra-fast alternative), configurable via `GROQ_MODEL`.
  - Re-implemented `api/chat.ts` using native server-side `fetch` with `AbortController` (15-second timeout) and compliant OpenAI format (`system`, `user`, `assistant`).
  - Mapped upstream HTTP errors securely: 401/403 to 502 (authentication failure), 429 to 429 (rate limit), 400 to 400 (bad format), and timeouts to 504.
  - Updated environment variables from `GEMINI_API_KEY` to `GROQ_API_KEY` across Vite dev middleware (`vite.config.ts`), `.env.example`, `openapi.yaml`, and `README.md`.
  - Updated `src/components/Chatbot.tsx` UI labels, intro text, disclaimers, and missing API key hints to reflect GroqCloud.
  - Removed `@google/genai` dependency from project.

### Preserved
- All 5 verified portfolio projects and their exact GitHub/live demo URLs.
- All 9 sections of case study data and hash routing (`#/project/:id`).
- Real-time search, category and technology filtering, and empty state reset.
- Chatbot UI component layout, streaming/thinking indicators, error banners, retry flow, and reset buttons.
- Strict portfolio facts system prompt grounding responses solely in verified achievements.
- Theme switching and persistent storage in localStorage.
- Contact information and social links.

## [Visual Redesign: Lovable Reference Fidelity] - 2026-10-24

### Changed
- **Comprehensive Visual Redesign matching Lovable Reference**:
  - Replaced typography with Google Fonts `Instrument Serif` (display headings), `Manrope` (body sans), and `JetBrains Mono` (labels/code/chips).
  - Adopted Lovable oklch color palette with deep charcoal background (`oklch(0.155 0.006 260)`), warm parchment text (`oklch(0.955 0.012 85)`), amber/gold primary accent (`oklch(0.76 0.095 75)`), mint signal indicator (`oklch(0.76 0.08 155)`), subtle hairline/border dividers, and cohesive light mode tokens.
  - Implemented subtle film grain noise overlay (`.grain`) and decorative coordinate grid lines (`.grid-lines`).
  - Added interactive `ParticleField` canvas in Hero with cursor repulsion and wave physics respecting `prefers-reduced-motion`.
  - Rebuilt `Hero` with status indicator (`Building · Learning · Experimenting`), gigantic staggered display heading (`Tushar Mittal`), 3-column metadata, pill action buttons, and animated scroll indicator.
  - Rebuilt `About` with huge display heading, dual bordered cards (`// fundamentals` and `// coursework`), and verified learning callout.
  - Rebuilt `Skills` with horizontal divider rows, mono primary group titles, and display font items with italic hover transitions.
  - Rebuilt `Projects` showcase with real-time search, category filter chips, count status, and alternating 2-column cards featuring custom `ProjectVisual` abstract illustrations (Fibonacci bars, Quiz mockup, RED/GREEN debugging, Book list shelf).
  - Rebuilt `PromptWorkflow` with scroll-linked progress timeline connecting the 5 stages (`01 UNDERSTAND`, `02 DEFINE`, `03 PROMPT`, `04 INSPECT & TEST`, `05 REFINE & DOCUMENT`) with glowing indicator nodes.
  - Added `LearningJourney` (Milestones section) with sticky sidebar and Education/Certification summary for MeitY Quantum Computing course.
  - Rebuilt `Chatbot` supporting both in-page grounded assistant section and bottom-right floating button/drawer with Gemini integration.
  - Rebuilt `Contact` with email copy button, social links with hover arrows, and Lovable footer (`compiled with curiosity · JECRC University`).
  - Rebuilt `CaseStudyView` with matching typography, pill buttons, and styled code decision blocks.
  - Rebuilt `Navbar` with TM. display logo, desktop link indicator, mobile drawer overlay, theme switcher, and Ask button.

### Preserved
- All 5 verified portfolio projects and their exact GitHub/live demo URLs.
- All 9 sections of case study data and direct hash routing (`#/project/:id`).
- Real-time search, category and technology filtering, and empty state reset.
- Google Gemini `/api/chat` server-side integration and API key security.
- Theme switching and persistent storage in localStorage.
- Contact information (email, GitHub, LinkedIn).

### Changed
- **Migrated Portfolio AI Assistant to Google Gemini**:
  - Replaced Groq API (`llama-3.3-70b-versatile`) with Google's official Gemini API powered by `@google/genai` (`gemini-2.5-flash`).
  - Adapted `/api/chat.ts` to utilize the official `@google/genai` SDK with native timeout handling (15 seconds) and safe HTTP error mapping (400, 401/403 -> 502, 429, 502, 504).
  - Maintained strict portfolio-grounded system instructions passed through `config.systemInstruction` rather than unsupported conversation turns.
  - Implemented compliant conversation history translation ensuring `user` / `model` roles, stripping initial assistant greetings so conversations always start with a `user` turn, merging consecutive identical roles, and validating that the sequence ends on a `user` message.
  - Migrated environment configuration to `GEMINI_API_KEY` (with optional `GEMINI_MODEL` override) in `vite.config.ts`, `.env.example`, and deployment guides.
  - Updated `src/components/Chatbot.tsx` UI labels, ledes, disclaimers, and missing-key configuration instructions to reflect Google Gemini.
  - Updated `openapi.yaml` endpoint documentation to reflect the Gemini API integration and response codes.

## [Stage 6: AI Chatbot & Contact Section] - 2026-10-24

### Added
- **AI Portfolio Chatbot**:
  - Implemented `/api/chat.ts` server-side function to interface securely with the Groq API (`llama-3.3-70b-versatile`).
  - Added strict, verified system instructions grounding answers in Tushar's real background, 5 projects, learning topics, and coursework while refusing speculative claims.
  - Implemented secure key isolation: `GROQ_API_KEY` is kept strictly on the server and never exposed to the client or client-side bundles.
  - Integrated local Vite middleware in `vite.config.ts` allowing `/api/chat` to execute locally during `npm run dev`.
  - Created `src/components/Chatbot.tsx` and `src/components/Chatbot.css` featuring message history, prompt suggestion chips, loading states, retry options for failures, and clear-chat capability.
  - Handled missing configuration, rate limits (HTTP 429), timeouts (15s), and invalid requests gracefully with user-friendly messages.
- **Dedicated Contact Section**:
  - Created `src/components/Contact.tsx` and `src/components/Contact.css` as Section 07 (`#contact`).
  - Provided direct, honest contact channels: verified email (`tushar.mitt6@gmail.com`) with `mailto:` composition and clipboard copy, GitHub profile link (`@TusharMital`), and LinkedIn profile link.
  - Avoided deceptive forms that simulate message sending without a backend mail delivery system.
- **Routing & Environment Configuration**:
  - Updated `vercel.json` rewrite rule to exclude `/api/*` routes from single-page application fallback.
  - Updated `.gitignore` to explicitly exclude all local `.env` and `.env.*` files.
  - Created `.env.example` with safe placeholder configuration.
  - Created `openapi.yaml` documenting the `/api/chat` specification.
  - Updated primary navigation in `Navbar.tsx` with links to `#assistant` and `#contact`.

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
