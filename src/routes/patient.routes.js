import express from "express";
import {
  createPatient,
  getPatients,
} from "../controllers/patient.Controller.js";

const router = express.Router();

router.post("/addpatient", createPatient);
router.get("/getpatients", getPatients);

export { router as patientRouter };
