import { Stack, SxProps } from '@mui/material';
import { ReactNode } from 'react';

const LAYOUT_SX: SxProps = {
  width: '100%',
  height: '100%',
  p: 1,
  m: 1,
};

const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Stack sx={LAYOUT_SX} spacing={2}>
      {children}
    </Stack>
  );
};

export default PageLayout;
