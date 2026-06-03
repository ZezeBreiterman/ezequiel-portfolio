'use client';

import { motion } from 'framer-motion';
import { skillGroups } from '@/data/skills';
import styles from './Skills.module.css';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className={`${styles.skills} section`} id="skills">
      <div className="container">
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className={styles.sectionLabel} variants={cardVariants}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Skills & Tools</span>
          </motion.div>
          <motion.h2 className={styles.heading} variants={cardVariants}>
            Creative. Technical.<br />
            <span className="text-amber">AI-Enhanced.</span>
          </motion.h2>
          <motion.p className={styles.subheading} variants={cardVariants}>
            A multidisciplinary toolkit spanning motion design, development,
            and AI-assisted workflows.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              className={`${styles.card} glass`}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              style={{
                borderColor: `${group.accent}22`,
              }}
            >
              <div className={styles.cardHeader}>
                <span
                  className={styles.cardIcon}
                  style={{ color: group.accent }}
                >
                  {group.icon}
                </span>
                <h3 className={styles.cardTitle}>{group.title}</h3>
                <span
                  className={styles.cardCount}
                  style={{ color: group.accent }}
                >
                  {group.skills.length}
                </span>
              </div>

              <div className={styles.skillTags}>
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className={styles.skillTag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    style={{
                      borderColor: `${group.accent}33`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Accent glow */}
              <div
                className={styles.cardGlow}
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${group.accent}15 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
