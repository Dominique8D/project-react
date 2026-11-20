import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import AppHeader from './components/app-header/app-header';
import { LanguageProvider } from './context/language-context';
import { ThemeProviderWrapper } from './providers/theme-provider-wrapper';
import SiteToolsPage from './pages/site-tools';
import Page404 from './pages/page-404';

test('renders Project React', () => {
  render(
    <LanguageProvider>
      <ThemeProviderWrapper>
        <AppHeader />
        <App />
      </ThemeProviderWrapper>
    </LanguageProvider>,
  );
  const linkElement = screen.getByText(/Project React/i);
  expect(linkElement).toBeDefined();
  expect(screen.getByText(/Een React-portfolio om nieuwe ideeën en technologieën te verkennen/)).toBeDefined();
  expect(screen.getByText(/Via de linkjes hieronder vind je ook meer projecten/)).toBeDefined();
});

test('updates translated content and document language when language changes', () => {
  render(
    <LanguageProvider>
      <ThemeProviderWrapper>
        <AppHeader />
        <App />
      </ThemeProviderWrapper>
    </LanguageProvider>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Taalkeuze — huidige taal: Nederlands' }));
  fireEvent.click(screen.getByRole('option', { name: 'Engels' }));

  expect(screen.getByText(/Welcome to Project React GB-EN/i)).toBeDefined();
  expect(screen.getByText(/A React portfolio for exploring new ideas and technologies/)).toBeDefined();
  expect(screen.getByText(/The links below lead to more projects/)).toBeDefined();
  expect(screen.getByText('Game development')).toBeDefined();
  expect(document.documentElement.lang).toBe('en-GB');
});

test('applies custom theme colors and links to site tools', () => {
  window.history.replaceState(null, '', '/');
  const { container } = render(
    <LanguageProvider>
      <ThemeProviderWrapper>
        <AppHeader />
        <SiteToolsPage />
      </ThemeProviderWrapper>
    </LanguageProvider>,
  );

  const navLinks = Array.from(container.querySelectorAll('nav a'));
  expect(navLinks.map((link) => link.getAttribute('href'))).toEqual(['#/blog', '#/site-tools']);
  fireEvent.click(screen.getByRole('button', { name: 'Thema — Donker' }));
  fireEvent.click(screen.getByRole('option', { name: 'Custom' }));

  const app = container.querySelector('[data-theme="custom"]');
  expect(app).not.toBeNull();

  fireEvent.change(screen.getByLabelText('Accent'), { target: { value: '#ff0000' } });
  expect(app?.getAttribute('style')).toContain('--theme-accent: #ff0000');
});

test('previews custom colors in the app while adjusting a color control', () => {
  window.history.replaceState(null, '', '/');
  const { container } = render(
    <LanguageProvider>
      <ThemeProviderWrapper>
        <SiteToolsPage />
      </ThemeProviderWrapper>
    </LanguageProvider>,
  );

  fireEvent.change(screen.getByLabelText('Hoofdkleur'), { target: { value: '#ff0000' } });

  const app = container.querySelector('[data-theme="custom"]');
  expect(app).not.toBeNull();
  expect(app?.getAttribute('style')).toContain('--theme-main: #ff0000');
  expect(screen.getByLabelText('Hoofdkleur').getAttribute('style')).toContain('var(--main)');
});

test('offers all custom theme color controls', () => {
  window.history.replaceState(null, '', '/');
  render(
    <LanguageProvider>
      <ThemeProviderWrapper>
        <SiteToolsPage />
      </ThemeProviderWrapper>
    </LanguageProvider>,
  );

  const colorControls = screen.getAllByLabelText(/Achtergrond|Verhoogde achtergrond|Tekst|Subtiele tekst|Randen|Hoofdkleur|Accent|Succes|Foutmeldingen/);
  expect(colorControls).toHaveLength(9);
  colorControls.forEach((control) => {
    expect(control.getAttribute('type')).toBe('color');
  });
});

test('renders a useful translated 404 page', () => {
  render(
    <LanguageProvider>
      <ThemeProviderWrapper>
        <AppHeader />
        <Page404 />
      </ThemeProviderWrapper>
    </LanguageProvider>,
  );

  expect(screen.getByRole('heading', { name: 'Pagina niet gevonden' })).toBeDefined();
  expect(screen.getByText('Deze pagina bestaat niet of de link is verplaatst.')).toBeDefined();
  expect(screen.getByRole('link', { name: 'Terug naar start' }).getAttribute('href')).toBe('#/');

  fireEvent.click(screen.getByRole('button', { name: 'Taalkeuze — huidige taal: Nederlands' }));
  fireEvent.click(screen.getByRole('option', { name: 'Engels' }));

  expect(screen.getByRole('heading', { name: 'Page not found' })).toBeDefined();
  expect(screen.getByRole('link', { name: 'Back to home' }).getAttribute('href')).toBe('#/');
});
