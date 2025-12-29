# Live AI Voice Agent Dashboard

A futuristic, high-fidelity simulated voice agent interface built with **Next.js 16**, **React 19**, and **Tailwind CSS**.

![Dashboard Preview](https://via.placeholder.com/800x450.png?text=AI+Voice+Dashboard+Preview)

## 🚀 Features

- **Real-time Audio Visualizer**: 60 FPS Canvas-based animations responding to agent states.
- **Simulated Conversation Engine**: Realistic turn-taking, timing variations, and order tracking scenario.
- **Optimistic UI Controls**: Instant feedback on "Interrupt" actions using React 19's `useOptimistic`.
- **Live Transcript**: Auto-scrolling chat interface with distinct user/agent styling.
- **Responsive Design**: Fully functional on mobile, tablet, and desktop.
- **Zero Backend**: Pure frontend simulation with no external dependencies.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19 (RC/Canary)
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Language**: TypeScript 5.0+

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-voice-dashboard.git
   cd ai-voice-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How to Use

1. **Start**: The simulation begins automatically on load.
2. **Watch**: Observe the visualizer change states (Idle → Listening → Processing → Speaking).
3. **Interrupt**: Press the **Interrupt** button (or Spacebar) while the agent is speaking to force a listening state.
4. **End Call**: Press **End Call** (or Escape) to stop the simulation.

## 🏗️ Architecture

- **`useAgentSimulator` Hook**: The "brain" of the app. Manages the state machine, timers, and message generation.
- **`AudioVisualizer` Component**: Uses `requestAnimationFrame` for high-performance rendering of 4 distinct visual states.
- **`ControlPanel` Component**: Demonstrates React 19's `useOptimistic` hook for immediate UI feedback before state updates.

## 🎨 Design System

- **Colors**: Neon Cyan (`#00fff9`), Purple (`#b026ff`), Pink (`#ff006e`).
- **Typography**: Sans-serif for UI, Monospace for data/timers.
- **Effects**: Glassmorphism (backdrop-blur), Glows (box-shadow/drop-shadow).

## 📄 License

MIT License.