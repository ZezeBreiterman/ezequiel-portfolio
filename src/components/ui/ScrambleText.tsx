'use client';

import { useEffect, useRef } from 'react';

const CHARS = '!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function scramble(el: HTMLElement, text: string) {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text;
    return;
  }

  const chars = text.split('');
  const display = [...chars];

  chars.forEach((finalChar, i) => {
    if (finalChar === ' ' || finalChar === '\n') return;

    const resolveDelay = i * 38 + Math.random() * 75;
    const intervalMs = 45;

    const interval = setInterval(() => {
      display[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
      el.textContent = display.join('');
    }, intervalMs);

    setTimeout(() => {
      clearInterval(interval);
      display[i] = finalChar;
      el.textContent = display.join('');
    }, resolveDelay);
  });
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  threshold?: number;
}

export default function ScrambleText({ text, className, threshold = 0.4 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          scramble(el, text);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, threshold]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
