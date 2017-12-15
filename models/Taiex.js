const r = require('rethinkdb');
const config = require('../config').dcDBConfig;

const HOST = config.host;
const PORT = config.port;
const DB = config.db;
const TB = config.taiexTB;

class Taiex {
	constructor() {
	}

	getConn() {
		return r.connect({host: HOST, port: PORT, db: DB});
	}

	getByLimit(limit) {
		const to = new Date();
		const from = new Date(Date.now() - 86400000*limit);
		

		return this.getConn()
			.then( conn => r.table(TB).between(from.getTime(), to.getTime()).orderBy({index: 'id'}).run(conn) )
			.then( cur => cur.toArray() )
	}

}

module.exports = new Taiex();
