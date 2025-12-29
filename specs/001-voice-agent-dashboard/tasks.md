# Tasks: Live AI Voice Agent Dashboard

**Input**: Design documents from `specs/001-voice-agent-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, research.md
**Tests**: Tests are manual per spec. Automated tests not requested.
**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js 16 project with TypeScript and Tailwind in `.` (repo root)
- [X] T002 [P] Configure Tailwind with neon colors and custom animations in `tailwind.config.ts` and `app/globals.css`
- [X] T003 [P] Install `lucide-react` dependency via npm/pnpm/yarn
- [X] T004 Create project folder structure (`components/`, `hooks/`, `lib/`, `types/`) in `.`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Define `AgentState`, `Message`, `SimulatorConfig`, and `UseAgentSimulatorReturn` types in `types/agent.ts`
- [X] T006 [P] Define component prop types (`AudioVisualizerProps`, etc.) in `types/components.ts`
- [X] T007 Define constant configuration values (timings, colors) in `lib/constants.ts`
- [X] T008 [P] create predefined conversation message data in `lib/messages.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 4 - Simulation Engine (Priority: P1)

**Goal**: Establish the central simulation loop that drives all other components.
**Why First?**: Without the engine (US4), the visualizer (US1), transcript (US2), and controls (US3) have no state to react to.

**Independent Test**: Mount hook in a temporary component and log state transitions to console.

### Implementation for User Story 4

- [X] T009 [US4] Implement `useAgentSimulator` hook structure and state variables in `hooks/useAgentSimulator.ts`
- [X] T010 [US4] Implement `startSimulation` timer loop logic with `useEffect` in `hooks/useAgentSimulator.ts`
- [X] T011 [US4] Implement state transition logic (Idle -> Listening -> Processing -> Speaking) in `hooks/useAgentSimulator.ts`
- [X] T012 [US4] Implement message generation logic (add message on transition) in `hooks/useAgentSimulator.ts`
- [X] T013 [US4] Implement `interrupt` and `endCall` core logic functions in `hooks/useAgentSimulator.ts`

**Checkpoint**: Simulation hook generates states and messages over time.

---

## Phase 4: User Story 1 - Core Visualization (Priority: P1)

**Goal**: Display the visual representation of the agent's current state.

**Independent Test**: Visualizer component renders and animates distinct patterns for each of the 4 mocked states.

### Implementation for User Story 1

- [X] T014 [P] [US1] Create canvas drawing primitive `drawPulsingCircle` (Idle) in `lib/animations.ts`
- [X] T015 [P] [US1] Create canvas drawing primitive `drawSoundBars` (Listening) in `lib/animations.ts`
- [X] T016 [P] [US1] Create canvas drawing primitive `drawSpinner` (Processing) in `lib/animations.ts`
- [X] T017 [P] [US1] Create canvas drawing primitive `drawWaveform` (Speaking) in `lib/animations.ts`
- [X] T018 [X] [US1] Implement `useCanvas` hook for responsive resizing and context setup in `hooks/useCanvas.ts`
- [X] T019 [US1] Implement `AudioVisualizer` component with `requestAnimationFrame` loop in `components/AudioVisualizer.tsx`
- [X] T020 [US1] Integrate state-specific draw calls into `AudioVisualizer` render loop in `components/AudioVisualizer.tsx`

**Checkpoint**: AudioVisualizer accepts `state` prop and renders correct animation at 60fps.

---

## Phase 5: User Story 2 - Live Transcript (Priority: P1)

**Goal**: Display the scrolling conversation history.

**Independent Test**: Message list renders mocked messages with correct styling and auto-scrolls on addition.

### Implementation for User Story 2

- [X] T021 [P] [US2] Create `LiveTranscript` component structure in `components/LiveTranscript.tsx`
- [X] T022 [US2] Implement message rendering loop with User/Agent conditional styling in `components/LiveTranscript.tsx`
- [X] T023 [US2] Implement auto-scroll to bottom logic using `useRef` and `useEffect` in `components/LiveTranscript.tsx`
- [X] T024 [P] [US2] Add custom scrollbar and fade-in animation styles in `app/globals.css`

**Checkpoint**: LiveTranscript displays messages and scrolls automatically.

---

## Phase 6: User Story 3 - Control Panel (Priority: P2)

**Goal**: Add interactivity to control the simulation.

**Independent Test**: Buttons trigger console logs; Optimistic UI updates button state immediately.

### Implementation for User Story 3

- [X] T025 [P] [US3] Create `ControlPanel` component structure with props in `components/ControlPanel.tsx`
- [X] T026 [US3] Implement `useOptimistic` for Interrupt button state in `components/ControlPanel.tsx`
- [X] T027 [US3] Implement keyboard shortcuts (Space/Escape) event listeners in `components/ControlPanel.tsx`
- [X] T028 [P] [US3] Create `StatusBadge` component for current state display in `components/StatusBadge.tsx`
- [X] T029 [P] [US3] Create `SessionTimer` component for elapsed time in `components/SessionTimer.tsx`

**Checkpoint**: Control Panel buttons work and reflect state changes optimistically.

---

## Phase 7: User Story 5 - Responsive Design & Integration (Priority: P2)

**Goal**: Assemble the full dashboard and ensure mobile responsiveness.

**Independent Test**: Full app flow works; layout adapts at 768px and 1024px breakpoints.

### Implementation for User Story 5

- [X] T030 [US5] Implement `Header` component (Title + Timer + Status) in `components/Header.tsx` (or inline in Page)
- [X] T031 [US5] Implement `page.tsx` layout grid and integrate `useAgentSimulator` hook in `app/page.tsx`
- [X] T032 [US5] Connect `AudioVisualizer`, `LiveTranscript`, and `ControlPanel` to hook state in `app/page.tsx`
- [X] T033 [US5] Apply responsive classes (stacking for mobile, split for desktop) in `app/page.tsx`
- [X] T034 [US5] Verify touch target sizes and font scaling for mobile in `app/globals.css`

**Checkpoint**: Complete application is functional and responsive.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and readiness checks

- [X] T035 [P] Add metadata and custom font configuration in `app/layout.tsx`
- [ ] T036 Perform Lighthouse performance audit and optimize if Score < 90
- [ ] T037 Verify 60FPS on canvas animations via DevTools Performance tab
- [X] T038 Create `README.md` with project documentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **Simulation Engine (Phase 3)**: Depends on Foundational (types/constants)
- **Visualizer (Phase 4)**: Depends on Foundational (types)
- **Transcript (Phase 5)**: Depends on Foundational (types)
- **Control Panel (Phase 6)**: Depends on Foundational (types)
- **Integration (Phase 7)**: Depends on ALL previous phases (US4, US1, US2, US3)

### Implementation Strategy

1. **Core Logic First**: US4 (Simulation Engine) builds the "brain".
2. **Visual Components Parallel**: US1, US2, US3 can technically be built in parallel using mocked data if teams were larger, but sequentially is safer here to verify against the engine.
3. **Integration Last**: US5 assembles the tested parts into the responsive layout.
4. **MVP**: Completion of Phase 7 constitutes the MVP.

### Parallel Opportunities

- **Phase 1**: T002, T003
- **Phase 2**: T006, T008
- **Phase 4**: T014, T015, T016, T017 (Draw functions independent)
- **Phase 5**: T021, T024
- **Phase 6**: T025, T028, T029
- **Phase 8**: T035
