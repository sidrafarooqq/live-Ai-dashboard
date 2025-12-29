import type { AgentState } from '@/types/agent';
import { COLORS } from '@/lib/constants';

interface Props {
  state: AgentState;
}

export function StatusBadge({ state }: Props) {
  // Map internal simulation colors to refined theme colors
  const themeColors: Record<AgentState, string> = {
    idle: '#64748b',      // Slate 500
    listening: '#10b981', // Emerald 500
    processing: '#f59e0b',// Amber 500
    speaking: '#6366f1',  // Indigo 500
  };

  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/50 border border-slate-800/50 shadow-inner">
      <div className="relative flex items-center justify-center">
        <div 
          className="w-2 h-2 rounded-full z-10" 
          style={{ backgroundColor: themeColors[state] }} 
        />
        <div 
          className="absolute w-2 h-2 rounded-full animate-ping opacity-40 scale-150" 
          style={{ backgroundColor: themeColors[state] }} 
        />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {state}
      </span>
    </div>
  );
}