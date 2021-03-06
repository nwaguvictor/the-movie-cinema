'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../helpers/logger');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
};

// Disable autoIndex on production
if (process.env.NODE_ENV === 'production') {
    options.autoIndex = false;
}

module.exports = async function () {
    try {
        await mongoose.connect(config.DB_URI, options);
        logger.info(':: Database Connected Successfully');
    } catch (e) {
        logger.error(`💥:: ${e}`);
    }

    mongoose.connection.on('disconnected', () =>
        logger.warn(':: Database disconnected from MongoDB')
    );
};
