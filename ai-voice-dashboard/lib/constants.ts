export const SIMULATION_TIMINGS = {
  speaking: { min: 4000, max: 6000 },
  idle: 1000,
  listening: { min: 3000, max: 4000 },
  processing: { min: 1500, max: 2500 },
} as const;

export const COLORS = {
  idle: '#6b7280',
  listening: '#10b981',
  processing: '#f59e0b',
  speaking: '#00fff9',
} as const;
