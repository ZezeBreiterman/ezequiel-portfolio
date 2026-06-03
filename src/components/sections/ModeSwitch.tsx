'use client';

import { useMode, type Mode } from '@/components/providers/ModeProvider';
import styles from './ModeSwitch.module.css';

interface Option {
  id: Mode;
  title: string;
  blurb: string;
  stack: string;
  count: number;
  icon: React.ReactNode;
}

const options: Option[] = [
  {
    id: 'developer',
    title: 'Developer',
    blurb: 'Web apps, 3D / WebGL experiences & creative coding.',
    stack: 'React · Next.js · Three.js · GSAP',
    count: 5,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'creative',
    title: 'Creative',
    blurb: 'Motion graphics, 3D animation & visual design.',
    stack: 'After Effects · Blender · Cinema 4D',
    count: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function ModeSwitch() {
  const { mode, setMode, transitioning } = useMode();

  return (
    <section className={styles.section} id="lens">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Choose your lens</span>
          </div>
          <h2 className={styles.heading}>
            Two disciplines.<br />
            <span className="text-amber">One craftsman.</span>
          </h2>
          <p className={styles.subtitle}>
            Tell me what you&apos;re hiring for — the whole page adapts to show you
            the relevant side.
          </p>
        </div>

        <div className={styles.options}>
          {options.map((opt) => {
            const active = mode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`${styles.card} ${active ? styles.active : ''}`}
                data-mode={opt.id}
                aria-pressed={active}
                disabled={transitioning}
                onClick={() => setMode(opt.id)}
                data-cursor="hover"
              >
                <div className={styles.cardTop}>
                  <span className={styles.icon}>{opt.icon}</span>
                  <span className={styles.count}>{opt.count} projects</span>
                </div>
                <h3 className={styles.cardTitle}>{opt.title}</h3>
                <p className={styles.cardBlurb}>{opt.blurb}</p>
                <span className={styles.stack}>{opt.stack}</span>
                <span className={styles.state}>
                  {active ? 'Currently viewing' : 'View this side'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span className={styles.glow} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
