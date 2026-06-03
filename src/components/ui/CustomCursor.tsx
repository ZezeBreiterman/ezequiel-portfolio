'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const TRAIL_COUNT = 8;
const TRAIL_COLORS = ['#F5A623', '#00E5FF', '#F5A623', '#00E5FF', '#F5A623', '#00E5FF', '#F5A623', '#00E5FF'];

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let velocity = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // Trail positions — each follows the one before it
    const trailPos = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));

    const handleMouseMove = (e: MouseEvent) => {
      velocity = Math.sqrt((e.clientX - prevMouseX) ** 2 + (e.clientY - prevMouseY) ** 2);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovering(true);
      }
    };
    const handleElementLeave = () => setIsHovering(false);

    let animationId: number;
    const animate = () => {
      // Main dot
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

      // Ring
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      // Trail dots — each chases the one before it
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target = i === 0 ? { x: mouseX, y: mouseY } : trailPos[i - 1];
        const lerp = 0.82 - i * 0.04;
        trailPos[i].x += (target.x - trailPos[i].x) * lerp;
        trailPos[i].y += (target.y - trailPos[i].y) * lerp;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate(${trailPos[i].x - 1.5}px, ${trailPos[i].y - 1.5}px)`;
          const opacity = velocity > 4 ? (1 - i / TRAIL_COUNT) * 0.55 : 0;
          el.style.opacity = String(opacity);
        }
      }

      // Decay velocity
      velocity *= 0.88;

      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseout', handleElementLeave);
    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseout', handleElementLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Trail dots (behind main cursor) */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className={styles.trail}
          style={{ background: TRAIL_COLORS[i] }}
        />
      ))}

      <div
        ref={dotRef}
        className={`${styles.dot} ${isVisible ? styles.visible : ''} ${isHovering ? styles.hovering : ''}`}
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${isVisible ? styles.visible : ''} ${isHovering ? styles.hovering : ''}`}
      />
    </>
  );
}
