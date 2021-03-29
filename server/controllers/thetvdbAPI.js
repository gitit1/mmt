const chalk = require('chalk');
const log = console.log;
const User = require('../models/User');
const Series = require('../models/Series');

exports.search = async (req, res) => {
    log(chalk.magenta('[Controller - thetvdbAPI] search'));
};
