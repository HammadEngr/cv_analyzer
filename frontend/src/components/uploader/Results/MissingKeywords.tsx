import { type JSX } from "react";
import styles from "./MissingKeywords.module.css";

interface MissingKeywordsProps {
  keywords: string[];
}

function MissingKeywords({ keywords }: MissingKeywordsProps): JSX.Element {
  return (
    <div className={styles.card}>
      <p className={styles.title}>missing keywords</p>
      <div className={styles.tags}>
        {keywords.map((keyword) => (
          <span key={keyword} className={styles.tag}>
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MissingKeywords;
