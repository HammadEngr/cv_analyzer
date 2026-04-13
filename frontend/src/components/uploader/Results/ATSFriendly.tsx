import { type JSX } from "react";
import styles from "./ATSFriendly.module.css";

interface ATSFriendlyProps {
  score: string;
}

const getStatus = (
  value: number,
): { label: string; color: string; bg: string } => {
  if (value >= 7)
    return {
      label: "Good",
      color: "#0F6E56",
      bg: "#E1F5EE",
    };
  if (value >= 5)
    return {
      label: "Average",
      color: "#854F0B",
      bg: "#FAEEDA",
    };
  return {
    label: "Poor",
    color: "#993C1D",
    bg: "#FAECE7",
  };
};

const getDescription = (value: number): string => {
  if (value >= 7)
    return "Your CV is well optimised for automated screening systems.";
  if (value >= 5)
    return "Typos and missing sections may affect automated screening.";
  return "Your CV is likely to be filtered out by ATS systems.";
};

function ATSFriendly({ score }: ATSFriendlyProps): JSX.Element {
  const value = parseFloat(score);
  const status = getStatus(value);

  return (
    <div className={styles.card}>
      <p className={styles.label}>ATS friendliness</p>
      <div className={styles.badge} style={{ background: status.bg }}>
        <div className={styles.dot} style={{ background: status.color }} />
        <span style={{ color: status.color, fontWeight: 500 }}>
          {status.label}
        </span>
      </div>
      <p className={styles.description}>{getDescription(value)}</p>
    </div>
  );
}

export default ATSFriendly;
