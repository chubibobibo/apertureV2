//Joi validator for comments
const joiSchema = require('../joiSchemas/joiSchemaComment')
const ExpressError = require('../utils/ExpressError.js')

const JoiValidateComment = (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(',')
        throw new ExpressError(msg, 404)
    } else { next() }
}

module.exports = JoiValidateComment