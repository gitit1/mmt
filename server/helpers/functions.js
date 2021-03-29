const chalk = require('chalk');
const log = console.log;
const User = require('../models/User');

exports.getTodayTime = () => {
    var date = new Date();
    var time = date.getTime();

    return time;
}

exports.getUserData = (userEmail) => {
    log(chalk.bgYellow.black('[Controller] getUserData'));
    return new Promise(function (resolve, reject) {
        User.findOne({ email: userEmail }, function (err, user) {
            if (err) reject(err)
            if (!user) resolve(false)
            if (user) resolve(user)
        });
    });
}