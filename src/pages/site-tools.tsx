import useLangTranslation from '../custom-hooks/use-lang-translation';
import PageLayout from '../layout/page-layout';
import { CUSTOM, useThemeProvider } from '../providers/theme-provider-wrapper';
import type { CustomThemeKey } from '../providers/theme-provider-wrapper';
import styles from './site-tools.module.css';

const COLOR_CONTROLS: { key: CustomThemeKey; labelKey: string; colorToken: string }[] = [
  { key: 'background', labelKey: 'themeBackground', colorToken: '--surface' },
  { key: 'surfaceRaised', labelKey: 'themeSurfaceRaised', colorToken: '--surface-raised' },
  { key: 'text', labelKey: 'themeText', colorToken: '--text' },
  { key: 'muted', labelKey: 'themeMuted', colorToken: '--muted' },
  { key: 'border', labelKey: 'themeBorders', colorToken: '--border' },
  { key: 'main', labelKey: 'themeMain', colorToken: '--main' },
  { key: 'accent', labelKey: 'themeAccent', colorToken: '--accent' },
  { key: 'green', labelKey: 'themeSuccess', colorToken: '--accent-green' },
  { key: 'error', labelKey: 'themeErrors', colorToken: '--error' },
];

const SiteToolsPage = () => {
  const { t } = useLangTranslation('common');
  const { customTheme, setCustomThemeColor, setMode } = useThemeProvider();

  return (
    <PageLayout>
      <section className={styles.tools}>
        <h1>{t('siteToolsTitle')}</h1>
        <details className={styles.tool} open>
          <summary className={styles.toolTitle}>{t('customThemeTitle')}</summary>
          <div className={styles.toolContent}>
            <p className={styles.description}>{t('customThemeDescription')}</p>
            <div className={styles.controls}>
              {COLOR_CONTROLS.map(({ key, labelKey, colorToken }) => {
                const id = `theme-${key}`;
                const value = customTheme[key];

                return (
                  <div className={styles.control} key={key}>
                    <label htmlFor={id}>{t(labelKey)}</label>
                    <div className={styles.range}>
                      <input
                        id={id}
                        type='color'
                        value={value}
                        style={{ accentColor: `var(${colorToken})` }}
                        onChange={(event) => {
                          setCustomThemeColor(key, event.currentTarget.value);
                          setMode(CUSTOM);
                        }}
                      />
                      <span
                        className={styles.preview}
                        data-color-preview={key}
                        style={{ backgroundColor: `var(${colorToken})` }}
                        aria-hidden='true'
                      />
                      <output htmlFor={id}>{value}</output>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </details>
      </section>
    </PageLayout>
  );
};

export default SiteToolsPage;
