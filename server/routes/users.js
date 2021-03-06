const express = require('express');

const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => {
  res.json(await User.find());
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ state: 'success' });
});

router.get('/:id', async (req, res) => {
  res.json(await User.findById(req.params.id));
});

router.put('/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ state: 'updated' });
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({ state: 'deleted' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const response = await User.findOne({ username, password });

  // eslint-disable-next-line
  const data = response !== null ? response['_id'] : '';

  res.json(data);
});

module.exports = router;
