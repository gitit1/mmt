const chalk = require('chalk');
const log = console.log;
const mongoose = require('../config/db_configuration');
const funcs = require('../helpers/functions');
const { setSeriesDataObject } = require('./api/setSeries');

exports.saveSeriesToUserSeries = async (req, res) => {
    log(chalk.magenta('[Controller - userData] saveSeriesToUserSeries'));

    try {
        const newId = req.params.seriesId.replace('series-', '')
        const userData = await funcs.getUserData(req.params.userEmail);
        if (!userData) {
            log(chalk.rgb(252, 17, 17)('User Not Found!'));
            return res.status(404).send({ id: 'User Not Found' });
        }
        const isExist = mongoose.dbSeries.collection(req.params.userEmail).find( { id: newId } )
        if(isExist){
            log(chalk.rgb(252, 17, 17)('Series Already Exist!'));
            return res.status(404).send({ message: 'Series Already Exist' });            
        }
        const seriesData = await setSeriesDataObject(req.params.seriesId, newId)

        await mongoose.dbSeries.collection(req.params.userEmail).insertOne(seriesData);
        res.status(200).send({ message: 'Saved to your Series!' });
    } catch (error) {
        console.log(`Error: \n${error}`)
    }
};


//TODO: IN ADVANCED VERSION ADD ACTORS HANDLER
// console.log('seriesData:', JSON.stringify(seriesData, null, 4));