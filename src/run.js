const child_process = require('child_process');

module.exports = (pluginContext) => (val, env) => new Promise((resolve, reject) => {
	child_process.spawn(val[0], val.slice(1), { detached: true });
});

