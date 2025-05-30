import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { Alert, Typography } from '@mui/material';
import useLangTranslation from '../../custom-hooks/use-lang-translation';

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

  return (
    <>
      {hasError ? (
        // @ts-ignore This works fine, not sure what MUI is complaining about
        <Alert variant='filled' severity='error'>
          <Typography>{t('error')}</Typography>
        </Alert>
      ) : (
        <ReactMarkdown>{content}</ReactMarkdown>
      )}
    </>
  );
};

export default BlogPost;
