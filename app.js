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
const company = require('./routes/company');
const taiex = require('./routes/taiex');
const legalFoundation = require('./routes/legalFoundation');
const stockReport = require('./routes/stockReport');
const stockPrice = require('./routes/stockPrice');
const dispersion = require('./routes/dispersion');

const app = new express();

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
	stream: logger.stream
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/alerts',           alerts());
app.use('/coin_price',       coinPrice());
app.use('/company',          company());
app.use('/taiex',            taiex());
app.use('/legal_foundation', legalFoundation());
app.use('/stockReport',      stockReport());
app.use('/stock_price',      stockPrice());
app.use('/dispersion',       dispersion());

module.exports = app;
