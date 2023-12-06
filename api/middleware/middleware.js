function logger(req, res, next) {
  console.log(req.method, req.originalUrl, new Date().toLocaleString())
  next()
}

function validateUserId(req, res, next) {
  // used for all endpoints with a `:id` parameter
  // checks the database for user with given id.
  // if `id` is valid, stores user object as `req.user` and allows request to continue
  // if `id` is invalid, responds with status `404` and message: "user not found"
  next()
}

function validateUser(req, res, next) {
  // used when creating or updating user
  // if `body` lacks `name` field, respond with status `400` and message: "missing required name field"
  next()
}

function validatePost(req, res, next) {
  // used when creating a new post
  // if `body` lacks `text` field, respond with status `400` and message: "missing required text field"
  next()
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}