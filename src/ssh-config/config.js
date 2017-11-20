const os = require('os');
const path = require('path');

/**
 * Processes the variables/config for SSH-config.
 */
module.exports = (pluginContext, env) => {
	const input = env['ssh-config'];
	const config = {};

	// Read config from env
	if (typeof input === 'object') {
		config.path = input.path;
		config.filter = input.filter;
	} else {
		config.path = input;
	}

	// Resolve the config path
	if (config.path === undefined) {
		config.path = '~/.ssh/config';
	}
	try {
		config.path = path.resolve(config.path);
	}
	catch (e) {
		pluginContext.console.log('error', 'Cannot resolve config path: ' + e.message);
		return null;
	}

	// Default filter to filter out full hostnames
	if (config.filter === undefined) {
		config.filter = /^[^.]/;
	} else {
		config.filter = new RegExp(config.filter);
	}

	return config;
};
