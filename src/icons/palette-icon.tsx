import styles from './icon.module.css';

const PaletteIcon = () => (
  <svg className={styles.icon} viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 1.2-3.1 1.8 1.8 0 0 1 1.2-3.1H17a4 4 0 0 0 4-4c0-4.3-4-7.8-9-7.8Z' />
    <circle cx='7.5' cy='10' r='0.8' />
    <circle cx='10.5' cy='7' r='0.8' />
    <circle cx='15' cy='7.5' r='0.8' />
  </svg>
);

export default PaletteIcon;
