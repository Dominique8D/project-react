import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Page404 from './pages/page-404';
import AppHeader from './components/app-header';
import AboutPage from './pages/about';
import { LanguageProvider } from './context/language-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <AppHeader />
      <HashRouter>
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='*' element={<Page404 />}></Route>
        </Routes>
      </HashRouter>
    </LanguageProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
