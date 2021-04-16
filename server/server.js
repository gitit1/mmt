const express = require('express');
const passport = require('passport');
const cors = require('cors');
const routes = require('./routes');
const api_conf = require('./config/thetvdb_api_configuration');

const app = express();
const port = process.env.PORT || 5506;

app.use(express.json())
app.use(passport.initialize());
app.use(cors());

//app.use(passport.initialize());

app.use('/', routes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// configuration on server load
require('dotenv').config({
  path: 'variables.env'
});
require('./config/db_configuration');
api_conf.setToken();




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