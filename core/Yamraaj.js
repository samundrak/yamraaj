const terminate = require('terminate');
const { promisify } = require('util');
class Yamraaj {
  constructor() {
    this.victims = [];
  }

  setVictims(victims) {
    this.victims = victims;
    return this;
  }

  addVictim(victim) {
    this.victims.push(victim);
  }
  run({ failFast = false } = {}) {
    return Promise.all(
      this.victims.map(victim => {
        const pomise = promisify(terminate);
        if (failFast) {
          // This will make sure that every pid passed is valid
          return pomise(victim);
        }

        // We don't care if pid is found or not
        // if there is no pid then still it should resolve
        return new Promise(resolve => {
          terminate(victim, () => {
            resolve();
          });
        });
      })
    );
  }
}
module.exports = Yamraaj;
