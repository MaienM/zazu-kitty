const kitty = require('./kitty/search.js');

module.exports = (pluginContext) => {
	const _kitty = kitty(pluginContext);
	return (val, env) => {
		return _kitty(val, env);
	};
};

