import { AgentState, Message } from './agent';
import React from 'react';

export interface AudioVisualizerProps {
  state: AgentState;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export interface LiveTranscriptProps {
  messages: Message[];
}

export interface ControlPanelProps {
  currentState: AgentState;
  isActive: boolean;
  onInterrupt: () => void;
  onEndCall: () => void;
}

export interface SessionTimerProps {
  elapsedTime: number;
}

export interface StatusBadgeProps {
  state: AgentState;
}
