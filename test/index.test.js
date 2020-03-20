const express = require('express');
const bodyParser = require('body-parser');
const presenter = require('../src');
const request = require('supertest');

describe('presenter', () => {
  let server;

  beforeEach(() => {
    server = bootstrapExpressApp({
      middleware: presenter('v1'),
      port: 3000
    });
  });

  afterEach(() => {
    server.close();
  });

  describe('res.ok', () => {
    it('should return a response of status code of 200', async () => {
      const res = await request(server).get('/ok');
      expect(res.status).toBe(200);
    });

    it('should return a response having {apiVersion, message, data}', async () => {
      const res = await request(server).get('/ok');
      expect(res.body).toStrictEqual({
        apiVersion: 'v1',
        data: {
          isHot: true,
          name: 'Mhajeb'
        },
        message: 'Take my mhajeb'
      });
    });

    it('should return a response having {message, data} when apiVersion is not set', async done => {
      const otherServer = bootstrapExpressApp({
        middleware: presenter(),
        port: 3031
      });

      const res = await request(otherServer).get('/ok');

      expect(res.body).toStrictEqual({
        data: {
          isHot: true,
          name: 'Mhajeb'
        },
        message: 'Take my mhajeb'
      });

      // cleanup
      otherServer.close();
      done();
    });
  });

  describe('res.created', () => {
    it('should return a response of status code of 201', async () => {
      const res = await request(server).get('/created');
      expect(res.status).toBe(201);
    });

    it('should return a response having {apiVersion, message, data}', async () => {
      const res = await request(server).get('/created');
      expect(res.body).toStrictEqual({
        apiVersion: 'v1',
        data: {
          isHot: true,
          name: 'Mhajeb'
        },
        message: 'A new mhajeb is created'
      });
    });
  });

  describe('res.accepted', () => {
    it('should return a response of status code of 202', async () => {
      const res = await request(server).get('/accepted');
      expect(res.status).toBe(202);
    });

    it('should return a response having {apiVersion, message, data}', async () => {
      const res = await request(server).get('/accepted');
      expect(res.body).toStrictEqual({
        apiVersion: 'v1',
        message: 'I will start cooking Mhajeb'
      });
    });
  });

  describe('res.noContent', () => {
    it('should return a response of status code of 204', async () => {
      const res = await request(server).get('/no-content');
      expect(res.status).toBe(204);
    });

    it('should return a response having {apiVersion, message, data}', async () => {
      const res = await request(server).get('/no-content');
      expect(res.body).toEqual({});
    });
  });
});

const bootstrapExpressApp = options => {
  const app = express();

  app.use(bodyParser.json());

  if (options.middleware) {
    app.use(options.middleware);
  }

  app.use('/ok', (req, res) => {
    res.ok({
      message: 'Take my mhajeb',
      data: { name: 'Mhajeb', isHot: true }
    });
  });

  app.use('/created', (req, res) => {
    res.created({
      message: 'A new mhajeb is created',
      data: { name: 'Mhajeb', isHot: true }
    });
  });

  app.use('/accepted', (req, res) => {
    res.accepted({
      message: 'I will start cooking Mhajeb'
    });
  });

  app.use('/no-content', (req, res) => {
    res.noContent();
  });

  const server = app.listen(options.port || 3000);

  return server;
};
