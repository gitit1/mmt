const mongoose = require('../config/db_configuration');

const Schema = mongoose.Schema;


const seriesSchema = new Schema({
    series_name: {type: String, unique: true, required: true},
    series_name_heb: {type: String},
    desc_eng: {type: String},
    desc_heb: {type: String},
    start_year: {type: Number},
    end_year: {type: Number},
    current_season: {type: Number},
    last_aired_episode: {type: Number},
    series_status: {type: Number},
    watch_status: {type: Number},
    lastUpdate: {type: Number},
    lastAPIUpdate: {type: Number},
    air_day: {type: Number},
    next_episode_date: {type: Number},
    location: {type: String},
    subtitles: {type: Boolean},
    num_of_seasons: {type: Number},
    notes: {type: String},
    seasons: [
        {
            season_number: {type: Number},
            episodes_number: {type: Number},
            subtitles: {type: String},
            notes: {type: String},
            quality: {type: String}
        }
    ]
});

let Series = mongoose.dbSeries.model('Series', seriesSchema);

module.exports = Series;