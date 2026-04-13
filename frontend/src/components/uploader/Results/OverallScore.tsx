import { type JSX } from "react";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./OverallScore.module.css";

interface OverallScoreProps {
  score: string;
}

function OverallScore({ score }: OverallScoreProps): JSX.Element {
  const value = parseFloat(score);
  const data = [{ value: value }, { value: 10 - value }];

  const getColor = (val: number): string => {
    if (val >= 7) return "#1D9E75";
    if (val >= 5) return "#BA7517";
    return "#D85A30";
  };

  return (
    <div className={styles.card}>
      <p className={styles.label}>overall score</p>
      <div className={styles.content}>
        <div>
          <p className={styles.number}>
            {value}
            <span className={styles.outof}>/10</span>
          </p>
          <p className={styles.sub}>
            {value >= 7
              ? "Good"
              : value >= 5
                ? "Room for improvement"
                : "Needs work"}
          </p>
        </div>
        <PieChart
          style={{
            width: "50%",
            maxWidth: "200px",
            maxHeight: "40vh",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={data}
            cx={35}
            cy={35}
            innerRadius="50%"
            outerRadius="60%"
            // cornerRadius="20%"
            fill="#8884d8"
            paddingAngle={10}
            // startAngle={90}
            // endAngle={-270}
            dataKey="value"
            strokeWidth={1}
            isAnimationActive={true}
          />
        </PieChart>
      </div>
    </div>
  );
}

export default OverallScore;
