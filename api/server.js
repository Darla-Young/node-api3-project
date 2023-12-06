const express = require('express');
const usersRouter = require('./users/users-router')
const { logger } = require('./middleware/middleware')
const server = express();

server.use(express.json())
server.use('/users', logger, usersRouter)

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'request not found',
  })
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
