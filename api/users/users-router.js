const express = require('express');
const Users = require('./users-model')
/*
  get()
  getById(id)
  getUserPosts(userId)
  insert(user) => returns new user
  update(id, changes) => returns updated user
  remove(id) => returns # of deletions
*/
const Posts = require('../posts/posts-model')
/*
  get()
  getById(id)
  insert(post)
  update(id, changes)
  remove(id)
*/
const {
  validateUserId, 
  validateUser, 
  validatePost,
} = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(users => res.json(users))
  .catch(err => {
    res.status(500).json({
      message: "did not get users",
      err: err.message,
      stack: err.stack,
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => res.json(user))
  .catch(err => {
    res.status(500).json({
      message: "did not get user",
      err: err.message,
      stack: err.stack,
    })
  })
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(newUser => res.json(newUser))
  .catch(err => {
    res.status(500).json({
      message: "did not add user",
      err: err.message,
      stack: err.stack,
    })
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(updatedUser => res.json(updatedUser))
  .catch(err => {
    res.status(500).json({
      message: "did not update user",
      err: err.message,
      stack: err.stack,
    })
  })
});

router.delete('/:id', validateUserId, async (req, res) => {
  const user = await Users.getById(req.params.id)
  Users.remove(req.params.id)
  .then(() => res.json(user))
  .catch(err => {
    res.status(500).json({
      message: "did not delete user",
      err: err.message,
      stack: err.stack,
    })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => res.json(posts))
  .catch(err => {
    res.status(500).json({
      message: "did not get posts",
      err: err.message,
      stack: err.stack,
    })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Posts.insert({"text": req.body.text, "user_id": req.params.id})
  .then(post => res.json(post))
  .catch(err => {
    res.status(500).json({
      message: "did not add post",
      err: err.message,
      stack: err.stack,
    })
  })
});

module.exports = router
