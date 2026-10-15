import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import AppHeader from './components/app-header/app-header';
import { LanguageProvider } from './context/language-context';
import { ThemeProviderWrapper } from './providers/theme-provider-wrapper';

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

  fireEvent.change(screen.getByRole('combobox', { name: 'Taal' }), {
    target: { value: 'gb' },
  });

  expect(screen.getByText(/Welcome to Project React GB-EN/i)).toBeDefined();
  expect(screen.getByText('Small projects built to explore new ideas and technologies.')).toBeDefined();
  expect(screen.getByText('Game development')).toBeDefined();
  expect(document.documentElement.lang).toBe('en-GB');
});
