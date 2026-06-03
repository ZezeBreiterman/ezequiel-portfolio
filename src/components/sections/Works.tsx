'use client';

import { useEffect, useRef } from 'react';
import { projects, type Discipline } from '@/data/projects';
import { useMode, type Mode } from '@/components/providers/ModeProvider';
import TiltCard from '@/components/ui/TiltCard';
import ScrambleText from '@/components/ui/ScrambleText';
import styles from './Works.module.css';

// Short blurb shown under the active discipline so recruiters know what they're looking at.
const disciplineMeta: Record<Discipline, string> = {
  Developer: 'Web apps, 3D / WebGL experiences & creative coding.',
  Designer: 'Motion graphics, 3D animation & visual design.',
};

const modeToDiscipline: Record<Mode, Discipline> = {
  developer: 'Developer',
  creative: 'Designer',
};

export default function Works() {
  const { mode } = useMode();
  const activeDiscipline = modeToDiscipline[mode];
  const sectionRef = useRef<HTMLElement>(null);

  // Driven by the global Developer/Creative lens chosen after the hero.
  const filtered = projects.filter((p) => p.discipline === activeDiscipline);

  // Fix: Re-run IntersectionObserver whenever the filter changes
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
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      // Find all animate elements including newly rendered ones
      const elements = section.querySelectorAll(`.${styles.animate}`);
      elements.forEach((el) => {
        // If it's already visible (due to being on screen), add the class immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add(styles.visible);
        }
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [activeDiscipline, filtered.length]); // Re-run when the active discipline changes

  return (
    <section ref={sectionRef} className={`${styles.works} section`} id="work">
      <div className="container">
        <div className={`${styles.header} ${styles.animate}`}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Selected Work</span>
          </div>
          <h2 className={styles.heading}>
            <ScrambleText text="Projects that " threshold={0.3} />
            <ScrambleText text="resonate." className="text-amber" threshold={0.3} />
          </h2>
        </div>

        {/* Synced with the global lens chosen after the hero */}
        <div className={`${styles.lensBar} ${styles.animate}`}>
          <span className={styles.lensDot} />
          <span className={styles.lensText}>
            Showing <strong>{activeDiscipline}</strong> work — {disciplineMeta[activeDiscipline]}
          </span>
          <a href="#lens" className={styles.lensSwitch} data-cursor="hover">
            Switch lens
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>

        {/* Project grid */}
        <div className={styles.grid} style={{ perspective: '1000px' }}>
          {filtered.map((project, i) => (
            <TiltCard
              key={`${project.slug}-${activeDiscipline}`} // Key includes discipline to force re-mount
              className={`${styles.card} ${styles.animate} ${
                project.featured ? styles.cardFeatured : ''
              }`}
              style={{
                transitionDelay: `${i * 0.05}s`,
                '--project-color': project.color,
              } as React.CSSProperties}
              data-cursor="hover"
              onClick={() => project.link && window.open(project.link, '_blank')}
            >
              {/* Thumbnail */}
              <div className={styles.cardMedia} style={{ transform: 'translateZ(20px)' }}>
                <div className={styles.cardThumb}>
                  <div 
                    className={styles.imagePlaceholder}
                    style={{ background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)` }}
                  >
                    <span className={styles.thumbLabel}>{project.title}</span>
                  </div>
                  {/* Real Image */}
                  <div className={styles.imageWrapper}>
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className={styles.thumbnailImage}
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                </div>
                <div className={styles.cardOverlay}>
                  <span className={styles.viewLabel}>View Project</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className={styles.cardInfo} style={{ transform: 'translateZ(40px)' }}>
                <div className={styles.cardMeta}>
                  <span
                    className={styles.cardCategory}
                    style={{ color: project.color }}
                  >
                    {project.category}
                  </span>
                  <span className={styles.cardYear}>{project.year}</span>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardTagline}>{project.tagline}</p>
                <div className={styles.cardTools}>
                  {project.tools.slice(0, 4).map((tool) => (
                    <span key={tool} className={styles.toolTag}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div className={styles.cardGlow} />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
