const apiConfig = {
	port: process.env['API_SERVER_PORT']
}

const authConfig = {
	domain: process.env['AUTH0_DOMAIN']
}

const alertsDBConfig = {
	host: process.env['RTK_HOST'],
	port: process.env['RTK_PORT'],
	db: process.env['RTK_DB'],
	tb: process.env['RTK_TB']
}

module.exports = {
	apiConfig,
	authConfig,
	alertsDBConfig
}
