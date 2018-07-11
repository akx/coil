module.exports = (options, req) => ({
  publicPath: './',
  plugins: [
    require('@poi/plugin-typescript')(),
  ],
});
