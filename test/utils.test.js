const { getJsonResponse } = require('../src/utils');

describe('utils', () => {
  describe('getJsonResponse', () => {
    let mockResJson;

    beforeEach(() => {
      mockResJson = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should return a json response with a status code', () => {
      getJsonResponse(mockResJson, 200, { message: 'Hello' });
      expect(mockResJson.status).toHaveBeenCalledWith(200);
      expect(mockResJson.status().json).toHaveBeenCalledWith({
        message: 'Hello'
      });
    });
  });
});
