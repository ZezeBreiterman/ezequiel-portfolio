'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Hero.module.css';

// Gradient palette sampled across amber → cyan → rose for "BREITERMAN"
const BREITERMAN_COLORS = [
  '#F5A623', '#F5B830', '#EFD050', '#70D8D0',
  '#00E5FF', '#20C8EE', '#60A8E0', '#A870C8',
  '#FF4D6D', '#F5A623',
];

const roles = [
  'Motion Designer',
  'Video Editor',
  '3D Animator',
  'Creative Developer',
  'AI Creative Technologist',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Per-character GSAP stagger, triggered after preloader exits
  // EZEQUIEL: slide-up with 3D flip (inline-block chars, overflow-hidden clip)
  // BREITERMAN: opacity stagger only (inline chars, each with its own gradient color)
  useEffect(() => {
    const line1 = nameRef.current?.querySelectorAll<HTMLElement>(`.${styles.char}`);
    const line2 = nameRef.current?.querySelectorAll<HTMLElement>(`.${styles.charInline}`);
    if (!line1?.length && !line2?.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nameRef.current?.querySelectorAll<HTMLElement>(`.${styles.char}`).forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const trigger = () => {
      if (line1?.length) {
        gsap.fromTo(
          Array.from(line1),
          { y: '120%', opacity: 0, rotationX: 80, transformPerspective: 800 },
          { y: '0%', opacity: 1, rotationX: 0, duration: 0.7, stagger: 0.04, ease: 'power3.out', delay: 0.1 }
        );
      }
      if (line2?.length) {
        gsap.fromTo(
          Array.from(line2),
          { opacity: 0 },
          { opacity: 1, duration: 0.65, stagger: 0.055, ease: 'power2.out', delay: 0.5 }
        );
      }
    };

    window.addEventListener('preloaderDone', trigger, { once: true });
    return () => window.removeEventListener('preloaderDone', trigger);
  }, []);

  // Role carousel
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let roleIndex = 0;
    const el = roleRef.current;
    if (!el) return;

    const cycleRole = () => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        el.textContent = roles[roleIndex];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 400);
    };

    const interval = setInterval(cycleRole, 2800);
    return () => clearInterval(interval);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const limit = window.innerHeight;
      if (scrollY > limit) return;
      const progress = scrollY / limit;
      const content = section.querySelector(`.${styles.content}`) as HTMLElement;
      if (content) {
        content.style.transform = `translateY(${scrollY * 0.3}px)`;
        content.style.opacity = `${1 - progress * 1.2}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      <div className={`${styles.content} container`}>
        <div className={styles.preHeadline}>
          <span className={styles.signalLine} />
          <span className={styles.preText}>Buenos Aires — Creative Technologist</span>
          <span className={styles.signalLine} />
        </div>

        {/* Name split into individual characters for stagger animation */}
        <h1 ref={nameRef} className={styles.name} aria-label="Ezequiel Breiterman">
          <span className={styles.nameLine}>
            <span className={styles.nameReveal}>
              {'EZEQUIEL'.split('').map((char, i) => (
                <span key={i} className={styles.char}>{char}</span>
              ))}
            </span>
          </span>
          <span className={styles.nameLine}>
            <span className={styles.nameReveal}>
              {'BREITERMAN'.split('').map((char, i) => (
                <span key={i} className={styles.charInline}>{char}</span>
              ))}
            </span>
          </span>
        </h1>

        <div className={styles.roleWrapper}>
          <span className={styles.roleLabel}>Currently:</span>
          <span ref={roleRef} className={styles.role}>{roles[0]}</span>
          <span className={styles.cursor}>|</span>
        </div>

        <p className={styles.tagline}>
          Motion, code, and AI-crafted visual experiences.
        </p>

        <div className={styles.ctas}>
          <MagneticButton>
            <a href="#work" className="btn btn-primary" data-cursor="hover">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Explore Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className="btn btn-outline" data-cursor="hover">
              Get in Touch
            </a>
          </MagneticButton>
        </div>

      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
}
