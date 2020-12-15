const Joi = require("joi");

module.exports = {
  taskValidate: Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(300),
  }),
  listValidate: Joi.object({
    title: Joi.string().min(3).max(30).required(),
  }),
};
