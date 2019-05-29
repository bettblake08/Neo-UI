module.exports = async ({ config, mode }) => {
    // console.dir(config.plugins, { depth: null });
    config.module.rules.push({
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
    });

    return {
        ...config
    };
};
