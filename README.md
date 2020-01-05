# Express response presenter

[![CircleCI](https://circleci.com/gh/Fcmam5/express-response-presnter.svg?style=svg)](https://circleci.com/gh/Fcmam5/express-response-presnter) [![Coverage Status](https://coveralls.io/repos/github/Fcmam5/express-response-presnter/badge.svg?branch=develop)](https://coveralls.io/github/Fcmam5/express-response-presnter?branch=develop) [![Known Vulnerabilities](https://snyk.io/test/github/Fcmam5/express-response-presnter/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Fcmam5/express-response-presnter?targetFile=package.json)

Standardize ExpressJS JSON responses

## Installation

Run `npm i -S express-presenter`

## Usage

* Import the package 
  * `const expressPresenter = require('express-presenter')`
* Instantiate `express-presenter` (it takes an optional `apiVersion` parameter)
  * `const presenter = expressPresenter('v1')`
* Use it as a middleware (see the examples below)

### Example

As any [ExpressJS middleware](https://expressjs.com/en/guide/using-middleware.html), you can either use it globally:

```javascript
// See: examples/simple-express-app.js
const express = require('express');
const bodyParser = require('body-parser');
const expressPresenter = require('express-presenter');

const app = express();
const presenter = expressPresenter();

app.use(bodyParser.json());
app.use(presenter);  // This must be before declaring your routes

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

```

Or in your routes file:

```javascript
// See: examples/express-routes-file.js

const express = require('express');
const expressPresenter = require('../src');

const router = express.Router();
const presenter = expressPresenter('v1'); // Here you can set your API version

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
    message: 'I will start cooking Mhajeb',
  });
});

router.get('/api/v1/finished-eating', presenter, (req, res) => {
  res.noContent();
});

module.exports = router;
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
