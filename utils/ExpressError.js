//class that will serve as a tempalte to diplay status and message errors when thrown(needs to be thrown because there is no next())
class ExpressError extends Error {
    constructor(message, status) {
        super()
        this.message = message;
        this.status = status;
    }
};
module.exports = ExpressError