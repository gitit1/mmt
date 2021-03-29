const express = require('express');
const authentication = require('../controllers/authentication');
const thetvdbAPI = require('../controllers/thetvdbAPI');
const scanner = require('../controllers/scanner/scanner')
const router = express.Router();

try {

    router.post('/users/:userEmail', authentication.login); 
    router.post('/users/:userEmail/new', authentication.register); 

    //API THETVDB
    router.get('/series/search/:searchTerm', thetvdbAPI.search); 

    // Test:
    router.get('/scanner',scanner.startScan)

  } catch(e) {
    console.log(`ERROR!! \n${e.stack}`);
  }
  
  module.exports = router;