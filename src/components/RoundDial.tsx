import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@project/components/lib/utils';
import type { Phase } from './useRound';

export default function RoundDial({ phase, multiplier }: { phase: Phase; multiplier: number }) {
  return (
    <div className="relative aspect-square w-[72vw] max-w-[340px]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full spin-cw">
        <circle cx="100" cy="100" r="94" fill="none" stroke="hsl(var(--primary))" strokeWidth="5"
          strokeLinecap="round" strokeDasharray="420 171" />
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full spin-ccw">
        <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.8"
          strokeWidth="2.5" strokeLinecap="round" strokeDasharray="300 203" />
      </svg>
      <div className="absolute inset-[18%] rounded-full bg-card shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.35)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase !== 'waiting' && (
            <motion.span
              key="m"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: phase === 'crashed' ? 1.08 : 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                'font-mono text-4xl font-bold tabular-nums sm:text-5xl',
                phase === 'crashed' ? 'text-primary' : 'text-foreground',
              )}
            >
              {multiplier.toFixed(2)}x
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
