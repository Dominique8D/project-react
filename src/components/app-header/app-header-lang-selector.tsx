import { useLanguage } from '../../context/language-context';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import styles from './app-header-lang-selector.module.css';

const AppHeaderLangSelector = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useLangTranslation('common');

  return (
    <label className={styles.languagePicker}>
      <span className={styles.label}>{t('languageLabel')}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label={t('languageLabel')}
      >
        <option value='nl'>{t('languageDutch')}</option>
        <option value='gb'>{t('languageEnglish')}</option>
      </select>
    </label>
  );
};

export default AppHeaderLangSelector;
