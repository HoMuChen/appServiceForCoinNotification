const Router = require('express').Router;
const Model = require('../models/LegalFoundation');

function getByNameHandler(req, res) {
	const name = req.params.name;
	const limit = 30;

  Model.getByName(name, limit)
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

  route.get('/:name', getByNameHandler);

  return route;
};
