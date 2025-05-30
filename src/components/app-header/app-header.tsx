import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import AppHeaderLangSelector from './app-header-lang-selector';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import ThemeToggleButton from './app-header-theme-changer';

const pages = ['blog', 'about'];

const AppHeader = () => {
  const { t } = useLangTranslation('common');

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Stack direction='row' gap={1}>
            <Button variant='contained' color='secondary' href='#'>
              {t('home')}
            </Button>
            {pages.map((page) => (
              <Button variant='outlined' color='secondary' href={`#/${page}`} key={page}>
                {t(page)}
              </Button>
            ))}
          </Stack>
          <AppHeaderLangSelector />
          <ThemeToggleButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
