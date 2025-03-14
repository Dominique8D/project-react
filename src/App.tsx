import './App.css';
import './i18n';
import useLangTranslation from './custom-hooks/useLangTranslation';

function App() {
  const { t } = useLangTranslation("common");
  return (
    <div className="App">
      <header className="App-header">
        <img src="site-logo.png" className="App-logo" alt="logo" />
        <p> {t('title')} </p>
      </header>
    </div>
  );
}

export default App;
