var express = require('express');
var jwt = require('express-jwt');
var config = require('./config');
var quoter = require('./quoter');

var app = express.Router();

// Validate access_token
var jwtCheck = jwt({secret: config.secret, audience: config.audience, issuer: config.issuer});

// Check for scope
function requireScope(scope) {
  return function (req, res, next) {
    var has_scopes = req.user.scope === scope;
    if (!has_scopes) {
      res.sendStatus(401);
      return;
    }
    next();
  };
}

app.use('/api/protected', jwtCheck, requireScope('full_access'));

app.get('/api/protected/random-quote', function (req, res) {
  res
    .status(200)
    .send(quoter.getRandomOne());
});

module.exports = app;