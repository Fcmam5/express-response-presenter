const getJsonResponse = (res, statusCode, responseObject) => {
  return res.status(statusCode).json(responseObject);
};

module.exports = {
  getJsonResponse,
};
