const r = require('rethinkdb');
const config = require('../config').dcDBConfig;

const HOST = config.host;
const PORT = config.port;
const DB = config.db;
const TB = config.legalFoundationTB;

const NAME = {
	1:	"外資及陸資",
	2:	"投信",
	3:	"自營商(自行買賣)",
	4:	"自營商(避險)",
}

class LegalFoundation {
	constructor() {
	}

	getConn() {
		return r.connect({host: HOST, port: PORT, db: DB});
	}

	getByName(name, limit) {
		const to = new Date();
		const from = new Date(Date.now() - 86400000*limit);
		const toStr = to.toJSON().split('T')[0];
		const fromStr = from.toJSON().split('T')[0];

		return this.getConn()
			.then( conn => r.table(TB).between(fromStr, toStr, {index: 'date', rightBound: 'closed'}).orderBy({index: 'date'}).run(conn) )
			.then( cur => cur.toArray() )
			.then( list => list.filter(row => row.name === NAME[name]) )
	}

}

module.exports = new LegalFoundation();
