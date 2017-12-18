const Router = require('express').Router;
const Model = require('../models/Dispersion');

function getByCompanyAndLevelHandler(req, res) {
	const company_id = req.params.id;
	const level = Number(req.params.level);

  Model.getByCompanyAndLevel(company_id, level)
    .then(docs => { res.json(docs) })
    .catch(e => {
			console.log(e);
			res.status(500).send();
		});
}

module.exports = () => {
  const route = new Router();

  route.get('/company/:id/level/:level', getByCompanyAndLevelHandler);

  return route;
};
