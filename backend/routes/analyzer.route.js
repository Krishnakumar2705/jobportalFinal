import express from "express";
import { analyzeResume } from "../controllers/analyzer.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/analyze").post(singleUpload, analyzeResume);

export default router;
