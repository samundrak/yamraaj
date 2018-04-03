### YamRaaj

kills process and child process by using `terminate`

# Usage

`node index.js --filePath="path/to/json"`

json file must have property pids of type array filled by process ids

`node index.js --pids=123,321,123`

Or instead of json file you can pass process
ids through cli

You can also expose it as api to kill by not passing any args on `node index.js`

this will open a server where you can send pids,file to json through url query.

`http://localhost:<port>/?pids=12,34,54`

# Options

`doWait` will wait untill process finished

`failFast` will fail if any terminate process is failed
