import styles from './icon.module.css';

const CloseIcon = () => (
  <svg className={styles.icon} viewBox='0 0 24 24' aria-hidden='true'>
    <path d='m18 6-12 12M6 6l12 12' />
  </svg>
);

export default CloseIcon;