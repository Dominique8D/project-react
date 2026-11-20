import { useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, ComponentType } from 'react';
import { CUSTOM, DARK, LIGHT, ThemeMode, useThemeProvider } from '../../providers/theme-provider-wrapper';
import SunIcon from '../../icons/sun-icon';
import MoonIcon from '../../icons/moon-icon';
import PaletteIcon from '../../icons/palette-icon';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import styles from './app-header-theme-changer.module.css';

type ThemeOption = {
  value: ThemeMode;
  labelKey: string;
  Icon: ComponentType;
};

const OPTIONS: ThemeOption[] = [
  { value: LIGHT, labelKey: 'themeLight', Icon: SunIcon },
  { value: DARK, labelKey: 'themeDark', Icon: MoonIcon },
  { value: CUSTOM, labelKey: 'themeCustom', Icon: PaletteIcon },
];

const ThemeToggleButton = () => {
  const { mode, setMode } = useThemeProvider();
  const { t } = useLangTranslation('common');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const activeOption = OPTIONS.find((option) => option.value === mode);
  const switchLabel = activeOption
    ? `${t('themeModeLabel')} — ${t(activeOption.labelKey)}`
    : t('themeModeLabel');

  const close = () => setOpen(false);

  const select = (option: ThemeOption) => {
    setMode(option.value);
    close();
    triggerRef.current?.focus();
  };

  const focusOption = (offset: 1 | -1) => {
    const options = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
    if (options.length === 0) return;
    const current = options.findIndex((option) => option === document.activeElement);
    const next = options[(current + offset + options.length) % options.length];
    next?.focus();
  };

  useEffect(() => {
    if (open) {
      listRef.current?.querySelector<HTMLElement>('[role="option"]')?.focus();
    }
  }, [open]);

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape' && open) {
      close();
      triggerRef.current?.focus();
    } else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !open) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onOptionKeyDown = (option: ThemeOption) => (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(option);
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Escape') {
      close();
      triggerRef.current?.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption(-1);
    }
  };

  const onListBlur = (event: FocusEvent<HTMLUListElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && (triggerRef.current === next || listRef.current?.contains(next))) return;
    close();
  };

  const ActiveIcon = activeOption?.Icon;

  return (
    <div className={styles.picker}>
      <button
        ref={triggerRef}
        type='button'
        className={styles.trigger}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-label={switchLabel}
        title={switchLabel}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
      >
        {ActiveIcon && <ActiveIcon />}
      </button>
      {open && (
        <ul
          ref={listRef}
          role='listbox'
          className={styles.list}
          aria-label={t('themeModeLabel')}
          onKeyDown={onListKeyDown}
          onBlur={onListBlur}
        >
          {OPTIONS.map((option) => {
            const Icon = option.Icon;
            const label = t(option.labelKey);

            return (
              <li
                key={option.value}
                role='option'
                aria-label={label}
                aria-selected={option.value === mode}
                title={label}
                tabIndex={0}
                className={styles.option}
                onClick={() => select(option)}
                onKeyDown={onOptionKeyDown(option)}
              >
                <Icon />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ThemeToggleButton;
