const r = require('rethinkdb');
const config = require('../config').dcDBConfig;

const HOST = config.host;
const PORT = config.port;
const DB = config.db;
const BITTB = config.bitTB;
const ETHTB = config.ethTB;
const LTCTB = config.ltcTB;

class CoinPrice {
	constructor() {
	}

	getConn() {
		return r.connect({host: HOST, port: PORT, db: DB});
	}

	getByCoin(coin, limit) {
		switch(coin) {
			case "bit":
				return this.getConn()
					.then( conn => r.table(BITTB).orderBy(r.desc('id')).limit(limit).run(conn) )
			case "eth":
				return this.getConn()
					.then( conn => r.table(ETHTB).orderBy(r.desc('id')).limit(limit).run(conn) )
			case "ltc":
				return this.getConn()
					.then( conn => r.table(LTCTB).orderBy(r.desc('id')).limit(limit).run(conn) )
			default:
				return new Promise((resolve, reject) => { reject(new Error("no this type of coin")) })
		}
	}

}

module.exports = new CoinPrice();
