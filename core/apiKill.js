const task = require('./task');

module.exports = bus => (req, res) => {
  // doWait -> Tells whether to wait for all task complete before sending response
  // filePath -> Path to json file on server
  // pids -> instead of filePath we can send pids directly seprate by comma
  // failFast -> same of promise.all
  const { doWait, filePath, pids, failFast } = req.query;
  task(bus)({ doWait, filePath, pids, failFast }, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return false;
    }

    res.status(200).send(result);
  });
};
