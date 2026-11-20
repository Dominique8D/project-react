import { fireEvent, render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import '../../i18n';
import { LanguageProvider } from '../../context/language-context';
import BlogDialog from './blog-dialog';

vi.mock('./blog-post', () => ({
  default: () => null,
}));

test('closes when the dialog backdrop is clicked, but not when its content is clicked', () => {
  const handleClose = vi.fn();
  const { container } = render(
    <LanguageProvider>
      <BlogDialog
        handleClose={handleClose}
        open={false}
        selectedPost={{
          titleKey: 'posts.codespacesPages',
          file: '/blog/nl/codespaces_pages.md',
          publishedAt: '2026-11-20',
        }}
      />
    </LanguageProvider>,
  );
  const dialog = container.querySelector('dialog');
  const content = container.querySelector('article');

  if (dialog === null || content === null) {
    throw new Error('The blog dialog content was not rendered');
  }

  fireEvent.click(content);
  expect(handleClose).not.toHaveBeenCalled();

  fireEvent.click(dialog);
  expect(handleClose).toHaveBeenCalledOnce();
});
