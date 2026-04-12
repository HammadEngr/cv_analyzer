import { Router } from "express";
import { test, get_anthropic_response } from "../services/anthropic_service.js";
import uploadFile from "../services/file_storage.js";

const router = Router();

router.post("/analyse", uploadFile, get_anthropic_response);

export default router;
