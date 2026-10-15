import { LIGHT, useThemeProvider } from '../../providers/theme-provider-wrapper';
import SunIcon from '../../icons/sun-icon';
import MoonIcon from '../../icons/moon-icon';
import styles from './app-header-theme-changer.module.css';

const ThemeToggleButton = () => {
  const { toggleTheme, mode } = useThemeProvider();
  const isLightMode = mode === LIGHT;

  return (
    <button className={styles.themeButton} type='button' onClick={toggleTheme} aria-label={`Switch to ${isLightMode ? 'dark' : 'light'} theme`}>
      {isLightMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggleButton;
