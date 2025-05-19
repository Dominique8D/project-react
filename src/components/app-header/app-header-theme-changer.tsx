import { Stack, Box, IconButton } from '@mui/material';
import { LIGHT, useThemeProvider } from '../../providers/theme-provider-wrapper';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggleButton = () => {
  const { toggleTheme, mode } = useThemeProvider();
  const isLightMode = mode === LIGHT;

  return (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton color='secondary' onClick={toggleTheme}>
          {isLightMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
    </Stack>
  );
};

export default ThemeToggleButton;
