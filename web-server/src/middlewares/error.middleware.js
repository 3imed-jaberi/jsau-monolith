// @desc    Middleware to handle errors
export function errorHandler (error, request, response, next) {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode
  response.status(statusCode)
  response.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  })
}
