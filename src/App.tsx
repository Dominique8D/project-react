import './i18n'; // TODO is this the right pos?
import useLangTranslation from './custom-hooks/use-lang-translation';
import { Link, Stack } from '@mui/material';
import { useLanguage } from './context/language-context';

function App() {
  const { t } = useLangTranslation('common');

  // Add current language to other project
  const lang = useLanguage();
  const currentLanguage = lang.language;
  const linkPlusLanguage = (link: string, lang: string) => {
    const url = new URL(link, window.location.origin);
    url.searchParams.set('lang', lang);
    return url.toString();
  };

  return (
    <Stack gap={2}>
      <h1> {t('title')}</h1>
      <Link
        href={linkPlusLanguage('https://dominique8d.github.io/project-phaser/', currentLanguage)}
      >
        https://dominique8d.github.io/project-phaser/
      </Link>
      <Link href='https://dominique8d.github.io/project-vue/'>
        https://dominique8d.github.io/project-vue/
      </Link>
    </Stack>
  );
}

export default App;
