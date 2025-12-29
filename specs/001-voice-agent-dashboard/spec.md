# Feature Specification: Live AI Voice Agent Dashboard

**Feature Branch**: `001-voice-agent-dashboard`
**Created**: 2025-12-29
**Status**: Draft
**Input**: User description provided via CLI.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Visualization (Priority: P1)

As a user, I want to see a central audio visualizer that reflects the AI agent's current state, so I understand what's happening at a glance.

**Why this priority**: The visualizer is the primary interface element and core value proposition for the "wow factor" and feedback loop.

**Independent Test**: Can be tested by manually cycling through agent states and verifying the visualizer matches the expected 4 distinct states with smooth transitions.

**Acceptance Scenarios**:

1. **Given** the agent is in 'idle' state, **When** the dashboard loads, **Then** a slow pulsing cyan circle (0.3 opacity, 2s cycle) is displayed.
2. **Given** the agent switches to 'listening', **When** simulated input occurs, **Then** 7 vertical green bars (#10b981) react with random heights.
3. **Given** the agent switches to 'processing', **When** input ends, **Then** a rotating purple ring with orbiting particles appears (1.5s rotation).
4. **Given** the agent switches to 'speaking', **When** a response is ready, **Then** a circular waveform with high amplitude (pink/cyan gradient) appears.
5. **Given** any state change, **When** the transition occurs, **Then** it animates smoothly over 0.3s.

**Edge Cases**:
- **Rapid Switching**: If state changes occur faster than the 0.3s transition, the previous transition should complete or blend smoothly without jumping.
- **Resize**: If window is resized during animation, canvas should rescale without losing context.

---

### User Story 2 - Live Transcript (Priority: P1)

As a user, I want to see a scrolling conversation transcript, so I can read what's being said in the call.

**Why this priority**: Essential for following the conversation context and verifying the simulated dialogue.

**Independent Test**: Can be tested by inspecting the message list as new messages are added, ensuring correct styling and auto-scrolling.

**Acceptance Scenarios**:

1. **Given** the conversation is active, **When** a new message arrives, **Then** it fades in (0.4s ease-out) and the list auto-scrolls to the bottom.
2. **Given** a user message, **When** it is displayed, **Then** it is left-aligned with a blue gradient (#3b82f6 to #1d4ed8).
3. **Given** an agent message, **When** it is displayed, **Then** it is right-aligned with a purple gradient (#a855f7 to #7e22ce).
4. **Given** any message, **When** viewed, **Then** it shows a timestamp in HH:MM:SS format.

**Edge Cases**:
- **Long Messages**: Messages exceeding one line must wrap correctly without breaking layout.
- **Rapid Messages**: Multiple messages arriving simultaneously should stack correctly and maintain scroll position at bottom.

---

### User Story 3 - Control Panel (Priority: P2)

As a user, I want to interrupt or end the call, so I can control the simulation flow.

**Why this priority**: Provides interactivity and control over the simulation, transforming it from a passive to an active experience.

**Independent Test**: Can be tested by clicking the Interrupt and End Call buttons and verifying state changes and UI feedback.

**Acceptance Scenarios**:

1. **Given** the agent is speaking, **When** the "Interrupt Agent" button is clicked (or Spacebar pressed), **Then** the state immediately switches to 'listening' using optimistic UI feedback (no delay).
2. **Given** the simulation is running, **When** the "End Call" button is clicked (or Escape pressed), **Then** all animations/timers stop and the state resets to 'idle'.
3. **Given** the simulation is running, **When** looking at the status badge, **Then** it displays the current state name with a correctly colored pulsing dot.

**Edge Cases**:
- **Double Click**: Rapid clicking of Interrupt/End Call should be debounced or handled gracefully (idempotent).
- **Already Listening**: Clicking Interrupt when already listening should do nothing or show disabled state.

---

### User Story 4 - Simulation Engine (Priority: P1)

As a developer (and end-user of the simulation), I need a centralized simulation engine, so that state management is consistent and realistic.

**Why this priority**: This is the engine driving the entire UI; without it, the visualizer and transcript have no data.

**Independent Test**: Can be tested by mounting the hook in a test component and logging state transitions and message generation over time.

**Acceptance Scenarios**:

1. **Given** the engine starts, **When** it runs, **Then** it automatically cycles through Speaking (4-6s), Idle (1s), Listening (3-4s), and Processing (1.5-2.5s).
2. **Given** a 'speaking' or 'listening' phase, **When** it begins, **Then** a new realistic message is generated from the predefined set.
3. **Given** the simulation stops, **When** cleanup occurs, **Then** all timers are cleared.

**Edge Cases**:
- **Unmount**: If the component unmounts mid-cycle, no state updates should occur on unmounted component.

---

### User Story 5 - Responsive Design (Priority: P2)

As a user, I want the dashboard to work on mobile and desktop, so I can view it on any device.

**Why this priority**: Ensures accessibility and usability across the target range of devices.

**Independent Test**: Can be tested by resizing the browser window and verifying layout shifts at breakpoints.

**Acceptance Scenarios**:

1. **Given** a mobile viewport (<768px), **When** loaded, **Then** the layout stacks vertically, buttons are full-width, and touch targets are min 44px.
2. **Given** a desktop viewport, **When** loaded, **Then** the layout is side-by-side (60% visualizer, 40% transcript) with a max-width of 1400px.

**Edge Cases**:
- **Landscape Mobile**: Ensure vertical height is sufficient or layout adapts (e.g. scrollable).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST visualize 4 distinct agent states (idle, listening, processing, speaking) with unique animations.
- **FR-002**: System MUST display a real-time scrolling transcript of the conversation.
- **FR-003**: System MUST provide "Interrupt" and "End Call" controls with optimistic UI updates.
- **FR-004**: System MUST simulate a natural conversation flow with variable timing and realistic message content (Order Tracking scenario).
- **FR-005**: System MUST support keyboard shortcuts (Spacebar to interrupt, Escape to end).
- **FR-006**: System MUST maintain a 60 FPS frame rate for all canvas animations.
- **FR-007**: System MUST synchronize visual, audio (simulated), and transcript states.

### Non-Functional Requirements

- **Performance**: First Contentful Paint < 1.5s, TTI < 2.5s, Bundle size < 500KB (gzipped).
- **Accessibility**: WCAG 2.1 AA minimum, ARIA labels, keyboard navigation, visible focus indicators.
- **Browser Support**: Chrome 120+, Firefox 120+, Safari 17+, Edge 120+, iOS Safari 16+, Chrome Android 120+.
- **Security**: No XSS, sanitized text rendering, no console errors.

### Technical Constraints

- **Must Have**:
  - Next.js 16 (App Router)
  - React 19 (useOptimistic, React Compiler)
  - TypeScript strict mode
  - Tailwind CSS (no inline styles)
  - Lucide React icons
  - Canvas API (passed as direct prop, no forwardRef)
- **Must Not Have**:
  - Class components
  - External animation libraries (Framer Motion etc.)
  - State management libraries (Zustand/Redux) - use `useState`/`useOptimistic`/Context.
  - Backend calls or data persistence.

### Key Entities

- **AgentState**: Enum/Union (idle | listening | processing | speaking).
- **Message**: Object { id: string, role: 'user' | 'agent', text: string, timestamp: string }.
- **SimulationSession**: Object managing current state, conversation history, and timers.

### Dependencies & Assumptions

- **Assumptions**: 
  - User has a modern browser with Canvas support.
  - Device performance is sufficient for 60 FPS canvas animations (mid-range+).
  - No actual audio input/output is required (simulation only).
- **Dependencies**:
  - Node.js runtime for development.
  - Vercel for deployment.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Renders without errors on Vercel deployment.
- **SC-002**: All animations maintain smooth 60fps on mid-range devices.
- **SC-003**: Passes TypeScript strict mode with zero errors.
- **SC-004**: Layout is fully responsive and usable from 320px to 4K screens.
- **SC-005**: First Contentful Paint is under 1.5 seconds.
- **SC-006**: "Wow factor" achieved (subjective visual quality assessment).
