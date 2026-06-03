'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { gsap } from 'gsap';
import styles from './ModeProvider.module.css';

export type Mode = 'developer' | 'creative';

interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
  transitioning: boolean;
}

const ModeContext = createContext<ModeContextValue>({
  mode: 'developer',
  setMode: () => {},
  transitioning: false,
});

export const useMode = () => useContext(ModeContext);

const LABELS: Record<Mode, string> = {
  developer: 'Developer',
  creative: 'Creative',
};

export default function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>('developer');
  const [transitioning, setTransitioning] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const setMode = useCallback(
    (target: Mode) => {
      if (target === mode || transitioning) return;

      const curtain = curtainRef.current;
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // No animation: just swap theme + content immediately.
      if (!curtain || reduce) {
        setModeState(target);
        document.documentElement.dataset.mode = target;
        return;
      }

      setTransitioning(true);
      curtain.dataset.target = target;
      if (labelRef.current) labelRef.current.textContent = LABELS[target];

      const tl = gsap.timeline({
        onComplete: () => setTransitioning(false),
      });

      tl.set(curtain, { display: 'flex', transformOrigin: 'bottom center' })
        .fromTo(
          curtain,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.55, ease: 'power4.inOut' }
        )
        .fromTo(
          labelRef.current,
          { opacity: 0, yPercent: 30 },
          { opacity: 1, yPercent: 0, duration: 0.35, ease: 'power2.out' },
          '-=0.25'
        )
        // Swap the theme + content while the screen is fully covered.
        .add(() => {
          setModeState(target);
          document.documentElement.dataset.mode = target;
        })
        .to({}, { duration: 0.18 })
        .to(labelRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' })
        .set(curtain, { transformOrigin: 'top center' })
        .to(curtain, { scaleY: 0, duration: 0.55, ease: 'power4.inOut' })
        .set(curtain, { display: 'none' });
    },
    [mode, transitioning]
  );

  return (
    <ModeContext.Provider value={{ mode, setMode, transitioning }}>
      {children}
      <div ref={curtainRef} className={styles.curtain} data-target="developer" aria-hidden="true">
        <span ref={labelRef} className={styles.label} />
        <span className={styles.sub}>Switching mode</span>
      </div>
    </ModeContext.Provider>
  );
}
