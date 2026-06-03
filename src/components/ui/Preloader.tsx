'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
            // Fire after Framer Motion's 0.8s exit animation
            setTimeout(() => window.dispatchEvent(new CustomEvent('preloaderDone')), 900);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className={styles.preloader}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.inner}>
            <div className={styles.logoWrapper}>
              <motion.span 
                className={styles.logo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                EB<span className={styles.dot}>.</span>
              </motion.span>
              <div className={styles.shimmer} />
            </div>
            
            <div className={styles.progressWrapper}>
              <div className={styles.progressBar}>
                <motion.div 
                  className={styles.progressFill} 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.percent}>{Math.floor(progress)}%</span>
                <span className={styles.status}>Initializing Creative Core</span>
              </div>
            </div>
          </div>
          
          <div className={styles.grid} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
