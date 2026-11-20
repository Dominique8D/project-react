import { useState, createContext, useContext, ReactNode } from 'react';
import { getValidQueryParam } from '../utils/get-valid-query-param';
import useUpdateQueryParam from '../custom-hooks/use-update-query-param';
import styles from './theme-provider.module.css';

export const LIGHT = 'light';
export const DARK = 'dark';
export const CUSTOM = 'custom';
export type ThemeMode = typeof LIGHT | typeof DARK | typeof CUSTOM;

const DEFAULT_CUSTOM_THEME = {
  background: '#1d2638',
  surfaceRaised: '#2a354b',
  text: '#e9edf5',
  muted: '#bbc4d4',
  border: '#566174',
  main: '#c9b7ff',
  accent: '#9cafff',
  green: '#a4d8bd',
  error: '#efa18f',
};

export type CustomThemeKey = keyof typeof DEFAULT_CUSTOM_THEME;

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  customTheme: typeof DEFAULT_CUSTOM_THEME;
  setCustomThemeColor: (key: CustomThemeKey, value: string) => void;
};

type ThemeStyle = React.CSSProperties & {
  [key: `--theme-${string}`]: string;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: DARK,
  setMode: () => {},
  customTheme: DEFAULT_CUSTOM_THEME,
  setCustomThemeColor: () => {},
});

export const useThemeProvider = () => useContext(ThemeContext);

const PARAM_KEY = 'mode';
const DEFAULT_MODE = DARK;
const VALID_MODES: ThemeMode[] = [LIGHT, DARK, CUSTOM];

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderProps> = ({ children }) => {
  const queryMode = getValidQueryParam(PARAM_KEY, VALID_MODES, DEFAULT_MODE);
  const [mode, setMode] = useState<ThemeMode>(queryMode as ThemeMode);
  const [customTheme, setCustomTheme] = useState(DEFAULT_CUSTOM_THEME);
  useUpdateQueryParam(PARAM_KEY, mode);

  const setCustomThemeColor = (key: CustomThemeKey, value: string) => {
    setCustomTheme((previousTheme) => ({ ...previousTheme, [key]: value }));
  };

  const themeStyle: ThemeStyle = {
    '--theme-background': customTheme.background,
    '--theme-surface-raised': customTheme.surfaceRaised,
    '--theme-text': customTheme.text,
    '--theme-muted': customTheme.muted,
    '--theme-border': customTheme.border,
    '--theme-main': customTheme.main,
    '--theme-accent': customTheme.accent,
    '--theme-green': customTheme.green,
    '--theme-error': customTheme.error,
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, customTheme, setCustomThemeColor }}>
      <div
        className={styles.app}
        data-theme={mode}
        style={mode === CUSTOM ? themeStyle : undefined}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
