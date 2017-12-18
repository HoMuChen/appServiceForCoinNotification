const Router = require('express').Router;
const Model = require('../models/StockPrice');

function getByCompanyHandler(req, res) {
	const company_id = req.params.id;
	const limit = Number(req.params.limit);

  Model.getByCompany(company_id, limit)
    .then(docs => { res.json(docs) })
    .catch(e => {
			console.log(e);
			res.status(500).send();
		});
}

module.exports = () => {
  const route = new Router();

  route.get('/company/:id/limit/:limit', getByCompanyHandler);

  return route;
};
