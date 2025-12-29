export type AgentState = 'idle' | 'listening' | 'processing' | 'speaking';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: number;
}

export interface SimulatorConfig {
  timings: {
    speaking: { min: number; max: number };
    idle: number;
    listening: { min: number; max: number };
    processing: { min: number; max: number };
  };
}

export interface UseAgentSimulatorReturn {
  currentState: AgentState;
  messages: Message[];
  isActive: boolean;
  elapsedTime: number;
  interrupt: () => void;
  endCall: () => void;
}
