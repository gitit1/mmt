const axios = require('axios');
const chalk = require('chalk');
const log = console.log;
const User = require('../models/User');
const Series = require('../models/Series');
const { APIENUMS } = require('../helpers/enums');

const getUrl = (type, id, language) => {
   const apiUrl = process.env.API_URL;
   switch (type) {
      case APIENUMS.GET_SERIES:
         return `${apiUrl}/series/${id}/extended`;
      case APIENUMS.GET_TRANSLATED_DATA:
         return `${apiUrl}/series/${id}/translations/${language}`;
      case APIENUMS.GET_SERIES_EPISODES:
         return `${apiUrl}/series/${id}/episodes/official?page=0`;
      case APIENUMS.GET_SEASON_EXTENDED_DATA:
         return `${apiUrl}/seasons/${id}/extended`;
      case APIENUMS.GET_EPISODE_EXTENDED_DATA:
         return `${apiUrl}/episodes/${id}/extended`;
      case APIENUMS.GET_EPISODE_TRANSLATED_DATA:
         return `${apiUrl}/episodes/${id}/translations/${language}`;
      default:
         break;
   }
}

exports.search = async (req, res) => {
   log(chalk.magentaBright('[Controller - thetvdbAPI] search'));
   
   const token = process.env.API_TOKEN;
   const apiUrl = process.env.API_URL;

   try {
      const response = await axios({
         method: 'get',
         url: `${apiUrl}/search?query=${req.params.searchTerm}&type=series`,
         headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Origin': 'thetvdb.com'
         }
      });
      if (response.status === 200) {
         res.send(response.data.data)
      } else (
         res.send(404)
      )

   } catch (error) {
      console.log(`Error: \n${error}`)
   }
};

exports.getSeriesDataFromAPI = async (type, seriesId, language = null) => {
   log(chalk.magentaBright('[Controller - thetvdbAPI] getSeriesDataFromAPI', type));

   const token = process.env.API_TOKEN;

   try {
      const response = await axios({
         method: 'get',
         url: getUrl(type, seriesId, language),
         headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Origin': 'thetvdb.com'
         }
      });
      if (response.status === 200) {
         return response.data.data;
      }
   } catch (error) {
      console.log(`Error: \n${error}`)
   }
};