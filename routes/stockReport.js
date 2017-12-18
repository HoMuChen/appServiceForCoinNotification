const Router = require('express').Router;
const Model = require('../models/StockReport');

function getByUserIdHandler(req, res) {
  const userId = req.params.userId;

  Model.getByUserId(userId)
    .then(reports => res.json(reports))
    .catch(e => res.status(500).send());
}

function addHandler(req, res) {
  const doc = req.body;

  Model.add(doc)
    .then(payload => res.json(payload))
    .catch(e => {
			console.log(e);
			res.status(500).send()
		});
}

function deleteHandler(req, res) {
  const id = req.params.id;

  Model.delete(id)
    .then(payload => res.json(payload))
    .catch(e => res.status(500).send());
}

module.exports = () => {
  const route = new Router();

  route.get('/:userId', getByUserIdHandler);
  route.post('/',       addHandler);
  route.delete('/:id',  deleteHandler);

  return route;
};
