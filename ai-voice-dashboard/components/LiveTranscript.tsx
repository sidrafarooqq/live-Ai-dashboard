'use client';

import { useEffect, useRef } from 'react';
import { User, Cpu, Terminal } from 'lucide-react';
import type { LiveTranscriptProps } from '@/types/components';

/**
 * LiveTranscript: An independently scrolling message list
 * Features:
 * - Continuous auto-scrolling to the latest message
 * - Staggered animations for new entries
 * - Role-based professional styling
 */
export function LiveTranscript({ messages }: LiveTranscriptProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Effect to handle automatic continuous scrolling
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="flex flex-col gap-8 min-h-full">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-600">
          <Terminal size={32} className="animate-pulse" />
          <p className="text-xs font-black uppercase tracking-[0.3em]">Establishing Uplink...</p>
        </div>
      ) : (
        messages.map((message, idx) => (
          <div 
            key={message.id} 
            className={`flex items-start gap-5 animate-fadeIn ${
              message.role === 'user' ? 'flex-row' : 'flex-row-reverse'
            }`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {/* AVATAR ICON */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-700 ${
              message.role === 'user' 
                ? 'bg-slate-900 border-slate-800 text-slate-400' 
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.15)]'
            }`}>
              {message.role === 'user' ? <User size={20} /> : <Cpu size={20} />}
            </div>
            
            {/* MESSAGE BUBBLE */}
            <div className={`flex flex-col ${message.role === 'user' ? 'items-start' : 'items-end'} max-w-[85%]`}>
              <div className={`relative px-6 py-4 rounded-3xl text-sm leading-relaxed tracking-wide ${
                message.role === 'user' 
                  ? 'bg-slate-900/50 text-slate-300 rounded-tl-none border border-slate-800/50' 
                  : 'bg-indigo-600 text-white rounded-tr-none shadow-2xl shadow-indigo-500/20 font-medium'
              }`}>
                {message.content}
                
                {/* Visual indicator for AI "active" response */}
                {message.role === 'agent' && idx === messages.length - 1 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
                )}
              </div>
              
              {/* METADATA */}
              <div className="flex items-center gap-2 mt-3 px-1">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                  {message.role === 'user' ? 'Origin: Local' : 'Origin: Cloud-Nexus'}
                </span>
                <div className="w-1 h-1 rounded-full bg-slate-800" />
                <span className="text-[9px] font-mono text-slate-500">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
      {/* Invisible anchor for scrolling */}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
