const Users = require('../users/users-model')
/*
  getById(id)
*/
const Posts = require('../posts/posts-model')
/*
  getById(id)
*/

function logger(req, res, next) {
  console.log(req.method, req.originalUrl, new Date().toLocaleString())
  next()
}

async function validateUserId(req, res, next) {
  const user = await Users.getById(req.params.id)
  if (!user) res.status(404).json({message: "user not found"})
  else next()
}

function validateUser(req, res, next) {
  if (!req.body.name) res.status(400).json({message: "missing required name field"})
  else next()
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