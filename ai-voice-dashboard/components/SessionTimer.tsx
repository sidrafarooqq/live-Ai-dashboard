interface Props {
  elapsedTime: number;
}

export function SessionTimer({ elapsedTime }: Props) {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  
  return (
    <div className="px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800/50 font-mono text-lg text-slate-300 tracking-tighter tabular-nums shadow-inner">
      <span className="opacity-40 font-sans text-[10px] uppercase font-black tracking-widest mr-3">Session</span>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}