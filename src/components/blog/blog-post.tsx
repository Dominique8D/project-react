import ReactMarkdown from 'react-markdown';
import { Children, useEffect, useState } from 'react';
import type { Components } from 'react-markdown';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import { getBaseForBlog } from '../../utils/blog/blog-utils';
import styles from './blog-post.module.css';

const markdownComponents: Components = {
  strong: ({ children }) => {
    const text = Children.toArray(children)
      .map((child) => (typeof child === 'string' ? child : ''))
      .join('')
      .trim();
    const isError = /^(?:404(?:-fouten| errors?)?)$/i.test(text);
    return <strong className={isError ? styles.errorText : undefined}>{children}</strong>;
  },
};

const BlogPost = ({ file }: { file: string }) => {
  const { t } = useLangTranslation('blog');

  const [content, setContent] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(file)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => setContent(text))
      .catch((error) => {
        console.error('Error fetching file:', error);
        setHasError(true);
      });
  }, [file]);

  // Ensure images can load by adding a base
  const variables = {
    base: getBaseForBlog(),
  };
  const processedContent = content.replace(
    /\{\{([^}]+)\}\}/g,
    (_, key: keyof typeof variables) => variables[key] || '',
  );

  return (
    <div className={hasError ? styles.error : styles.markdown}>
      {hasError ? (
        <p role='alert'>{t('error')}</p>
      ) : (
        <ReactMarkdown components={markdownComponents}>{processedContent}</ReactMarkdown>
      )}
    </div>
  );
};

export default BlogPost;
