import { FC } from 'react';
import { Stack, Dialog, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BlogPost from './blog-post';
import { Post } from '../../utils/blog/blog-utils';

type BlogDialogProps = {
  handleClose: () => void;
  open: boolean;
  selectedPost: Post | null;
};

const BlogDialog: FC<BlogDialogProps> = ({ handleClose, open, selectedPost }) => {
  return (
    <Stack>
      {selectedPost && (
        <Dialog fullScreen open={open} onClose={handleClose}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton color='inherit' onClick={handleClose} aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='h6'>{selectedPost.title}</Typography>
            </Toolbar>
          </AppBar>
          <Stack gap={1} spacing={1} p={1} m={1} sx={{ fontFamily: 'Tomorrow, sans-serif' }}>
            <BlogPost file={selectedPost.file} />
          </Stack>
        </Dialog>
      )}
    </Stack>
  );
};

export default BlogDialog;
