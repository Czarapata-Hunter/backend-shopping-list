const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router().post('/', authenticate, async (req, res, next) => {
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
});
