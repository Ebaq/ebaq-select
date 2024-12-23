const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        extensions: ['.css'],
        extract: true, // Выносит CSS в отдельный файл
        minimize: true, // Минификация CSS
      })
    );
    return config;
  },
};
