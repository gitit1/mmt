const mongoose = require('../config/db_configuration');

const Schema = mongoose.Schema;


const wantedSchema = new Schema({
   email: {type: String, unique: true, required: true},
   series: [],
   media: [],
   episodes: [],
   lastUpdate: {type: Number},

});

let Wanted = mongoose.dbWanted.model('Wanted', wantedSchema);

module.exports = Wanted;