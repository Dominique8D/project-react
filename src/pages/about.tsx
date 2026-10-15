import PageLayout from '../layout/page-layout';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import styles from './about.module.css';

const AboutPage = () => {
  const { t } = useLangTranslation('about');

  return (
    <PageLayout>
      <section className={styles.about}>
        <p className={styles.eyebrow}>Project React</p>
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
