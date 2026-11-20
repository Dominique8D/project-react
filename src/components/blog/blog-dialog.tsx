import { FC, useEffect, useRef } from 'react';
import BlogPost from './blog-post';
import { formatPostDate, Post } from '../../utils/blog/blog-utils';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import { useLanguage } from '../../context/language-context';
import CloseIcon from '../../icons/close-icon';
import styles from './blog-dialog.module.css';

type BlogDialogProps = {
  handleClose: () => void;
  open: boolean;
  selectedPost: Post | null;
};

const BlogDialog: FC<BlogDialogProps> = ({ handleClose, open, selectedPost }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { t } = useLangTranslation('blog');
  const { language } = useLanguage();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  return (
    selectedPost ? (
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby='blog-dialog-title'
        onCancel={(event) => { event.preventDefault(); handleClose(); }}
        onClick={(event) => {
          if (event.target === event.currentTarget) handleClose();
        }}
      >
        <header className={styles.dialogHeader}>
          <div className={styles.dialogHeading}>
            <h2 id='blog-dialog-title'>{t(selectedPost.titleKey)}</h2>
            <time dateTime={selectedPost.publishedAt}>
              {formatPostDate(selectedPost.publishedAt, language)}
            </time>
          </div>
          <button className={styles.closeButton} type='button' onClick={handleClose} aria-label='Close'>
            <CloseIcon />
          </button>
        </header>
        <article className={styles.content}>
          <BlogPost file={selectedPost.file} />
        </article>
      </dialog>
    ) : null
  );
};

export default BlogDialog;
