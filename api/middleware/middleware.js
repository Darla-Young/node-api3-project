const Users = require('../users/users-model')

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
  if (!req.body.text) res.status(400).json({message: "missing required text field"})
  else next()
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}