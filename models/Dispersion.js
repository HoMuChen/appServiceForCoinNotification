const r = require('rethinkdb');
const config = require('../config').dcDBConfig;

const HOST = config.host;
const PORT = config.port;
const DB = config.db;
const TB = config.dispersionTB;

class Dispersion {
	constructor() {
	}

	getConn() {
		return r.connect({host: HOST, port: PORT, db: DB});
	}

	getByCompanyAndLevel(company_id, level) {
		return this.getConn()
			.then( conn =>
				r.table(TB).getAll([company_id, level], {index: 'company_level'}).orderBy('date').run(conn)
			)
	}

}

module.exports = new Dispersion();
