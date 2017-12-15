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

const dcDBConfig = {
	host: process.env['DC_HOST'],
	port: process.env['DC_PORT'],
	db: process.env['DC_DB'],
	bitTB: process.env['DC_BIT_TB'],
	ethTB: process.env['DC_ETH_TB'],
	ltcTB: process.env['DC_LTC_TB'],
	legalFoundationTB: process.env['DC_LF_TB'],
	taiexTB: process.env['DC_TAIEX_TB'],
}

const pushApiServerConfig = {
	host: process.env['PUSH_API_SERVER_HOST'],
}

module.exports = {
	apiConfig,
	authConfig,
	alertsDBConfig,
	dcDBConfig,
	pushApiServerConfig,
}
