'use client';

import { useEffect, useRef } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './FooterCTA.module.css';

const words = ["LET'S", 'CREATE', 'SOMETHING', 'WORTH'];

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sectionRef.current?.querySelectorAll<HTMLElement>(`.${styles.animate}`).forEach((el) => {
        el.classList.add(styles.visible);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.15 }
    );

    sectionRef.current?.querySelectorAll(`.${styles.animate}`).forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.footerCta}>
      <div className={styles.glow} />
      <div className={`${styles.inner} container`}>
        <div className={styles.textBlock}>
          {words.map((word, i) => (
            <div
              key={word}
              className={`${styles.wordLine} ${styles.animate}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {word}
            </div>
          ))}
          <div
            className={`${styles.wordLine} ${styles.wordAccent} ${styles.animate}`}
            style={{ transitionDelay: `${words.length * 0.08}s` }}
          >
            WATCHING.
          </div>
        </div>

        <div
          className={`${styles.sub} ${styles.animate}`}
          style={{ transitionDelay: `${(words.length + 1) * 0.08}s` }}
        >
          <p className={styles.availability}>
            Available for freelance — Buenos Aires &amp; Remote
          </p>
          <MagneticButton>
            <a href="#contact" className={`btn btn-primary ${styles.cta}`} data-cursor="hover">
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
