import Anthropic from "@anthropic-ai/sdk";

const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY;

const anthropic_client = new Anthropic({
  apiKey: ANTHROPIC_KEY,
});

export default anthropic_client;
