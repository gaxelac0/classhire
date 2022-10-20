const HttpStatusCodes = require('../HttpStatusCodes')
const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
 constructor (
 name,
 statusCode = HttpStatusCodes.NOT_FOUND, 
 description = 'Not found.',
 isOperational = true
 ) {
 super(name, statusCode, isOperational, description)
 }
}

module.exports = NotFoundError