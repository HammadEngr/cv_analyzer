import { Router } from "express";
import { get_anthropic_response } from "../controllers/analyse.controller.js";
import uploadFile from "../services/storage.service.js";

const router = Router();

router.post("/analyse", uploadFile, get_anthropic_response);

export default router;
