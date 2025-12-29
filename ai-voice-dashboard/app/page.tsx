'use client';

import { useRef } from 'react';
import { useAgentSimulator } from '@/hooks/useAgentSimulator';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { LiveTranscript } from '@/components/LiveTranscript';
import { ControlPanel } from '@/components/ControlPanel';
import { SessionTimer } from '@/components/SessionTimer';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentState, messages, isActive, elapsedTime, interrupt, endCall } = useAgentSimulator();

  return (
    <div className="h-screen w-full flex flex-col bg-slate-950 text-slate-200 selection:bg-indigo-500/30 overflow-hidden">
      
      {/* 1. FIXED HEADER */}
      <header className="shrink-0 z-50 px-8 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-xl bg-slate-950/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <ShieldCheck className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase leading-none">
              Nexus <span className="text-indigo-500">Command</span>
            </h1>
            <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Auth: Isabella-01</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <SessionTimer elapsedTime={elapsedTime} />
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Encrypted</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: Split into Fixed Top and Scrolling Bottom */}
      <main className="flex-grow flex flex-col overflow-hidden relative">
        
        {/* 2. FIXED VISUALIZER SECTION (Doesn't move) */}
        <section className="shrink-0 h-[45vh] flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950 to-slate-900/20 border-b border-white/5">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
          </div>
          
          <div className="relative z-10 scale-90 sm:scale-100">
            <AudioVisualizer state={currentState} canvasRef={canvasRef} />
          </div>

          <div className="absolute bottom-6 text-center space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400/60">Biometric Frequency</p>
            <div className="flex gap-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${i === 2 ? 'bg-indigo-500' : 'bg-slate-800'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. SCROLLING TRANSCRIPT SECTION (Moves independently) */}
        <section className="flex-grow overflow-hidden flex flex-col relative bg-slate-950/20">
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />
          
          <div className="flex-grow overflow-y-auto custom-scrollbar px-6 sm:px-12 py-8">
            <div className="max-w-3xl mx-auto pb-32">
               <LiveTranscript messages={messages} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
        </section>

      </main>

      {/* 4. FIXED CONTROL OVERLAY */}
      <ControlPanel 
        currentState={currentState} 
        isActive={isActive} 
        onInterrupt={interrupt} 
        onEndCall={endCall} 
      />
    </div>
  );
}