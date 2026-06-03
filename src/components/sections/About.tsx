'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './About.module.css';

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(
  from: number,
  to: number,
  duration: number,
  onUpdate: (v: number) => void
) {
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    onUpdate(Math.round(from + (to - from) * easeOut(t)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const countersStarted = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setYears(6);
      setProjects(30);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);

            // Start counters once when stats section enters view
            if (
              !countersStarted.current &&
              entry.target.classList.contains(styles.visual)
            ) {
              countersStarted.current = true;
              animateCounter(0, 6, 1500, setYears);
              animateCounter(0, 30, 2000, setProjects);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    const section = sectionRef.current;
    if (section) {
      section.querySelectorAll(`.${styles.animate}`).forEach((el) => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.about} section`} id="about">
      <div className={`${styles.grid} container`}>
        {/* Left: Visual identity */}
        <div className={`${styles.visual} ${styles.animate}`}>
          <div className={styles.avatarFrame}>
            <div className={styles.avatarGradient} />
            <div className={styles.avatarInner}>
              <Image
                src="/images/profilephoto.jpg"
                alt="Ezequiel Breiterman"
                width={300}
                height={300}
                className={styles.profilePhoto}
                priority
              />
            </div>
            <div className={styles.orbitRing}>
              <div className={styles.orbitDot} style={{ animationDelay: '0s' }} />
              <div className={styles.orbitDot} style={{ animationDelay: '2s' }} />
              <div className={styles.orbitDot} style={{ animationDelay: '4s' }} />
            </div>
          </div>
          <div className={styles.statCards}>
            <div className={`${styles.stat} glass`}>
              <span className={styles.statValue}>{years}+</span>
              <span className={styles.statLabel}>Years in Tech</span>
            </div>
            <div className={`${styles.stat} glass`}>
              <span className={styles.statValue}>{projects}+</span>
              <span className={styles.statLabel}>Projects Delivered</span>
            </div>
            <div className={`${styles.stat} glass`}>
              <span className={styles.statValue}>∞</span>
              <span className={styles.statLabel}>Curiosity</span>
            </div>
          </div>
        </div>

        {/* Right: Copy */}
        <div className={styles.copy}>
          <div className={`${styles.sectionLabel} ${styles.animate}`}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>About</span>
          </div>

          <h2 className={`${styles.heading} ${styles.animate}`}>
            I design motion.<br />
            I build interaction.<br />
            <span className="text-amber">I shape digital stories.</span>
          </h2>

          <div className={`${styles.paragraphs} ${styles.animate}`}>
            <p>
              I&apos;m Ezequiel Breiterman — a Buenos Aires-based{' '}
              <strong>creative technologist</strong> working at the intersection of
              motion design, video production, 3D animation, software engineering,
              and AI-powered creative workflows.
            </p>
            <p>
              Before I was designing motion, I was building enterprise software —
              APIs, automation systems, back-end logic, and complex data flows.
              That foundation didn&apos;t leave me when I pivoted to visual storytelling.
              <span className="text-cyan"> It made me better at it.</span>
            </p>
            <p>
              I bring developer precision to animation: timing, logic, loops, and
              optimization. I bring designer sensitivity to code: rhythm, whitespace,
              visual hierarchy, and movement. Every frame, every interaction, every
              commit is crafted with intent.
            </p>
          </div>

          <div className={`${styles.badges} ${styles.animate}`}>
            {[
              'Motion Graphics',
              'Video Editing',
              '3D Animation',
              'Web Development',
              'AI Workflows',
              'Creative Coding',
            ].map((badge) => (
              <span key={badge} className={styles.badge}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
