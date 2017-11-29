const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const config = require('./config');
const logger = require('./utils/logger');
const alerts = require('./routes/alerts');

const app = new express();

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https:\/\/${config.authConfig.domain}/.well-known/jwks.json`
    }),
    issuer: `https:\/\/${config.authConfig.domain}/`,
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
	stream: logger.stream
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/alerts', alerts());

module.exports = app;
