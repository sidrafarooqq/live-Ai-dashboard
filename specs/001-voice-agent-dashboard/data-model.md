# Data Model: Live AI Voice Agent Dashboard

## Core Entities

### AgentState
Union type representing the active mode of the simulated agent.
```typescript
type AgentState = 
  | 'idle'        // Waiting for interaction
  | 'listening'   // User is speaking (simulated)
  | 'processing'  // Thinking/Generating response
  | 'speaking';   // Agent is talking
```

### Message
Represents a single entry in the conversation transcript.
```typescript
interface Message {
  id: string;        // UUID
  role: 'user' | 'agent';
  text: string;      // Content
  timestamp: string; // ISO string or formatted time
}
```

### SimulatorConfig
Configuration for the simulation engine's timing and behavior.
```typescript
interface SimulatorConfig {
  timings: {
    speaking: [number, number];   // [min, max] ms
    idle: number;                 // Fixed duration ms
    listening: [number, number];  // [min, max] ms
    processing: [number, number]; // [min, max] ms
  };
}
```

## State Management (Client-Side)

**Store**: `useAgentSimulator` Hook (Local State)

| State Variable | Type | Description |
| :--- | :--- | :--- |
| `currentState` | `AgentState` | The source of truth for UI and Visualizer. |
| `messages` | `Message[]` | Append-only list of conversation history. |
| `isActive` | `boolean` | Master switch for the simulation loop. |
| `elapsedTime` | `number` | Session duration in seconds. |

## Transitions (Simulation Logic)

1. **Idle** → (Auto after 1s) → **Listening**
2. **Listening** → (Auto after 3-4s OR Interrupt) → **Processing**
   - *Action*: Add USER message to `messages`.
3. **Processing** → (Auto after 1.5-2.5s) → **Speaking**
4. **Speaking** → (Auto after 4-6s OR Interrupt) → **Idle** (or Listening if Interrupted)
   - *Action*: Add AGENT message to `messages` (on entry).
