const axios = require('axios');

exports.setToken = async () => {
   console.log('Controller: setToken')

   let token = process.env.API_TOKEN;

   if (!token) {

      try {
         const res_data = await axios({
            method: 'post',
            url: 'https://api4.thetvdb.com/v4/login',
            data: JSON.stringify({
               "apikey": process.env.API_KEY,
               "pin": process.env.API_PIN
            }),
            headers: {
               'Content-Type': 'application/json',
               'Origin': 'thetvdb.com'
            }
         });

         token = res_data.data.token;
         console.log('set new token');

      } catch (error) {
         console.log(`Error: \n${error}`)
      }

   }else{
      console.log('token is already established')
   }

   process.env.API_TOKEN = token;
};