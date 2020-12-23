const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  key: String,
  pairs: [],
  currencies: [],
});

module.exports = mongoose.model('User', User);
