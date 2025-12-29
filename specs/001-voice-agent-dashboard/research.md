# Research: Live AI Voice Agent Dashboard

**Feature**: Live AI Voice Agent Dashboard
**Date**: 2025-12-29

## Research Tasks & Findings

### 1. Simulation Timing & State Machine
**Context**: The simulation needs to feel "natural" without a backend.
**Decision**: Use a stochastic state machine running inside `useAgentSimulator`.
**Rationale**: 
- Pure deterministic timing feels robotic.
- Random ranges (e.g., Speaking 4-6s) create variety.
- `setInterval` is sufficient for the main loop if managed with `useEffect` cleanup.
**Alternatives Considered**: 
- `setTimeout` chains: Harder to interrupt cleanly.
- `requestAnimationFrame` for logic: Overkill, tied to frame rate rather than wall time.

### 2. Canvas Animation Architecture
**Context**: 4 distinct visual states, smooth transitions (0.3s), 60 FPS.
**Decision**: Single `requestAnimationFrame` loop in `AudioVisualizer` managing all draw calls.
**Rationale**:
- **Idle**: `Math.sin(time)` for pulsing radius.
- **Listening**: Random height generation for bars (simulating FFT data) is acceptable for simulation.
- **Processing**: Rotation transform + particle array update.
- **Speaking**: Multi-sine wave addition (`sin(x) + sin(2x)...`) simulates voice complexity.
- **Transitions**: Use linear interpolation (lerp) of opacity/intensity variables over 0.3s (approx 18 frames).
**Alternatives Considered**:
- Multiple canvases: High memory overhead.
- CSS Animations: No pixel-level control for particle orbits or waveforms.

### 3. React 19 `useOptimistic` usage
**Context**: Interrupt button must react instantly.
**Decision**: 
- Pass `currentState` to `ControlPanel`.
- Wrap `interrupt` action in `startTransition`.
- `useOptimistic` overrides displayed state to 'listening' immediately while the "async" handler (simulation state update) processes.
**Rationale**: Satisfies the explicit constitution/spec requirement for React 19 features.

## Unresolved Items (NEEDS CLARIFICATION)
*None - Simulation parameters and tech stack are fully defined in Spec and Constitution.*
