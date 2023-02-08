const Joi = require('joi')

const joiSchemaPhotos = Joi.object({
    photos: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        // photo: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
    deleteImages: Joi.array()
})
module.exports = joiSchemaPhotos