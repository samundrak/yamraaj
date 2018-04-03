const { readFileSync } = require('fs');
const Yamraaj = require('./Yamraaj');

module.exports = bus => ({ doWait = true, filePath, pids, failFast }, done) => {
  let data = (`${pids} ` || '').split(',') || [];
  if (filePath) {
    try {
      const source = JSON.parse(readFileSync(filePath, 'utf-8'));
      data = source.pids;
    } catch (err) {
      data = [];
    }
  }

  global.logger.info(`Found victim are ${data}`);
  const work = new Yamraaj().setVictims(data).run({ failFast });
  if (!doWait) {
    bus.emit('COMPLETED');
    return done(null, 'Killing process is going on...');
  }
  if (failFast) {
    return work
      .then(result => {
        bus.emit('COMPLETED');
        global.logger.info(`Victim killed: ${result}`);
        return done(null, result);
      })
      .catch(err => {
        bus.emit('COMPLETED');
        return done(err, null);
      });
  }
  work.then(result => {
    global.logger.info(`Victim killed: ${result}`);
    bus.emit('COMPLETED');
    return done(null, result);
  });
};
