import './i18n';
import useLangTranslation from './custom-hooks/useLangTranslation';
import { Link, Stack } from '@mui/material';

function App() {
  const { t } = useLangTranslation('common');
  return (
    <Stack gap={2}>
      <h1> {t('title')} </h1>
      <Link href='https://dominique8d.github.io/project-phaser/'>
        https://dominique8d.github.io/project-phaser/
      </Link>
      <Link href='https://dominique8d.github.io/project-vue/'>
        https://dominique8d.github.io/project-vue/
      </Link>
    </Stack>
  );
}

export default App;
