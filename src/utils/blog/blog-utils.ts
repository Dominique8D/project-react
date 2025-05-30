import { DEFAULT_LANG, isValidLanguage } from '../../context/language-context';

export type Post = {
  title: string;
  file: string;
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
    { title: 'Early work', file: getFileUrl(language, 'early_work') },
    { title: 'GB-EN only test', file: getFileUrl(language, 'eng_only') },
  ];
};
