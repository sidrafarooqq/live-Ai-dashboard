import { useState, useEffect, useRef } from 'react';
import type { UseAgentSimulatorReturn, AgentState, Message } from '@/types/agent';
import { SIMULATION_TIMINGS } from '@/lib/constants';
import { CONVERSATION_PAIRS } from '@/lib/messages';

// Robust ID generator for non-secure contexts (where crypto.randomUUID might be missing)
const generateId = () => Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

export function useAgentSimulator(): UseAgentSimulatorReturn {
  const [currentState, setCurrentState] = useState<AgentState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const messageIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const getRandomTime = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const cycleState = () => {
      setCurrentState((prev) => {
        let nextState: AgentState;
        let delay: number;

        switch (prev) {
          case 'idle':
            nextState = 'listening';
            delay = getRandomTime(
              SIMULATION_TIMINGS.listening.min,
              SIMULATION_TIMINGS.listening.max
            );
            break;
          case 'listening':
            nextState = 'processing';
            delay = getRandomTime(
              SIMULATION_TIMINGS.processing.min,
              SIMULATION_TIMINGS.processing.max
            );
            break;
          case 'processing':
            nextState = 'speaking';
            delay = getRandomTime(
              SIMULATION_TIMINGS.speaking.min,
              SIMULATION_TIMINGS.speaking.max
            );
            break;
          case 'speaking':
            nextState = 'idle';
            delay = SIMULATION_TIMINGS.idle;
            break;
          default:
            nextState = 'idle';
            delay = SIMULATION_TIMINGS.idle;
        }

        timeoutRef.current = setTimeout(cycleState, delay);
        return nextState;
      });
    };

    if (!timeoutRef.current) {
      cycleState();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentState === 'listening') {
      const pair = CONVERSATION_PAIRS[messageIndexRef.current % CONVERSATION_PAIRS.length];
      const newMessage: Message = {
        id: generateId(),
        role: 'user',
        content: pair.user,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, newMessage]);
    } 
    else if (currentState === 'speaking') {
      const pair = CONVERSATION_PAIRS[messageIndexRef.current % CONVERSATION_PAIRS.length];
      const newMessage: Message = {
        id: generateId(),
        role: 'agent',
        content: pair.agent,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, newMessage]);
      messageIndexRef.current++;
    }
  }, [currentState, isActive]);

  const interrupt = () => {
    if (!isActive) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setCurrentState('listening');
    
    const interruptMsg: Message = {
      id: generateId(),
      role: 'user',
      content: '[Interrupted]',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, interruptMsg]);
  };

  const endCall = () => {
    setIsActive(false);
    setCurrentState('idle');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    const endMsg: Message = {
      id: generateId(),
      role: 'agent',
      content: 'Call ended.',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, endMsg]);
  };

  return {
    currentState,
    messages,
    isActive,
    elapsedTime,
    interrupt,
    endCall,
  };
}