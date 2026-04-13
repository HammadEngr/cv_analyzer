import { type JSX } from "react";
import styles from "./ScoresBreakdown.module.css";

interface ScoresBreakdownProps {
  scores: Record<string, string>;
}

const getBarColor = (value: number): string => {
  if (value >= 7) return "#1D9E75";
  if (value >= 5) return "#BA7517";
  return "#D85A30";
};

function ScoresBreakdown({ scores }: ScoresBreakdownProps): JSX.Element {
  const filtered = Object.entries(scores).filter(([key]) => key !== "Overall");

  return (
    <div className={styles.card}>
      <p className={styles.title}>scores breakdown</p>
      {filtered.map(([key, val]) => {
        const numeric = parseFloat(val);
        return (
          <div key={key} className={styles.row}>
            <span className={styles.name}>{key}</span>
            <div className={styles.track}>
              <div
                className={styles.fill}
                style={{
                  width: `${numeric * 10}%`,
                  background: getBarColor(numeric),
                }}
              />
            </div>
            <span className={styles.val}>{val}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ScoresBreakdown;
