const Yamraaj = require('../core/Yamraaj');
const getPort = require('get-port');
const { exec } = require('child_process');
const sleep = require('sleep');
const terminate = require('terminate');

/* emergency exit */
// exec('ps -a', (e, d) => {
//   const pids = d
//     .split('\n')
//     .map(item => {
//       return item.split(' ')[1];
//     })
//     .filter(item => (item || '').length === 4)
//     .forEach(pid => {
//       terminate(pid);
//     });
// });
describe('Test Yamraaj', () => {
  let yamraaj;
  beforeEach(() => {
    yamraaj = new Yamraaj();
  });
  it('should add victims', () => {
    yamraaj.addVictim(1234);
    expect(yamraaj.victims.length).toBe(1);
  });

  it('should add and kill victim', async () => {
    try {
      const port = await getPort();
      const ps = exec(`nc -lp ${port}`);
      yamraaj.addVictim(ps.pid);
      const promises = await yamraaj.run();
      expect(promises.length).toBe(yamraaj.victims.length);
    } catch (e) {
      expect(true).toBe(false);
    }
  });

  it('should kill all process sync and return', async () => {
    try {
      [
        exec(`nc -lp ${await getPort()}`),
        { pid: 14565 },
        exec(`nc -lp ${await getPort()}`),
      ].forEach(({ pid }) => {
        yamraaj.addVictim(pid);
      });
      const promises = await yamraaj.run();
      expect(promises.length).toBe(yamraaj.victims.length);
    } catch (e) {
      console.log(e);
      expect(true).toBe(false);
    }
  });
});
