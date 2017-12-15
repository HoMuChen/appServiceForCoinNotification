const Router = require('express').Router;
const Model = require('../models/Taiex');

function getByLimitHandler(req, res) {
	const limit = req.params.limit;

  Model.getByLimit(limit)
    .then(docs=> {
			res.json(docs);
		})
    .catch(e => {
			console.log(e);
			res.status(500).send();
		});
}

module.exports = () => {
  const route = new Router();

  route.get('/limit/:limit', getByLimitHandler);

  return route;
};
