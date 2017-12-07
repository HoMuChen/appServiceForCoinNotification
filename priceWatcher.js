const r = require('rethinkdb');

const AlertsModel = require('./models/Alerts');
const config = require('./config').dcDBConfig;
const pushNotificationByUserID = require('./pushNotificationByUserID');

async function check() {
	const conn = await r.connect({host: config.host, port: config.port, db: config.db});

	r.table(config.bitTB).changes().run(conn, bitChangesCB);
	r.table(config.ethTB).changes().run(conn, ethChangesCB);
	r.table(config.ltcTB).changes().run(conn, ltcChangesCB);
}

const bitChangesCB = (function() {
	var prePrice = 0;
	
	return function(err, cur) {
		cur.each((err, row) => {
			const curPrice = Number(row.new_val.price.replace(',', ''));
			checkAndPush(prePrice, curPrice, 'bit');
			prePrice = curPrice;
		})
	}
})()

const ethChangesCB = (function() {
	var prePrice = 0;
	
	return function(err, cur) {
		cur.each((err, row) => {
			const curPrice = Number(row.new_val.price.replace(',', ''));
			checkAndPush(prePrice, curPrice, 'eth');
			prePrice = curPrice;
		})
	}
})()

const ltcChangesCB = (function() {
	var prePrice = 0;
	
	return function(err, cur) {
		cur.each((err, row) => {
			const curPrice = Number(row.new_val.price.replace(',', ''));
			checkAndPush(prePrice, curPrice, 'ltc');
			prePrice = curPrice;
		})
	}
})()

function checkAndPush(pre, cur, type) {
	console.log(`[${type}] last price     : ${pre}`);
	console.log(`[${type}] updated price  : ${cur}`);
	
	AlertsModel.getByCoin(type)
		.then(allAlerts => (
			allAlerts
				.filter(alert => {
					return alert.trending === "up"
						? (cur > pre) && (cur > Number(alert.threshold)) && (pre < Number(alert.threshold))
						: (cur < pre) && (pre < Number(alert.threshold)) && (pre > Number(alert.threshold))
				})
				.map(row => {
					const message = `[${type}] price is ${row['trending']} ${row['threshold']} at ${Date()}`;

					pushNotificationByUserID(row['user_id'], message);
				})
		))
		.catch(e => console.log(e))
}

check();
