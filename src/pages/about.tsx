import { Stack } from '@mui/material';
import PageLayout from '../layout/page-layout';

const AboutPage = () => {
  return (
    <PageLayout>
      <Stack sx={{ height: '50%', width: '50%' }}>
        <span>Image test</span>
        <img src='site-logo.png' alt='logo' />
      </Stack>
    </PageLayout>
  );
};

export default AboutPage;
