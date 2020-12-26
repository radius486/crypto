// console.log('Hello, world!');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('port', 3000);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});

mongoose.connect('mongodb://localhost:27017/crypto-ui', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // eslint-disable-next-line
  console.log('[OK] DB is connected');
}).catch((err) => {
  // eslint-disable-next-line
  console.error(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/users', require('./routes/users'));

app.use('/', express.static(path.join(__dirname, '../dist')));
