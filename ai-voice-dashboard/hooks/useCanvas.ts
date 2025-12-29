import { useEffect, useRef } from 'react';

export function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, frame: number) => void,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const frameRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Handle High DPI displays
    const dpr = window.devicePixelRatio || 1;
    // Get CSS size
    const rect = canvas.getBoundingClientRect();
    
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Normalize coordinate system to use css pixels.
    ctx.scale(dpr, dpr);
    
    const render = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, rect.width, rect.height);
      draw(ctx, frameRef.current);
      animationIdRef.current = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [draw, canvasRef]);
}
