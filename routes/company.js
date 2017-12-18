const Router = require('express').Router;
const Model = require('../models/Company');

function getAllHandler(req, res) {

  Model.getByAll()
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

  route.get('/', getAllHandler);

  return route;
};
