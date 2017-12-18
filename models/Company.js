const r = require('rethinkdb');
const config = require('../config').dcDBConfig;

const HOST = config.host;
const PORT = config.port;
const DB = 'Config';
const TB = 'company';

class Company {
	constructor() {
	}

	getConn() {
		return r.connect({host: HOST, port: PORT, db: DB});
	}

	getByAll() {
		return this.getConn()
			.then( conn => r.table(TB).run(conn) )
			.then( cur => cur.toArray() )
	}

}

module.exports = new Company();
