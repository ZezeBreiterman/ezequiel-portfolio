'use client';

import { useState, useEffect } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Nav.module.css';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          <a href="#" className={styles.logo} aria-label="Home">
            <span className={styles.logoText}>EB</span>
            <span className={styles.logoDot} />
          </a>

          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} data-cursor="hover">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <MagneticButton>
            <a
              href="#contact"
              className={`${styles.cta} btn btn-primary`}
              data-cursor="hover"
            >
              Let&apos;s Talk
            </a>
          </MagneticButton>

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <ul className={styles.overlayLinks}>
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className={styles.overlayItem}
              style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
            >
              <a
                href={link.href}
                className={styles.overlayLink}
                onClick={handleLinkClick}
              >
                <span className={styles.overlayIndex}>
                  0{i + 1}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
