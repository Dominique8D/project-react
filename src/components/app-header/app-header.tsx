import AppHeaderLangSelector from './app-header-lang-selector';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import ThemeToggleButton from './app-header-theme-changer';
import styles from './app-header.module.css';

const pages = ['blog', 'about'];

const AppHeader = () => {
  const { t } = useLangTranslation('common');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href='#/'>{t('home')}<span> / React</span></a>
        <nav className={styles.navigation} aria-label={t('navigationLabel')}>
          {pages.map((page) => (
            <a className={styles.navLink} href={`#/${page}`} key={page}>{t(page)}</a>
          ))}
        </nav>
        <div className={styles.controls}>
          <AppHeaderLangSelector />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
