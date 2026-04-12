import extract_text from "../services/pdf.service.js";
import { analyse_cv } from "../services/anthropic.service.js";

export async function get_anthropic_response(req, res, next) {
  try {
    const CV = await extract_text(req.file.buffer);
    const response = await analyse_cv(CV);
    return res.json({ response });
  } catch (error) {
    next(error);
  }
}
