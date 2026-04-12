import { type JSX } from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.title_box}>
          <h1>Career Craft</h1>
          <p>Your AI based career advisor</p>
        </div>
        <p className={styles.tagline}>Get instant AI feedback on your CV</p>
      </header>
      {children}
    </div>
  );
}

export default Layout;
