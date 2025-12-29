---
id: 005
title: Fix Cross-Origin Dev Warning
stage: refactor
date: 2025-12-29
surface: agent
model: Gemini
feature: voice-agent-dashboard
branch: 001-voice-agent-dashboard
user: H.P
command: fix next.config.ts for cross-origin
labels: ["nextjs", "configuration", "cors"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - ai-voice-dashboard/next.config.ts
tests:
 
---

## Prompt

i am facing this error fix it ⚠ Cross origin request detected from 10.203.203.78 to /_next/* resource. In a future major version of Next.js, you will need to explicitly configure "allowedDevOrigins" in next.config to allow this.
Read more: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins

## Response snapshot

Updated `next.config.ts` to include `experimental.allowedDevOrigins` for the IP `10.203.203.78`.

## Outcome

- ✅ Impact: Resolved Next.js cross-origin development warning for specific network IP.
- 🧪 Tests: N/A (Config change)
- 📁 Files: 1 modified
- 🔁 Next prompts: null
- 🧠 Reflection: Next.js 15+ (Next.js 16/canary) requires explicit dev origin configuration when accessed via IP.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
