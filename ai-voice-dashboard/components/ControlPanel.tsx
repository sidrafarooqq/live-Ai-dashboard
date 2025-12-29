'use client';

import { useOptimistic, useEffect } from 'react';
import { Mic, PhoneOff, Settings2 } from 'lucide-react';
import type { ControlPanelProps } from '@/types/components';
import { StatusBadge } from './StatusBadge';

export function ControlPanel({ 
  currentState, 
  isActive, 
  onInterrupt, 
  onEndCall,
}: ControlPanelProps) {
  const [optimisticState, setOptimisticState] = useOptimistic(
    currentState,
    (_, newState: typeof currentState) => newState
  );

  const handleInterrupt = () => {
    setOptimisticState('listening');
    onInterrupt();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isActive && currentState !== 'listening') {
        e.preventDefault();
        handleInterrupt();
      }
      if (e.code === 'Escape' && isActive) {
        onEndCall();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentState, onInterrupt, onEndCall]);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6">
      <div className="glass-card rounded-[40px] p-3 flex items-center justify-between gap-4 border-slate-700/30">
        
        <div className="pl-4">
          <StatusBadge state={optimisticState} />
        </div>

        <div className="flex items-center gap-2 pr-2">
          <button 
            className="p-4 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700/50"
            aria-label="Settings"
          >
            <Settings2 size={20} />
          </button>

          <div className="w-px h-8 bg-slate-800 mx-2" />

          <button 
            onClick={handleInterrupt} 
            disabled={!isActive || currentState === 'listening'}
            className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:grayscale rounded-full font-bold text-white transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
          >
            <Mic size={20} className={currentState === 'listening' ? 'animate-pulse' : ''} />
            <span className="hidden md:inline">Interrupt</span>
          </button>
          
          <button 
            onClick={onEndCall} 
            disabled={!isActive}
            className="p-4 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white disabled:opacity-30 rounded-full transition-all border border-rose-500/20 active:scale-95"
            aria-label="End Call"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}