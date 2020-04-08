const { httpStatusCodes } = require('./constants');
const { getJsonResponse } = require('./utils');

/**
 * Return a standard API response with a valid HTTP status code
 * @param {String} apiVersion The API version number/tag
 */
const presenter = (apiVersion) => (req, res, next) => {
  res.ok = ({ data, message }) =>
    getJsonResponse(res, httpStatusCodes.OK, {
      apiVersion,
      data,
      message,
    });

  res.created = ({ data, message }) =>
    getJsonResponse(res, httpStatusCodes.CREATED, {
      apiVersion,
      data,
      message,
    });

  res.accepted = ({ data, message }) =>
    res.status(httpStatusCodes.ACCEPTED).json({
      apiVersion,
      data,
      message,
    });

  res.noContent = () => res.status(204).send();

  return next();
};

module.exports = presenter;
