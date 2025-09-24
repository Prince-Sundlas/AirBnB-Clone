const Joi = require('joi');
module.exports.lschema = Joi.object({
    title:Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
});
module.exports.rschema = Joi.object({
    comment: Joi.string().required(),
    rating : Joi.number().required().min(1).max(5),
    });