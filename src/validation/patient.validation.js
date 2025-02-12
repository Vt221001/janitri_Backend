import Joi from "joi";

const patientValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).trim().required(),
  age: Joi.number().integer().min(0).max(120).required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  createdBy: Joi.string().hex().length(24).required(),
});

export const validatePatient = (data) =>
  patientValidationSchema.validate(data, { abortEarly: false });
