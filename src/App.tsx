import './i18n'; // TODO is this the right pos?
import useLangTranslation from './custom-hooks/use-lang-translation';
import { useLanguage } from './context/language-context';
import { useThemeProvider } from './providers/theme-provider-wrapper';
import PageLayout from './layout/page-layout';
import styles from './app.module.css';

function App() {
  const { t } = useLangTranslation('common');

  // Add current language to other project
  const { language } = useLanguage();
  const { mode } = useThemeProvider();
  const linkPlusQueryParams = (link: string) => {
    const url = new URL(link, window.location.origin);
    url.searchParams.set('lang', language);
    url.searchParams.set('mode', mode);
    return url.toString();
  };

  return (
    <PageLayout>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>{t('introEyebrow')}</p>
        <h1>{t('title')}</h1>
        <p className={styles.lead}>{t('description')}</p>
      </section>
      <section className={styles.projects} aria-label={t('projectsLabel')}>
        <a className={styles.project} href={linkPlusQueryParams('https://dominique8d.github.io/project-phaser/')}>
          <span className={styles.projectNumber}>01</span>
          <span className={styles.projectName}>{t('phaserProject')}</span>
          <span className={styles.projectUrl}>{t('phaserDescription')}</span>
        </a>
        <a className={styles.project} href='https://dominique8d.github.io/project-vue/'>
          <span className={styles.projectNumber}>02</span>
          <span className={styles.projectName}>{t('vueProject')}</span>
          <span className={styles.projectUrl}>{t('vueDescription')}</span>
        </a>
      </section>
    </PageLayout>
  );
}

export default App;
