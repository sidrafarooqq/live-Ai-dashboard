<!--
SYNC IMPACT REPORT
Version change: Initial Template -> 1.0.0
List of modified principles: Populated from template (7 Principles defined)
Added sections: Constraints & Tech Stack, Success Criteria
Templates requiring updates: None (Generic templates align)
Follow-up TODOs: None
-->

# Live AI Voice Agent Dashboard Constitution

## Core Principles

### I. TECHNICAL EXCELLENCE
Next.js 16 with App Router is non-negotiable. React 19 features MUST be utilized, specifically `useOptimistic` is mandatory. TypeScript is required for strict type safety. Zero manual memoization is permitted (`useMemo` and `useCallback` are forbidden); rely entirely on the React Compiler for optimization. The `forwardRef` pattern is prohibited; refs must be passed directly as props.

### II. DESIGN PHILOSOPHY
Dark mode is the default and ONLY theme. The aesthetic MUST be a futuristic sci-fi style combining Glassmorphism and Neon accents. Smooth 60 FPS animations are mandatory for all transitions. Every user action MUST trigger a micro-interaction. The initial load must deliver a "Wow factor". Design MUST follow a mobile-first approach, ensuring responsiveness across all devices.

### III. CODE QUALITY STANDARDS
Every component MUST be fully typed; usage of `any` is strictly prohibited. The codebase MUST follow a clean architecture with clear separation of concerns. Utility functions should be reusable and isolated. Code must be self-documenting with comprehensive inline comments where logic is complex.

### IV. PERFORMANCE REQUIREMENTS
Canvas animations MUST maintain a minimum of 60 FPS. There MUST be zero memory leaks, particularly in timers and intervals. Re-renders must be efficient, leveraging the React 19 compiler. Lazy loading MUST be applied where appropriate to optimize initial load. Bundle size must be actively managed and optimized.

### V. USER EXPERIENCE MANDATES
Instant feedback is required on ALL interactions. Appropriate loading states must be displayed for any asynchronous operations. Error boundaries MUST be implemented for graceful failure handling. Accessibility MUST meet WCAG 2.1 AA minimum standards, including full keyboard navigation support and touch-friendly targets (minimum 44px).

### VI. SIMULATION AUTHENTICITY
The conversation flow MUST be realistic with natural timing between states. AI responses must be believable within the context of the simulation. Visual, audio, and transcript states MUST be perfectly synchronized. Transitions between states must be smooth, with no jarring jumps or glitches.

### VII. DELIVERABLE STANDARDS
Code MUST be production-ready and capable of immediate deployment to Vercel. A comprehensive README is required. The Git commit history MUST clearly show the progress and development narrative. Documentation for the simulated AI workflow is mandatory.

## CONSTRAINTS & TECH STACK

### Constraints & Boundaries
- No backend integration (pure frontend simulation).
- No external API calls (except for deployment purposes).
- No authentication or authorization is required.
- No data persistence is needed.
- Focus MUST be on UI/UX excellence over complex business logic.

### Tech Stack Lock
- **Framework**: Next.js 16 (App Router) [REQUIRED]
- **Library**: React 19 [REQUIRED]
- **Language**: TypeScript 5+ [REQUIRED]
- **Styling**: Tailwind CSS 3+ [REQUIRED]
- **Icons**: Lucide React [REQUIRED]
- **Animation**: CSS/Canvas only. **Framer Motion is FORBIDDEN**.
- **State Management**: `useState` / `useOptimistic` only. **Zustand/Redux are FORBIDDEN**.
- **UI Components**: Build custom components. **External UI libraries are FORBIDDEN**.

## SUCCESS CRITERIA

- Renders without errors on Vercel.
- All animations appear smooth (60fps) on mid-range devices.
- Passes TypeScript strict mode with zero errors.
- Mobile responsive from 320px to 4K screens.
- Impresses technical reviewers visually ("Wow factor").
- Demonstrates clear proficiency with React 19 features.

## Governance

This Constitution supersedes all other project practices. Amendments require documentation and a clear migration plan. All Pull Requests and code reviews MUST verify compliance with these principles. Deviations for complexity MUST be explicitly justified.

**Version**: 1.0.0 | **Ratified**: 2025-12-29 | **Last Amended**: 2025-12-29