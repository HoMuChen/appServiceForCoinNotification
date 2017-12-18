const r = require('rethinkdb');
const config = require('../config').dcDBConfig;

const HOST = config.host;
const PORT = config.port;
const DB = config.db;
const TB = config.stockPriceTB;

class StockPrice {
	constructor() {
	}

	getConn() {
		return r.connect({host: HOST, port: PORT, db: DB});
	}

	getByCompany(company_id, limit) {
		return this.getConn()
			.then( conn =>
				r.table(TB).getAll(company_id, {index: 'company_id'}).orderBy(r.desc('date')).limit(limit).run(conn)
			)
	}

}

module.exports = new StockPrice();
