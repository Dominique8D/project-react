import React from 'react';
import './App.css';
import './i18n';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './context/language-context';

function App() {
  const { language } = useLanguage();
  const { t } = useTranslation("common", { lng: language });
  return (
    <div className="App">
      <header className="App-header">
        <img src="site-logo.png" className="App-logo" alt="logo"
        />
        <p> {t('title')} </p>
      </header>
    </div>
  );
}

export default App;
