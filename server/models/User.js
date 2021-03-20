const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;


const userSchema = new Schema({
   username: {type: String, unique: true},
   email: {type: String, unique: true, required: true},
   password: {type: String},
   created: {
      type: Date,
      default: Date.now
   },
   lastUpdate: {type: Number}
});

let User = mongoose.model('User', userSchema);

module.exports = User;