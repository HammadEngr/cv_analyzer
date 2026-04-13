import { type JSX } from "react";
import styles from "./Suggestions.module.css";

interface SuggestionsProps {
  suggestions: string[];
}

function Suggestions({ suggestions }: SuggestionsProps): JSX.Element {
  return (
    <div className={styles.card}>
      <p className={styles.title}>suggestions</p>
      {suggestions.map((suggestion, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.num}>{index + 1}</div>
          <p className={styles.text}>{suggestion}</p>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
