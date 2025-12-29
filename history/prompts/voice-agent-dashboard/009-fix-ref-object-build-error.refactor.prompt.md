---
id: 009
title: Fix RefObject Build Error
stage: refactor
date: 2025-12-29
surface: agent
model: Gemini
feature: voice-agent-dashboard
branch: 001-voice-agent-dashboard
user: H.P
command: fix canvasRef type mismatch
labels: ["typescript", "react-19", "build-fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - ai-voice-dashboard/types/components.ts
tests:
 
---

## Prompt

solve this build error Running TypeScript ...Failed to compile.
./app/page.tsx:56:51
Type error: Type 'RefObject<HTMLCanvasElement | null>' is not assignable to type 'RefObject<HTMLCanvasElement>'.

## Response snapshot

Updated `AudioVisualizerProps` in `types/components.ts` to type `canvasRef` as `React.RefObject<HTMLCanvasElement | null>`. This aligns with how `useRef<HTMLCanvasElement>(null)` is typed in modern React/TypeScript environments, resolving the assignability error in `app/page.tsx`.

## Outcome

- ✅ Impact: Resolved TypeScript compilation error blocking the build.
- 🧪 Tests: N/A (Type definition change)
- 📁 Files: 1 modified
- 🔁 Next prompts: null
- 🧠 Reflection: React 19 / TypeScript strict mode is more pedantic about RefObject nullability.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
