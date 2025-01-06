import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Project React', () => {
  render(<App />);
  const linkElement = screen.getByText(/Project React/i);
  expect(linkElement).toBeDefined();
});
