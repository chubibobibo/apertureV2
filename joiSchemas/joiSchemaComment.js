const Joi = require('joi')
const joiSchemaComments = Joi.object({
    userComment: Joi.object({
        rating: Joi.string(),
        body: Joi.string()
    }).required()
})

module.exports = joiSchemaComments