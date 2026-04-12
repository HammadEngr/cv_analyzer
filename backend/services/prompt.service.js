const generate_prompt = (
  cv,
) => `Analyse this CV. Respond in this exact format only:

Relevance: X/10
Clarity: X/10
Consistency: X/10
Completeness: X/10
ATS Friendliness: X/10
Overall: X/10

Missing Keywords: keyword1, keyword2, keyword3, keyword4, keyword5

Suggestions:
1. 
2. 
3.

CV:${cv}`;

export default generate_prompt;
