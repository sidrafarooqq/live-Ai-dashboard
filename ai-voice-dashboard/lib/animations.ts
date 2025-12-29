export function drawPulsingCircle(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  baseRadius: number,
  frame: number
): void {
  const radius = baseRadius + Math.sin(frame * 0.05) * 10;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 255, 249, 0.3)';
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#00fff9';
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function drawSoundBars(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  frame: number
): void {
  const barCount = 7;
  const barWidth = 20;
  const spacing = 30;
  
  // Update bars only every few frames for "choppy" audio look or smooth?
  // Let's use noise-like movement
  for (let i = 0; i < barCount; i++) {
    const x = centerX - (barCount * spacing) / 2 + i * spacing;
    // Use sine waves with different offsets to simulate random-ish movement that loops
    const noise = Math.sin(frame * 0.1 + i) + Math.sin(frame * 0.2 + i * 2);
    const height = 60 + Math.abs(noise) * 70; // 60 to 200 range approx
    
    const y = centerY - height / 2;
    
    const gradient = ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, '#10b981');
    gradient.addColorStop(1, '#059669');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, height);
  }
}

export function drawSpinner(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  frame: number
): void {
  const rotation = (frame * 0.05) % (Math.PI * 2);
  const particleCount = 6;
  const radius = 80;

  for (let i = 0; i < particleCount; i++) {
    const angle = rotation + (i * Math.PI * 2) / particleCount;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#b026ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#b026ff';
    ctx.fill();
  }
  ctx.shadowBlur = 0;
}

export function drawWaveform(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  frame: number
): void {
  const waveCount = 12;
  const radius = 100;
  
  ctx.beginPath();
  for (let i = 0; i <= waveCount * 10; i++) {
    const angle = (i * Math.PI * 2) / (waveCount * 10);
    // Combine sine waves for organic pulsing shape
    const amplitude = 30 + Math.sin(frame * 0.1 + i * 0.5) * 20;
    
    // Smooth circle + wave offset
    const r = radius + Math.sin(angle * 8 + frame * 0.1) * amplitude;
    
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  
  const gradient = ctx.createRadialGradient(centerX, centerY, radius - 20, centerX, centerY, radius + 50);
  gradient.addColorStop(0, '#ff006e');
  gradient.addColorStop(1, '#00fff9');
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 4;
  ctx.stroke();
}
