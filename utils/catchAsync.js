//needs normal function declaration
//function that will wrap around the code to catch errors then throw it
function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}
module.exports = catchAsync