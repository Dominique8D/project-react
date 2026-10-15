import useLangTranslation from '../custom-hooks/use-lang-translation';
import { useState } from 'react';
import BlogDialog from '../components/blog/blog-dialog';
import { getBlogPosts, Post } from '../utils/blog/blog-utils';
import PageLayout from '../layout/page-layout';
import { useLanguage } from '../context/language-context';
import AppButton from '../components/common/app-button';
import styles from './blog.module.css';

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
      <section className={styles.posts} aria-label={t('title')}>
        {blogPosts.map((post, index) => (
          <article className={styles.post} key={post.title}>
            <span className={styles.postNumber}>{String(index + 1).padStart(2, '0')}</span>
            <h2>{post.title}</h2>
            <AppButton onClick={() => openPost(post)}>{t('read')}</AppButton>
          </article>
        ))}
      </section>
      <BlogDialog selectedPost={selectedPost} open={open} handleClose={closePost} />
    </PageLayout>
  );
};

export default BlogPage;
