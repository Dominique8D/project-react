import './App.css';
import './i18n';
import useLangTranslation from './custom-hooks/useLangTranslation';
import { Link } from '@mui/material';

function App() {
  const { t } = useLangTranslation("common");
  return (
    <div className="App">
      <header className="App-header">
        <img src="site-logo.png" className="App-logo" alt="logo" />
        <p> {t('title')} </p>
          <Link href="https://dominique8d.github.io/project-phaser/">
            https://dominique8d.github.io/project-phaser/
          </Link>
      </header>
    </div>
  );
}

export default App;
