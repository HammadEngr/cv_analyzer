import Anthropic from "@anthropic-ai/sdk";
import extract_text from "./pdf_extractor.js";

const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY;

const anthropic_client = new Anthropic({
  apiKey: ANTHROPIC_KEY,
});

export async function test(req, res) {
  try {
    const text = await extract_text(req.file.buffer);
    console.log(text);
    res.json({ message: "Test route" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

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

function parseResponse(text) {
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

export default parseResponse;

import Anthropic from "@anthropic-ai/sdk";

export async function get_anthropic_response(req, res) {
  try {
    const CV = await extract_text(req.file.buffer);
    const prompt = generate_prompt(CV);

    const message = await anthropic_client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Handle stop reasons
    switch (message.stop_reason) {
      case "end_turn":
        const parsed_response = parseResponse(message.content[0].text);
        return res.json({ response: parsed_response });

      case "max_tokens":
        return res.status(206).json({
          error: "Response was cut off, try a shorter CV",
        });

      case "stop_sequence":
        return res.status(500).json({
          error: "Response stopped unexpectedly",
        });

      default:
        return res.status(500).json({
          error: `Unexpected stop reason: ${message.stop_reason}`,
        });
    }
  } catch (error) {
    // Anthropic specific errors
    if (error instanceof Anthropic.AuthenticationError) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return res
        .status(429)
        .json({ error: "Rate limit reached, try again later" });
    }
    if (error instanceof Anthropic.APIConnectionError) {
      return res.status(503).json({ error: "Could not connect to AI service" });
    }
    if (error instanceof Anthropic.APIError) {
      return res.status(error.status).json({ error: error.message });
    }

    // General errors
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
