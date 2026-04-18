import extract_text from "../services/pdf.service.js";
import {
  analyse_cv,
  analyse_cv_stream,
} from "../services/anthropic.service.js";

// export async function get_anthropic_response(req, res, next) {
//   try {
//     const CV = await extract_text(req.file.buffer);
//     const response = await analyse_cv(CV);
//     return res.json({ response });
//   } catch (error) {
//     next(error);
//   }
// }
// ci test
export async function get_anthropic_response(req, res, next) {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const cvText = await extract_text(req.file.buffer);
    res.write(`data: ${JSON.stringify({ status: "uploading" })}\n\n`);
    await analyse_cv_stream(cvText, res);
  } catch (error) {
    next(error);
  }
}
