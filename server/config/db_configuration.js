const mongoose = require('mongoose');

exports.connectToDB = async () => {
   console.log('Config: dbConnection');

   mongoose.connect(process.env.DATABASE, {
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true
  }, () => {
    console.log("DB is connected")
  });
}