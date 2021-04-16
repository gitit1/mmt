const mongoose = require('../config/db_configuration');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: {type: String, unique: true},
   email: {type: String, unique: true, required: true},
   password: {type: String},
   created: {
      type: Date,
      default: Date.now
   },
   lastUpdate: {type: Number},
   seriesList: []
});

let User = mongoose.dbUsers.model('User', userSchema);

module.exports = User;