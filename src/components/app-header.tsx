import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import AppHeaderLangSelector from './app-header-lang-selector';

const pages = ['about'];

const AppHeader = () => {
  const currentLanguage = "nl";

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack direction="row" gap={1}>
            <Button variant='contained' color="secondary" className="nav-link" href="#">Home</Button>
            {pages.map((page) => (
              <Button
                variant='contained' color="secondary"
                href={`#/${page}`}
                key={page}
              >
                {page}
              </Button>
            ))}
          </Stack>
          <AppHeaderLangSelector />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeader;