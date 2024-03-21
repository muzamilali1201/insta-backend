const joi = require("joi");

const registerValidation = joi.object({
  username: joi.string(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const loginValidation = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const postValidation = joi.object({
  caption: joi.string().required(),
  url: joi.string().required(),
});

module.exports = { registerValidation, loginValidation, postValidation };
