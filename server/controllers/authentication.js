const chalk = require('chalk');
const log = console.log;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const funcs = require('../helpers/functions');
const mongoose = require('../config/db_configuration');
const User = require('../models/User');

exports.register = async (req, res) => {
    log(chalk.magenta('[Controller] register'));

    const userData = await funcs.getUserData(req.body.email);
    if (userData) {
        log(chalk.rgb(252, 17, 17)('User already exist!'));
        return res.status(400).send('User already exist!');
    } else {
        log(chalk.rgb(252, 17, 17)('Creating new User'));
        const user = new User({
            username: req.body.username,
            password: await cryptPasssword(req.body.password),
            email: req.body.email,
            seriesList: [],
            lastUpdate: funcs.getTodayTime()
        });
        await mongoose.dbWanted.createCollection(req.body.email);
        await mongoose.dbSeries.createCollection(req.body.email);
        user.save(function (err, user) {
            if (err) {
                log(chalk.rgb(252, 17, 17)('Error!'));
                switch (err.code) {
                    case 11000:
                        res.status(400).send({ message: 'User already exist!' });
                        break;
                    default:
                        res.status(400).send({ message: `Other Error: ${err.code}` });
                        break;
                }
            } else {
                log(chalk.rgb(0, 102, 0)('Saved user to DB...'));
                res.status(200).send({ message: 'User Added to DB', token: generateJwt(user) });
            }
        });
    }

};

exports.login = async (req, res) => {
    log(chalk.magenta('[Controller] login'));

    const userData = await funcs.getUserData(req.body.email);
    if (!userData) {
        log(chalk.rgb(252, 17, 17)('User Not Found!'));
        return res.status(404).send({ message: 'User Not Found' });
    }

    bcrypt.compare(req.body.password, userData.password).then(isMatch => {
        if (isMatch) {
            log(chalk.rgb(0, 102, 0)('Logged In...'));
            token = generateJwt(userData);
            return res.status(200).send({ message: 'Logged In!', token: token });
        } else {
            return res.status(400).send({ message: "Password incorrect" });
        }
    });

};



const cryptPasssword = (password) => {
    log(chalk.bgYellow.black('[Controller] cryptPasssword'));
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                resolve(hash);
            });
        });
    });
}

const generateJwt = (user) => {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: user._id,
        email: user.email,
        username: user.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.APP_SECRET_KEY);
};