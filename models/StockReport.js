const r = require('rethinkdb');
const config = require('../config');

const HOST = config.appDBConfig.host;
const PORT = config.appDBConfig.port;
const DB = config.appDBConfig.db;
const TB = 'stockReport';

class StockReport {
	constructor() {
	}

	getConn() {
		return r.connect({host: HOST, port: PORT, db: DB});
	}

	getAll() {
		return this.getConn()
			.then( conn => r.table(TB).run(conn) )
			.then( cur => cur.toArray() )
	}
	
	getByUserId(userId) {
		return this.getConn()
			.then( conn => r.table(TB).filter({user_id: userId}).run(conn) )
			.then( cur => cur.toArray() )
	}

	add(doc) {
		return this.getConn()
			.then( conn => r.table(TB).insert(doc).run(conn) )
	}

	delete(id) {
		return this.getConn()
			.then( conn => r.table(TB).get(id).delete().run(conn))
	}
	
}

module.exports = new StockReport();
