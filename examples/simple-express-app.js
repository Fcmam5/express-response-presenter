const express = require('express');
const bodyParser = require('body-parser');
const responsePresenter = require('../src');

const app = express();
const presenter = responsePresenter('1.0.0');

app.use(bodyParser.json());
app.use(presenter);

app.use('/ok', (req, res) => {
  res.ok({
    message: 'Take my mhajeb',
    data: { name: 'Mhajeb', isHot: true },
  });
});

app.use('/created', (req, res) => {
  res.created({
    message: 'A new mhajeb is created',
    data: { name: 'Mhajeb', isHot: true },
  });
});

app.use('/accepted', (req, res) => {
  res.accepted({
    message: 'I will start cooking Mhajeb',
  });
});

app.use('/no-content', (req, res) => {
  res.noContent();
});

app.listen(3000, () => console.log(`I'm alive`));
