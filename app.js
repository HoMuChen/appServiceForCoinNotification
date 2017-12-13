const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const config = require('./config');
const logger = require('./utils/logger');
const alerts = require('./routes/alerts');
const coinPrice = require('./routes/coinPrice');

const app = new express();

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
	stream: logger.stream
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/alerts', alerts());
app.use('/coin_price', coinPrice());

module.exports = app;
