const chalk = require('chalk');
const log = console.log;
const fs = require('fs');
const path = require('path');
const funcs = require('../../helpers/functions')
const mongoose = require('../../config/db_configuration.js');
const WantedModal = require('../../models/Wanted');



exports.startScan = async (req, res) => {
    log(chalk.magenta('[Controller] startScan'));
    const promises = [];
    const paths = [];
    const wanted = [];
    // for each path...
    const path = 'E://test';

    //req.body.email
    const user = funcs.getUserData('gitit1@msn.com')

    const directories = await fs.readdirSync(path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

    if (directories.length === 0) {
        log(chalk.rgb(252, 17, 17)('Empty Path'));
    } else {
        directories.map(dir => {
            promises.push(checkSeriesDir(dir))
        })
    }
    Promise.all(promises).then(response => console.log(response))
    res.send('OK!')
}

const checkSeriesDir = (seriesName, userSeries) => {
    log(chalk.bgYellow.black('[Controller] checkSeriesDir'));
    return new Promise(function (resolve, reject) {
        resolve(seriesName)
    });
}
