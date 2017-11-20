const fs = require('fs');
const path = require('path')
const config = require('./config');

module.exports = (pluginContext) => (val, env) => {
	const conf = config(pluginContext, env);
	if (!conf) { 
		return Promise.resolve([]);
	}

	// Scan for sessions
	return new Promise((resolve, reject) =>
		fs.readdir(conf.sessions, {}, (err, files) =>
			(err ? reject(err) : resolve(files))
		)
	).then((files) => files
		.filter((file) => conf.filter.test(file))
		.filter((file) => file.toLowerCase().indexOf(val.toLowerCase()) >= 0)
		.map((file) => ({
			id: file,
			value: [conf.path, '-kload', path.join(conf.sessions, file)],
			title: path.basename(file),
			subtitle: 'Run KiTTy session',
		}))
	);
}
