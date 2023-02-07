const Joi = require('joi')

const joiSchemaPhotos = Joi.object({
    photos: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        photo: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
})

module.exports = joiSchemaPhotos


const joiSchemaComments = Joi.object({
    userComment: Joi.object({
        rating: Joi.string(),
        body: Joi.string()
    }).required()
})

module.exports = joiSchemaComments