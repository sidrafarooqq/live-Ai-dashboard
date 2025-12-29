'use client';

import { useEffect, useRef } from 'react';
import type { AudioVisualizerProps } from '@/types/components';
import { drawPulsingCircle, drawSoundBars, drawSpinner, drawWaveform } from '@/lib/animations';

/**
 * AudioVisualizer: High-performance Canvas animation
 * - Fixed at top/center
 * - State-driven drawing logic
 * - 60 FPS target using requestAnimationFrame
 */
export function AudioVisualizer({ state, canvasRef }: AudioVisualizerProps) {
  const frameRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Handle high DPI displays (Retina)
    const setupCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = 400;
        const displayHeight = 400;
        
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        ctx.scale(dpr, dpr);
    };
    
    setupCanvas();

    const animate = () => {
      frameRef.current++;
      
      const width = 400;
      const height = 400;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clean clear for transparent overlay effect
      ctx.clearRect(0, 0, width, height);

      // Organic background glow based on state
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.05)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw active state animation
      switch (state) {
        case 'idle':
          drawPulsingCircle(ctx, centerX, centerY, 70, frameRef.current);
          break;
        case 'listening':
          drawSoundBars(ctx, centerX, centerY, frameRef.current);
          break;
        case 'processing':
          drawSpinner(ctx, centerX, centerY, frameRef.current);
          break;
        case 'speaking':
          drawWaveform(ctx, centerX, centerY, frameRef.current);
          break;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [state, canvasRef]);

  return (
    <div className="relative group">
      {/* Visual background layers for depth */}
      <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[80px] animate-pulse-slow" />
      
      <div className="relative flex items-center justify-center p-4">
        {/* Outer Tech Ring */}
        <div className="absolute w-[320px] h-[320px] rounded-full border border-indigo-500/10 animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-[300px] h-[300px] rounded-full border-t border-indigo-500/20 animate-[spin_10s_linear_infinite_reverse]" />
        
        <canvas 
          ref={canvasRef} 
          className="relative w-[400px] h-[400px] pointer-events-none drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]" 
        />
      </div>
    </div>
  );
}
