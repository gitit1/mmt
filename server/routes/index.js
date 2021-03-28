const express = require('express');
const authentication = require('../controllers/authentication');
const scanner = require('../controllers/scanner/scanner')
const router = express.Router();

try {

    router.post('/users/:userEmail', authentication.login); 
    router.post('/users/:userEmail/new', authentication.register); 


    // Test:
    router.get('/scanner',scanner.startScan)

  } catch(e) {
    console.log(`ERROR!! \n${e.stack}`);
  }
  
  module.exports = router;