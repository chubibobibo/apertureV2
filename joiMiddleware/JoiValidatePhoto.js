const joiSchema = require('../joiSchemas/joiSchemaPhoto')
const ExpressError = require('../utils/ExpressError.js')

const JoiValidatePhoto = (req, res, next) => {
    //destucture the error found validating req.body against joiSchema
    const { error } = joiSchema.validate(req.body);
    if (error) {
        //map error.details because it is an array, to have access to it's message
        const msg = error.details.map(e => e.message).join(',')
        throw new ExpressError(msg, 400)
    } else { next() }
}

module.exports = JoiValidatePhoto