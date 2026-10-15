import { ReactNode } from 'react';
import styles from './page-layout.module.css';

const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <main className={styles.layout}>{children}</main>;
};

export default PageLayout;
