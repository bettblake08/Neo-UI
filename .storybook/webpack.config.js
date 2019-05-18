const custom = require('../webpack.config.prod.js');
const path = require("path");

module.exports = async ({ config, mode }) => {
    // console.dir(config.plugins, { depth: null });

    return {
        ...config
    };
};