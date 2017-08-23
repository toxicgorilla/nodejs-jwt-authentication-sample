var express = require('express');
var quoter  = require('./quoter');

var app = express.Router();

app.get('/api/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});

module.exports = app;
