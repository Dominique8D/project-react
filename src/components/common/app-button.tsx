import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './app-button.module.css';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'solid' | 'outline';
};

const AppButton = ({ children, className = '', variant = 'outline', ...props }: AppButtonProps) => (
  <button className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
    {children}
  </button>
);

export default AppButton;