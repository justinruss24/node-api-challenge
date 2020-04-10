const express = require('express');

// const actionsRouter = require();
// const projectsRouter = require();

const server = express();

server.use(express.json());
server.use(logger);

// server.use('/actions', actionsRouter);
// server.use('/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hello World</h2>`);
});

// custom MW

function logger(req, res, next) {
    console.log(`${req.method} request to ${req.originalUrl}. \n${new Date()}`);
    next();
}

module.exports = server;