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
		const to = Date.now()/1000;
		const from = Date.now()/1000 - (limit*5*60)

		switch(coin) {
			case "bit":
				return this.getConn()
					.then( conn => r.table(BITTB).between(from, to).run(conn) )
					.then(cur => cur.toArray())
			case "eth":
				return this.getConn()
					.then( conn => r.table(ETHTB).between(from, to).run(conn) )
					.then(cur => cur.toArray())
			case "ltc":
				return this.getConn()
					.then( conn => r.table(LTCTB).between(from, to).run(conn) )
					.then(cur => cur.toArray())
			default:
				return new Promise((resolve, reject) => { reject(new Error("no this type of coin")) })
		}
	}

}

module.exports = new CoinPrice();
