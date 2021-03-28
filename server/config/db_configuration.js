const mongoose = require('mongoose');
const dbUrl = require("./keys");

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.dbUsers = mongoose.createConnection(dbUrl.dbUsers, {}, () => { console.log("DATABASE_USERS is connected") });
mongoose.dbWanted = mongoose.createConnection(dbUrl.dbWanted, {}, () => { console.log("DATABASE_WANTED is connected") });
mongoose.dbSeries = mongoose.createConnection(dbUrl.dbSeries, {}, () => { console.log("DATABASE_SERIES is connected") });  


module.exports = mongoose;