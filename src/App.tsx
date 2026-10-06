import RoundDial from './components/RoundDial';
import { useRound } from './components/useRound';
import { cn } from '@project/components/lib/utils';

export default function App() {
  const { phase, multiplier, history } = useRound();
  const lastTwo = history.slice(0, 2);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)),hsl(var(--background))_60%)] p-4">
      <section className="relative w-full max-w-lg overflow-hidden rounded-3xl border bg-card px-6 py-10 shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.5)] sm:px-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="flex flex-col items-center gap-10">
          {/* Logo slot — add your plane here */}
          <div className="h-24 sm:h-28" />
          <RoundDial phase={phase} multiplier={multiplier} />
          <div className="flex h-11 gap-3">
            {lastTwo.map((v, i) => (
              <span
                key={`${history.length}-${i}`}
                className={cn(
                  'flex min-w-[96px] items-center justify-center rounded-full border px-4 font-mono text-base font-bold tabular-nums',
                  i === 0 ? 'border-primary/30 bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground',
                )}
              >
                {v.toFixed(2)}x
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
