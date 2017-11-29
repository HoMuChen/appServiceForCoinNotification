const app = require('./app');
const config = require('./config');

app.listen(config.apiConfig.port, function() { console.log(`Push api server is now listening on port ${config.apiConfig.port}`) })
