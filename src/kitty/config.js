const os = require('os');
const path = require('path');

/**
 * Processes the variables/config for KiTTy.
 */
module.exports = (pluginContext, env) => {
	if (os.platform() !== 'win32') {
		return null;
	}

	const input = env['kitty'];
	const config = {};

	// Read config from env
	if (!input) {
		return null;
	} else if (typeof input === 'object') {
		config.path = input.path;
		config.sessions = input.sessions;
	} else {
		config.path = input;
	}

	// Resolve the path
	if (config.path === undefined) {
		pluginContext.console.log('error', 'No path was set for KiTTy', input);
		return null;
	}
	try {
		config.path = path.resolve(config.path);
	}
	catch (e) {
		pluginContext.console.log('error', 'Cannot resolve executable path: ' + e.message);
		return null;
	}

	// Resolve the sessions path
	if (config.sessions === undefined) {
		config.sessions = path.join(path.dirname(config.path), 'sessions');
	}
	try {
		config.sessions = path.resolve(config.sessions);
	}
	catch (e) {
		pluginContext.console.log('error', 'Cannot resolve sessions path: ' + e.message);
		return null;
	}

	// Defaults for other options
	if (config.showHidden === undefined) {
		config.showHidden = false;
	}

	return config;
};
