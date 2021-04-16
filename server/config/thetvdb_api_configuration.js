const axios = require('axios');
const fs = require('fs');

exports.setToken = async () => {
   console.log('Controller: setToken')

   let token = process.env.API_TOKEN;
   let env = process.env.ENV;
   const apiUrl = process.env.API_URL;

   if (env !== 'Development') {
      try {
         const res = await axios({
            method: 'post',
            url: `${apiUrl}/login`,
            data: JSON.stringify({
               "apikey": process.env.API_KEY,
               "pin": process.env.API_PIN
            }),
            headers: {
               'Content-Type': 'application/json',
               'Origin': 'thetvdb.com'
            }
         });

         token = res.data.data.token;

         fs.readFile('variables.env', 'utf8', function (err, data) {
            if (err) {
               console.log(err)
            };
            let linesExceptLast = data.split('\n')

            linesExceptLast = linesExceptLast.slice(0, linesExceptLast.length - 1).join('\n');
            linesExceptLast = linesExceptLast + `\nAPI_TOKEN='${token}'`;


            fs.writeFileSync('variables.env', linesExceptLast);
         });

         console.log('new token is set');

      } catch (error) {
         console.log(`Error: \n${error}`)
      }
   } else {
      console.log('token is already established')
   }

};