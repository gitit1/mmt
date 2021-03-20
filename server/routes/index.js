const express = require('express');
const authentication = require('../controllers/authentication');
const router = express.Router();

try {

    router.post('/users/:userEmail', authentication.login); 
    router.post('/users/:userEmail/new', authentication.register); 

  } catch(e) {
    console.log(`ERROR!! \n${e.stack}`);
  }
  
  module.exports = router;