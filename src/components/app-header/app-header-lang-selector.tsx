import { useEffect, useRef, useState } from 'react';
import type { FocusEvent as ReactFocusEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useLanguage } from '../../context/language-context';
import useLangTranslation from '../../custom-hooks/use-lang-translation';
import styles from './app-header-lang-selector.module.css';

const FLAG_BASE_URL = 'https://cdn.simplelocalize.io/public/v1/flags';

type Option = {
  value: string;
  flag: string;
  labelKey: string;
};

const OPTIONS: Option[] = [
  { value: 'nl', flag: `${FLAG_BASE_URL}/nl.svg`, labelKey: 'languageDutch' },
  { value: 'gb', flag: `${FLAG_BASE_URL}/gb.svg`, labelKey: 'languageEnglish' },
];

const AppHeaderLangSelector = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useLangTranslation('common');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const activeOption = OPTIONS.find((option) => option.value === language);
  const languageSwitchLabel = activeOption
    ? `${t('languageSwitch')} — ${t('currentLanguage')}: ${t(activeOption.labelKey)}`
    : t('languageSwitch');

  const close = () => setOpen(false);

  const select = (option: Option) => {
    setLanguage(option.value);
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

  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape' && open) {
      close();
      triggerRef.current?.focus();
    } else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !open) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onOptionKeyDown = (option: Option) => (event: ReactKeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(option);
    }
  };

  const onListKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
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

  const onListBlur = (event: ReactFocusEvent<HTMLUListElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && (triggerRef.current === next || listRef.current?.contains(next))) return;
    close();
  };

  return (
    <div className={styles.picker}>
      <button
        ref={triggerRef}
        type='button'
        className={styles.trigger}
        style={{ backgroundImage: activeOption ? `url(${activeOption.flag})` : undefined }}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-label={languageSwitchLabel}
        title={languageSwitchLabel}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
      />
      {open && (
        <ul
          ref={listRef}
          role='listbox'
          className={styles.list}
          aria-label={t('languageLabel')}
          onKeyDown={onListKeyDown}
          onBlur={onListBlur}
        >
          {OPTIONS.map((option) => (
            <li
              key={option.value}
              role='option'
              aria-selected={option.value === language}
              tabIndex={0}
              className={styles.option}
              onClick={() => select(option)}
              onKeyDown={onOptionKeyDown(option)}
            >
              <img alt='' className={styles.flag} src={option.flag} />
              <span>{t(option.labelKey)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppHeaderLangSelector;
