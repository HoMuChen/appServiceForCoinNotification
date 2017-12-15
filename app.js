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
const taiex = require('./routes/taiex');
const legalFoundation = require('./routes/legalFoundation');

const app = new express();

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
	stream: logger.stream
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/alerts', alerts());
app.use('/coin_price', coinPrice());
app.use('/taiex', taiex());
app.use('/legal_foundation', legalFoundation());

module.exports = app;
