const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const configApiConnection = require('./config/setToken');


require('dotenv').config({
  path: 'variables.env'
});

const app = express();
const port = process.env.PORT || 5506;

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/',routes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// first ser token
configApiConnection.setToken();





/*app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
/*app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
}); */

app.listen(port, () => console.log(`Listening on port ${port}`));