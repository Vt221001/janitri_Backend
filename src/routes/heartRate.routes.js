import express from "express";
import {
  createHeartRate,
  deleteHeartRate,
  getHeartRates,
} from "../controllers/heartRate.controller.js";

const router = express.Router();

router.post("/addheartrate", createHeartRate);
router.get("/getheartrates/:patientId", getHeartRates);
router.delete("/deleteheartrate/:heartRateId", deleteHeartRate);

export { router as heartRateRouter };
