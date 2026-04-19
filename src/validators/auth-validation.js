const Joi = require("joi");

//Signup Validation
const userRegisterValidationSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().trim().min(3).max(128).required(),
});

//login Validation
const userLoginValidationSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

module.exports = {
  userRegisterValidationSchema,
  userLoginValidationSchema,
};
