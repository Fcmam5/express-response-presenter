const express = require('express');
const expressPresenter = require('../src');

const router = express.Router();
const presenter = expressPresenter('v1');

router.get('/api/v1/get', presenter, (req, res) => {
  res.ok({
    message: 'Take my mhajeb',
    data: { name: 'Mhajeb', isHot: true }
  });
});

router.post('/api/v1/create', presenter, (req, res) => {
  // ... Creating mhajeb
  res.created({
    message: 'A new mhajeb is created',
    data: { name: 'Mhajeb', isHot: true }
  });
});

router.get('/api/v1/start-task', presenter, (req, res) => {
  res.accepted({
    message: 'I will start cooking Mhajeb'
  });
});

router.get('/api/v1/finished-eating', presenter, (req, res) => {
  res.noContent();
});

module.exports = router;
