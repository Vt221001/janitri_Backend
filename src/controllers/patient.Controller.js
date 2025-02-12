import { Patient } from "../model/patient.Model.js";
import { asyncHandler } from "../utils/wrapAsync.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { validatePatient } from "../validation/patient.validation.js";
import { User } from "../model/user.Model.js";

export const createPatient = asyncHandler(async (req, res, next) => {
  const { error } = validatePatient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, age, gender, createdBy } = req.body;
  const user = await User.findById(createdBy);
  console.log(user);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  const patient = new Patient({
    name,
    age,
    gender,
    createdBy,
  });
  await patient.save();

  res
    .status(201)
    .json(new ApiResponse(201, patient, "Patient created successfully"));
});

export const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find();
  if (!patients) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Patients not found"));
  }
  res.status(200).json(new ApiResponse(200, patients, "Patients fetched"));
});
