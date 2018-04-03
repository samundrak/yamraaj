const task = require('./task');

module.exports = bus => ({ doWait, filePath, pids, failFast }) => {
  task(bus)({ doWait, filePath, pids, failFast }, (error, result) => {
    if (error) {
      global.logger.error(err);
      return false;
    }

    global.logger.info(result);
  });
};
