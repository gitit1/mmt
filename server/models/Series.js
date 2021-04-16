const mongoose = require('../config/db_configuration');

const Schema = mongoose.Schema;


const seriesSchema = new Schema({
    series_id: { type: Number, unique: true, required: true },
    full_id: { type: String, unique: true, required: true },
    series_name: { type: String, unique: true, required: true },
    series_name_heb: { type: String },
    desc_eng: { type: String },
    desc_heb: { type: String },
    start_year: { type: Number },
    end_year: { type: Number },
    series_status: { type: Number },
    lastUpdate: { type: Number },
    lastAPIUpdate: { type: Number },
    next_episode_date: { type: Number },
    num_of_seasons: { type: Number },
    hasExtras: { type: Boolean },
    banners: [],
    icons: [],
    posters: [],
    backgrounds: [],
    genres: [],
    characters: [{

    }],
    seasons: [
        {
            id: { type: Number, unique: true }, 
            season_number: { type: Number },
            posters: [],
            background: [],
            episodes: [
                {
                    id: { type: Number, unique: true },
                    name: { type: String },
                    name_heb: { type: String },
                    overview_eng: { type: String },
                    overview_heb: { type: String },
                    aired: { type: Number },
                    image: [],
                    number: { type: Number },
                }
            ],
            notes: { type: String },
            quality: { type: String },
        }
    ],
    location: { type: String },
    watch_status: { type: String },
    subtitles: { type: Boolean },
    notes: { type: String },
});

let Series = mongoose.dbSeries.model('Series', seriesSchema);

module.exports = Series;