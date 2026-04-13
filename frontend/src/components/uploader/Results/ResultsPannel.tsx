import type { JSX } from "react";
import ScoresBreakdown from "./ScoresBreakdown";
import MissingKeywords from "./MissingKeywords";
import Suggestions from "./Suggestions";
import OverallScore from "./OverallScore";
import styles from "./ResultsPanel.module.css";
import ATSFriendly from "./ATSFriendly";

interface AnalysisResult {
  scores: Record<string, string>;
  missingKeywords: string[];
  suggestions: string[];
}

interface ResultsPanelProps {
  result: AnalysisResult;
}

function ResultsPanel({ result }: ResultsPanelProps): JSX.Element {
  return (
    <div className={styles.panel}>
      <OverallScore score={result.scores["Overall"]} />
      <ATSFriendly score={result.scores["ATS Friednliness"]} />
      <ScoresBreakdown scores={result.scores} />
      <MissingKeywords keywords={result.missingKeywords} />
      <Suggestions suggestions={result.suggestions} />
    </div>
  );
}

export default ResultsPanel;
