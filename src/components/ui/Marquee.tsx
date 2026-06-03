'use client';

import styles from './Marquee.module.css';

const items = [
  'Motion Design',
  '3D Animation',
  'Creative Coding',
  'Web Development',
  'AI Workflows',
  'After Effects',
  'Three.js',
  'React',
  'Cinema 4D',
  'Blender',
  'GSAP',
  'Video Editing',
];

function Strip({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
      {[0, 1].map((copy) => (
        <div key={copy} className={styles.content} aria-hidden={copy === 1}>
          {items.map((item) => (
            <span key={item} className={styles.item}>
              {item}
              <span className={styles.dot}>·</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <Strip />
      <Strip reverse />
    </div>
  );
}
