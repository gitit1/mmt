const chalk = require('chalk');
const log = console.log;

const User = require('../models/User');


exports.getTodayTime = () => {
    var date = new Date();
    var time = date.getTime();

    return time;
}

exports.getUserData = (userEmail) => {
    log(chalk.bgYellow.black('[Helpers] getUserData'));
    return new Promise(function (resolve, reject) {
        User.findOne({ email: userEmail }, function (err, user) {
            if (err) reject(err)
            if (!user) resolve(false)
            if (user) resolve(user)
        });
    });
}

exports.withoutTime = (dateTime) => {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
}