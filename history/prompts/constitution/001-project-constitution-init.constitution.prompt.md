---
id: 001
title: Project Constitution Init
stage: constitution
date: 2025-12-29
surface: agent
model: Gemini
feature: none
branch: master
user: H.P
command: /sp.constitution
labels: ["governance", "setup", "principles"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 
---

## Prompt

/sp.constitution /speckit.constitution

Create the governing principles and development guidelines for an AI Voice Dashboard project.

PROJECT IDENTITY:
- Name: Live AI Voice Agent Dashboard
- Purpose: Real-time monitoring interface for simulated Voice AI agent conversations
- Target: Frontend internship technical challenge submission
- Vision: A futuristic, visually stunning dashboard that showcases advanced UI/UX skills

CORE PRINCIPLES:

1. TECHNICAL EXCELLENCE
   - Next.js 16 with App Router (non-negotiable)
   - React 19 features must be utilized (useOptimistic mandatory)
   - TypeScript for type safety
   - Zero manual memoization (useMemo/useCallback forbidden)
   - No forwardRef pattern (refs passed directly as props)
   - Rely on React Compiler for optimization

2. DESIGN PHILOSOPHY
   - Dark mode as default and only theme
   - Futuristic sci-fi aesthetic (Glassmorphism + Neon)
   - Smooth 60 FPS animations mandatory
   - Micro-interactions on every user action
   - "Wow factor" on first impression
   - Responsive: Mobile-first approach

3. CODE QUALITY STANDARDS
   - Every component must be fully typed
   - No any types allowed
   - Clean architecture: Separation of concerns
   - Reusable utility functions
   - Comprehensive inline comments
   - Self-documenting code structure

4. PERFORMANCE REQUIREMENTS
   - Canvas animations at 60 FPS minimum
   - No memory leaks in timers/intervals
   - Efficient re-renders (leverage React 19 compiler)
   - Lazy loading where appropriate
   - Optimized bundle size

5. USER EXPERIENCE MANDATES
   - Instant feedback on all interactions
   - Loading states for async operations
   - Error boundaries for graceful failures
   - Accessibility (WCAG 2.1 AA minimum)
   - Keyboard navigation support
   - Touch-friendly (min 44px tap targets)

6. SIMULATION AUTHENTICITY
   - Realistic conversation flow
   - Natural timing between states
   - Believable AI responses
   - Synchronized visual-audio-transcript states
   - No jarring transitions

7. DELIVERABLE STANDARDS
   - Production-ready code
   - Vercel deployment ready
   - Comprehensive README
   - Git commit history showing progress
   - AI workflow documentation

CONSTRAINTS & BOUNDARIES:
- No backend integration (pure frontend simulation)
- No external API calls (except deployment)
- No authentication/authorization required
- No data persistence needed
- Focus on UI/UX excellence over business logic

TECH STACK LOCK:
✓ Next.js 16 (App Router)
✓ React 19
✓ TypeScript 5+
✓ Tailwind CSS 3+
✓ Lucide React (icons)
✗ No Framer Motion (use CSS/Canvas animations)
✗ No Zustand/Redux (useState/useOptimistic only)
✗ No UI libraries (build custom components)

SUCCESS CRITERIA:
- Renders without errors on Vercel
- All animations smooth on mid-range devices
- Passes TypeScript strict mode
- Mobile responsive (320px - 4K screens)
- Impresses technical reviewers visually
- Demonstrates React 19 proficiency

Generate the complete constitution document following these principles.

## Response snapshot

Constitution updated to v1.0.0 with 7 core principles, constraints, and success criteria.

## Outcome

- ✅ Impact: Established project governance and technical constraints.
- 🧪 Tests: N/A
- 📁 Files: 1 modified
- 🔁 Next prompts: /sp.specify
- 🧠 Reflection: Initial constitution created successfully.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
