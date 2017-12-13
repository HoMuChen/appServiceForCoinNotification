const Router = require('express').Router;
const Model = require('../models/CoinPrice');

function getByCoinHandler(req, res) {
	const coin = req.params.coin;
	const limit = 12*24;

  Model.getByCoin(coin, limit)
    .then(prices => {
			docs = prices
				.sort((a, b) => b.id-a.id)
				.map(price => {
					const date = new Date(((price['id']/10).toFixed(0))*10000)
					price['price'] = Number(price['price'].replace(',', ''))
					price['time'] = date.toLocaleString();
					return price;
				})
			res.json(docs)
		})
    .catch(e => {
			console.log(e);
			res.status(500).send();
		});
}

module.exports = () => {
  const route = new Router();

  route.get('/:coin', getByCoinHandler);

  return route;
};
