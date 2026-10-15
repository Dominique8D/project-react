import { FC, useEffect, useRef } from 'react';
import BlogPost from './blog-post';
import { Post } from '../../utils/blog/blog-utils';
import CloseIcon from '../../icons/close-icon';
import styles from './blog-dialog.module.css';

type BlogDialogProps = {
  handleClose: () => void;
  open: boolean;
  selectedPost: Post | null;
};

const BlogDialog: FC<BlogDialogProps> = ({ handleClose, open, selectedPost }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      >
        <header className={styles.dialogHeader}>
          <h2 id='blog-dialog-title'>{selectedPost.title}</h2>
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
