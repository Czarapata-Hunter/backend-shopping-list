const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorizeDelete.js');
const Item = require('../models/Item.js');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        userId: req.user.id,
        bought: req.body.bought,
      });
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const update = await Item.updateById(req.params.id, req.body);
      res.json(update);
    } catch (e) {
      next(e);
    }
  });
