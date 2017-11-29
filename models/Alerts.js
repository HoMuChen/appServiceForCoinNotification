const r = require('rethinkdb');
const config = require('../config');

const HOST = config.alertsDBConfig.host;
const PORT = config.alertsDBConfig.port;
const DB = config.alertsDBConfig.db;
const TB = config.alertsDBConfig.tb;

class Alerts {
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

module.exports = new Alerts();
