import { useEffect, useRef, useState } from 'react';

export type Phase = 'waiting' | 'flying' | 'crashed';

// Demo round loop. The crash point is drawn at random when a round starts and
// is never exposed to the UI — only the live multiplier is shown.
function drawCrashPoint() {
  const r = Math.random();
  return Math.max(1, Math.floor((0.99 / (1 - r)) * 100) / 100);
}

const WAIT_MS = 3500;
const CRASHED_MS = 2200;

export function useRound() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [multiplier, setMultiplier] = useState(1);
  const [previous, setPrevious] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [round, setRound] = useState(1);
  const crashRef = useRef(1);

  useEffect(() => {
    let timer: number;
    let raf = 0;

    const startWaiting = () => {
      setPhase('waiting');
      setMultiplier(1);
      timer = window.setTimeout(startFlying, WAIT_MS);
    };

    const startFlying = () => {
      crashRef.current = drawCrashPoint();
      setPhase('flying');
      const t0 = performance.now();
      const tick = (now: number) => {
        const m = Math.exp(0.00012 * (now - t0));
        if (m >= crashRef.current) {
          const final = crashRef.current;
          setMultiplier(final);
          setPrevious(final);
          setHistory((h) => [final, ...h].slice(0, 24));
          setPhase('crashed');
          timer = window.setTimeout(() => {
            setRound((r) => r + 1);
            startWaiting();
          }, CRASHED_MS);
          return;
        }
        setMultiplier(m);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    startWaiting();
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { phase, multiplier, previous, history, round };
}
