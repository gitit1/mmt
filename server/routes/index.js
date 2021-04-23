const express = require('express');
const authentication = require('../controllers/authentication');
const thetvdbAPI = require('../controllers/thetvdbAPI');
const userData = require('../controllers/userData');
const scanner = require('../controllers/scanner/scanner')
const router = express.Router();

try {
    //Users:
    router.post('/users/:userEmail', authentication.login); 
    router.post('/users/:userEmail/new', authentication.register); 

    // User - data  
    router.get('/users/:userEmail/series/search/:searchTerm', thetvdbAPI.search);  // search series for user
    router.post('/users/:userEmail/series/', userData.getSeries); // get all series of user
    router.post('/users/:userEmail/series/:seriesId', userData.saveSeries); // post new series to user data
    //router.put('/users/:userEmail/series/:seriesId', authentication.register); // update a series of user 
    //router.delete('/users/:userEmail/series/:seriesId', authentication.register); // delete a series from user list
    

    //API THETVDB

    // Series - Scanner:
    router.get('/scanner',scanner.startScan)

  } catch(e) {
    console.log(`ERROR!! \n${e.stack}`);
  }
  
  module.exports = router;