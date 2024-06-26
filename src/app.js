const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { restoreSessions } = require('./sessions');
const { routes } = require('./routes');
const { maxAttachmentSize } = require('./config');

const app = express();

app.disable('x-powered-by');

app.options('*', cors())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, accept, x-api-key');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.json({ limit: maxAttachmentSize + 1000000 }));
app.use(bodyParser.urlencoded({ limit: maxAttachmentSize + 1000000, extended: true }));
app.use('/', routes);

restoreSessions();

module.exports = app;