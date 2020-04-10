const express = require('express');

const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', logger, (req, res) => {
  res.send(`<h2>Server is up and running!</h2>`);
});

server.use(logger);

function logger(req, res, next) {
    console.log(req.url);
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get(
        "Origin"
      )}`
    );
    next();
  }

module.exports = server;