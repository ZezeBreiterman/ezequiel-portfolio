'use client';

import { useEffect, useRef } from 'react';
import { experience } from '@/data/experience';
import styles from './Experience.module.css';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
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
    <section ref={sectionRef} className={`${styles.experience} section`} id="experience">
      <div className="container">
        <div className={`${styles.header} ${styles.animate}`}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Experience</span>
          </div>
          <h2 className={styles.heading}>
            From code to <span className="text-amber">creative.</span>
          </h2>
          <p className={styles.subheading}>
            A career that bridges enterprise software engineering with
            motion design and multimedia production.
          </p>
        </div>

        <div className={styles.timeline}>
          {/* Timeline line */}
          <div className={styles.timelineLine} />

          {experience.map((item, i) => (
            <div
              key={item.period}
              className={`${styles.timelineItem} ${styles.animate}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Dot */}
              <div
                className={styles.timelineDot}
                style={{
                  background: item.accent,
                  boxShadow: `0 0 16px ${item.accent}44`,
                }}
              />

              {/* Content card */}
              <div className={`${styles.timelineCard} glass`}>
                <div className={styles.cardHeader}>
                  <span
                    className={styles.period}
                    style={{ color: item.accent }}
                  >
                    {item.period}
                  </span>
                  <span className={styles.company}>{item.company}</span>
                </div>

                <h3 className={styles.jobTitle}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>

                <div className={styles.skillTags}>
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className={styles.skillTag}
                      style={{ borderColor: `${item.accent}33` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
