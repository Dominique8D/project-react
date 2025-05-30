import { Stack } from '@mui/material';
import useLangTranslation from '../custom-hooks/use-lang-translation';
import { useState } from 'react';

import { Button } from '@mui/material';
import BlogDialog from '../components/blog/blog-dialog';
import { getBlogPosts, Post } from '../utils/blog/blog-utils';
import PageLayout from '../layout/page-layout';
import { useLanguage } from '../context/language-context';

const BlogPage = () => {
  const { t } = useLangTranslation('blog');

  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openPost = (post: Post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const closePost = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const { language } = useLanguage();
  const blogPosts = getBlogPosts(language);

  return (
    <PageLayout>
      <h1>{t('title')}</h1>
      {blogPosts.map((post) => (
        <Stack key={post.title}>
          <Button variant='outlined' onClick={() => openPost(post)}>
            {post.title}
          </Button>
        </Stack>
      ))}
      <BlogDialog selectedPost={selectedPost} open={open} handleClose={closePost} />
    </PageLayout>
  );
};

export default BlogPage;
