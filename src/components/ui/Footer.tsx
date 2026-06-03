import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.left}>
          <span className={styles.logo}>EB</span>
          <span className={styles.logoDot} />
        </div>

        <p className={styles.copy}>
          © {currentYear} Ezequiel Breiterman. Designed & built with intent.
        </p>

        <div className={styles.right}>
          <span className={styles.location}>Buenos Aires, AR</span>
        </div>
      </div>
    </footer>
  );
}
