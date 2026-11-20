import { LIGHT, useThemeProvider } from '../../providers/theme-provider-wrapper';
import SunIcon from '../../icons/sun-icon';
import MoonIcon from '../../icons/moon-icon';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import styles from './app-header-theme-changer.module.css';

const ThemeToggleButton = () => {
  const { toggleTheme, mode } = useThemeProvider();
  const isLightMode = mode === LIGHT;
  const { t } = useLangTranslation('common');
  const tooltip = isLightMode ? t('switchToDarkTheme') : t('switchToLightTheme');

  return (
    <button
      className={styles.themeButton}
      type='button'
      onClick={toggleTheme}
      aria-label={tooltip}
      title={tooltip}
    >
      {isLightMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggleButton;
