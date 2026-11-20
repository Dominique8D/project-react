import { DEFAULT_LANG, isValidLanguage } from '../../context/language-context';

export type Post = {
  titleKey: string;
  file: string;
  publishedAt: string;
};

export const formatPostDate = (publishedAt: string, language: string): string => {
  const locale = language === 'gb' ? 'en-GB' : 'nl-NL';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${publishedAt}T00:00:00Z`));
};

export const getBaseForBlog = () => {
  const isHostedFromGitHub = window.location.origin.includes('github.io');
  return isHostedFromGitHub ? '/project-react' : '';
};

const getFileUrl = (language: string, name: string): string => {
  return `${getBaseForBlog()}/blog/${language}/${name}.md`;
};

export const getBlogPosts = (language: string): Post[] => {
  let lang = language;
  if (!isValidLanguage(language)) {
    lang = DEFAULT_LANG;
  }
  return [
    {
      titleKey: 'posts.opencodeCodespaces',
      file: getFileUrl(lang, 'opencode_codespaces'),
      publishedAt: '2026-11-20',
    },
    {
      titleKey: 'posts.codespacesPages',
      file: getFileUrl(lang, 'codespaces_pages'),
      publishedAt: '2026-11-20',
    },
    {
      titleKey: 'posts.languageErrorTest',
      file: getFileUrl(lang, 'eng_only'),
      publishedAt: '2025-05-30',
    },
  ];
};
