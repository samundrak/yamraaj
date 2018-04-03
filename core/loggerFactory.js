const winston = require('winston');
const path = require('path');

winston.emitErrs = true;

module.exports = () =>
  new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: path.resolve('./logs/all-logs.log'),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
      }),
    ],
    exitOnError: false,
  });
