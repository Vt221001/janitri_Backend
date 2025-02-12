import { HeartRate } from "../model/heartRate.Model.js";
import { asyncHandler } from "../utils/wrapAsync.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { Patient } from "../model/patient.Model.js";

export const createHeartRate = asyncHandler(async (req, res) => {
  const { patient, bpm, recordAt } = req.body;

  if (!patient || !bpm) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "Please provide all required fields (patient, bpm)"
        )
      );
  }

  const patientExist = await Patient.findById(patient);

  if (!patientExist) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Patient not found"));
  }

  const heartRate = new HeartRate({
    patient,
    bpm,
    recordAt,
  });
  await heartRate.save();

  res
    .status(201)
    .json(new ApiResponse(201, heartRate, "HeartRate Added successfully"));
});

export const getHeartRates = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const heartRates = await HeartRate.find({ patient: patientId });

  if (!heartRates) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "HeartRates not found"));
  }

  res.status(200).json(new ApiResponse(200, heartRates, "HeartRates fetched"));
});

export const deleteHeartRate = asyncHandler(async (req, res) => {
  const { heartRateId } = req.params;
  const heartRate = await HeartRate.findById(heartRateId);

  if (!heartRate) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "HeartRate not found"));
  }

  await HeartRate.findByIdAndDelete(heartRateId);

  res.status(200).json(new ApiResponse(200, null, "HeartRate deleted"));
});
