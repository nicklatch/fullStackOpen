require('dotenv').config();
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info(`Method: ${request.method}`);
  logger.info(`Path: ${request.path}`);
  logger.info('Body:', request.body);
  logger.info('Token:', request.token);
  logger.info('---');
  next();
};

const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' });
  next(error);
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  request.token =
    authorization && authorization.startsWith('Bearer ')
      ? authorization.replace('Bearer ', '')
      : null;
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      response.status(401).json({ error: 'invalid token' });
    }
    request.user = await User.findById(decodedToken.id);
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  requestLogger,
  userExtractor,
};
