'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, type, message } = formState;
    const subject = encodeURIComponent(`Portfolio Inquiry — ${type || 'General'} — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${type}\n\n${message}`
    );
    window.location.href = `mailto:zezebreiterman@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section ref={sectionRef} className={`${styles.contact} section`} id="contact">
      <div className="container">
        <div className={styles.grid}>
          {/* Left side */}
          <div className={styles.info}>
            <div className={`${styles.sectionLabel} ${styles.animate}`}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Contact</span>
            </div>

            <h2 className={`${styles.heading} ${styles.animate}`}>
              Let&apos;s build something<br />
              <span className="text-amber">worth watching.</span>
            </h2>

            <p className={`${styles.subtitle} ${styles.animate}`}>
              Currently available for freelance projects, creative collaborations,
              and full-time opportunities.
            </p>

            <div className={`${styles.details} ${styles.animate}`}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Design Email</span>
                <a
                  href="mailto:motionbyzeze@gmail.com"
                  className={styles.detailValue}
                  data-cursor="hover"
                >
                  motionbyzeze@gmail.com
                </a>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Development Email</span>
                <a
                  href="mailto:zezebreiterman@gmail.com"
                  className={styles.detailValue}
                  data-cursor="hover"
                >
                  zezebreiterman@gmail.com
                </a>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>Buenos Aires, Argentina 🇦🇷</span>
              </div>
            </div>

            {/* Social links */}
            <div className={`${styles.socials} ${styles.animate}`}>
              <a
                href="https://www.linkedin.com/in/ezequielbreiterman/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                data-cursor="hover"
                aria-label="LinkedIn Development"
              >
                LinkedIn (Dev)
              </a>
              <a
                href="https://www.linkedin.com/in/motionbyzeze/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                data-cursor="hover"
                aria-label="LinkedIn Design"
              >
                LinkedIn (Design)
              </a>
              <a
                href="https://github.com/ZezeBreiterman"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                data-cursor="hover"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://ezequielbreiterman.myportfolio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                data-cursor="hover"
                aria-label="Design Portfolio"
              >
                Portfolio
              </a>
            </div>
          </div>

          {/* Right side: Form */}
          <form
            className={`${styles.form} ${styles.animate} glass`}
            onSubmit={handleSubmit}
          >
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message sent!</h3>
                <p>I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="contact-name" className={styles.formLabel}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className={styles.formInput}
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={styles.formInput}
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-type" className={styles.formLabel}>
                    Project Type
                  </label>
                  <select
                    id="contact-type"
                    className={styles.formSelect}
                    value={formState.type}
                    onChange={(e) =>
                      setFormState({ ...formState, type: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a type…</option>
                    <option value="motion">Motion Graphics</option>
                    <option value="3d">3D Animation</option>
                    <option value="web">Web Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-message" className={styles.formLabel}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className={styles.formTextarea}
                    placeholder="Tell me about your project…"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
