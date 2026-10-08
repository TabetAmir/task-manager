const { CustomAPIError } = require('../error/custom_error')

const errorHandlerMiddlerware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    res.status(500).json({ msg: 'there is something wrong' })
}
module.exports = errorHandlerMiddlerware