const yargs = require('yargs');
const getPort = require('get-port');
const express = require('express');
const config = require('./conf.json');
const Yamraaj = require('./core/Yamraaj');
const EventBus = require('./core/EventBus');
const logger = require('./core/loggerFactory');

const bus = new EventBus();
global.logger = logger();

const argv = yargs.argv;
if (argv.pids || config.filePath || argv.filePath) {
  require('./core/cliKill')(bus)({ ...config, ...argv });
  return false;
}
if (config.exposeApi) {
  const app = express();
  app.get('/', require('./core/apiKill')(bus));
  getPort(config.port).then(port => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}, please go to / route`);
    });
  });
  return false;
}
bus.on('COMPLETED', data => {
  if (config.exitOnComplete) {
    process.exit(0);
  }
  if (data) {
    global.logger.info(data);
  }
});
process.on('unhandledRejection', error => {
  if (config.exitOnError) {
    process.exit(0);
  }
  global.logger.error(error);
});
process.on('uncaughtException', error => {
  if (config.exitOnError) {
    process.exit(0);
  }
  global.logger.error(error);
});
