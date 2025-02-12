import Joi from "joi";

const userValidationSchema = Joi.object({
  name: Joi.string().max(30).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).max(30).trim().required(),
});

export const validateUser = (data) =>
  userValidationSchema.validate(data, { abortEarly: false });
