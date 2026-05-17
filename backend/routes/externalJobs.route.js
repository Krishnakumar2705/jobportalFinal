import express from "express";
import { getLiveJobs } from "../controllers/externalJobs.controller.js";

const router = express.Router();

router.route("/live").get(getLiveJobs);

export default router;
