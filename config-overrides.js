module.exports = function override(config, env) {
  config.mode = "development";
  config.optimization.minimize = false;
  config.optimization.minimizer = [];
  config.devtool = "inline-source-map";

  return config;
};
