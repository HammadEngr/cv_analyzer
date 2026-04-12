function parse_response(text) {
  const result = {
    scores: {},
    missingKeywords: [],
    suggestions: [],
  };

  const lines = text.split("\n").filter((line) => line.trim() !== "");

  for (const line of lines) {
    // Extract scores
    if (
      line.match(
        /^(Relevance|Clarity|Consistency|Completeness|ATS Friendliness|Overall):/,
      )
    ) {
      const [key, value] = line.split(":");
      result.scores[key.trim()] = value.trim();
      continue;
    }

    // Extract missing keywords
    if (line.startsWith("Missing Keywords:")) {
      result.missingKeywords = line
        .replace("Missing Keywords:", "")
        .split(",")
        .map((k) => k.trim());
      continue;
    }

    // Extract suggestions
    if (line.match(/^\d\./)) {
      result.suggestions.push(line.replace(/^\d\./, "").trim());
    }
  }

  return result;
}

export default parse_response;
