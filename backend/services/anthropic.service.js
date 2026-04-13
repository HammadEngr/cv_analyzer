import anthropic_client from "../config/anthropic_client.js";
import AppError from "../utils/app_error.js";
import generate_prompt from "./prompt.service.js";
import parse_response from "./response.parser.js";

// without steams
export async function analyse_cv(cv_text) {
  try {
    const prompt = generate_prompt(cv_text);

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

    switch (message.stop_reason) {
      case "end_turn":
        const parsed_response = parse_response(message.content[0].text);
        return parsed_response;

      case "max_tokens":
        throw new AppError(
          "Response was cut off due to token limit, try a shorter CV",
          206,
        );

      case "stop_sequence":
        throw new AppError("Response stopped unexpectedly, try again", 500);

      default:
        throw new AppError(
          `Unexpected stop reason: ${message.stop_reason}`,
          500,
        );
    }
  } catch (error) {
    if (error instanceof AppError) throw error;

    // Anthropic specific errors
    if (error instanceof Anthropic.AuthenticationError) {
      throw new AppError("Authentication failed", 401);
    }
    if (error instanceof Anthropic.RateLimitError) {
      throw new AppError("Rate limit reached, try again later", 429);
    }
    if (error instanceof Anthropic.APIConnectionError) {
      throw new AppError("Could not connect to AI service", 503);
    }
    if (error instanceof Anthropic.APIError) {
      throw new AppError(
        "AI service error: " + error.message,
        error.status || 500,
      );
    }
    // General errors
    throw new AppError("Internal Server Error", 500);
  }
}

// With streams
export async function analyse_cv_stream(cvText, res) {
  // tell frontend file received, analysis starting
  res.write(`data: ${JSON.stringify({ status: "analysing" })}\n\n`);

  const stream = anthropic_client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [{ role: "user", content: generate_prompt(cvText) }],
  });

  let fullText = "";

  stream.on("text", (text) => {
    fullText += text;
    res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`);
  });

  stream.on("finalMessage", (message) => {
    if (message.stop_reason === "end_turn") {
      const parsed = parse_response(fullText);
      res.write(
        `data: ${JSON.stringify({ status: "done", response: parsed })}\n\n`,
      );
    }
    res.end();
  });

  stream.on("error", (error) => {
    res.write(
      `data: ${JSON.stringify({ status: "error", error: "Analysis failed" })}\n\n`,
    );
    res.end();
  });
}
