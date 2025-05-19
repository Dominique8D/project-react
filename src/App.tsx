import './i18n'; // TODO is this the right pos?
import useLangTranslation from './custom-hooks/use-lang-translation';
import { Link, Stack } from '@mui/material';
import { useLanguage } from './context/language-context';
import { useThemeProvider } from './providers/theme-provider-wrapper';

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
    <Stack gap={2}>
      <h1> {t('title')}</h1>
      <Link href={linkPlusQueryParams('https://dominique8d.github.io/project-phaser/')}>
        https://dominique8d.github.io/project-phaser/
      </Link>
      <Link href='https://dominique8d.github.io/project-vue/'>
        https://dominique8d.github.io/project-vue/
      </Link>
    </Stack>
  );
}

export default App;
