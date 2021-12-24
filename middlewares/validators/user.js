const Joi = require('joi');

export const queryUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64).alphanum().required(),
  address: Joi.string().min(15).required()
});
