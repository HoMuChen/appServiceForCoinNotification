const request = require('request');
const pushApiServerConfig = require('./config').pushApiServerConfig;

const HOST = pushApiServerConfig.host;

function pushNotificationByUserID(id, message) {

	request.get(`${HOST}/subscriptions/${id}`, (err, res, body) => {
		const subscription = JSON.parse(body).subscription;
		
		request({
			url: `${HOST}/push`,
			method: 'post',
			body: {
				subscriptions: [subscription],
				message: message
			},
			json: true
		}, (err, res, body) => {
			if(err) console.log(err);
			console.log(body);
		})
	})

}

module.exports = pushNotificationByUserID;
