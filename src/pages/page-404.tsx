import useLangTranslation from '../custom-hooks/use-lang-translation';
import PageLayout from '../layout/page-layout';
import styles from './page-404.module.css';

const Page404 = () => {
  const { t } = useLangTranslation('common');

  return (
    <PageLayout>
      <section className={styles.notFound} aria-labelledby='not-found-title'>
        <p className={styles.code} aria-hidden='true'>404</p>
        <h1 id='not-found-title'>{t('notFoundTitle')}</h1>
        <p className={styles.description}>{t('notFoundDescription')}</p>
        <a className={styles.homeLink} href='#/'>
          {t('notFoundHome')}
        </a>
      </section>
    </PageLayout>
  );
};

export default Page404;
