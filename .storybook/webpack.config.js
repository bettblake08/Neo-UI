module.exports = async ({ config, mode }) => {
  if (mode === "PRODUCTION") {
    config.module.rules.map(rule => {
      if (/file-loader/.test(rule.loader)) {
        rule.query.publicPath = url => `../../${url}`;
      }
      return rule;
    });
  }
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve("@storybook/addon-storysource/loader")],
    enforce: "pre"
  });

//   console.dir(config.module, { depth: null });
  return config;
};
