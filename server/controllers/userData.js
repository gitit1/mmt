const chalk = require('chalk');
const log = console.log;
const mongoose = require('../config/db_configuration');
const funcs = require('../helpers/functions');
const { setSeriesDataObject } = require('./api/setSeries');


exports.getSeries = async (req, res) => {
    log(chalk.magenta('[Controller - userData] getSeriesOfUser'));
    const userData = await funcs.getUserData(req.params.userEmail);
    if (!userData) {
        log(chalk.rgb(252, 17, 17)('User Not Found!'));
        return res.status(404).send({ id: 'User Not Found' });
    }

    mongoose.dbSeries.collection(req.params.userEmail).find({}, { sort: {'series_name': 1}, limit: req.body.limit }).toArray(async function (err, results) {
        if (err) throw err;
        res.status(200).send([...results]);
    });
}

exports.saveSeries = async (req, res) => {
    log(chalk.magenta('[Controller - userData] saveSeriesToUserSeries'));

    try {
        const newId = req.params.seriesId.replace('series-', '');
        console.log('newId:', newId)
        const userData = await funcs.getUserData(req.params.userEmail);
        if (!userData) {
            log(chalk.rgb(252, 17, 17)('User Not Found!'));
            return res.status(404).send({ id: 'User Not Found' });
        }

        mongoose.dbSeries.collection(req.params.userEmail).findOne({ id: newId }, async function (err, result) {
            if (err) throw err;
            console.log('result', result)
            if (result) {
                log(chalk.rgb(252, 17, 17)('Series Already Exist!'));
                return res.status(404).send({ message: 'Series Already Exist' });
            }
            const seriesData = await setSeriesDataObject(req.params.seriesId, newId)

            await mongoose.dbSeries.collection(req.params.userEmail).insertOne(seriesData);
            res.status(200).send({ message: 'Saved to your Series!' });
        });
    } catch (error) {
        console.log(`Error: \n${error}`)
    }
};


//TODO: IN ADVANCED VERSION ADD ACTORS HANDLER
// handle renewed series
// console.log('seriesData:', JSON.stringify(seriesData, null, 4));
// when entering search - alert if already exists